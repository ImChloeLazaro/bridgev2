"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import CMSTL from "./components/CMSTL";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/UserStore";
const CMS = () => {
  const auth = useAtomValue(authenticationAtom);
  const users = useAtomValue(userAtom).role; 
  const roles = useRoles(users);
  return (
    auth.isAuthenticated && (
      <>
        <div className="flex justify-center items-center w-full h-full p-0 lg:p-6 ">
          <CMSTL />
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
