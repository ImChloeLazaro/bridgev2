"use client";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import RolesAdmin from "./components/RolesAdmin";
import UserRolesList from "./components/UserRolesList";
const UserRoles = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
      <UserRolesList />
    </div>
  );
};

export default UserRoles;
