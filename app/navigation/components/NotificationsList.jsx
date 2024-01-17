"use client";
import React, { useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Avatar, Image } from "@nextui-org/react";
import { RxDotFilled } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { VscBlank } from "react-icons/vsc";
import { NotificationsOptions } from "./NotificationsOptions";

import { useAtom } from "jotai";
import {
  notificationsAtom,
  showUnreadAtom,
  notificationTypeAtom,
  selectedNotificationAtom,
} from "../store/NotificationsStore";

const NotificationsList = () => {
  const [showUnread] = useAtom(showUnreadAtom);
  const [notificationType] = useAtom(notificationTypeAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  // const [selectedNotification, setSelectedNotification] = useAtom(
  //   selectedNotificationAtom
  // );
  // const [selectedNotification, setSelectedNotification] = useState(0);

  // const [selected, setSelected] = useState(1);

  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedNotification).join(", "),
  //   [selectedNotification]
  // );

  // const readNotification = (key) => {
  //   console.log(selectedNotification);
  //   setSelected(key);
  //   console.log("SELECTED");
  //   console.log(selected);
  //   setNotifications(() => {
  //     notifications.map((notification) => {
  //       console.log("IN");
  //       console.log(notification);
  //       console.log("UNREAD");
  //       console.log(notification.id);
  //       console.log(selected);
  //       if (notification.id === selected) {
  //         console.log("HERE INSIDE");
  //         return {
  //           ...notification,
  //           unread: false,
  //         };
  //       }
  //       console.log(notification);

  //       return notification;
  //     });
  //   });
  // };

  const options = [
    { key: "hide", label: "Hide this notification" },
    { key: "mark", label: "Mark as " },
  ];

  const unreadNotifications = showUnread
    ? notifications.filter((notification) => {
        return notification.unread === showUnread;
      })
    : notifications;

  const filteredNotifications =
    notificationType === "all"
      ? unreadNotifications
      : unreadNotifications.filter((notification) => {
          return notification.type.includes(notificationType);
        });

  // const filteredNotifications = unreadNotifications.filter((notification) => {
  //   if (notificationType === "all") {
  //     return unreadNotifications;
  //   } else {
  //     return notification.type.includes(notificationType);
  //   }
  // });

  return (
    <Listbox
      items={filteredNotifications}
      aria-label="Notifications"
      onAction={(key) => console.log(key)}
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
            No Notifications right now!
          </p>
          <p className="font-medium text-black-default/80">Come back later!</p>
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
