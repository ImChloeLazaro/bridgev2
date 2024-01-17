"use client";
import React, { useEffect, useMemo, useState } from "react";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";
import NotificationsFooter from "./NotificationsFooter";

import {
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

import {
  MdNotifications,
  MdNotificationsNone,
  MdNotificationsActive,
} from "react-icons/md";

import { useAtom } from "jotai";
import {
  notificationsAtom,
  notificationsOpenAtom,
  unreadCountAtom,
} from "../../store/NotificationsStore";

const NotificationsDropdown = () => {
  const [notifications] = useAtom(notificationsAtom);
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
