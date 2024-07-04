"use client";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import CMSAdmin from "./components/CMSAdmin";
const Clients = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
      <CMSAdmin />
    </div>
  );
};

export default withAuthenticator(Clients);
