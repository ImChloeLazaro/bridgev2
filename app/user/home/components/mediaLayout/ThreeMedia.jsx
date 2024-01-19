import React from "react";
import { Image, Button } from "@nextui-org/react";

const ThreeMedia = ({ data, type }) => {
  const filteredPost = data.filter((item) => data.indexOf(item) < 3);

  const layout = {
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-3 my-5 bg-grey-default/60 h-[900px]",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-grey-default/60 h-[900px]",
  };

  const featuredMedia = type === "portrait" ? "first:row-span-2" : "";

  return (
    <div className={`${layout[type]}`}>
      {filteredPost.map((media, index) => {
        return (
          <Button
            key={index}
            radius="none"
            disableRipple
            disableAnimation
            className={`${featuredMedia} bg-black-default/60 backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full`}
          >
            <Image
              //   isZoomed
              key={index}
              width={700}
              //   height={900}
              //   sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
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

export default ThreeMedia;
