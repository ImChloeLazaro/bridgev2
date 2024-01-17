// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Provider } from "jotai";

export function Providers({ children }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>
        {children}
      </Provider>
    </NextUIProvider>
  );
}
