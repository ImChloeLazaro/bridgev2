import {
  fetchTaskAtom,
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
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import ConfirmationWindow from "../ConfirmationWindow";
import TaskActionModal from "./TaskActionModal";
import { toast } from "sonner";
import { differenceInDays, format } from "date-fns";

const TaskOptionsDropdown = ({
  id,
  tasks,
  actions,
  trigger,
  isEscalated,
  isOverdue,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
}) => {
  const confirmationWindow = useDisclosure(); // confirmation window
  const taskActionWindow = useDisclosure(); // modal window for selecting processor and reviewer

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const [selectedTaskAction, setSelectedTaskAction] = useState({
    key: "",
    status_id: "",
  });

  const fetchTask = useSetAtom(fetchTaskAtom);
  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);
  const updateTask = useSetAtom(updateTaskAtom);
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
          if (task._id === id) {
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
                  })
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
        if (task._id === id) {
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
                })
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
      console.log("Assign", key, id);

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

      console.log("newProcessorAssignees", newProcessorAssignees);
      console.log("newReviewerAssignees", newReviewerAssignees);

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                // await updateTask({
                //   action: key,
                //   type: "processor",
                //   _id: tasks._id,
                //   processor: [...tasks.processor, ...newProcessorAssignees],
                //   reviewer: [...tasks.reviewer, ...newReviewerAssignees],
                // }),
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
    }

    if (key === "remove") {
      console.log("Remove", key, id);

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

      console.log("newProcessorAssignees", newProcessorAssignees);
      console.log("newReviewerAssignees", newReviewerAssignees);

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                // await updateTask({
                //   action: key,
                //   type: "processor",
                //   _id: tasks._id,
                //   processor: [...tasks.processor, ...newProcessorAssignees],
                //   reviewer: [...tasks.reviewer, ...newReviewerAssignees],
                // }),
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
      <Dropdown onOpenChange={setDropdownIsOpen}>
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
                      setDropdownIsOpen(false);
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
      <ConfirmationWindow
        message={taskActionWindowDetails[selectedTaskAction.key]?.message}
        description={
          taskActionWindowDetails[selectedTaskAction.key]?.description
        }
        title={taskActionWindowDetails[selectedTaskAction.key]?.title}
        type={taskActionWindowDetails[selectedTaskAction.key]?.type}
        action={handleSelectOption}
        action_params={selectedTaskAction}
        isOpen={confirmationWindow.isOpen}
        onOpenChange={confirmationWindow.onOpenChange}
      />
      <TaskActionModal
        tasks={tasks}
        isOpen={taskActionWindow.isOpen}
        onOpenChange={taskActionWindow.onOpenChange}
        onOpenAfterClose={confirmationWindow.onOpen}
        selectedTaskAction={selectedTaskAction}
        selectedProcessorTaskAction={selectedProcessorTaskAction}
        setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
        selectedReviewerTaskAction={selectedReviewerTaskAction}
        setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
      />
    </>
  );
};

export default TaskOptionsDropdown;
