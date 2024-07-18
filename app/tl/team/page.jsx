"use client";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import TeamManagementTL from "./components/TeamManagementTL";

const Team = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
      <TeamManagementTL />
    </div>
  );
};

export default Team;
