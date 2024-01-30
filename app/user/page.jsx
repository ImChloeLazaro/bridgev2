"use client";
import "../aws-auth";
import "@aws-amplify/ui-react/styles.css";
import { useAtomValue } from "jotai";
import { userAtom } from "../store/UserStore";
import MainContent from "./home/components/MainContent";
import RightBar from "./home/components/RightBar";

const User = () => {
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

export default User
