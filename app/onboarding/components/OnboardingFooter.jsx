import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import CTAButtons from "../../components/CTAButtons";
import { restinsert, updatewithparams } from "../../utils/amplify-rest";
import {
  activeStepAtom,
  onboardingDataAtom,
  selectedStepperAtom,
  stepsAtom,
  onboardingTabsAtom,
  selectedTabIndexAtom,
  selectedTabAtom,
  footerClick,
} from "../store/OnboardingStore";
import { toast } from "sonner";

const OnboardingFooter = ({ allowSubmit = true, onClose }) => {
  const auth = useAtomValue(authenticationAtom);
  const steps = useAtomValue(stepsAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSelectedStepper = useSetAtom(selectedStepperAtom);

  const onboardingTabs = useAtomValue(onboardingTabsAtom);
  const [activeTab, setActiveTab] = useAtom(selectedTabIndexAtom);
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
  const [click, setClick] = useAtom(footerClick);

  const onboardingData = useAtomValue(onboardingDataAtom);

  const handleSubmit = async () => {
    if (auth && auth.sub) {
      const profileresponse = await restinsert("/profile", onboardingData);
      const updateonboardingstatus = await updatewithparams("/user", {
        sub: auth.sub,
      });
      const benefitsresponse = await restinsert("/benefits", {
        sub: auth.sub,
      });
      const leaveresponse = await restinsert("/leave", { sub: auth.sub });
      toast.success("Successfuly Added Onboarding Information");
    } else {
      toast.error("Invalid Authentication");
    }
  };

  const handleNext = () => {
    setClick(true);
  };

  const handleBack = () => {
    if (activeTab !== 0) {
      setActiveTab((prev) => {
        const newTabIndex = prev - 1;
        setSelectedTab(onboardingTabs[activeStep][newTabIndex].key);
        return newTabIndex;
      });
    } else {
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
      action: activeStep === steps.length - 1 ? handleSubmit : handleNext,
    },
  };
  return (
    <>
      <div className="w-full flex justify-between gap-14 py-4">
        {activeStep === 0 && activeTab === 0 ? (
          <CTAButtons
            fullWidth={true}
            label={""}
            color={"clear"}
            isDisabled={true}
            type={"submit"}
          />
        ) : (
          <CTAButtons
            fullWidth={true}
            label={actionButtons.back.label}
            color={actionButtons.back.color}
            onPress={actionButtons.back.action}
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
            onPress={actionButtons.next.action}
          />
        )}
      </div>
    </>
  );
};

export default OnboardingFooter;
