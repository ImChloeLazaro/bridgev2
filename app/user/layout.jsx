"use client";
import { useAtomValue } from "jotai";
import { Suspense } from "react";
import OnboardingStatusAlert from "../components/OnboardingStatusAlert";
import NavigationBar from "../navigation/components/NavigationBar";
import SideBar from "../navigation/components/SideBar";
import { fetchHasOnboardingDataAtom } from "../onboarding/store/OnboardingStore";
import { authenticationAtom } from "../store/AuthenticationStore";
import Loading from "./loading";

const UserLayout = ({ children }) => {
  const auth = useAtomValue(authenticationAtom);

  const isHasOnboardingData = useAtomValue(fetchHasOnboardingDataAtom);
  if (auth.isAuthenticated) {
    return (
      <div className="flex h-screen max-h-screen w-screen max-w-screen top-0">
        <Suspense fallback={<Loading />}>
          <SideBar />
        </Suspense>
        <div className="flex flex-col w-full">
          <div className="top-0">
            {!isHasOnboardingData && <OnboardingStatusAlert />}
            <NavigationBar />
          </div>
          <div className="flex max-w-full max-h-fit overflow-y-scroll bg-background ">
            {children}
          </div>
        </div>
      </div>
    );
  }
};
export default UserLayout;
