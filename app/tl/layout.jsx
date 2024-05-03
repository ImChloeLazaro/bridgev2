"use client";
import { useAtomValue } from "jotai";
import OnboardingStatusAlert from "../components/OnboardingStatusAlert";
import NavigationBar from "../navigation/components/NavigationBar";
import dynamic from "next/dynamic";
import { fetchHasOnboardingDataAtom } from "../onboarding/store/OnboardingStore";
import { authenticationAtom } from "../store/AuthenticationStore";

const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
  ssr: false,
});

const TLLayout = ({ children }) => {
  const auth = useAtomValue(authenticationAtom);

  const isHasOnboardingData = useAtomValue(fetchHasOnboardingDataAtom);
  if (auth.isAuthenticated) {
    return (
      <div className="flex h-screen max-h-screen w-screen max-w-screen top-0">
        {/* <Suspense fallback={<Loading />}> */}
        <SideBar />
        {/* </Suspense> */}
        <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden">
          <div className="top-0">
            {isHasOnboardingData && <OnboardingStatusAlert />}
            <NavigationBar />
          </div>
          <div className="flex w-full h-screen max-h-screen overflow-x-hidden overflow-y-auto bg-background ">
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
