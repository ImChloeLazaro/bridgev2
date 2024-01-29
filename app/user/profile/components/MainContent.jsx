import React from "react";
import { userAtom } from "../../../store/UserStore";

import { useAtomValue } from "jotai";
import ProfileCard from "./profileInfo/ProfileCard";

const MainContent = () => {
  const user = useAtomValue(userAtom);
  return (
    <div className="w-full max-h-screen basis-[72%] overflow-y-scroll no-scrollbar mx-4 mt-4 px-6">
      <ProfileCard data={user} />
    </div>
  );
};

export default MainContent;
