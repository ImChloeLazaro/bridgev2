import { atom } from "jotai";

export const optionsAtom = atom([
  { key: "hide", label: "Hide this notification" },
  { key: "mark", label: "Mark as unread" },
]);

export const showUnreadAtom = atom(false);
export const notificationsOpenAtom = atom(false);
export const notificationTypeAtom = atom("all");
export const selectedNotificationAtom = atom();

export const notificationsAtom = atom([]);

export const fetchNotificationsAtom = atom(null, (get, set) => {
  const notifications = [
    {
      id: 1,
      type: ["mentioned"],
      datetime: "1hr",
      unread: true,
      userProfile: "/Kaylynn Bergson.png",
      title: "Kaylynn Bergson has mentioned you in a post:",
      description:
        "“Another job well done A-Team! Thank you all for your ....” ",
      hidden: false,
    },
    {
      id: 2,
      type: ["greeted"],
      datetime: "2d",
      unread: false,
      userProfile: "/Wilson Herwitz.png",
      title: "Wilson Herwitz  has greeted you in a post:",
      description: "“HAPPIEST BIRTHDAY TO YOU!!! 🎉🎉🎉 🎂XOXO” ",
      hidden: false,
    },
    {
      id: 3,
      type: ["greeted"],
      datetime: "1min",
      unread: true,
      userProfile: "/Madelyn Septimus.png",
      title:
        "Madelyn Septimus, Wilson Herwitz and 3 others greeted you in a post:",
      description:
        "“Jenny has received great feedback from several of her clients for her outstanding contribution to their business with a determined focus on quality. She has been exceeding their expectations daily, and they know they can rely on Jenny to handle the necessary tasks sp they can focus on running their business and serving their clients. To quote Dr. Kim's exact words, \"doing the grunt work of the business in the background\", showing the trust that her clients place on Jenny to handle their needs when they're on vacation or doing other high level tasks for their business. Well done Jenny, a deserving winner of Rex for September.” ",
      hidden: false,
    },
    {
      id: 4,
      type: ["mentioned", "greeted"],
      datetime: "1w",
      unread: false,
      userProfile: "/Aspen Donin.png",
      title:
        "Aspen Donin and Skylar Curtis has greeted and mentioned you in a post:",
      description: (
        <span>
          “Congratulations <strong>@Tatiana Philips!!!</strong>”
        </span>
      ),
      hidden: false,
    },
    {
      id: 5,
      type: ["mentioned", "greeted"],
      datetime: "1w",
      unread: true,
      userProfile: "/Aspen Donin.png",
      title:
        "Aspen Donin and Skylar Curtis has greeted and mentioned you in a post:",
      description: (
        <span>
          “Congratulations <strong>@Tatiana Philips!!!</strong>”
        </span>
      ),
      hidden: false,
    },
    {
      id: 6,
      type: ["mentioned", "greeted"],
      datetime: "1w",
      unread: true,
      userProfile: "/Aspen Donin.png",
      title:
        "Aspen Donin and Skylar Curtis has greeted and mentioned you in a post:",
      description: (
        <span>
          “Congratulations <strong>@Tatiana Philips!!!</strong>”
        </span>
      ),
      hidden: false,
    },
    {
      id: 7,
      type: ["mentioned", "greeted"],
      datetime: "1w",
      unread: false,
      userProfile: "/Aspen Donin.png",
      title:
        "Aspen Donin and Skylar Curtis has greeted and mentioned you in a post:",
      description: (
        <span>
          “Congratulations <strong>@Tatiana Philips!!!</strong>”
        </span>
      ),
      hidden: false,
    },
    {
      id: 8,
      type: ["mentioned", "greeted"],
      datetime: "1w",
      unread: true,
      userProfile: "/Aspen Donin.png",
      title:
        "Aspen Donin and Skylar Curtis has greeted and mentioned you in a post:",
      description: (
        <span>
          “Congratulations <strong>@Tatiana Philips!!!</strong>”
        </span>
      ),
      hidden: false,
    },
  ];
  set(notificationsAtom, notifications);
});

export const unreadCountAtom = atom({
  all: 0,
  mentioned: 0,
  greeted: 0,
});

export const unreadAtom = atom({
  data: [],
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
