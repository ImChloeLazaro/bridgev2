"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import ClientList from "./components/ClientList";

const CMS = () => {
  const auth = useAtomValue(authenticationAtom);
  return (
    auth.isAuthenticated && (
      <>
        <div className="w-full max-h-screen overflow-y-scroll no-scrollbar m-2 p-4">
          <ClientList />
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
