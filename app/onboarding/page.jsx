"use client";
import { useAtomValue } from "jotai";
import { userAtom } from "../store/UserStore";
import OnboardingAlreadyDone from "./components/OnboardingAlreadyDone";
import OnboardingForm from "./components/OnboardingForm";

const Onboarding = () => {
  const user = useAtomValue(userAtom);
  return (
    <div
      className='flex items-center justify-center h-screen bg-cover bg-center '
      style={{ backgroundImage: "url(bg.png)" }}
    >
      {user?.hasOnboardingData ? <OnboardingAlreadyDone /> : <OnboardingForm />}
    </div>
  );
};

export default Onboarding;
