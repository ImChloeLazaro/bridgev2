import FiveMedia from "./FiveMedia";
import FourMedia from "./FourMedia";
import OneMedia from "./OneMedia";
import SixPlusMedia from "./SixPlusMedia";
import ThreeMedia from "./ThreeMedia";
import TwoMedia from "./TwoMedia";

const MediaLayout = ({ data }) => {
  const imageCount = data?.length;
  const displayMedia = {
    1: <OneMedia data={data} orientation={"portrait"} />,
    2: <TwoMedia data={data} orientation={"portrait"} />,
    3: <ThreeMedia data={data} orientation={"portrait"} />,
    4: <FourMedia data={data} orientation={"portrait"} />,
    5: <FiveMedia data={data} orientation={"portrait"} />,
  };

  return (
    <div className=" w-full justify-center items-center p-0 m-0 bg-white-default h-[58rem]">
      {imageCount > 5 ? (
        <SixPlusMedia data={data} orientation={"portrait"} />
      ) : (
        displayMedia[imageCount]
      )}
    </div>
  );
};

export default MediaLayout;
