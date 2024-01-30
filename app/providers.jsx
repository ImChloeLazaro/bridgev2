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

<<<<<<< HEAD
  process.on('warning', (warning) => {
    console.log(warning.stack);
  });

  useEffect(()=>{  
=======
  useEffect(() => {
    console.log('HELLO WORLD')
    return () =>  RegisterProfile(authvalue)
  }, [])

  useEffect(()=>{
    
>>>>>>> parent of 3052f08 (roles added v3)
    if(authvalue.isAuthenticated && pathname === "/"){
      router.push('/user')
    }
    
    if(!authvalue.isAuthenticated && pathname !== "/"){
      router.push('/')
    }
<<<<<<< HEAD
    return () => RegisterProfile(authvalue)
=======
>>>>>>> parent of 3052f08 (roles added v3)

  },[authvalue.isAuthenticated, pathname, router])

  return (
    <NextUIProvider navigate={router.push}>
      <Provider>
        {children}
      </Provider>
    </NextUIProvider>
  );
}
