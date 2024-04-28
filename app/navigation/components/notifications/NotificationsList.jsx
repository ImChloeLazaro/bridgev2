import {
  Avatar,
  Image,
  Listbox,
  ListboxItem,
  Spinner,
} from "@nextui-org/react";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { VscBlank } from "react-icons/vsc";
import {
  notificationTypeAtom,
  notificationsAtom,
  showUnreadAtom,
  selectedNotificationAtom,
  fetchNotificationsCountAtom,
  updateOneUnreadAtom,
  notificationSocketURLAtom,
  notificationCountAtom,
  notificationSocketRefAtom,
} from "../../store/NotificationsStore";
import NotificationsOptions from "./NotificationsOptions";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import "../../../aws-auth";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

const NotificationsList = () => {
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
  // const socketRef = useRef(null);

  const options = [
    { key: "hide", label: "Hide this notification" },
    { key: "mark", label: "Mark as " },
  ];

  console.log(
    "notifications",
    notifications.map((notification) => notification.unread)
  );

  const updateNotificationState = (id, route) => {
    const action_routes = {
      read: "setread",
      unread: "setunread",
      hide: "sethide",
      setshow: "setshow",
    };

    // switch (action) {
    //   case "read":
    //     route = "setread";
    //     break;
    //   case "unread":
    //     route = "setunread";
    //     break;
    //   case "hide":
    //     route = "sethide";
    //     break;
    //   case "setshow":
    //     route = "setshow"; // Use 'setshow' for unhiding
    //     break;
    //   default:
    //     return;
    // }

    console.log("route", route);
    console.log("id", id);
    const index = notifications.findIndex(
      (notification) => notification._id === id
    );
    console.log("index", index);
    console.log("notifications[index]", notifications[index]);

    const selectedNotification = notifications.filter(
      (notification) => notification._id === id
    );
    console.log("selectedNotification", {
      ...selectedNotification[0],
      hidden: true,
    });

    // Update notification state without marking as read for 'hide' and 'setshow' actions
    const updatedNotifications = notifications.map((notification) => {
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
    console.log("updatedNotifications", updatedNotifications);

    const action = action_routes[route];
    // Send WebSocket message
    notificationSocketRef.current.send(
      JSON.stringify({ action: "notification", id: id, action })
    );

    // Update notification count based on action
    if (route === "read") {
      setNotificationCount((prevCount) => prevCount - 1);
    } else if (route === "unread") {
      setNotificationCount((prevCount) => prevCount + 1);
    }

    // Update notifications
    setNotifications(updatedNotifications);
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
      notificationSocketRef.current.send(
        JSON.stringify({ action: "notification", id: id, route: "delete" })
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    }
  };

  const handleReadNotification = (id, unread) => {
    console.log("id", id);
    console.log("unread", unread);
    // if (unread) {
    getNotificationId(`${unread ? "read" : "unread"}`, id);
    // }
  };

  const handleNotificationDatetime = (datetime) => {
    const notificationDateTime =
      datetime instanceof Date ? datetime : new Date(datetime);

    const daysAgo = differenceInDays(new Date(), notificationDateTime);

    const hrsAgo = differenceInHours(new Date(), notificationDateTime);

    const minsAgo = differenceInMinutes(new Date(), notificationDateTime);

    const dateAgo = format(notificationDateTime, "d MMM yyyy");

    const displayedDate =
      daysAgo > 7
        ? dateAgo
        : hrsAgo > 23
        ? `${daysAgo} ${daysAgo > 1 ? "days" : "day"}`
        : minsAgo > 59
        ? `${hrsAgo} ${hrsAgo > 1 ? "hrs" : "hr"}`
        : minsAgo > 0
        ? `${minsAgo} ${minsAgo > 1 ? "mins" : "min"}`
        : "now";
    return displayedDate;
  };

  const unreadNotifications = showUnread
    ? notifications.filter((notification) => {
        return notification.unread === showUnread;
      })
    : notifications;

  const filteredNotifications =
    notificationType === "all"
      ? unreadNotifications.filter((notification) => {
          return !notification.hidden;
        })
      : unreadNotifications.filter((notification) => {
          return (
            notification.type.includes(notificationType) && !notification.hidden
          );
        });

  return !notifications?.length ? (
    <div className="w-full h-[20rem] flex justify-center">{<Spinner />}</div>
  ) : (
    <Listbox
      items={filteredNotifications}
      aria-label={"Notifications"}
      className="w-[25.3rem] h-[21.2rem] overflow-auto no-scrollbar"
      emptyContent={
        <div className="flex flex-col items-center mt-6">
          <Image
            width={180}
            height={180}
            alt={"No Notifications"}
            src={"/NoNotifications.jpg"}
          />
          <p className="font-medium text-black-default/80">
            {"No notifications right now!"}
          </p>
          <p className="font-medium text-black-default/80">
            {"Come back later!"}
          </p>
        </div>
      }
      itemClasses={{ base: "data-[hover=true]:bg-grey-default" }}
    >
      {(item, index) => (
        <ListboxItem
          textValue={item.title}
          key={item._id}
          aria-label={`Notifications ${index}`}
          startContent={
            item.unread ? (
              <div className="text-blue-default">
                <RxDotFilled size={18} />
              </div>
            ) : (
              <div className="text-blue-default">
                <VscBlank size={18} />
              </div>
            )
          }
          endContent={
            <NotificationsOptions
              trigger={<BiDotsVerticalRounded size={16} />}
              unread={item.unread}
              hidden={item.hidden}
              options={options}
              id={item._id}
            />
          }
          onPress={() => handleReadNotification(item._id, item.unread)}
        >
          <div className="flex gap-4 items-center">
            <div className="flex-col">
              <Avatar src={item.notified_from.picture} size="md" />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
              <p className="font-bold text-xs leading-tight">{item._id}</p>
              <p className="font-medium text-xs truncate">{item.description}</p>
              <p className="font-normal text-xs">
                {handleNotificationDatetime(item.createdBy ?? new Date())}
              </p>
            </div>
          </div>
        </ListboxItem>
      )}
    </Listbox>
  );
};

export default NotificationsList;
