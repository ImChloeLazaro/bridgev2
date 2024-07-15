"use client";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import PlaceholderContent from "../../components/PlaceholderContent";
import TLTeamManagement from "./components/TLTeamManagement";
const TeamManagement = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
      <TLTeamManagement />
    </div>
  );
};

export default TeamManagement;
