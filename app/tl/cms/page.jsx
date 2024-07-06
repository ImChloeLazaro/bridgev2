"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import CMSTL from "./components/CMSTL";
const CMS = () => {
  const auth = useAtomValue(authenticationAtom);
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return (
    <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
      <CMSTL />
    </div>
  );
};

export default withAuthenticator(CMS);
