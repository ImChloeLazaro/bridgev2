import { useMemo } from "react";
import dynamic from "next/dynamic";
import ApplicationOnboarding from "./ApplicationOnboarding";
import BackgroundOnboarding from "./BackgroundOnboarding";
import ContactOnboarding from "./ContactOnboarding";
import EmploymentOnboarding from "./EmploymentOnboarding";
import OnboardingFooter from "./OnboardingFooter";

const OnboardingHeader = dynamic(() => import("./OnboardingHeader"), {
  ssr: false,
});

import {
  applicationTabsAtom,
  backgroundTabsAtom,
  employmentTabsAtom,
  contactTabsAtom,
} from "../store/OnboardingStore";

import { selectedTabAtom, activeStepAtom } from "../store/OnboardingStore";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

import { Tabs, Tab } from "@nextui-org/react";

import { useAtom, useAtomValue } from "jotai";

const OnboardingForm = () => {
  const activeStep = useAtomValue(activeStepAtom);

  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);

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
    <ApplicationOnboarding key={0} />,
    <BackgroundOnboarding key={1} />,
    <EmploymentOnboarding key={2} />,
    <ContactOnboarding key={3} />,
  ];

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(bg.png)" }}
    >
      <Card className="w-[850px] h-[760px]">
        <CardHeader className="flex justify-center p-1 mt-2">
          <OnboardingHeader />
        </CardHeader>
        <Divider />
        <CardBody className="gap-6 py-3 ">
          <div className="flex justify-center ">
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
                  />
                );
              })}
            </Tabs>
          </div>
          <div className="flex gap-y-6 px-6 mb-6 overflow-y-scroll no-scrollbar">
            {onboardingContent[activeStep]}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="px-8">
          <OnboardingFooter />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingForm;
