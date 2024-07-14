"use client";
import MiniUnderConstruction from "@/app/components/MiniUnderConstruction";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
const Benefits = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="h-full w-full ">
      <MiniUnderConstruction />
    </div>
  );
};

export default Benefits;
