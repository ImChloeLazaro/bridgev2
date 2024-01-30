"use client";
import OnboardingForm from "./components/OnboardingForm";
import OnboardingSubmitted from "./components/OnboardingSubmitted";

import { isSubmittedOnboardingFormAtom } from "./store/OnboardingStore";
import { useAtomValue } from "jotai";

const Onboarding = () => {
  const isSubmittedOnboardingForm = useAtomValue(isSubmittedOnboardingFormAtom); //use this instead of "isSubmittedOnboardingFormAtom" to eliminate rewritable atom issue.
  return isSubmittedOnboardingForm ? (
    <OnboardingSubmitted />
  ) : (
    <OnboardingForm />
  );
};

export default Onboarding;
