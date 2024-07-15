"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import CMSUser from "./components/CMSUser";

const CMS = () => {
  const auth = useAtomValue(authenticationAtom);

  return (
    auth.isAuthenticated && (
      <>
        <div className="flex justify-center items-center w-full h-full p-0 ">
          <CMSUser />
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
