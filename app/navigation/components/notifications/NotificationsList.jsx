import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  Avatar,
  Image,
  Listbox,
  ListboxItem,
  Spinner,
} from "@nextui-org/react";
import {
  compareAsc,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { VscBlank } from "react-icons/vsc";
import {
  notificationCountAtom,
  notificationTypeAtom,
  notificationsAtom,
  showUnreadAtom,
} from "../../store/NotificationsStore";
import NotificationsOptions from "./NotificationsOptions";

const NotificationsList = ({ getNotificationId }) => {
  const showUnread = useAtomValue(showUnreadAtom);
  const auth = useAtomValue(authenticationAtom);
  const notificationType = useAtomValue(notificationTypeAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [notificationCount, setNotificationCount] = useAtom(
    notificationCountAtom
  );

  const options = [
    { key: "hide", label: "Hide this notification" },
    { key: "mark", label: "Mark as " },
  ];

  const handleReadNotification = (id, unread) => {
    if (unread) {
      getNotificationId(`read`, id);
    }
  };

  const handleNotificationDatetime = (datetime) => {
    const notificationDateTime =
      datetime instanceof Date ? datetime : new Date(datetime);

    const daysAgo = differenceInDays(new Date(), notificationDateTime);

    const hrsAgo = differenceInHours(new Date(), notificationDateTime);

    const minsAgo = differenceInMinutes(new Date(), notificationDateTime);

    const dateAgo = format(notificationDateTime, "PP | pp");

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

  const userNotifications = notifications.filter(
    (notification) => notification.sub === auth.sub
  );

  const unreadNotifications = showUnread
    ? userNotifications.filter((notification) => {
        return notification.unread === showUnread;
      })
    : userNotifications;

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

  const sortedNotifications = useMemo(() => {
    return filteredNotifications.sort((a, b) =>
      compareAsc(new Date(b.createdBy), new Date(a.createdBy))
    );
  }, [filteredNotifications]);

  return !notifications?.length ? (
    <div className="w-full h-[20rem] flex justify-center">{<Spinner />}</div>
  ) : (
    <Listbox
      items={sortedNotifications}
      aria-label={"Notifications"}
      className="w-[25.3rem] h-[21.2rem] overflow-y-auto"
      emptyContent={
        <div className="flex flex-col items-center mt-6">
          <Image
            width={180}
            height={180}
            alt={"No Notifications"}
            src={"/no-notifications.png"}
          />
          <p className="font-medium text-black-default/80">
            {"No notifications yet!"}
          </p>
          <p className="font-medium text-black-default/80">
            {"We'll notify you when something arrives"}
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
              getNotificationId={getNotificationId}
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
              <p className="font-bold text-xs leading-tight">{item.title}</p>
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
