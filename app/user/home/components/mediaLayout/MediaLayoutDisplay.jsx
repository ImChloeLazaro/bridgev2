import React from "react";
import { Image } from "@nextui-org/react";

const MediaLayoutDisplay = ({
  mediaFileList = [],
  layout = "single",
  orientation = "landscape",
  size = 1,
}) => {
  const layoutOne = {
    // one
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-1 my-5 bg-white-default/60 h-full w-full px-2",
    portrait:
      "gap-1.5 grid grid-cols-1 grid-rows-1 my-5 bg-white-default/60 h-full w-full px-2",
  };
  const layoutTwo = {
    // two
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-2 my-5 bg-white-default/60 h-full w-full px-2",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-1 my-5 bg-white-default/60 h-full w-full px-2",
  };
  const layoutThree = {
    // three
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-3 my-5 bg-white-default/60 h-full w-full px-2",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-full w-full px-2",
  };
  const layoutFour = {
    // four
    landscape:
      "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-full w-full px-2",
    portrait:
      "gap-1.5 grid grid-cols-3 grid-rows-3 my-5 bg-white-default/60 h-full w-full px-2",
  };
  const layoutFive = {
    // five
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-full w-full px-2",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-full w-full px-2",
  };
  const layoutSixPlus = {
    //six
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-full w-full px-2",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-full w-full px-2",
  };

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const selectedOrientation = Array.from(orientation).join("");

  const featuredMedia = (index) => {
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
      console.log("SIZE OF MEDIA POST", size);

      if (selectedOrientation === "portrait") {
        console.log("POT INDEX OF MEDIA POST", index);
        if (index === 0) return "row-span-3 col-span-4";
        if (index === 1) return "row-span-3 col-span-4";
        if (index === 2) return "row-span-2 col-span-2";
        if (index === 3) return "row-span-2 col-span-2";
        if (index === 4) return "row-span-2 col-span-2";
      }
      if (selectedOrientation === "landscape") {
        console.log("LAND INDEX OF MEDIA POST", index);
        if (index === 0) return "row-span-4 col-span-3";
        if (index === 1) return "row-span-4 col-span-3";
        if (index === 2) return "row-span-2 col-span-2";
        if (index === 3) return "row-span-2 col-span-2";
        if (index === 4) return "row-span-2 col-span-2";
      }
    }
  };
  const imageBox = () => {
    let mediaRange = size >= 6 ? arrayRange(1, 5, 1) : arrayRange(1, size, 1);
    const hasMedia = mediaFileList ? mediaFileList : mediaRange;
    return Array.from(layout).join("") !== "single" ? (
      hasMedia.map((media, index) => (
        <div
          key={index}
          className={`${featuredMedia(
            index
          )} w-full h-full flex justify-center items-center bg-grey-hover border-2 border-white-default`}
        >
          {mediaFileList ? (
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
                className="object-cover "
              />
            </div>
          ) : (size >= 6) & (index === 4) ? (
            `${media} +`
          ) : (
            media
          )}
        </div>
      ))
    ) : (
      <div
        className={`w-full h-full flex justify-center items-center bg-grey-hover border-2 border-white-default`}
      >
        {`1 +`}
      </div>
    );
  };
  const previewMediaLayout = {
    1: <div className={`${layoutOne[orientation]}`}>{imageBox()}</div>,
    2: <div className={`${layoutTwo[orientation]}`}>{imageBox()}</div>,
    3: <div className={`${layoutThree[orientation]}`}>{imageBox()}</div>,
    4: <div className={`${layoutFour[orientation]}`}>{imageBox()}</div>,
    5: <div className={`${layoutFive[orientation]}`}>{imageBox()}</div>,
    6: <div className={`${layoutSixPlus[orientation]}`}>{imageBox()}</div>,
  };

  return Array.from(layout).join("") === "single"
    ? previewMediaLayout[1]
    : previewMediaLayout[size > 6 ? 6 : size];
};

export default MediaLayoutDisplay;
