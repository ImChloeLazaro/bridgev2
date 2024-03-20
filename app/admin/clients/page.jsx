"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import CMSAdmin from "./components/CMSAdmin";

const Clients = () => {
  const auth = useAtomValue(authenticationAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

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
