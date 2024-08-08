import { selectedTaskActionAtom } from "@/app/store/TaskStore";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { fetchUserListAtom } from "@/app/store/UserStore";
import { useEffect } from "react";

const TaskOptionsDropdown = ({
  task_id,
  sla_id,
  setSelectedTask,
  setSelectedTaskID,
  actions,
  trigger,
  isEscalated,
  isOverdue,
  confirmationWindow,
  taskActionWindow,
}) => {
  const setSelectedTaskAction = useSetAtom(selectedTaskActionAtom);
  const fetchUserList = useSetAtom(fetchUserListAtom);

  const taskOptionsColors = {
    green: "data-[hover=true]:bg-green-default",
    orange: "data-[hover=true]:bg-orange-default",
    red: "data-[hover=true]:bg-red-default",
    blue: "data-[hover=true]:bg-blue-default",
    yellow: "data-[hover=true]:bg-yellow-default",
  };

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return (
    <>
      <Dropdown
        onOpenChange={(key) => {
          setSelectedTask(sla_id);
          setSelectedTaskID(task_id);
        }}
      >
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
          aria-label="Task Options Dropdown"
          items={actions}
          itemClasses={{
            base: ["data-[disabled=true]:opacity-100 text-black-default"],
            title: "text-base font-medium ",
          }}
          disabledKeys={
            (isEscalated && ["mark", "escalate"]) || (isOverdue && ["mark"])
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
                        sla_id: sla_id,
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
              //         task_id: sla_id
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
                      ["mark"].includes(item.key) &&
                      "text-black-default/60 cursor-not-allowed"
                    }`,
                    `${
                      ["mark", "escalate"].includes(item.key) && isEscalated
                        ? "text-black-default/60 cursor-not-allowed"
                        : ""
                    }`
                  )}
                  onPress={() => {
                    if (item.key === "assign" || item.key === "remove") {
                      setSelectedTaskAction({
                        key: item.key,
                        status_id: item.status_id,
                        sla_id: sla_id,
                      });
                      taskActionWindow.onOpen();
                    } else {
                      setSelectedTaskAction({
                        key: item.key,
                        status_id: item.status_id,
                        sla_id: sla_id,
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
    </>
  );
};

export default TaskOptionsDropdown;
