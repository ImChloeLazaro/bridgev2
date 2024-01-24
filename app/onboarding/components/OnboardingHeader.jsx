import React, { useMemo } from "react";
import { activeStepAtom, stepsAtom } from "../store/OnboardingStore";

import { Stepper } from "react-form-stepper";

import { useAtomValue } from "jotai";

// ### TODO Changed hard-coded style to tailwind
const OnboardingHeader = () => {
  const activeStep = useAtomValue(activeStepAtom);
  const steps = useAtomValue(stepsAtom);

  const stepsContent = useMemo(
    () =>
      steps.map((step, index) => {
        if (index === activeStep) {
          return {
            label: step.toLocaleUpperCase(),
            style: {
              borderWidth: "3px",
              borderColor: "#32449C",
              borderStyle: "solid",
            },
          };
        }
        return {
          label: step.toLocaleUpperCase(),
          style: {
            borderWidth: "3px",
            borderColor: "#32449C",
          },
        };
      }),
    [activeStep, steps]
  );

  return (
    <div className="w-full flex flex-col items-center">
      <p className="uppercase text-2xl pt-2 mt-3">{"Onboarding Form"}</p>
      <div className="w-full">
        <Stepper
          steps={stepsContent}
          connectorStateColors
          connectorStyleConfig={{
            size: 2,
            activeColor: "#32449C",
            completedColor: "#32449C",
          }}
          styleConfig={{
            size: 24,
            activeBgColor: "#F9F9F9",
            activeTextColor: "#393939",
            completedBgColor: "#32449C",
            completedTextColor: "#F9F9F9",
            circleFontSize: "0.70rem",
            labelFontSize: "0.70rem",
            fontWeight: "700",
          }}
          activeStep={activeStep}
        ></Stepper>
      </div>
    </div>
  );
};

export default OnboardingHeader;
