import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
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
} from "../store/OnboardingStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

const OnboardingHeader = dynamic(() => import("./OnboardingHeader"), {
  ssr: false,
});

const OnboardingForm = () => {
  const steps = useAtomValue(stepsAtom);
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const setSelectedStepper = useSetAtom(selectedStepperAtom);

  const handleFormAction = (e) => {
    console.log("FORM ACTION", e);

    if (activeStep <= steps.length - 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSelectedStepper(steps[activeStep]);
    }

    return false;
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
