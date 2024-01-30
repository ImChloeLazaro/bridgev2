import React from "react";
import NextImage from "next/image";
import Birthday from "../../../../assets/media/birthday.gif";

const BirthdayCard = () => {
  return (
    <NextImage
      //   width={500}
      // height={200}
      priority={true}
      alt="NextUI Fruit Image with Zoom"
      src={Birthday}

      className="rounded-xl"
    />
  );
};

export default BirthdayCard;
