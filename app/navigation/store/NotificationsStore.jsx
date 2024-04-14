import { atom } from "jotai";

export const notificationsAtom = atom([]);

export const showUnreadAtom = atom(false);
export const notificationTypeAtom = atom("all");
export const selectedNotificationAtom = atom();

export const unreadCountAtom = atom({
  all: 0,
  mentioned: 0,
  greeted: 0,
});

export const updateOneUnreadAtom = atom(null, (get, set, update) => {
  const { id } = update;
  
  const oneUnreadNotification = get(notificationsAtom).map((notification) => {
    if (notification.id == id) {
      return { ...notification, unread: false };
    } else {
      return notification;
    }
  });
  set(notificationsAtom, oneUnreadNotification);
});

export const updateAllUnreadAtom = atom(null, (get, set, update) => {
  const allUnreadNotifications = get(notificationsAtom).map((notification) => {
    return { ...notification, unread: false };
  });
  set(notificationsAtom, allUnreadNotifications);
});

export const notificationsTabsAtom = atom((get) => [
  {
    key: "all",
    title: "All",
    count: get(unreadCountAtom).all,
  },
  {
    key: "mentioned",
    title: "Mentioned",
    count: get(unreadCountAtom).mentioned,
  },
  {
    key: "greeted",
    title: "Greeted",
    count: get(unreadCountAtom).greeted,
  },
]);

export const fetchNotificationsCountAtom = atom(null, (get, set, update) => {
  const unreadNotifications = {
    all: get(notificationsAtom).filter((notification) => {
      return notification.unread && !notification.hidden;
    }).length,
    mentioned: get(notificationsAtom).filter((notification) => {
      return (
        notification.type.includes("mentioned") &&
        notification.unread &&
        !notification.hidden
      );
    }).length,
    greeted: get(notificationsAtom).filter((notification) => {
      return (
        notification.type.includes("greeted") &&
        notification.unread &&
        !notification.hidden
      );
    }).length,
  };
  set(unreadCountAtom, unreadNotifications);
});

export const fetchNotificationsAtom = atom(null, (get, set) => {
  const notifications = [
    {
      id: 1,
      type: ["mentioned"],
      datetime: "1hr",
      unread: true,
      userProfile: "/Kaylynn Bergson.png",
      title: "Kaylynn Bergson has mentioned you in a post:",
      description: "“Another job well done A-Team! Thank you all for your ....” ",
      hidden: false,
    }
  ];
  set(notificationsAtom, notifications);
});
