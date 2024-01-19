import React from "react";
import OneMedia from "../mediaLayout/OneMedia";
import TwoMedia from "../mediaLayout/TwoMedia";
import ThreeMedia from "../mediaLayout/ThreeMedia";
import FourMedia from "../mediaLayout/FourMedia";
import FiveMedia from "../mediaLayout/FiveMedia";
import SixPlusMedia from "../mediaLayout/SixPlusMedia";

const MediaLayout = ({ data }) => {
  const imageCount = data.length;
  const displayMedia = {
    1: <OneMedia data={data} type={"single"} />,
    2: <TwoMedia data={data} type={"landscape"} />,
    3: <ThreeMedia data={data} type={"landscape"} />,
    4: <FourMedia data={data} type={"landscape"} />,
    5: <FiveMedia data={data} type={"landscape"} />,
  };

  return (
    <div className=" w-full justify-center items-center p-0 m-0 bg-white-default h-[58rem]">
      {imageCount > 5 ? (
        <SixPlusMedia data={data} type={"landscape"} />
      ) : (
        displayMedia[imageCount]
      )}
    </div>
  );
};

export default MediaLayout;
