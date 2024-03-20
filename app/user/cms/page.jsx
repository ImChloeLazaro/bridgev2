"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import ClientList from "./components/ClientList";
import TaskTableView from "./components/TaskTableView";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { useEffect, useState } from "react";
import TaskBoardView from "./components/TaskBoardView";
import Clients from "./components/Clients";
import { testClientValue } from "@/app/store/ClientStore";
import { insertTaskAtom } from "@/app/store/TaskStore";
const CMS = () => {
  const auth = useAtomValue(authenticationAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);
  const test= useSetAtom(insertTaskAtom);
  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleOnClick = async () => {
    const task = {
        name: "Project Name",
        client: {
          client_id: "123456",
          name: "Client Name",
          email: "client@example.com",
          picture: "client.jpg"
        },
        processor: [
          {
            sub: "processor1",
            name: "Processor 1",
            email: "processor1@example.com",
            picture: "processor1.jpg"
          },
          {
            sub: "processor2",
            name: "Processor 2",
            email: "processor2@example.com",
            picture: "processor2.jpg"
          }
        ],
        reviewer: [
          {
            sub: "reviewer1",
            name: "Reviewer 1",
            email: "reviewer1@example.com",
            picture: "reviewer1.jpg"
          }
        ],
        duration: {
          start: new Date("2024-01-01"),
          end: new Date("2024-12-31")
        },
        status: "Ongoing"
      }      
    test(task);
    } 
  return (
    auth.isAuthenticated && (
      <>
        <div className="flex justify-center items-center w-full h-full p-6 ">
            <Clients />
            {/* <div> */}
              {/* <p>{test}</p>
              <input type="text" value={test} onChange={e => setTest(e.target.value)}/> */}
            {/* </div> */}
            <button className="bg-red-300" onClick={handleOnClick}>Insert</button>
        </div>
      </>
    )
  );
};

export default withAuthenticator(CMS);
