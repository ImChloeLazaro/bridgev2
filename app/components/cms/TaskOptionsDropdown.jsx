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
