import React from "react";
import NextImage from "next/image";
import RexWinner from "../../../../assets/media/rex winner.gif";

const RexWinnerCard = () => {
  return (
    <NextImage
      //   width={500}
      // height={200}
      alt="NextUI Fruit Image with Zoom"
      src={RexWinner}
      unoptimized={true}
      className="rounded-xl"
    />
  );
};

export default RexWinnerCard;
