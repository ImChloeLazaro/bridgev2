"use client";
import { useAtomValue } from "jotai";
import { Suspense } from "react";
import OnboardingStatusAlert from "../components/OnboardingStatusAlert";
import NavigationBar from "../navigation/components/NavigationBar";
import SideBar from "../navigation/components/SideBar";
import DrawerSideBar from "../navigation/components/DrawerSideBar";
import { fetchHasOnboardingDataAtom } from "../onboarding/store/OnboardingStore";
import { authenticationAtom } from "../store/AuthenticationStore";
// import Loading from "./loading";

const UserLayout = ({ children }) => {
  const auth = useAtomValue(authenticationAtom);

  const isHasOnboardingData = useAtomValue(fetchHasOnboardingDataAtom);
  if (auth.isAuthenticated) {
    return (
      <div className='flex h-screen max-h-screen w-screen max-w-screen top-0'>
        {/* <Suspense fallback={<Loading />}> */}
        <SideBar />
        <DrawerSideBar />
        {/* </Suspense> */}
        <div className='flex flex-col w-full h-screen max-h-screen overflow-hidden'>
          <div className='top-0'>
            {!isHasOnboardingData && <OnboardingStatusAlert />}
            <NavigationBar />
          </div>
          <div className='flex max-w-full h-screen max-h-screen overflow-x-hidden overflow-y-auto bg-background '>
            {/* <Suspense fallback={<Loading />}> */}
            {children}
            {/* </Suspense> */}
          </div>
        </div>
      </div>
    );
  }
};
export default UserLayout;
