import {
  fetchTaskAtom,
  updateTaskAtom,
  updateTaskStatusAtom,
} from "@/app/store/TaskStore";
import { userAtom } from "@/app/store/UserStore";
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
import { format } from "date-fns";

const TaskOptionsDropdown = ({
  id,
  tasks,
  actions,
  trigger,
  isEscalated,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
  selectedClientToView,
  
}) => {
  const {
    // confirmation window
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const {
    // modal window for selecting processor and reviewer
    isOpen: isOpenTaskAction,
    onOpen: onOpenTaskAction,
    onOpenChange: onOpenChangeTaskAction,
  } = useDisclosure();

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaskAction, setSelectedTaskAction] = useState({
    key: "",
    status_id: "",
  });

  const fetchTask = useSetAtom(fetchTaskAtom);
  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);
  const updateTask = useSetAtom(updateTaskAtom);
  const user = useAtomValue(userAtom);
  // console.log("tasks", tasks);
  // console.log("selectedProcessorTaskAction", selectedProcessorTaskAction);
  // console.log("selectedReviewerTaskAction", selectedReviewerTaskAction);

  const handleSelectOption = (taskAction) => {
    const { key, status_id } = taskAction;
    let taskName;
    const clientKey = tasks.client.client_id;
    const dateTaskDone = new Date();

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

        setIsLoading(true);
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
            setIsLoading(false);
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
      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await updateTask({
                  action: key,
                  type: "processor",
                  _id: selectedClientToView,
                  processor: selectedProcessorTaskAction,
                  reviewer: selectedProcessorTaskAction,
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
    }

    if (key === "remove") {
      console.log("Remove", key, id);
      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await updateTask({
                  action: key,
                  type: "processor",
                  _id: selectedClientToView,
                  processor: selectedReviewerTaskAction,
                  reviewer: selectedReviewerTaskAction,
                }),
                await fetchTask()
              ),
            2000
          )
        );
      toast.promise(promise, {
        loading: "Removing New Member...",
        success: () => {
          return `Member Removed successfully`;
        },
        error: "Error removing member",
      });
    }
  };

  const taskActionWindowDetails = {
    mark: {
      title: "Confirmation",
      message: "Do you confirm marking this task done?",
      description: "",
      type: "confirm",
    },
    escalate: {
      title: "Confirmation",
      message: "Do you confirm escalating this task to a team lead?",
      description: "",
      type: "warning",
    },
    assign: {
      title: "Confirmation",
      message: "Do you confirm assigning this task?",
      description: "",
      type: "info",
    },
    remove: {
      title: "Confirmation",
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
          disabledKeys={isEscalated && ["mark", "escalate"]}
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
                      onOpenPopup();
                    }}
                  >
                    {"Resolve Escalation"}
                  </DropdownItem>
                )
              );
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
                      onOpenTaskAction();
                    } else {
                      setSelectedTaskAction({
                        key: item.key,
                        status_id: item.status_id,
                      });
                      onOpenPopup();
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
        isOpen={isOpenPopup}
        onOpenChange={onOpenChangePopup}
      />
      <TaskActionModal
        tasks={tasks}
        isOpen={isOpenTaskAction}
        onOpenChange={onOpenChangeTaskAction}
        selectedClientToView={selectedClientToView}
        selectedTaskAction={selectedTaskAction}
        selectedProcessorTaskAction={selectedProcessorTaskAction}
        setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
        selectedReviewerTaskAction={selectedReviewerTaskAction}
        setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
        onOpenAnotherModal={onOpenPopup}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      />
    </>
  );
};

export default TaskOptionsDropdown;
