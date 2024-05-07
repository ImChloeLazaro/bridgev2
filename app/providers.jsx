// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { requestPermissionNotification } from "./utils/notificationUtils";

export function Providers({ children }) {
  const router = useRouter();

  const promptUserNotification = useCallback(() => {
    if ("Notification" in window) {
      requestPermissionNotification();
    } else {
      console.log("This browser does not support notifications.");
      toast("This browser does not support notifications.");
      return;
    }
  }, []);

  useEffect(() => {
    promptUserNotification();
  }, [promptUserNotification]);

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>{children}</Provider>
    </NextUIProvider>
  );
}
