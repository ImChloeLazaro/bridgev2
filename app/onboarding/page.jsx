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
      {user?.hasOnboardingData ? ( // Temp change for employee automation by @gerome - !user?.hasOnboardingData
        <OnboardingForm />
      ) : (
        <OnboardingAlreadyDone />
      )}
    </div>
  );
};

export default Onboarding;
