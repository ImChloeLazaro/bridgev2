"use client";
import MainContent from "@/app/components/MainContent";
import RightBar from "@/app/components/RightBar";
import RightBarCard from "@/app/components/RightBarCard";
import { withAuthenticator } from "@aws-amplify/ui-react";
import ClientList from "./components/ClientList";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

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
