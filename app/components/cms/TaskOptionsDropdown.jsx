import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import ConfirmationWindow from "../ConfirmationWindow";
import { MdInfoOutline, MdWarningAmber } from "react-icons/md";
import { useState } from "react";
import { updateTaskStatusAtom } from "@/app/store/TaskStore";
import { useSetAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import { format } from "date-fns";
import { userAtom } from "@/app/store/UserStore";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const TaskOptionsDropdown = ({
  id,
  tasksFromSelectedClient,
  actions,
  trigger,
  isEscalated,
  setIsEscalated,
}) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaskAction, setSelectedTaskAction] = useState({
    key: "",
    status_id: "",
  });

  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);
  const user = useAtomValue(userAtom);
  const auth = useAtomValue(authenticationAtom);

  const handleSelectOption = (taskAction) => {
    const { key, status_id } = taskAction;

    if (key === "mark") {
      if (status_id === "forReview" || status_id === "done") {
        const updateSelectedTask = tasksFromSelectedClient[0].sla.map(
          (task) => {
            if (task._id === id) {
              if (status_id === "done") {
                console.log("TASK DONE");
              }
              return { ...task, status: status_id };
            }
            return task;
          }
        );
        const selectedTask = tasksFromSelectedClient[0].sla.filter(
          (task) => task._id === id
        )[0];

        const clientKey = tasksFromSelectedClient[0].client.client_id;
        const dateTaskDone = new Date();

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
            }: ${selectedTask.name}`;
          },

          error: "Error Updating Task Status",
        });
      }
    }

    if (key === "escalate") {
      const dateTaskDone = new Date();

      console.log("glow red task: ", status_id);
      setIsEscalated(true);
      const promise = async () =>
        new Promise((resolve) => setTimeout(async () => resolve(), 2000));
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
  };

  const taskActionWindowDetails = {
    mark: {
      title: "Confirmation",
      message: "Do you confirm marking this task done?",
      description: "",
    },
    escalate: {
      title: "Confirmation",
      message: "Do you confirm escalating this task to a team lead?",
      description: "",
    },
    assign: {
      title: "Confirmation",
      message: "Do you confirm assigning this task?",
      description: "",
    },
    remove: {
      title: "Confirmation",
      message: "Do you confirm removing this team member?",
      description: "",
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
          disabledKeys={isEscalated && ["mark", "escalate"]}
        >
          {(item) => (
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
                setSelectedTaskAction({
                  key: item.key,
                  status_id: item.status_id,
                });
                onOpenPopup();
              }}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <ConfirmationWindow
        message={taskActionWindowDetails[selectedTaskAction.key]?.message}
        description={
          taskActionWindowDetails[selectedTaskAction.key]?.description
        }
        title={taskActionWindowDetails[selectedTaskAction.key]?.title}
        type="info"
        action={handleSelectOption}
        action_params={selectedTaskAction}
        isOpen={isOpenPopup}
        onOpenChange={onOpenChangePopup}
      />
    </>
  );
};

export default TaskOptionsDropdown;
