"use client";
import React from "react";
import RolesAdmin from "./components/RolesAdmin";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/UserStore";
const UserRoles = () => {

  const users = useAtomValue(userAtom).role; 
  const roles = useRoles(users);
  return (
      <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
        <RolesAdmin />
      </div>
    );
};

export default UserRoles;
