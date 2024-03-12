"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import ClientList from "./components/ClientList";
import TaskTableView from "./components/TaskTableView";

const CMS = () => {
  const auth = useAtomValue(authenticationAtom);
  return (
    auth.isAuthenticated && (
      <>
        <div className="relative w-full max-h-screen overflow-y-scroll no-scrollbar m-2 p-4">
          <ClientList />
          {/* <TaskTableView /> */}
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
