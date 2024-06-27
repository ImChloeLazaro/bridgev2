import { atom } from "jotai";

export const notificationsAtom = atom([]);

export const showUnreadAtom = atom(false);
export const notificationTypeAtom = atom("all");
export const selectedNotificationAtom = atom();

export const selectedNotificationFilterKeysAtom = atom(new Set(["all"]));
export const notificationFilterKeysAtom = atom([
  {
    label: "All",
    value: "all",
  },
  {
    label: "Mentioned",
    value: "mentioned",
  },
  {
    label: "Greeted",
    value: "greeted",
  },
  {
    label: "Hidden",
    value: "hidden",
  },
]);

export const notificationsTabsAtom = atom((get) => [
  {
    key: "all",
    title: "All",
    count: 0,
  },
  {
    key: "mentioned",
    title: "Mentioned",
    count: 0,
  },
  {
    key: "greeted",
    title: "Greeted",
    count: 0,
  },
]);

export const notificationSocketURLAtom = atom(
  "wss://ettpkpovgl.execute-api.ap-southeast-1.amazonaws.com/production/"
);

export const notificationCountAtom = atom(0);
export const notificationSocketRefAtom = atom(null);
export const notifyFromUserAtom = atom({});
export const pageVisibleAtom = atom(true);
