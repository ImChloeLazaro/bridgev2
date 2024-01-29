"use client";
import "../../aws-auth";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/UserStore";
import MainContent from "./components/MainContent";
import RightBar from "./components/RightBar";

const Profile = () => {
  const user = useAtomValue(userAtom);

  return (
    user.isAuthenticated && (
      <>
        <MainContent />
        <RightBar />
      </>
    )
  );
};
export default withAuthenticator(Profile);
