import { toast } from "sonner";
import { useCallback } from "react";

export const sendNotification = ({ data }) => {
  const { action, subs, title, type, description, notified_from, route } = data;
  socketRef.current.send(
    JSON.stringify({
      action: action,
      subs: subs,
      title: title,
      type: type,
      description: description,
      notified_from: notified_from,
      route: route,
    })
  );
};

export const updateNotification = ({ data }) => {
  const { socketRef, action, id, route } = data;
  socketRef.current.send(JSON.stringify({ action: action, id: id, route }));
};

export const showNotification = ({ data }) => {
  if (document.hidden) {
    // if (
    //   "Notification" in window &&
    //   Notification.permission === "granted"
    // ) {
    console.log("PUSH NOTIF");
    var notification = new Notification(
      "NOTIFICATION PUSH DROPDOWN NOTIFICATION",
      {
        body: "notification description",
        icon: "/defaulthead.png",
      }
    );
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    .addEventListener("error", (e) => {
      console.log("ERROR NOTIFICATION", e);
      toast("Push Notification Failed");
    });
    // }
  } else {
    console.log("TOAST NOTIF");
    toast("DATA CHANGE IN NOTIFICATION", {
      description: "detected changes in data when new notification is received",
    });
  }
};
