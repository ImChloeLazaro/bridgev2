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
import { format } from "date-fns";
import { fetchUserAtom } from "@/app/store/UserStore";
import { useState } from "react";
import {
  fetchPersonalInfoAtom,
  personalInfoAtom,
} from "@/app/user/profile/store/ProfileStore";

const OnboardingFooter = ({ allowUpdateInfo = true, onClose }) => {
  const auth = useAtomValue(authenticationAtom);
  const steps = useAtomValue(stepsAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSelectedStepper = useSetAtom(selectedStepperAtom);

  const onboardingTabs = useAtomValue(onboardingTabsAtom);
  const [activeTab, setActiveTab] = useAtom(selectedTabIndexAtom);
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
  const [click, setClick] = useAtom(footerClick);

  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useSetAtom(fetchUserAtom);
  const onboardingData = useAtomValue(onboardingDataAtom);

  const handleSubmit = async () => {
    if (auth && auth.sub) {
      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await restinsert("/profile", onboardingData),
                await updatewithparams("/user", {
                  sub: auth.sub,
                }),
                await restinsert("/benefits", {
                  sub: auth.sub,
                }),
                await restinsert("/leave", { sub: auth.sub }),
                await fetchUser()
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(new Date(), "PPpp")}`,
        loading: "Adding Onboarding Information.",
        success: () => {
          return `Successfully Added Onboarding Information`;
        },
        error: "Error Submitting Onboarding Form",
      });
    } else {
      toast.error("Invalid Authentication");
    }
  };

  const handleUpdate = async () => {
    if (auth && auth.sub) {
      setIsLoading(true);
      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await restinsert("/profile", {
                  ...onboardingData,
                  sub: auth.sub,
                }),
                await fetchUser()
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(new Date(), "PPpp")}`,
        loading: "Adding Onboarding Information.",
        success: () => {
          setIsLoading(false);
          onClose();
          return `Successfully Added Onboarding Information`;
        },
        error: "Error Submitting Onboarding Form",
      });
    } else {
      toast.error("Invalid Authentication");
    }
  };

  const handleNext = () => {
    setClick(true);
    if (!allowUpdateInfo) {
      setActiveStep((prev) => prev + 1);
    }
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
            isDisabled={isLoading}
            fullWidth={true}
            label={actionButtons.back.label}
            color={actionButtons.back.color}
            onPress={actionButtons.back.action}
          />
        )}
        {allowUpdateInfo ? (
          activeStep === steps.length - 1 ? (
            <CTAButtons
              isDisabled={isLoading}
              type={"submit"}
              fullWidth={true}
              label={actionButtons.next.label}
              color={actionButtons.next.color}
              onPress={actionButtons.next.action}
            />
          ) : (
            <CTAButtons
              type={"submit"}
              fullWidth={true}
              label={actionButtons.next.label}
              color={actionButtons.next.color}
              onPress={actionButtons.next.action}
            />
          )
        ) : activeStep === steps.length - 1 ? (
          <CTAButtons
            isDisabled={isLoading}
            fullWidth={true}
            label={"Update Onboarding Information"}
            color={"orange"}
            onPress={handleUpdate}
            // <CTAButtons
            //   fullWidth={true}
            //   label={"Close"}
            //   color={"red"}
            //   onPress={onClose}
            // />
          />
        ) : (
          <CTAButtons
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
