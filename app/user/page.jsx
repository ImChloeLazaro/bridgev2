"use client";
import "../aws-auth";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../store/UserStore";
import MainContent from "./home/components/MainContent";
import RightBar from "./home/components/RightBar";

const User = ({ signOut }) => {
  return (
    <>
      <MainContent />
      <RightBar />
    </>
  );
};

export default withAuthenticator(User);
