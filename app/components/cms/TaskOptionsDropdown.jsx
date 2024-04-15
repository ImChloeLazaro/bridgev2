import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const TaskOptionsDropdown = ({ trigger, actions, id, task }) => {
  const handleSelectOption = (key) => {
    console.log("OPTIONS FOR TASK CARD");
    console.log("key", key);
    console.log("task.id", id);
    console.log("task", task);
  };
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
          base: [
            "data-[disabled=true]:opacity-100 data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
          ],
          title: "text-base font-normal ",
        }}
      >
        {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TaskOptionsDropdown;
