import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import CTAButtons from "../../components/CTAButtons";
import { restinsert, updatewithparams } from "../../utils/amplify-rest";
import {
  activeStepAtom,
  onboardingDataAtom,
  selectedStepperAtom,
  stepsAtom,
} from "../store/OnboardingStore";

const OnboardingFooter = ({ allowSubmit = true, onClose }) => {
  const auth = useAtomValue(authenticationAtom);
  const steps = useAtomValue(stepsAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSelectedStepper = useSetAtom(selectedStepperAtom);

  const onboardingData = useAtomValue(onboardingDataAtom);

  // console.log("onboardingData", onboardingData);

  // const handleSubmit = async () => {
  //   const profileresponse = await restinsert("/profile", onboardingData);
  //   const updateonboardingstatus = await updatewithparams("/user", {
  //     sub: auth.sub,
  //   });
  //   const benefitsresponse = await restinsert("/benefits", {
  //     sub: auth.sub,
  //   });
  //   const leaveresponse = await restinsert("/leave", { sub: auth.sub });
  //   console.log("PROFILE RESPONSE", profileresponse);
  //   console.log("ONBOARDING STATUS RESPONSE", updateonboardingstatus);
  //   console.log("BENEFITS RESPONSE", benefitsresponse);
  //   console.log("LEAVE RESPONSE", leaveresponse);
  //   console.log("ONBOARDING FORM SUBMITTED!", onboardingData);
  // };

  const handleBack = () => {
    if (activeStep >= 1) {
      setActiveStep((prev) => prev - 1);
      setSelectedStepper(steps[activeStep]);
    }
  };

  const actionButtons = {
    back: {
      color: "blue",
      label: "Back",
      action: handleBack,
    },
    next: {
      color: activeStep === steps.length - 1 ? "orange" : "blue",
      label: activeStep === steps.length - 1 ? "Submit" : "Next",
      // action: activeStep === steps.length - 1 ? handleSubmit : handleNext,
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
            isDisabled={true}
          />
        )}

        {activeStep === steps.length - 1 && !allowSubmit ? (
          <CTAButtons
            fullWidth={true}
            label={"Close"}
            color={"red"}
            onPress={onClose}
          />
        ) : (
          <CTAButtons
            type={"submit"}
            fullWidth={true}
            label={actionButtons.next.label}
            color={actionButtons.next.color}
            // onPress={actionButtons.next.action}
          />
        )}
      </div>
    </>
  );
};

export default OnboardingFooter;
