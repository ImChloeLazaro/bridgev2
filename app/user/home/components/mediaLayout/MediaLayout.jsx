import FiveMedia from "../mediaLayout/FiveMedia";
import FourMedia from "../mediaLayout/FourMedia";
import OneMedia from "../mediaLayout/OneMedia";
import SixPlusMedia from "../mediaLayout/SixPlusMedia";
import ThreeMedia from "../mediaLayout/ThreeMedia";
import TwoMedia from "../mediaLayout/TwoMedia";

const MediaLayout = ({ data }) => {
  const imageCount = data.length;
  const displayMedia = {
    1: <OneMedia data={data} orientation={"portrait"} />,
    2: <TwoMedia data={data} orientation={"landscape"} />,
    3: <ThreeMedia data={data} orientation={"landscape"} />,
    4: <FourMedia data={data} orientation={"landscape"} />,
    5: <FiveMedia data={data} orientation={"landscape"} />,
  };

  return (
    <div className=" w-full justify-center items-center p-0 m-0 bg-white-default h-[58rem]">
      {imageCount > 5 ? (
        <SixPlusMedia data={data} orientation={"landscape"} />
      ) : (
        displayMedia[imageCount]
      )}
    </div>
  );
};

export default MediaLayout;
