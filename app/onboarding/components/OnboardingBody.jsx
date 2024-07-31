import { Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  activeStepAtom,
  fetchOnboardingDataAtom,
  onboardingTabsAtom,
  selectedTabAtom,
  selectedTabIndexAtom,
} from "../store/OnboardingStore";
import ApplicationOnboarding from "./ApplicationOnboarding";
import BackgroundOnboarding from "./BackgroundOnboarding";
import ContactOnboarding from "./ContactOnboarding";
import EmploymentOnboarding from "./EmploymentOnboarding";
import { personalInfoAtom } from "@/app/user/profile/store/ProfileStore";
import { useEffect } from "react";

const OnboardingBody = ({ viewOnly }) => {
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const [activeTab, setActiveTab] = useAtom(selectedTabIndexAtom);
  const onboardingTabs = useAtomValue(onboardingTabsAtom);
  const userInfo = useAtomValue(personalInfoAtom);
  const fetchOnBoardingData = useSetAtom(fetchOnboardingDataAtom);

  // useEffect(() => {
  //   if (userInfo && userInfo !== null) {
  //     fetchOnBoardingData();
  //   }
  // }, [userInfo, fetchOnBoardingData]);

  const onboardingContent = [
    <ApplicationOnboarding viewOnly={viewOnly} key={0} />,
    <BackgroundOnboarding viewOnly={viewOnly} key={1} />,
    <EmploymentOnboarding viewOnly={viewOnly} key={2} />,
    <ContactOnboarding viewOnly={viewOnly} key={3} />,
  ];

  const handleSelectionChange = (selectedKey) => {
    const tabIndex = onboardingTabs[activeStep].findIndex(
      (tab) => tab.key === selectedKey
    );

    setSelectedTab(onboardingTabs[activeStep][tabIndex].key);
    setActiveTab(tabIndex);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Tabs
          key="onboarding navigation"
          selectedKey={selectedTab}
          onSelectionChange={handleSelectionChange}
          aria-label="Onboarding Navigation"
          variant="underlined"
          classNames={{
            base: "pl-4 py-0 ",
            tabList: "gap-8 w-full relative rounded-none p-0 ",
            tab: "max-w-fit px-0 h-12 ",
            tabContent:
              "group-data-[selected=true]:text-blue-default group-data-[selected=true]:font-extrabold font-medium text-base text-black-default/90",
            cursor: "w-full bg-blue-default",
          }}
        >
          {onboardingTabs[activeStep]?.map((tab) => {
            return (
              <Tab key={tab.key} title={tab.title}>
                <div className="h-80 flex gap-y-6 px-5 mb-6 overflow-y-scroll">
                  {onboardingContent[activeStep]}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

export default OnboardingBody;
