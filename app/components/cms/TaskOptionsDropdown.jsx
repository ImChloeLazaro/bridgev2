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

const TaskOptionsDropdown = ({ trigger, actions, id, task }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [action, setAction] = useState("mark");

  const handleSelectOption = (key) => {
    setAction(key);
    console.log("OPTIONS FOR TASK CARD");
    console.log("key", key);
    console.log("task.id", id);
    console.log("task", task);
    onOpen();
  };

  const handleConfirmAction = () => {
    console.log("action confirm");
  };
  const handleDenyAction = () => {
    console.log("action deny");
  };

  const choices = {
    confirm: { label: "Yes, I Confirm", choice: handleConfirmAction },
    deny: { label: "Cancel", choice: handleDenyAction },
  };

  const windowDetails = {
    mark: {
      title: "Confirmation",
      icon: <MdInfoOutline size={24} />,
      message: "Do you confirm marking this task done?",
      description: "",
      actions: choices,
    },
    escalate: {
      title: "Confirmation",
      icon: <MdWarningAmber size={24} />,
      message: "Do you confirm escalating this task to a team lead?",
      description: "",
      actions: choices,
    },
    assign: {
      title: "Confirmation",
      icon: <MdInfoOutline size={24} />,
      message: "Do you confirm assigning this task?",
      description: "",
      actions: choices,
    },
    remove: {
      title: "Confirmation",
      icon: <MdWarningAmber size={24} />,
      message: "Do you confirm removing this team member?",
      description: "",
      actions: choices,
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
            className="bg-transparent mb-4"
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
      <ConfirmationWindow
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        data={windowDetails[action]}
      />
    </>
  );
};

export default TaskOptionsDropdown;
