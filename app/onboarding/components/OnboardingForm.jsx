import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Button,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import OnboardingBody from "./OnboardingBody";
import OnboardingFooter from "./OnboardingFooter";
import {
  onboardingTabsAtom,
  activeStepAtom,
  onboardingDataAtom,
  selectedStepperAtom,
  stepsAtom,
  selectedTabAtom,
  selectedTabIndexAtom,
  headerClick,
  footerClick,
} from "../store/OnboardingStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

const OnboardingHeader = dynamic(() => import("./OnboardingHeader"), {
  ssr: false,
});

const OnboardingForm = () => {
  const steps = useAtomValue(stepsAtom);
  const onboardingTabs = useAtomValue(onboardingTabsAtom);

  const setSelectedStepper = useSetAtom(selectedStepperAtom);
  const setSelectedTab = useSetAtom(selectedTabAtom);

  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [activeTab, setActiveTab] = useAtom(selectedTabIndexAtom);

  const [header, setHeader] = useAtom(headerClick);
  const [footer, setFooter] = useAtom(footerClick);

  const handleFormAction = (e) => {
    if (header.clicked) {
      if (activeStep <= steps.length - 1) {
        setActiveStep(header.stepper);
        setSelectedStepper(steps[activeStep]);
      }
      setHeader((prev) => ({ ...prev, clicked: false }));
    } else if (footer) {
      if (activeTab < onboardingTabs[activeStep].length - 1) {
        setActiveTab((prev) => {
          const newTabIndex = prev + 1;
          setSelectedTab(onboardingTabs[activeStep][newTabIndex].key);
          return newTabIndex;
        });
      } else {
        if (activeStep < steps.length - 1) {
          setActiveStep((prev) => prev + 1);
          setSelectedStepper(steps[activeStep + 1]);
        }
      }
      setFooter(false);
    }
  };
  return (
    <Card className="w-[850px] h-[760px]">
      <form action={handleFormAction}>
        <CardHeader className="flex justify-center p-1 mt-2">
          <OnboardingHeader />
        </CardHeader>
        <Divider />
        <CardBody className="gap-6 py-3 ">
          <OnboardingBody />
        </CardBody>
        <Divider />
        <CardFooter className="px-8">
          <OnboardingFooter />
        </CardFooter>
      </form>
    </Card>
  );
};

export default OnboardingForm;
