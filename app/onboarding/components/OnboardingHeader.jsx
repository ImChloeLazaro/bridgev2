import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { Stepper } from "react-form-stepper";
import { activeStepAtom, stepsAtom } from "../store/OnboardingStore";

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
              borderColor: "rgb(var(--aretex-blue))",
              borderStyle: "solid",
            },
          };
        }
        return {
          label: step.toLocaleUpperCase(),
          style: {
            borderWidth: "3px",
            borderColor: "rgb(var(--aretex-blue))",
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
            activeBgColor: "rgb(var(--aretex-white))",
            activeTextColor: "rgb(var(--aretex-black))",
            completedBgColor: "rgb(var(--aretex-blue))",
            completedTextColor: "rgb(var(--aretex-white))",
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
