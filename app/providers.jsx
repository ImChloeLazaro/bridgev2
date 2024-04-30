// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

export function Providers({ children }) {
  const router = useRouter();

  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
          // addNotification({
          //   title: "Notifications Enabled",
          //   subtitle: "Notifications are now enabled!",
          //   message: "This is a sample notification.",
          //   theme: "darkblue",
          //   native: true, // when using native, your OS will handle theming.
          // });
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
      <Notifications />
      <Provider>{children}</Provider>
    </NextUIProvider>
  );
}
