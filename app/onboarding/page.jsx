"use client";
import OnboardingForm from "./components/OnboardingForm";
import OnboardingSubmitted from "./components/OnboardingSubmitted";

import { isSubmittedOnboardingFormAtom } from "./store/OnboardingStore";

import { useAtomValue } from "jotai";

const Onboarding = () => {
  const isSubmittedOnboardingForm = useAtomValue(isSubmittedOnboardingFormAtom);
  return isSubmittedOnboardingForm ? (
    <OnboardingSubmitted />
  ) : (
    <OnboardingForm />
  );
};

export default Onboarding;
