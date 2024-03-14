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
        <div className="flex justify-center items-center w-full h-full p-6 ">
          {/* <div className="mt-4 mb-8"> */}
            <Clients />
          {/* </div> */}
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
