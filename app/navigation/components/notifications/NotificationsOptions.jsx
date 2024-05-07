import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

const NotificationsOptions = ({
  getNotificationId,
  trigger,
  unread,
  hidden,
  options,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleActions = (action, id) => {
    if (action == "mark") {
      getNotificationId(`${unread ? "read" : "unread"}`, id);
    }
    if (action == "hide") {
      getNotificationId(`${hidden ? "setshow" : "hide"}`, id);
      toast.info(`Notification Hidden`, {
        description: `You can view hidden notifications in the notification history`,
      });
    }

    setIsOpen(false);
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
          items={options}
          aria-label="Actions"
          onAction={(key) => handleActions(key, id)}
          itemClasses={{
            base: [
              "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            // title: ["text-base font-normal"],
          }}
        >
          {(item) => {
            if (item.key == "mark") {
              return (
                <ListboxItem key={item.key}>{`${item.label} ${
                  unread ? "read" : "unread"
                }`}</ListboxItem>
              );
            }
            return <ListboxItem key={item.key}>{item.label}</ListboxItem>;
          }}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsOptions;
