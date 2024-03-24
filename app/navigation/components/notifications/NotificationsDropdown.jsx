import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import {
  MdNotifications,
  MdNotificationsActive,
  MdNotificationsNone,
} from "react-icons/md";
import {
  fetchNotificationsAtom,
  fetchNotificationsCountAtom,
  notificationsAtom,
  unreadCountAtom,
} from "../../store/NotificationsStore";
import NotificationsFooter from "./NotificationsFooter";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";

const NotificationsDropdown = () => {
  const notifications = useAtomValue(notificationsAtom);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = useAtomValue(unreadCountAtom);
  const fetchNotifications = useSetAtom(fetchNotificationsAtom);
  const fetchNotificationsCount = useSetAtom(fetchNotificationsCountAtom);

  useEffect(() => {
    fetchNotifications();
    fetchNotificationsCount();
  }, [fetchNotifications, fetchNotificationsCount]);

  const totalCountNotifications = notifications.filter((notification) => {
    return notification.unread && !notification.hidden;
  }).length;

  return (
    <Badge
      content={unreadCount.all}
      shape="circle"
      isInvisible={unreadCount.all === 0}
      className=""
    >
      <Popover
        placement="bottom-end"
        showArrow={true}
        isOpen={notificationsOpen}
        onOpenChange={(open) => {
          setNotificationsOpen(open);
        }}
      >
        <PopoverTrigger>
          <Button
            aria-label={"Notifications Button"}
            isIconOnly
            className="bg-transparent"
          >
            {unreadCount.all === 0 ? (
              <MdNotificationsNone size={24} color="white" />
            ) : notificationsOpen ? (
              <MdNotifications size={24} color="white" />
            ) : (
              <MdNotificationsActive size={24} color="white" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <div className="pb-2 px-1">
            <NotificationsHeader />
            <NotificationsList />
            <NotificationsFooter />
          </div>
        </PopoverContent>
      </Popover>
    </Badge>
  );
};

export default NotificationsDropdown;
