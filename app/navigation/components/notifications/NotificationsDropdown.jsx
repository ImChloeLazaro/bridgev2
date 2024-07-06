import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { fetchUserListAtom, userListAtom } from "@/app/store/UserStore";
import { showNotification } from "@/app/utils/notificationUtils";
import {
  Badge,
  Button,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  MdNotifications,
  MdNotificationsActive,
  MdNotificationsNone,
} from "react-icons/md";
import useSound from "use-sound";
import "../../../aws-auth";
import {
  notificationsAtom,
  notificationSocketRefAtom,
  notificationSocketURLAtom,
  notificationTypeAtom,
  pageVisibleAtom,
  showUnreadAtom
} from "../../store/NotificationsStore";
import NotificationsFooter from "./NotificationsFooter";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsHistory from "./NotificationsHistory";
import NotificationsList from "./NotificationsList";

// @refresh reset

const NotificationsDropdown = () => {
  const [play] = useSound("/notification_chime_2.mp3", { volume: 0.9 });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [notificationSocketRef, setNotificationSocketRef] = useAtom(
    notificationSocketRefAtom
  );
  const [notificationCount, setNotificationCount] = useState(0);
  const notificationSocketURL = useAtomValue(notificationSocketURLAtom);
  const notificationType = useAtomValue(notificationTypeAtom);
  const showUnread = useAtomValue(showUnreadAtom);
  const auth = useAtomValue(authenticationAtom);

  const list = useAtomValue(userListAtom);
  const fetchUserList = useSetAtom(fetchUserListAtom);

  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({});
  const socketRef = useRef(null);

  const [pageVisible, setPageVisible] = useAtom(pageVisibleAtom);

  document.addEventListener("visibilitychange", () => {
    setPageVisible(document.visibilityState === "hidden" ? true : false);
  });

  useEffect(() => {
    fetchUserList();
    socketRef.current = new WebSocket(notificationSocketURL);
    setNotificationSocketRef(socketRef);

    socketRef.current.onopen = () => {
      // console.log("connected");
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
      if (data.notifications) {
        setNotifications((prevNotifications) => {
          return [...prevNotifications, ...data.notifications];
        });
      }
      if (data.count !== undefined) {
        // shows the latest notification on page load to stimulate the user to look at their notifications
        const notHiddenNotifications = data.notifications.filter(
          (notification) => !notification.hidden
        );
        const sortedNotifications = notHiddenNotifications.sort(
          (a, b) => new Date(b.createdBy) - new Date(a.createdBy)
        );

        if (sortedNotifications[0].unread) {
          showNotification({
            sound: play,
            title: sortedNotifications[0].title,
            description: sortedNotifications[0].description,
            body: sortedNotifications[0].description,
            icon: sortedNotifications[0].notified_from.picture,
          });
        }

        setNotificationCount(data.count);
        // if (data.count > 10) {
        //   setNotificationCount(10);
        // }
      }
    };

    socketRef.current.onclose = () => {
      // console.log("disconnected");
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
    <>
      <Badge
        content={notificationCount}
        shape="circle"
        isInvisible={notificationCount === 0}
        classNames={{
          badge: cn(
            "px-1 text-xs",
            "font-medium text-white-default bg-blue-default",
            "lg:font-bold lg:text-black-darker lg:bg-grey-default"
          ),
        }}
      >
        <Popover
          placement="bottom-end"
          showArrow={true}
          isOpen={notificationsOpen}
          onOpenChange={(open) => {
            // play();
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
                <MdNotificationsNone
                  size={24}
                  fill="currentColor"
                  className="text-orange-default lg:text-white-default"
                />
              ) : notificationsOpen ? (
                <MdNotifications
                  size={24}
                  fill="currentColor"
                  className="text-orange-default lg:text-white-default"
                />
              ) : (
                <MdNotificationsActive
                  size={24}
                  fill="currentColor"
                  className="text-orange-default lg:text-white-default"
                />
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0">
            <div className="pb-2 px-1">
              <NotificationsHeader
                onOpen={onOpen}
                setNotificationsOpen={setNotificationsOpen}
              />
              <NotificationsList getNotificationId={getNotificationId} />
              <NotificationsFooter
                onOpen={onOpen}
                notificationCount={notificationCount}
                markAllAsRead={markAllAsRead}
                setNotificationsOpen={setNotificationsOpen}
              />
            </div>
          </PopoverContent>
        </Popover>
      </Badge>
      <NotificationsHistory isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default NotificationsDropdown;
