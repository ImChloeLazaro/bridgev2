import { Avatar, Image, Listbox, ListboxItem } from "@nextui-org/react";
import { useAtomValue, useAtom } from "jotai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { VscBlank } from "react-icons/vsc";
import {
  notificationTypeAtom,
  notificationsAtom,
  showUnreadAtom,
  selectedNotificationAtom,
} from "../../store/NotificationsStore";
import { NotificationsOptions } from "./NotificationsOptions";

const NotificationsList = () => {
  const showUnread = useAtomValue(showUnreadAtom);
  const notificationType = useAtomValue(notificationTypeAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const options = [
    { key: "hide", label: "Hide this notification" },
    { key: "mark", label: "Mark as " },
  ];
  const updateOneUnread = (notifications, id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id == id) {
        return { ...notification, unread: false };
      } else {
        return notification;
      }
    });
    setNotifications(updatedNotifications);
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
  const handleListUser = (notifData) => {
    console.log("notif-data: ", notifData);
  };
  return (
    <Listbox
      items={filteredNotifications}
      aria-label="Notifications"
      onAction={(key) => updateOneUnread(notifications, key)}
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
            {"No Notifications right now!"}
          </p>
          <p className="font-medium text-black-default/80">
            {"Come back later!"}
          </p>
        </div>
      }
      itemClasses={{ base: "data-[hover=true]:bg-grey-default" }}
    >
      {(item) => (
        <ListboxItem
          textValue={item.title}
          key={item.id}
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
              condition={item.unread}
              options={options}
              id={item.id}
            />
          }
        >
          <div className="flex gap-4 items-center">
            <div className="flex-col">
              <Avatar src={item.userProfile} size="md" />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
              <p className="font-bold text-xs leading-tight">{item.title}</p>
              <p className="font-medium text-xs truncate">{item.description}</p>
              <p className="font-normal text-xs">{item.datetime}</p>
            </div>
          </div>
        </ListboxItem>
      )}
    </Listbox>
  );
};

export default NotificationsList;
