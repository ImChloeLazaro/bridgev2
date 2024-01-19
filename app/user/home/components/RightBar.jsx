import React from "react";
import RexWinnerCard from "./rexWinner/RexWinnerCard";
import BirthdayCard from "./birthday/BirthdayCard";
import { Spacer } from "@nextui-org/react";
import RecognitionCard from "./recognition/RecognitionCard";
import TrainingCard from "./training/TrainingCard";
import HRBulletinBoard from "./hrBulletinBoard/HRBulletinBoardCard";

const HighlightArea = () => {
  return (
    <div className="w-full max-h-screen basis-[28%] overflow-y-scroll no-scrollbar my-4 mr-4 ml-0 pr-4">
      <div className=" flex flex-col gap-6 ">
        <RexWinnerCard />
        {/* <Spacer y={4} /> */}
        <BirthdayCard />
        {/* <Spacer y={4} /> */}
        <HRBulletinBoard />
        {/* <Spacer y={4} /> */}
        <RecognitionCard />
        {/* <Spacer y={4} /> */}
        <TrainingCard />
      </div>
    </div>
  );
};

export default HighlightArea;
