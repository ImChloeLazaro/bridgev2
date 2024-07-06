"use client";
import React from "react";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/UserStore";
import AdminTeamManagement from "./components/AdminTeamManagement"

const TeamManagement = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
      <AdminTeamManagement />
    </div>
  )
};

export default TeamManagement;
