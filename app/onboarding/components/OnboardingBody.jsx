import { Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  activeStepAtom,
  applicationTabsAtom,
  backgroundTabsAtom,
  contactTabsAtom,
  employmentTabsAtom,
  selectedTabAtom,
} from "../store/OnboardingStore";
import ApplicationOnboarding from "./ApplicationOnboarding";
import BackgroundOnboarding from "./BackgroundOnboarding";
import ContactOnboarding from "./ContactOnboarding";
import EmploymentOnboarding from "./EmploymentOnboarding";

const OnboardingBody = ({ viewOnly }) => {
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
  const activeStep = useAtomValue(activeStepAtom);

  const applicationTabs = useAtomValue(applicationTabsAtom);
  const backgroundTabs = useAtomValue(backgroundTabsAtom);
  const employmentTabs = useAtomValue(employmentTabsAtom);
  const contactTabs = useAtomValue(contactTabsAtom);

  const onboardingTabs = useMemo(
    () => [
      applicationTabs.map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
      backgroundTabs.map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
      employmentTabs.map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
      contactTabs.map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
    ],
    [applicationTabs, backgroundTabs, contactTabs, employmentTabs]
  );

  const onboardingContent = [
    <ApplicationOnboarding viewOnly={viewOnly} key={0} />,
    <BackgroundOnboarding viewOnly={viewOnly} key={1} />,
    <EmploymentOnboarding viewOnly={viewOnly} key={2} />,
    <ContactOnboarding viewOnly={viewOnly} key={3} />,
  ];

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Tabs
          key="onboarding navigation"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
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
              <Tab
                key={tab.key}
                title={
                  <p className="capitalize">
                    {tab.key === "government_id_information"
                      ? "Government ID Information"
                      : tab.title}
                  </p>
                }
              >
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
