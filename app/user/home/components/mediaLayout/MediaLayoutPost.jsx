import FiveMedia from "./FiveMedia";
import FourMedia from "./FourMedia";
import OneMedia from "./OneMedia";
import SixPlusMedia from "./SixPlusMedia";
import ThreeMedia from "./ThreeMedia";
import TwoMedia from "./TwoMedia";

const MediaLayout = ({
  mediaList,
  orientation = "landscape",
  layout = "single",
}) => {
  const imageCount = mediaList?.length <= 0 ? 1 : mediaList?.length;
  const displayMedia = {
    1: <OneMedia data={mediaList} orientation={orientation} layout={layout} />,
    2: <TwoMedia data={mediaList} orientation={orientation} layout={layout} />,
    3: (
      <ThreeMedia data={mediaList} orientation={orientation} layout={layout} />
    ),

    4: <FourMedia data={mediaList} orientation={orientation} layout={layout} />,
    5: <FiveMedia data={mediaList} orientation={orientation} layout={layout} />,
  };

  return (
    <div className=" w-full justify-center items-center p-0 m-0 bg-white-default h-[16rem] lg:h-[36rem]">
      {imageCount > 5 ? (
        <SixPlusMedia
          data={mediaList}
          orientation={orientation}
          layout={layout}
        />
      ) : (
        displayMedia[imageCount]
      )}
    </div>
  );
};

export default MediaLayout;
