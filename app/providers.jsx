// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export function Providers({ children }) {
  const router = useRouter();

  const requestNotificationPermission = useCallback(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      toast("This browser does not support notifications.");
      return;
    }
    if ("Notification" in window) {
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
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission]);

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>{children}</Provider>
    </NextUIProvider>
  );
}
