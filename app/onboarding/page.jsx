"use client";
import OnboardingAlreadyDone from "./components/OnboardingAlreadyDone";
import OnboardingForm from "./components/OnboardingForm";
import OnboardingSubmitted from "./components/OnboardingSubmitted";
import { isSubmittedOnboardingFormAtom } from "./store/OnboardingStore";
import { useAtomValue } from "jotai";

const Onboarding = () => {
  // const isSubmittedOnboardingForm = useAtomValue(isSubmittedOnboardingFormAtom);
  const isSubmittedOnboardingForm = true;
  return isSubmittedOnboardingForm ? (
    <OnboardingAlreadyDone />
  ) : (
    <OnboardingForm />
  );
};

export default Onboarding;
