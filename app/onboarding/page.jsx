"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchUserAtom, userAtom } from "../store/UserStore";
import OnboardingAlreadyDone from "./components/OnboardingAlreadyDone";
import OnboardingForm from "./components/OnboardingForm";
import { useEffect } from "react";

const Onboarding = () => {
  const user = useAtomValue(userAtom);
  const fetchUser = useSetAtom(fetchUserAtom);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(bg.png)" }}
    >
      {!user?.hasOnboardingData ? <OnboardingAlreadyDone /> : <OnboardingForm />}
    </div>
  );
};

export default Onboarding;
