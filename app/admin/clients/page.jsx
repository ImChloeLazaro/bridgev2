"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import CMSAdmin from "./components/CMSAdmin";
import { fetchClientAtom } from "@/app/store/ClientStore";

const Clients = () => {
  const auth = useAtomValue(authenticationAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  useEffect(() => {
    fetchClient();
    fetchTask();
  }, [fetchClient, fetchTask]);

  return (
    auth.isAuthenticated && (
      <>
        <div className="flex justify-center items-center w-full h-full p-6 ">
          <CMSAdmin />
        </div>
      </>
    )
  );
};

export default withAuthenticator(Clients);
