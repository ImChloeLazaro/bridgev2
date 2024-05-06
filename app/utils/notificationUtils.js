import { toast } from "sonner";

// sends a notification thru websocket
export function sendNotification(data) {
  const { socketRef, action, subs, title, type, description, notified_from, route } = data;
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
}

// updates selected notification/s 
// e.g. 'unread' -> 'read'
// e.g. 'hide' -> 'show'
export function updateNotification(data) {
  const { socketRef, action, id, route } = data;
  socketRef.current.send(JSON.stringify({ action: action, id: id, route }));
}

// checks first if notification permission is granted
// then checks if the browser tab is in focus
// if in focus -> shows toast notification
// else -> shows push notification
export function showNotification(data) {
  const { title, description, body, icon } = data;
  if ("Notification" in window && Notification.permission === "granted") {
    if (document.hidden) {
      console.log("PUSH NOTIF");
      var notification = new Notification(title, {
        body: body,
        icon: icon,
      });
      notification.addEventListener("error", (e) => {
        console.log("ERROR NOTIFICATION", e);
        toast("Push Notification Failed");
      });
      // }
    } else {
      console.log("TOAST NOTIF");
      toast(title, {
        description: description,
      });
    }
  } else {
    console.log("TOAST NOTIF");
    toast("Notifications Request Permission Denied", {
      description: "Please grant permission for notifications to be shown.",
    });
  }
}

// prompts the user to grant permission for notifications to be shown
export function requestPermissionNotification() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted");
      var notification = new Notification("Push Notifications Enabled", {
        body: "You can now see your notifications in the bottom-right side of the screen!",
        icon: "/aretex-logo.png",
        tag: "System Notification",
      });
      notification.addEventListener("error", (e) => {
        console.log("ERROR NOTIFICATION", e);
        toast("Provider Notification Failed");
      });
    }
  });
}
