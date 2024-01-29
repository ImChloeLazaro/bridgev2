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
  const authvalue = useAtomValue(authenticationAtom)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('HELLO WORLD')
    return () =>  RegisterProfile(authvalue)
  }, [])

  useEffect(()=>{
    
    if(authvalue.isAuthenticated && pathname === "/"){
      router.push('/user')
    }
    
    if(!authvalue.isAuthenticated && pathname !== "/"){
      router.push('/')
    }

  },[authvalue.isAuthenticated, pathname, router])

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>
        {children}
      </Provider>
    </NextUIProvider>
  );
}
