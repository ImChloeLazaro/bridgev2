import { fetchUserListAtom } from "@/app/store/UserStore";
import { SendNotification } from "@/app/user/layout";
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

export const sendNotificationAtom = atom(null, (get, set, update) => {
  const { title, type, description } = update;
  const socketRef = get(notificationSocketRefAtom);

  const subs = ["a8dfd442-2977-499b-a917-a0e226c6c089"];

  socketRef.current.send(
    JSON.stringify({
      action: "notification",
      subs,
      title,
      type,
      description,
      notified_from: get(notifyFromUserAtom),
      route: "set",
    })
  );
});

export const notificationSocketURLAtom = atom(
  "wss://ettpkpovgl.execute-api.ap-southeast-1.amazonaws.com/production/"
);

export const notificationCountAtom = atom(0);
export const notificationSocketRefAtom = atom(null);
export const notifyFromUserAtom = atom({});
export const pageVisibleAtom = atom(true);
