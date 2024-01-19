import React from "react";
import { Image, Button } from "@nextui-org/react";

const FiveMedia = ({ data, type }) => {
  const filteredPost = data.filter((item) => data.indexOf(item) < 5);

  const layout = {
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-grey-default/60 h-[900px]",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-grey-default/60 h-[900px]",
  };

  const featuredMedia = (index) => {
    if (type === "portrait") {
      if (index === 0) return "row-span-3 col-span-4";
      if (index === 1) return "row-span-3 col-span-4";
      if (index === 2) return "row-span-2 col-span-2";
      if (index === 3) return "row-span-2 col-span-2";
      if (index === 4) return "row-span-2 col-span-2";
    }
    if (type === "landscape") {
      if (index === 0) return "row-span-4 col-span-3";
      if (index === 1) return "row-span-4 col-span-3";
      if (index === 2) return "row-span-2 col-span-2";
      if (index === 3) return "row-span-2 col-span-2";
      if (index === 4) return "row-span-2 col-span-2";
    }
  };

  return (
    <div className={`${layout[type]}`}>
      {filteredPost.map((media, index) => {
        return (
          <Button
            key={index}
            radius="none"
            disableRipple
            disableAnimation
            className={`${featuredMedia(
              index
            )} bg-black-default/60 backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full`}
          >
            <Image
              key={index}
              width={700}
              // height={300}
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              radius={"none"}
              loading={"lazy"}
              alt={`Media Layout ${index}`}
              src={media}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default FiveMedia;
