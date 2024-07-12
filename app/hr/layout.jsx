"use client";
import { useAtomValue } from "jotai";
import OnboardingStatusAlert from "../components/OnboardingStatusAlert";
import NavigationBar from "../navigation/components/NavigationBar";
import dynamic from "next/dynamic";
import { fetchHasOnboardingDataAtom } from "../onboarding/store/OnboardingStore";
import { authenticationAtom } from "../store/AuthenticationStore";
import { cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { cmsPathsAtom } from "../navigation/store/NavSideBarStore";
import { userAtom } from "../store/UserStore";

const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
  ssr: false,
});

const HRLayout = ({ children }) => {
  const auth = useAtomValue(authenticationAtom);
  const user = useAtomValue(userAtom);
  const pathname = usePathname();

  const cmsPaths = useAtomValue(cmsPathsAtom);
  const collapseSidebar = cmsPaths.includes(pathname ?? "/");

  const isHasOnboardingData = useAtomValue(fetchHasOnboardingDataAtom);
  if (auth.isAuthenticated) {
    return (
      <div className="flex h-screen max-h-screen w-screen max-w-screen top-0">
        {/* <Suspense fallback={<Loading />}> */}
        <SideBar />
        {/* </Suspense> */}
        <div
          className={cn(
            `${collapseSidebar && "lg:-ml-6"}`,
            "flex flex-col w-full h-screen max-h-screen overflow-hidden"
          )}
        >
          <div className="top-0">
            <OnboardingStatusAlert showAlert={user.hasOnboardingData} />
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
export default HRLayout;
