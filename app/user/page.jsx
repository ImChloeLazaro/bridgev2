"use client";
import "../aws-auth";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { AuthenticationStore } from "../navigation/store/AuthenticationStrore";
import { authatom } from "../navigation/store/ShortcutsStore";

import { redirect } from "next/navigation";
const User = ({ signOut }) => {
  const [data, setData] = useAtom(AuthenticationStore);
  return (
    <>
      <p className="m-1">Hello : {data.user.name} </p>
      <button
        className="bg-red-500 m-1 p-1 rounded text-white font-semibold"
        onClick={signOut}
      >
        Logout
      </button>
    </>
  );
};

export default withAuthenticator(User);
