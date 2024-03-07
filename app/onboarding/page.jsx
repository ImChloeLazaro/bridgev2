"use client";
import { useAtomValue } from "jotai";
import OnboardingAlreadyDone from "./components/OnboardingAlreadyDone";
import OnboardingForm from "./components/OnboardingForm";
import { fetchHasOnboardingDataAtom } from "./store/OnboardingStore";

const Onboarding = () => {
  const isHasOnboardingData = useAtomValue(fetchHasOnboardingDataAtom); //use this instead of "isSubmittedOnboardingFormAtom" to eliminate rewritable atom issue.
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(bg.png)" }}
    >
      {isHasOnboardingData ? <OnboardingAlreadyDone /> : <OnboardingForm />}
    </div>
  );
};

export default Onboarding;
