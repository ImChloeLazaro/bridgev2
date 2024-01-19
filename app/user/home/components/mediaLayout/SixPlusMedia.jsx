import React from "react";
import { Image, Button, useDisclosure } from "@nextui-org/react";
import ImagePostCarousel from "../mediaLayout/ImagePostCarousel";

const SixPlusMedia = ({ data, type }) => {
  const filteredPost = data.filter((item) => data.indexOf(item) < 5);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const layout = {
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-[900px] ",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-[900px] ",
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
    <div key={"5>Media"} className={`${layout[type]}`}>
      {/* 
        Modal component can be shared by separating 
        this component on top then share the hook 
        to the components
      */}

      <ImagePostCarousel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        data={data}
      />
      {filteredPost.map((media, index) => {
        if (filteredPost.length - 1 === index) {
          return (
            <Button
              key={index}
              radius="none"
              disableRipple
              disableAnimation
              className={`${featuredMedia(
                index
              )} bg-white-default backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full relative`}
              onPress={onOpen}
            >
              <Image
                //   isZoomed
                removeWrapper
                key={index}
                width={700}
                // height={300}
                sizes={
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                radius={"none"}
                loading={"lazy"}
                alt={`Media Layout ${index}`}
                src={media}
              />
              <div className="z-50 absolute w-full h-full backdrop-brightness-[.50] flex items-center justify-center">
                <p className="font-medium text-3xl text-white-default">{`+${
                  data.length - 5
                }`}</p>
              </div>
            </Button>
          );
        } else {
          return (
            <Button
              key={index}
              radius="none"
              disableRipple
              disableAnimation
              className={`${featuredMedia(
                index
              )} bg-white-default backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full`}
              onPress={onOpen}
            >
              <Image
                //   isZoomed
                key={index}
                width={700}
                // height={300}
                sizes={
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                radius={"none"}
                loading={"lazy"}
                alt={`Media Layout ${index}`}
                src={media}
              />
            </Button>
          );
        }
      })}
    </div>
  );
};

export default SixPlusMedia;
