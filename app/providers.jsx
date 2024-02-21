// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider, useAtomValue } from "jotai";
import { authenticationAtom } from "./store/AuthenticationStore";
import { userDataAtom} from "./store/UserStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RegisterProfile } from "./utils/profile";

export function Providers({ children }) {
  const router = useRouter();
  // const authvalue = useAtomValue(authenticationAtom)
  // const uservalue = useAtomValue(userDataAtom)
  // const pathname = usePathname();
  // useEffect(()=>{
  //   if(authvalue.isAuthenticated && pathname === "/"){
  //     router.push('/user')
  //   }
    
  //   if(!authvalue.isAuthenticated && pathname !== "/"){
  //     router.push('/')
  //   }
  //   return () => RegisterProfile(uservalue)

  // },[authvalue, authvalue.isAuthenticated, pathname, router, uservalue])

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>
        {children}
        </Provider>
    </NextUIProvider>
  );
}
