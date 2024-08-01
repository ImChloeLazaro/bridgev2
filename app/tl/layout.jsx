"use client";
import { cn } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import OnboardingStatusAlert from "../components/OnboardingStatusAlert";
import NavigationBar from "../navigation/components/NavigationBar";
import { cmsPathsAtom } from "../navigation/store/NavSideBarStore";
import { authenticationAtom } from "../store/AuthenticationStore";
import { fetchUserAtom, userAtom, userRegisterAtom } from "../store/UserStore";
import { useEffect, useState } from "react";
import { OnBoardingData } from "../onboarding/components/OnBoardingData";

const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
  ssr: false,
});

const TLLayout = ({ children }) => {
  const auth = useAtomValue(authenticationAtom);
  const user = useAtomValue(userAtom);
  const pathname = usePathname();
  const cmsPaths = useAtomValue(cmsPathsAtom);
  const collapseSidebar = cmsPaths.includes(pathname ?? "/");
  const [isUserValid, setIsUserValid] = useState(false);
  const userRegister = useSetAtom(userRegisterAtom);
  const fetchUser = useSetAtom(fetchUserAtom);
  const onBoardData = OnBoardingData();
  useEffect(() => {
    if (auth && auth.sub) {
      const checkRegistration = async () => {
        try {
          if (user && user.sub) {
            setIsUserValid(true);
          } else {
            const result = await userRegister(onBoardData);
            if (result && result?.result !== null) {
              const fetch = await fetchUser();
              setIsUserValid(true);
            }
          }
        } catch (error) {
          setIsUserValid(false);
        }
      };
      checkRegistration();
    }
  }, [auth, user, onBoardData, fetchUser, userRegister]);

  if (auth.isAuthenticated && isUserValid && user !== null) {
    return (
      <div className='flex h-screen max-h-screen w-screen max-w-screen top-0'>
        {/* <Suspense fallback={<Loading />}> */}
        <SideBar />
        {/* </Suspense> */}
        <div
          className={cn(
            `${collapseSidebar && "lg:-ml-6"}`,
            "flex flex-col w-full h-screen max-h-screen overflow-hidden"
          )}
        >
          <div className='top-0'>
            <OnboardingStatusAlert showAlert={user?.hasOnboardingData} />
            <NavigationBar />
          </div>
          <div className='flex w-full h-screen max-h-screen overflow-x-hidden overflow-y-auto bg-background '>
            {/* <Suspense fallback={<Loading />}> */}
            {children}
            {/* </Suspense> */}
          </div>
        </div>
      </div>
    );
  }
};
export default TLLayout;
