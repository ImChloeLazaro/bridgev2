"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue, useSetAtom } from "jotai";
import ClientList from "./components/ClientList";
import TaskTableView from "./components/TaskTableView";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { useEffect } from "react";
import TaskBoardView from "./components/TaskBoardView";
import Clients from "./components/Clients";

const CMS = () => {
  const auth = useAtomValue(authenticationAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    auth.isAuthenticated && (
      <>
        <div className="relative w-full max-h-screen overflow-y-scroll no-scrollbar m-2 p-4">
          <Clients />          
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
