"use client";
import React from "react";
import MiniUnderContstruction from "@/app/components/MiniUnderContstruction";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/UserStore";
const Onboarding = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="h-full w-full ">
      <MiniUnderContstruction
        src={"/imageUnderContstruction.png"}
        mini={false}
      />
    </div>
  );
};

export default Onboarding;
