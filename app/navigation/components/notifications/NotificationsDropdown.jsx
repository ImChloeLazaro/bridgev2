import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import {
  MdNotifications,
  MdNotificationsActive,
  MdNotificationsNone,
} from "react-icons/md";
import {
  notificationsAtom,
  notificationsOpenAtom,
  unreadCountAtom,
} from "../../store/NotificationsStore";
import NotificationsFooter from "./NotificationsFooter";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";

const NotificationsDropdown = () => {
  const notifications = useAtomValue(notificationsAtom);
  const [notificationsOpen, setNotificationsOpen] = useAtom(
    notificationsOpenAtom
  );
  const [unreadCount, setUnreadCount] = useAtom(unreadCountAtom);

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
        onOpenChange={(open) => {
          setNotificationsOpen(!open);
          setUnreadCount({
            all: notifications.filter((notification) => {
              return notification.unread;
            }).length,
            mentioned: notifications
              .filter((notification) => {
                return notification.type.includes("mentioned");
              })
              .filter((notification) => {
                return notification.unread;
              }).length,
            greeted: notifications
              .filter((notification) => {
                return notification.type.includes("greeted");
              })
              .filter((notification) => {
                return notification.unread;
              }).length,
          });
        }}
      >
        <PopoverTrigger>
          <Button isIconOnly className="bg-transparent">
            {notificationsOpen ? (
              <MdNotificationsActive size={24} color="white" />
            ) : unreadCount.all === 0 ? (
              <MdNotificationsNone size={24} color="white" />
            ) : (
              <MdNotifications size={24} color="white" />
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
