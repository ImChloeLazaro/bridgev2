import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  MdNotifications,
  MdNotificationsActive,
  MdNotificationsNone,
} from "react-icons/md";
import "../../../aws-auth";
import {
  notificationCountAtom,
  notificationsAtom,
  notificationSocketRefAtom,
  notificationSocketURLAtom,
  notificationTypeAtom,
  showUnreadAtom,
  unreadCountAtom,
} from "../../store/NotificationsStore";
import NotificationsFooter from "./NotificationsFooter";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";
import { toast } from "sonner";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const NotificationsDropdown = () => {
  const auth = useAtomValue(authenticationAtom);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = useAtomValue(unreadCountAtom);

  const showUnread = useAtomValue(showUnreadAtom);
  const notificationType = useAtomValue(notificationTypeAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [notificationSocketRef, setNotificationSocketRef] = useAtom(
    notificationSocketRefAtom
  );
  const [notificationCount, setNotificationCount] = useAtom(
    notificationCountAtom
  );
  const notificationSocketURL = useAtomValue(notificationSocketURLAtom);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(notificationSocketURL);
    setNotificationSocketRef(socketRef)

    socketRef.current.onopen = () => {
      console.log("connected");
      console.log(socketRef.current);
      setConnected(true);
      fetchUserAttributes().then((attr) => {
        setUser(attr);
        socketRef.current.send(
          JSON.stringify({
            action: "setdata",
            name: attr.name,
            email: attr.email,
            sub: attr.sub,
            picture: attr.picture,
          })
        );
      });
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.notifications) {
        const filteredNotifications = data.notifications.filter(
          (notification) => notification.sub === auth.sub
        );
        console.log("FILTERED NOTIF ONLY FOR USER", filteredNotifications);

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...filteredNotifications,
        ]);
      }
      if (data.count !== undefined) {
        toast.success("New Notification");
        setNotificationCount(data.count);
      }
    };

    socketRef.current.onclose = () => {
      console.log("disconnected");
      setConnected(false);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <Badge
      content={notificationCount}
      shape="circle"
      isInvisible={notificationCount === 0}
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
            {notificationCount === 0 ? (
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
