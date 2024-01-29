"use client";
import NavigationBar from "../navigation/components/NavigationBar";
import dynamic from "next/dynamic";

import { useAtomValue } from "jotai";
import { userAtom, fetchOnboardingStatus } from "../store/UserStore";

import OnboardingHeader from "../components/OnboardingHeader";
const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
  ssr: false,
});

const UserLayout = ({ children }) => {
  const user = useAtomValue(userAtom);
  const onboardingdata = useAtomValue(fetchOnboardingStatus)
  return (
    user.isAuthenticated && (
      <div className="flex h-screen max-h-screen top-0">
        <SideBar />
        <div className="flex flex-col w-full">
          <div className="top-0">
            {!onboardingdata && <OnboardingHeader/>}
            <NavigationBar />
          </div>
          <div className="flex w-full max-h-screen overflow-y-scroll bg-background no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    )
  );
};
export default UserLayout;
