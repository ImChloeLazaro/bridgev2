"use client";
import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import NavigationBar from "../navigation/components/NavigationBar";

import { fetchOnboardingStatus } from "../store/UserStore";
import OnboardingStatusAlert from "../components/OnboardingStatusAlert";
import { authenticationAtom } from "../store/AuthenticationStore";
const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
  ssr: false,
});

const UserLayout = ({ children }) => {
  const auth = useAtomValue(authenticationAtom);
  const onboardingdata = useAtomValue(fetchOnboardingStatus);
  console.log("ONBOARDING DATA", onboardingdata)
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-screen top-0">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="top-0">
          {!onboardingdata && (
            <OnboardingStatusAlert />
          )}
          <NavigationBar />
        </div>
        <div className="flex w-full max-h-screen overflow-y-scroll bg-background ">
          {children}
        </div>
      </div>
    </div>
  );
};
export default UserLayout;
