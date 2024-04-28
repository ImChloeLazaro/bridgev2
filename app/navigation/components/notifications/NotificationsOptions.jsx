import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import {
  notificationCountAtom,
  notificationsAtom,
  notificationSocketRefAtom,
} from "../../store/NotificationsStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

const NotificationsOptions = ({
  trigger,
  unread,
  hidden,
  options,
  id,

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [notificationCount, setNotificationCount] = useAtom(
    notificationCountAtom
  );
  const notificationSocketRef = useAtomValue(notificationSocketRefAtom);

  const updateNotificationState = (data, action) => {
    let route;
    switch (action) {
      case "read":
        route = "setread";
        break;
      case "unread":
        route = "setunread";
        break;
      case "hide":
        route = "sethide";
        break;
      case "setshow":
        route = "setshow"; // Use 'setshow' for unhiding
        break;
      default:
        return;
    }

    // Update notification state without marking as read for 'hide' and 'setshow' actions
    const updatedNotifications = notifications.map((notification) => {
      if (notification._id === data) {
        if (action === "read") {
          return { ...notification, unread: false, hidden: false };
        } else if (action === "unread") {
          return { ...notification, unread: true };
        } else if (action === "hide") {
          return { ...notification, hidden: true };
        } else if (action === "setshow") {
          return { ...notification, hidden: false };
        }
      }
      return notification;
    });

    // Send WebSocket message
    notificationSocketRef.current.send(
      JSON.stringify({ action: "notification", id: data, route })
    );

    // Update notification count based on action
    if (action === "read") {
      setNotificationCount((prevCount) => prevCount - 1);
    } else if (action === "unread") {
      setNotificationCount((prevCount) => prevCount + 1);
    }

    // Update notifications
    setNotifications(updatedNotifications);
  };

  const getNotificationId = (proxy, data) => {
    if (["read", "unread", "hide", "setshow"].includes(proxy)) {
      updateNotificationState(data, proxy);
      console.log(proxy, data);
    } else if (proxy === "delete") {
      // Check if the notification to be deleted is unread
      const notificationToDelete = notifications.find(
        (notification) => notification._id === data && notification.unread
      );
      if (notificationToDelete) {
        // If the notification to be deleted is unread, decrease the notification count
        setNotificationCount((prevCount) => prevCount - 1);
      }
      notificationSocketRef.current.send(
        JSON.stringify({ action: "notification", id: data, route: "delete" })
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== data)
      );
    }
  };

  const handleActions = (action, id) => {
    if (action == "mark") {
      getNotificationId(`${unread ? "read" : "unread"}`, id);
    }
    if (action == "hide") {
      getNotificationId(`${hidden ? "setshow" : "hide"}`, id);
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
          // onAction={(key) => handleActions(key, id)}
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
