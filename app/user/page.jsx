"use client";
import "../aws-auth";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../store/UserStore";

import { MainContent } from "./home/components/MainContent";
import { RightBar } from "./home/components/RightBar";

const User = ({ signOut }) => {
  // const [userState, setUserState] = useState({});
  // const [user, setUser] = useAtom(userAtom);
  const user = useAtomValue(userAtom);

  // const fetchData = async () => {
  //   try {
  //     const userdata = await fetchUserAttributes();
  //     setUser(userdata);
  //     console.log(userdata);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      {/* <p className="m-1">Hello : {user.name} </p>
      <button
        className="bg-red-500 m-1 p-1 rounded text-white font-semibold"
        onClick={signOut}
      >
        Logout
      </button> */}
      <MainContent />
      <RightBar />
    </>
  );
};

export default withAuthenticator(User);
