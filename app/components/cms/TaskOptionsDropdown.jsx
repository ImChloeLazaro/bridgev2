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
import { useSetAtom } from "jotai";
import { toast } from "sonner";
import { format } from "date-fns";

const TaskOptionsDropdown = ({
  id,
  tasksFromSelectedClient,
  actions,
  trigger,
  setIsEscalated,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);

  const handleSelectOption = (key) => {
    if (key === "forReview" || key === "done") {
      const updateSelectedTask = tasksFromSelectedClient[0].sla.map((task) => {
        if (task._id === id) {
          return { ...task, status: key };
        }
        return task;
      });
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
            key === "done" ? "Task Completed" : "Task Marked for Review"
          }: ${selectedTask.name}`;
        },

        error: "Error Updating Task Status",
      });
    }

    if (key === "escalate") {
      console.log("glow red task");
      // setIsEscalated(true);
    }

    onOpen();
  };

  // const handleConfirmAction = () => {
  //   console.log("action confirm");
  // };
  // const handleDenyAction = () => {
  //   console.log("action deny");
  // };

  // const choices = {
  //   confirm: { label: "Yes, I Confirm", choice: handleConfirmAction },
  //   deny: { label: "Cancel", choice: handleDenyAction },
  // };

  // const windowDetails = {
  //   mark: {
  //     title: "Confirmation",
  //     icon: <MdInfoOutline size={24} />,
  //     message: "Do you confirm marking this task done?",
  //     description: "",
  //     actions: choices,
  //   },
  //   escalate: {
  //     title: "Confirmation",
  //     icon: <MdWarningAmber size={24} />,
  //     message: "Do you confirm escalating this task to a team lead?",
  //     description: "",
  //     actions: choices,
  //   },
  //   assign: {
  //     title: "Confirmation",
  //     icon: <MdInfoOutline size={24} />,
  //     message: "Do you confirm assigning this task?",
  //     description: "",
  //     actions: choices,
  //   },
  //   remove: {
  //     title: "Confirmation",
  //     icon: <MdWarningAmber size={24} />,
  //     message: "Do you confirm removing this team member?",
  //     description: "",
  //     actions: choices,
  //   },
  // };

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
          onAction={(key) => handleSelectOption(key)}
          items={actions}
          itemClasses={{
            base: ["data-[disabled=true]:opacity-100 text-black-default"],
            title: "text-base font-medium ",
          }}
        >
          {(item) => (
            <DropdownItem
              startContent={item.icon}
              key={item.key}
              className={cn(
                taskOptionsColors[item.color],
                "data-[hover=true]:text-white-default",
                item.color === "yellow" && "data-[hover=true]:text-shadow"
              )}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {/* <ConfirmationWindow
              message="
                Make sure the details of the task is correct.
                You cannot edit this later.
                "
              title="Create this Task?"
              accept={{
                label: "Create Task",
                icon: <MdPostAdd size={24} />,
                action: handleAddTask,
              }}
              type="info"
              isOpen={isOpenPopup}
              onOpenChange={onOpenChangePopup}
              onCloseParent={onClose}
            /> */}
    </>
  );
};

export default TaskOptionsDropdown;
