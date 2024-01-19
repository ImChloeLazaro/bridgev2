import React from "react";
import CTAButtons from "../../components/CTAButtons";

import { useAtomValue, useSetAtom } from "jotai";
import {
  activeStepAtom,
  stepsAtom,
  selectedStepperAtom,
  applicationOnboardingAtom,
  backgroundOnboardingAtom,
  employmentOnboardingAtom,
  contactOnboardingAtom,
} from "../store/OnboardingStore";

const OnboardingFooter = () => {
  const steps = useAtomValue(stepsAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSelectedStepper = useSetAtom(selectedStepperAtom);

  const applicationOnboarding = useAtomValue(applicationOnboardingAtom);
  const backgroundOnboarding = useAtomValue(backgroundOnboardingAtom);
  const employmentOnboarding = useAtomValue(employmentOnboardingAtom);
  const contactOnboarding = useAtomValue(contactOnboardingAtom);

  const handleSubmit = () => {
    console.log(applicationOnboarding);
    console.log(backgroundOnboarding);
    console.log(employmentOnboarding);
    console.log(contactOnboarding);
  };

  const handleNext = () => {
    console.log("NEXT");
    console.log(steps[activeStep]);

    if (activeStep <= steps.length - 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSelectedStepper(steps[activeStep]);
    }
  };

  const handleBack = () => {
    console.log("BACK");
    console.log(steps[activeStep]);

    if (activeStep >= 1) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setSelectedStepper(steps[activeStep]);
    }
  };

  const actionButtons = {
    back: { color: "blue", label: "Back", action: handleBack },
    next: {
      color: "blue",
      label: activeStep === steps.length - 1 ? "Submit" : "Next",
      action: activeStep === steps.length - 1 ? handleSubmit : handleNext,
    },
  };
  return (
    <>
      <div className="w-full flex justify-between gap-14 py-4">
        {activeStep != 0 ? (
          <CTAButtons
            fullWidth={true}
            label={actionButtons.back.label}
            color={actionButtons.back.color}
            onPress={actionButtons.back.action}
            isDisabled={activeStep === 0}
          />
        ) : (
          <CTAButtons
            fullWidth={true}
            label={""}
            color={"clear"}
            isDisabled={activeStep === 0}
          />
        )}

        <CTAButtons
          fullWidth={true}
          label={actionButtons.next.label}
          color={actionButtons.next.color}
          onPress={actionButtons.next.action}
        />
      </div>
    </>
  );
};

export default OnboardingFooter;
