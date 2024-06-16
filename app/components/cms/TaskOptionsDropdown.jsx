import {
  fetchTaskAtom,
  selectedTaskActionAtom,
  taskActionsAtom,
  updateTaskAtom,
  updateTaskStatusAtom,
} from "@/app/store/TaskStore";
import { userAtom, userListAtom } from "@/app/store/UserStore";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import ConfirmationWindow from "../ConfirmationWindow";
import TaskActionModal from "./TaskActionModal";
import { toast } from "sonner";
import { differenceInDays, format } from "date-fns";

const TaskOptionsDropdown = ({
  task_id,
  tasks,
  actions,
  trigger,
  isEscalated,
  isOverdue,
  confirmationWindow,
  taskActionWindow,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
}) => {
  // const confirmationWindow = useDisclosure(); // confirmation window
  // const taskActionWindow = useDisclosure(); // modal window for selecting processor and reviewer

  const [selectedTaskAction, setSelectedTaskAction] = useAtom(
    selectedTaskActionAtom
  );

  const fetchTask = useSetAtom(fetchTaskAtom);
  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);
  const updateTaskAssignees = useSetAtom(updateTaskAtom);


  const user = useAtomValue(userAtom);
  const userList = useAtomValue(userListAtom);

  const handleSelectOption = (taskAction) => {
    const { key, status_id } = taskAction;
    let taskName;
    const clientKey = tasks.client.client_id;
    const dateTaskDone = new Date();

    console.log("processor assignees", tasks.processor);
    console.log("reviewer assignees", tasks.reviewer);

    if (key === "mark") {
      if (status_id === "forReview" || status_id === "done") {
        const updateSelectedTask = tasks.sla.map((task) => {
          if (task._id === task_id) {
            console.log("TASK", task);
            taskName = task?.name;

            console.log("taskName: ", taskName);

            if (status_id === "done") {
              return {
                ...task,
                status: status_id,
                done_by: {
                  sub: user?.sub,
                  name: user?.name,
                  email: user?.email,
                  picture: user?.picture,
                },
              };
            } else {
              return {
                ...task,
                status: status_id,
              };
            }
          }
          return task;
        });

        const promise = async () =>
          new Promise((resolve) =>
            setTimeout(
              async () =>
                resolve(
                  await updateTaskStatus({
                    sla: updateSelectedTask,
                    client_id: clientKey,
                  }),
                  await fetchTask()
                ),
              2000
            )
          );
        toast.promise(promise, {
          description: `${format(dateTaskDone, "PPpp")}`,
          loading: "Updating Task Status...",
          success: () => {
            return `${
              status_id === "done" ? "Task Completed" : "Task Marked for Review"
            }: ${taskName}`;
          },

          error: "Error Updating Task Status",
        });
      }
    }

    if (key === "escalate" || key === "resolve") {
      const updateSelectedTask = tasks.sla.map((task) => {
        if (task._id === task_id) {
          if (!Boolean(task.escalate)) {
            // if task is not escalated, set true
            return { ...task, escalate: true };
          } else {
            // resolve task escalation, set to false
            return { ...task, escalate: false };
          }
        }
        return task;
      });

      console.log("updateSelectedTask", updateSelectedTask);

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await updateTaskStatus({
                  sla: updateSelectedTask,
                  client_id: clientKey,
                }),
                await fetchTask()
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(dateTaskDone, "PPpp")}`,
        loading: `Escalating Task to ${
          status_id[0].toUpperCase() + status_id.slice(1)
        }`,
        success: () => {
          return "Please wait for further instructions";
        },

        error: "Error Escalating Task",
      });
    }

    if (key === "assign") {
      console.log("Assign", key, task_id);

      const newProcessorAssignees = userList.filter(
        (user) =>
          Array.from(selectedProcessorTaskAction).includes(user.sub) &&
          !tasks.processor.map((processor) => processor.sub).includes(user.sub)
      );
      const newReviewerAssignees = userList.filter(
        (user) =>
          Array.from(selectedReviewerTaskAction).includes(user.sub) &&
          !tasks.reviewer.map((reviewer) => reviewer.sub).includes(user.sub)
      );

      const removedDuplicateProcessors = [
        ...tasks.processor,
        ...newProcessorAssignees,
      ].filter(
        (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
      );

      const removedDuplicateReviewers = [
        ...tasks.reviewer,
        ...newReviewerAssignees,
      ].filter(
        (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
      );

      console.log("removedDuplicateProcessors", removedDuplicateProcessors);
      console.log("removedDuplicateReviewers", removedDuplicateReviewers);

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await updateTaskAssignees({
                  action: key,
                  tasks: tasks,
                  _id: tasks._id,
                  processor: removedDuplicateProcessors,
                  reviewer: removedDuplicateReviewers,
                }),
                await fetchTask()
              ),
            2000
          )
        );
      toast.promise(promise, {
        loading: "Assigning New Member...",
        success: () => {
          return `New Member Assigned successfully`;
        },
        error: "Error assigning new member",
      });
      setSelectedProcessorTaskAction(new Set([]));
      setSelectedReviewerTaskAction(new Set([]));
    }

    if (key === "remove") {
      console.log("Remove", key, task_id);

      const newProcessorAssignees = tasks.processor
        .map((processor) => processor.sub)
        .filter(
          (user) => !Array.from(selectedProcessorTaskAction).includes(user.sub)
        );
      const newReviewerAssignees = tasks.reviewer
        .map((reviewer) => reviewer.sub)
        .filter(
          (user) => !Array.from(selectedReviewerTaskAction).includes(user.sub)
        );

      const removedDuplicateProcessors = [
        ...tasks.processor,
        ...newProcessorAssignees,
      ].filter(
        (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
      );

      const removedDuplicateReviewers = [
        ...tasks.reviewer,
        ...newReviewerAssignees,
      ].filter(
        (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
      );

      console.log("removedDuplicateProcessors", removedDuplicateProcessors);
      console.log("removedDuplicateReviewers", removedDuplicateReviewers);

      /// ### For removing any task done by when removing processor/s and reviewer/s?
      /// ### Checks whether the soon to be removed processor/s and reviewer/s has any task done by and removes it

      // const processorSubs = tasks.processor.map((processor) => processor.sub);

      // const removeDoneBy = tasks.sla.map((task) => {
      //   console.log("task.done_by.sub", task.done_by.sub);
      //   console.log(
      //     "processorSubs.includes(task.done_by.sub)",
      //     processorSubs.includes(task.done_by.sub)
      //   );

      //   if (
      //     task.status !== "done" &&
      //     processorSubs.includes(task.done_by.sub)
      //   ) {
      //     return { ...task, done_by: {} };
      //   }
      //   return task;
      // });

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                // ### Removes any task done by first before removing processor/s and reviewer/s

                // await updateTaskStatus({
                // sla: removeDoneBy,
                // client_id: clientKey,
                // })
                await updateTaskAssignees({
                  action: key,
                  tasks: tasks,
                  _id: tasks._id,
                  processor: removedDuplicateProcessors,
                  reviewer: removedDuplicateReviewers,
                }),

                await fetchTask()
              ),
            2000
          )
        );
      toast.promise(promise, {
        loading: "Removing Member...",
        success: () => {
          return `Member Removed successfully`;
        },
        error: "Error removing member",
      });
      setSelectedProcessorTaskAction(new Set([]));
      setSelectedReviewerTaskAction(new Set([]));
    }
  };

  const taskActionWindowDetails = {
    mark: {
      done: {
        title: "Complete Task",
        message: "You are about to mark this task as done",
        description: "",
        type: "confirm",
      },
      forReview: {
        title: "Review Task",
        message: "You are about to mark this task for review",
        description: "",
        type: "confirm",
      },
      title: `${
        selectedTaskAction.status_id === "done" ? "Complete Task" : ""
      } ${selectedTaskAction.status_id === "forReview" ? "Review Task" : ""}`,
      message: `${
        selectedTaskAction.status_id === "done"
          ? "You are about to mark this task as done."
          : ""
      } ${
        selectedTaskAction.status_id === "forReview"
          ? "You are about to mark this task for review."
          : ""
      }`,
      description: `${
        selectedTaskAction.status_id === "done"
          ? "Make sure to double check if this task is completed properly."
          : ""
      } ${
        selectedTaskAction.status_id === "forReview"
          ? "This will notify your reviewer/s to review the task."
          : ""
      }`,
      type: "confirm",
    },
    escalate: {
      title: "Escalate Task",
      message: "Do you confirm escalating this task to a team lead?",
      description:
        "This action is irreversible. Make sure to contact your team leader",
      type: "warning",
    },
    resolve: {
      title: "Resolve Escalation",
      message: "Do you confirm resolving this escalation?",
      description: "",
      type: "warning",
    },
    reassign: {
      title: "Re-assign Task",
      message: "Do you confirm re-assigning this task?",
      description: "",
      type: "warning",
    },
    assign: {
      title: "Assign team member",
      message: "Do you confirm assigning this task?",
      description: "",
      type: "info",
    },
    remove: {
      title: "Remove team member",
      message: "Do you confirm removing this team member?",
      description: "",
      type: "warning",
    },
  };

  const taskOptionsColors = {
    green: "data-[hover=true]:bg-green-default",
    orange: "data-[hover=true]:bg-orange-default",
    red: "data-[hover=true]:bg-red-default",
    blue: "data-[hover=true]:bg-blue-default",
    yellow: "data-[hover=true]:bg-yellow-default",
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            aria-label={"Shortcut Options"}
            isIconOnly
            className="bg-transparent"
          >
            <div className="">{trigger}</div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          items={actions}
          itemClasses={{
            base: ["data-[disabled=true]:opacity-100 text-black-default"],
            title: "text-base font-medium ",
          }}
          disabledKeys={
            (isEscalated && ["mark", "escalate"]) ||
            (isOverdue && ["mark", "escalate"])
          }
        >
          {(item) => {
            if (item.key === "resolve") {
              return (
                isEscalated && (
                  <DropdownItem
                    startContent={item.icon}
                    className={cn(
                      taskOptionsColors[item.color],
                      "data-[hover=true]:text-white-default"
                    )}
                    onPress={() => {
                      setSelectedTaskAction({
                        key: item.key,
                        status_id: item.status_id,
                      });
                      confirmationWindow.onOpen();
                    }}
                  >
                    {item.label}
                  </DropdownItem>
                )
              );
            }
            if (item.key === "reassign") {
              return null;
              // isOverdue && (
              //   <DropdownItem
              //     startContent={item.icon}
              //     className={cn(
              //       taskOptionsColors[item.color],
              //       "data-[hover=true]:text-white-default"
              //     )}
              //     onPress={() => {
              //       setSelectedTaskAction({
              //         key: item.key,
              //         status_id: item.status_id,
              //       });
              //       confirmationWindow.onOpen();
              //     }}
              //   >
              //     {item.label}
              //   </DropdownItem>
              // )
            } else {
              return (
                <DropdownItem
                  startContent={item.icon}
                  key={item.key}
                  className={cn(
                    taskOptionsColors[item.color],
                    "data-[hover=true]:text-white-default",
                    item.color === "yellow" && "data-[hover=true]:text-shadow",
                    `${
                      isOverdue &&
                      !["reassign", "assign", "remove"].includes(item.key) &&
                      "text-black-default/60 cursor-not-allowed"
                    }`,
                    `${
                      (item.key === "mark" || item.key === "escalate") &&
                      isEscalated
                        ? "text-black-default/60 cursor-not-allowed"
                        : ""
                    }`
                  )}
                  onPress={() => {
                    if (item.key === "assign" || item.key === "remove") {
                      setSelectedTaskAction({
                        key: item.key,
                        status_id: item.status_id,
                      });
                      taskActionWindow.onOpen();
                    } else {
                      setSelectedTaskAction({
                        key: item.key,
                        status_id: item.status_id,
                      });
                      confirmationWindow.onOpen();
                    }
                  }}
                >
                  {item.label}
                </DropdownItem>
              );
            }
          }}
        </DropdownMenu>
      </Dropdown>
      {/* <ConfirmationWindow
        message={taskActionWindowDetails[selectedTaskAction.key]?.message}
        description={
          taskActionWindowDetails[selectedTaskAction.key]?.description
        }
        title={taskActionWindowDetails[selectedTaskAction.key]?.title}
        type={taskActionWindowDetails[selectedTaskAction.key]?.type}
        action={handleSelectOption}
        action_params={[selectedTaskAction]}
        isOpen={confirmationWindow.isOpen}
        onOpenChange={confirmationWindow.onOpenChange}
      /> */}
    </>
  );
};

export default TaskOptionsDropdown;
