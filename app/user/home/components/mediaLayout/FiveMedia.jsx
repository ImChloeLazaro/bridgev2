import React, { useState } from "react";
import ImagePostCarousel from "../mediaLayout/ImagePostCarousel";

import { Image, Button, useDisclosure } from "@nextui-org/react";

const FiveMedia = ({ data, type }) => {
  const filteredPost = data.slice(0, 5);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const layout = {
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-[900px] px-4",
  };

  const handleOnOpen = (index) => {
    console.log("POST 5 IMAGE INDEX", index);
    setSelectedImage(index);
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
      <ImagePostCarousel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        data={data}
        selectedImage={selectedImage}
      />
      {filteredPost.map((media, index) => {
        return (
          <Button
            key={index}
            radius="none"
            disableRipple
            disableAnimation
            className={`${featuredMedia(
              index
            )} bg-white-default backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full px-unit-0 `}
            onPress={() => {
              handleOnOpen(index);
              onOpen();
            }}
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
