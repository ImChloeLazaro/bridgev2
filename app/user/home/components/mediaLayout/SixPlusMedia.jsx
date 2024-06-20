import { Button, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ImagePostCarouselModal from "./ImagePostCarouselModal";
import NextImage from "next/image";

const SixPlusMedia = ({ data, orientation, layout }) => {
  const filteredPost =
    layout === "single" ? data.slice(0, 1) : data.slice(0, 5);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const alignment = {
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 bg-white-default h-full px-0 lg:px-4",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 bg-white-default h-full px-0 lg:px-4",
  };

  const handleOnOpen = (index) => {
    setSelectedImage(index);
  };

  const featuredMedia = (index) => {
    if (orientation === "portrait") {
      if (index === 0) return "row-span-3 col-span-4";
      if (index === 1) return "row-span-3 col-span-4";
      if (index === 2) return "row-span-2 col-span-2";
      if (index === 3) return "row-span-2 col-span-2";
      if (index === 4) return "row-span-2 col-span-2";
    }
    if (orientation === "landscape") {
      if (index === 0) return "row-span-4 col-span-3";
      if (index === 1) return "row-span-4 col-span-3";
      if (index === 2) return "row-span-2 col-span-2";
      if (index === 3) return "row-span-2 col-span-2";
      if (index === 4) return "row-span-2 col-span-2";
    }
  };

  return (
    <div key={"5>Media"} className={`${alignment[orientation]}`}>
      {/* 
        Modal component can be shared by separating 
        this component on top then share the hook 
        to the components
      */}

      <ImagePostCarouselModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        data={data}
        selectedImage={selectedImage}
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
              )} relative bg-white-default backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full p-0 `}
              onPress={() => {
                handleOnOpen(index);
                onOpen();
              }}
            >
              <NextImage
                priority={true}
                fill={true}
                // placeholder={"blur"}
                //   isZoomed
                // removeWrapper
                key={index}
                // width={400}
                // height={300}
                sizes={
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                radius={"none"}
                // loading={"lazy"}
                alt={`Media Layout ${index}`}
                src={media}
                style={{
                  // width: "100%",
                  // height: "auto",
                  objectFit: "contain", // cover, contain, none
                }}
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
              )} relative bg-white-default backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full px-unit-0 `}
              onPress={() => {
                handleOnOpen(index);
                onOpen();
              }}
            >
              <NextImage
                priority={true}
                fill={true}
                // placeholder={"blur"}
                //   isZoomed
                key={index}
                // width={1000}
                // height={300}
                sizes={
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                radius={"none"}
                alt={`Media Layout ${index}`}
                src={media}
                style={{
                  // width: "100%",
                  // height: "auto",
                  objectFit: "contain", // cover, contain, none
                }}
              />
            </Button>
          );
        }
      })}
    </div>
  );
};

export default SixPlusMedia;
