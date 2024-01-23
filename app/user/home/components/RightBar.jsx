import React from "react";
import BirthdayCard from "./birthday/BirthdayCard";
import HRBulletinBoard from "./hrBulletinBoard/HRBulletinBoardCard";
import RecognitionCard from "./recognition/RecognitionCard";
import RexWinnerCard from "./rexWinner/RexWinnerCard";
import TrainingCard from "./training/TrainingCard";

const RightBar = () => {
  return (
    <div className="w-full max-h-screen basis-[28%] overflow-y-scroll no-scrollbar mt-4 mr-4 ml-0 pr-4">
      <div className=" flex flex-col gap-6 ">
        <RexWinnerCard />
        <BirthdayCard />
        <HRBulletinBoard />
        <RecognitionCard />
        <TrainingCard />
      </div>
    </div>
  );
};

export default RightBar;
