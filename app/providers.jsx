// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { authenticationAtom } from "./store/AuthenticationStore";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RegisterProfile } from "./utils/profile";

export function Providers({ children }) {
  const router = useRouter();
  const authvalue = useAtomValue(authenticationAtom)
  const pathname = usePathname();

  useEffect(()=>{
    
    if(authvalue.isAuthenticated && pathname === "/"){
      router.push('/user')
    }
    
    if(!authvalue.isAuthenticated && pathname !== "/"){
      router.push('/')
    }
    return () => RegisterProfile(authvalue)

  },[authvalue, authvalue.isAuthenticated, pathname, router])

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>{children}</Provider>
    </NextUIProvider>
  );
}
