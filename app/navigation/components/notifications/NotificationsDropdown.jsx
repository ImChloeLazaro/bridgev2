import { authenticationAtom } from "@/app/store/AuthenticationStore";
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
  notifyFromUserAtom,
} from "../../store/NotificationsStore";
import NotificationsFooter from "./NotificationsFooter";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";

const NotificationsDropdown = () => {
  const auth = useAtomValue(authenticationAtom);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [notificationSocketRef, setNotificationSocketRef] = useAtom(
    notificationSocketRefAtom
  );
  const [notificationCount, setNotificationCount] = useAtom(
    notificationCountAtom
  );
  const notificationSocketURL = useAtomValue(notificationSocketURLAtom);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useAtom(notifyFromUserAtom);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(notificationSocketURL);
    setNotificationSocketRef(socketRef);

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
      console.log("NOTIFICATION RECEIVED");
      if (data.notifications) {
        const filteredNotifications = data.notifications.filter(
          (notification) => notification.sub === auth.sub
        );
        console.log("FILTERED NOTIF ONLY FOR USER", filteredNotifications);

        setNotifications((prevNotifications) => {
          return [...prevNotifications, ...filteredNotifications];
        });
      }
      if (data.count !== undefined) {
        if (data.count > 10) {
          setNotificationCount(10);
        } else {
          setNotificationCount(data.count);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAllAsRead = () => {
    notifications.forEach((notification) => {
      console.log(notification._id);
      socketRef.current.send(
        JSON.stringify({
          action: "notification",
          id: notification._id,
          route: "setread",
        })
      );
    });

    setNotificationCount(0);

    // Update notifications
    setNotifications((prev) => {
      return prev.map((notification) => {
        return { ...notification, unread: false, hidden: false };
      });
    });
  };

  const updateNotificationState = (id, route) => {
    const action_routes = {
      read: "setread",
      unread: "setunread",
      hide: "sethide",
      setshow: "setshow",
    };

    const action = action_routes[route];
    // Send WebSocket message
    socketRef.current.send(
      JSON.stringify({ action: "notification", id: id, route: action })
    );

    // Update notification count based on action
    if (route === "read") {
      setNotificationCount((prevCount) => {
        if (prevCount - 1 < 0) {
          return prevCount - 0;
        } else {
          return prevCount - 1;
        }
      });
    } else if (route === "unread") {
      setNotificationCount((prevCount) => prevCount + 1);
    }

    // Update notifications
    setNotifications((prev) => {
      return prev.map((notification) => {
        if (notification._id === id) {
          if (route === "read") {
            return { ...notification, unread: false, hidden: false };
          }
          if (route === "unread") {
            return { ...notification, unread: true };
          }
          if (route === "hide") {
            return { ...notification, hidden: true };
          }
          if (route === "setshow") {
            return { ...notification, hidden: false };
          }
        }
        return notification;
      });
    });
  };

  const getNotificationId = (route, id) => {
    if (["read", "unread", "hide", "setshow"].includes(route)) {
      updateNotificationState(id, route);
    } else if (route === "delete") {
      // Check if the notification to be deleted is unread
      const notificationToDelete = notifications.find(
        (notification) => notification._id === id && notification.unread
      );
      if (notificationToDelete) {
        // If the notification to be deleted is unread, decrease the notification count
        setNotificationCount((prevCount) => prevCount - 1);
      }
      socketRef.current.send(
        JSON.stringify({ action: "notification", id: id, route: "delete" })
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    }
  };

  return (
    <Badge
      content={notificationCount}
      shape="circle"
      isInvisible={notificationCount === 0}
      className=""
    >
      <Popover
      style={{
        zIndex: 10,
      }}
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
            <NotificationsList
              updateNotificationState={updateNotificationState}
              getNotificationId={getNotificationId}
            />
            <NotificationsFooter
              markAllAsRead={markAllAsRead}
            />
          </div>
        </PopoverContent>
      </Popover>
    </Badge>
  );
};

export default NotificationsDropdown;
