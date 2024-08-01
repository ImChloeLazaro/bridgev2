import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { Stepper } from "react-form-stepper";
import {
  activeStepAtom,
  stepsAtom,
  selectedTabIndexAtom,
  headerClick,
} from "../store/OnboardingStore";

// FEAT: Connect this component to tailwind color system for easier styling
// UPDATE: Adjust colors depending on the status of each step

const OnboardingHeader = () => {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [click, setClick] = useAtom(headerClick);
  const steps = useAtomValue(stepsAtom);

  const stepsContent = useMemo(
    () =>
      steps.map((step, index) => {
        if (index === activeStep) {
          return {
            label: step.toLocaleUpperCase(),
            style: {
              backgroundColor: `#32449C`,
              color: `#393939 `,
              borderWidth: "3px",
              borderColor: `#32449C`,
              borderStyle: "solid",
            },
          };
        } else {
          return {
            active: true,
            label: step.toLocaleUpperCase(),
            style: {
              backgroundColor: `#565656`,
              borderWidth: "3px",
              borderColor: `#393939`,
              borderStyle: "solid",
            },
            onClick: () => {
              setClick({ clicked: true, stepper: index });
            },
          };
        }
      }),
    [activeStep, setClick, steps]
  );

  return (
    <div className="w-full flex flex-col items-center">
      <p className="font-semibold text-2xl pt-2 mt-3">{"ONBOARDING FORM"}</p>
      <div className="w-full">
        <Stepper
          steps={stepsContent}
          connectorStateColors
          connectorStyleConfig={{
            size: 2,
            activeColor: `#393939`,
            completedColor: `#32449C`,
          }}
          styleConfig={{
            size: 24,
            activeBgColor: `#F9F9F9`,
            // activeTextColor: `#F9F9F9`,
            completedBgColor: `#32449C`,
            completedTextColor: `#F9F9F9`,
            circleFontSize: "0.70rem",
            labelFontSize: "0.70rem",
            fontWeight: "700",
          }}
          activeStep={activeStep}
          // stepClassName={"!bg-blue-default"}
          className="text-clip"
        />
      </div>
    </div>
  );
};

export default OnboardingHeader;
