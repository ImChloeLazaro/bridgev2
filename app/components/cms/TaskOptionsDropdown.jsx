import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";

const TaskOptionsDropdown = ({ trigger, actions, id, task }) => {
  const handleSelectOption = (key) => {
    console.log("OPTIONS FOR TASK CARD");
    console.log("key", key);
    console.log("task.id", id);
    console.log("task", task);
  };

  const taskOptionsColors = {
    green:"data-[hover=true]:bg-green-default",
    orange:"data-[hover=true]:bg-orange-default",
    red:"data-[hover=true]:bg-red-default",
    blue:"data-[hover=true]:bg-blue-default",
    yellow:"data-[hover=true]:bg-yellow-default",
  }

  return (
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
              item.color === 'yellow' && "data-[hover=true]:text-shadow"
            )}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TaskOptionsDropdown;
