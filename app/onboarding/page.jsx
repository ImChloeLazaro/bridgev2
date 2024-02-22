"use client";
import { useAtomValue } from "jotai";
import OnboardingAlreadyDone from "./components/OnboardingAlreadyDone";
import OnboardingForm from "./components/OnboardingForm";
import { isSubmittedOnboardingFormAtom } from "./store/OnboardingStore";

const Onboarding = () => {
  const isSubmittedOnboardingForm = useAtomValue(isSubmittedOnboardingFormAtom); //use this instead of "isSubmittedOnboardingFormAtom" to eliminate rewritable atom issue.
  return isSubmittedOnboardingForm ? (
    <OnboardingAlreadyDone />
  ) : (
    <OnboardingForm />
  );
};

export default Onboarding;
