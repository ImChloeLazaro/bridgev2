import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { notificationsAtom } from "../../store/NotificationsStore";
import { useAtom } from "jotai";

export function NotificationsOptions({ trigger, condition, options, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const unreadHandler = (action, notifications, id) => {
    const updatedNotifications = notifications?.map((notification) => {
      if (action == "mark") {
        if (notification.id == id) {
          return { ...notification, unread: !notification.unread };
        } else {
          return notification;
        }
      } else if (action == "hide") {
        console.log("Hide");
        if (notification.id == id) {
          return { ...notification, hidden: true };
        } else {
          return notification;
        }
      }
    });
    setNotifications(updatedNotifications);
  };

  return (
    <Popover
      placement="bottom-start"
      showArrow
      offset={6}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly className="bg-transparent">
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-44">
        <Listbox
          aria-label="Actions"
          onAction={(key) => unreadHandler(key, notifications, id)}
          itemClasses={{
            base: [
              "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            // title: ["text-base font-normal"],
          }}
        >
          {options.map((option) => {
            if (option.key == "mark") {
              return (
                <ListboxItem key={option.key}>{`${option.label} ${
                  condition ? "read" : "unread"
                }`}</ListboxItem>
              );
            }
            return <ListboxItem key={option.key}>{option.label}</ListboxItem>;
          })}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
