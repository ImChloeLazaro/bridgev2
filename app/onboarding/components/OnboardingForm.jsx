import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

const OnboardingHeader = dynamic(() => import("./OnboardingHeader"), {
  ssr: false,
});

import OnboardingFooter from "./OnboardingFooter";

import { useAtom, useAtomValue } from "jotai";
import {
  selectedTabAtom,
  applicationOnboardingAtom,
  backgroundOnboardingAtom,
  employmentOnboardingAtom,
  contactOnboardingAtom,
  activeStepAtom,
} from "../store/OnboardingStore";
import ApplicationOnboarding from "./ApplicationOnboarding";
import BackgroundOnboarding from "./BackgroundOnboarding";
import EmploymentOnboarding from "./EmploymentOnboarding";
import ContactOnboarding from "./ContactOnboarding";

const OnboardingForm = () => {
  const applicationOnboarding = useAtomValue(applicationOnboardingAtom);
  const backgroundOnboarding = useAtomValue(backgroundOnboardingAtom);
  const employmentOnboarding = useAtomValue(employmentOnboardingAtom);
  const contactOnboarding = useAtomValue(contactOnboardingAtom);
  const activeStep = useAtomValue(activeStepAtom);

  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);

  const onboardingTabs = useMemo(
    () => [
      Object.keys(applicationOnboarding || {}).map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
      Object.keys(backgroundOnboarding || {}).map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
      Object.keys(employmentOnboarding || {}).map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
      Object.keys(contactOnboarding || {}).map((tab) => {
        return { key: tab, title: tab.replaceAll("_", " ") };
      }),
    ],
    [
      applicationOnboarding,
      backgroundOnboarding,
      contactOnboarding,
      employmentOnboarding,
    ]
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
              aria-label="Notifications Options"
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
                    title={<p className="capitalize">{tab.title}</p>}
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
