import React from "react";
import NextImage from "next/image";
import Birthday from "../../../../assets/media/birthday.gif";

const BirthdayCard = () => {
  return (
    <NextImage
      //   width={500}
      // height={200}
      alt="NextUI Fruit Image with Zoom"
      src={Birthday}
      unoptimized={true}
      className="rounded-xl"
    />
  );
};

export default BirthdayCard;
