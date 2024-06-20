import { useMemo } from "react";
import { Image } from "@nextui-org/react";
import "../../../../aws-auth";

const MediaLayoutPreview = ({
  mediaFileList = [],
  layout = "single",
  orientation = "portrait",
}) => {
  const mediaLayout = {
    1: {
      // one
      landscape:
        "gap-1.5 grid grid-cols-1 grid-rows-1 my-5 bg-white-default/60 h-full w-full px-2",
      portrait:
        "gap-1.5 grid grid-cols-1 grid-rows-1 my-5 bg-white-default/60 h-full w-full px-2",
    },
    2: {
      // two
      landscape:
        "gap-1.5 grid grid-cols-1 grid-rows-2 my-5 bg-white-default/60 h-full w-full px-2",
      portrait:
        "gap-1.5 grid grid-cols-2 grid-rows-1 my-5 bg-white-default/60 h-full w-full px-2",
    },
    3: {
      // three
      landscape:
        "gap-1.5 grid grid-cols-1 grid-rows-3 my-5 bg-white-default/60 h-full w-full px-2",
      portrait:
        "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-full w-full px-2",
    },
    4: {
      // four
      landscape:
        "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-full w-full px-2",
      portrait:
        "gap-1.5 grid grid-cols-3 grid-rows-3 my-5 bg-white-default/60 h-full w-full px-2",
    },
    5: {
      // five
      landscape:
        "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-full w-full px-2",
      portrait:
        "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-full w-full px-2",
    },
    6: {
      //six
      landscape:
        "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-full w-full px-2",
      portrait:
        "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-full w-full px-2",
    },
  };

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const selectedLayout = Array.from(layout).join("");
  const selectedOrientation = Array.from(orientation).join("");

  const mediaAlignment = (index, size) => {
    if (size === 1) {
      return "";
    }
    if (size === 2) {
      return "";
    }
    if (size === 3) {
      return selectedOrientation === "portrait" ? "first:row-span-2" : "";
    }
    if (size === 4) {
      return selectedOrientation === "portrait"
        ? "first:row-span-3 first:col-span-2"
        : "";
    }
    if (size === 5) {
      if (selectedOrientation === "portrait") {
        if (index === 0) return "row-span-3 col-span-4";
        if (index === 1) return "row-span-3 col-span-4";
        if (index === 2) return "row-span-2 col-span-2";
        if (index === 3) return "row-span-2 col-span-2";
        if (index === 4) return "row-span-2 col-span-2";
      }
      if (selectedOrientation === "landscape") {
        if (index === 0) return "row-span-4 col-span-3";
        if (index === 1) return "row-span-4 col-span-3";
        if (index === 2) return "row-span-2 col-span-2";
        if (index === 3) return "row-span-2 col-span-2";
        if (index === 4) return "row-span-2 col-span-2";
      }
    }
    if (size >= 6) {
      if (selectedOrientation === "portrait") {
        if (index === 0) return "row-span-3 col-span-4";
        if (index === 1) return "row-span-3 col-span-4";
        if (index === 2) return "row-span-2 col-span-2";
        if (index === 3) return "row-span-2 col-span-2";
        if (index === 4) return "row-span-2 col-span-2";
      }
      if (selectedOrientation === "landscape") {
        if (index === 0) return "row-span-4 col-span-3";
        if (index === 1) return "row-span-4 col-span-3";
        if (index === 2) return "row-span-2 col-span-2";
        if (index === 3) return "row-span-2 col-span-2";
        if (index === 4) return "row-span-2 col-span-2";
      }
    }
  };

  // Randomize alignment and layout when media does not exist or its empty
  const useRandomLayout = useMemo(() => {
    if (selectedLayout === "multiple") {
      return Math.floor(Math.random() * 5) + 1;
    }
    if (selectedLayout === "single") {
      return Math.floor(Math.random() * 1) + 1;
    }
  }, [selectedLayout]);

  const displayMediaPreview = ({ isEmpty }) => {
    if (isEmpty) {
      const mediaListSize = selectedLayout === "single" ? 1 : 5;

      let mediaRange = arrayRange(1, mediaListSize, 1);

      const orientationAlignment =
        selectedOrientation === "portrait"
          ? mediaLayout[mediaListSize]?.portrait
          : mediaLayout[mediaListSize]?.landscape;

      return (
        <div className={`${orientationAlignment}`}>
          {mediaRange.map((media, index) => {
            return (
              <div
                key={index}
                className={`${mediaAlignment(
                  index,
                  mediaListSize
                )} w-full h-full flex justify-center items-center bg-grey-hover border-2 border-white-default`}
              >
                <div className="flex justify-center items-center m-0 p-0 overflow-clip h-full w-full">
                  <p className="text-lg font-bold text-black-default">
                    {media}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      const mediaListSize =
        selectedLayout === "single" ? 1 : mediaFileList.length;

      const multiplePost =
        mediaListSize >= 6 ? mediaFileList?.slice(0, 5) : mediaFileList;

      const singlePost = mediaFileList?.slice(0, 1);

      const mediaDisplay =
        selectedLayout === "single" ? singlePost : multiplePost;

      const orientationAlignment =
        selectedOrientation === "portrait"
          ? mediaLayout[mediaListSize >= 6 ? 5 : mediaListSize]?.portrait
          : mediaLayout[mediaListSize >= 6 ? 5 : mediaListSize]?.landscape;

      return (
        <div className={`${orientationAlignment}`}>
          {mediaDisplay.map((media, index) => {
            return (
              <div
                key={index}
                className={`${mediaAlignment(
                  index,
                  mediaListSize
                )} w-full h-full flex justify-center items-center bg-grey-hover border-2 border-white-default`}
              >
                <div className="flex justify-center items-center m-0 p-0 overflow-clip h-full w-full">
                  <Image
                    // width={100}
                    height={100}
                    sizes={
                      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    }
                    radius={"none"}
                    loading={"lazy"}
                    alt={`Media Layout ${index}`}
                    src={media}
                    className="flex"
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  // MEDIA FILE LIST DOES NOT EXIST OR EMPTY
  if (
    mediaFileList === null ||
    mediaFileList === undefined ||
    mediaFileList?.length === 0 ||
    !mediaFileList.length ||
    !Array.isArray(mediaFileList)
  ) {
    if (selectedLayout === "single") {
      return displayMediaPreview({ isEmpty: true });
    } else if (selectedLayout === "multiple") {
      return displayMediaPreview({ isEmpty: true });
    }
  }
  // MEDIA FILE LIST DOES EXIST
  else {
    if (selectedLayout === "single") {
      return displayMediaPreview({ isEmpty: false });
    } else if (selectedLayout === "multiple") {
      return displayMediaPreview({ isEmpty: false });
    }
  }
};

export default MediaLayoutPreview;
