import FiveMedia from "./FiveMedia";
import FourMedia from "./FourMedia";
import OneMedia from "./OneMedia";
import SixPlusMedia from "./SixPlusMedia";
import ThreeMedia from "./ThreeMedia";
import TwoMedia from "./TwoMedia";

const MediaLayout = ({ mediaList }) => {
  const imageCount = mediaList?.length;
  const displayMedia = {
    1: <OneMedia data={mediaList} orientation={"portrait"} />,
    2: <TwoMedia data={mediaList} orientation={"portrait"} />,
    3: <ThreeMedia data={mediaList} orientation={"portrait"} />,
    4: <FourMedia data={mediaList} orientation={"portrait"} />,
    5: <FiveMedia data={mediaList} orientation={"portrait"} />,
  };

  return (
    <div className=" w-full justify-center items-center p-0 m-0 bg-white-default h-[58rem]">
      {imageCount > 5 ? (
        <SixPlusMedia data={mediaList} orientation={"portrait"} />
      ) : (
        displayMedia[imageCount]
      )}
    </div>
  );
};

export default MediaLayout;
