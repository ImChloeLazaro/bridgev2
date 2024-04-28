import { Button, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ImagePostCarouselModal from "./ImagePostCarouselModal";
import NextImage from "next/image";

const FourMedia = ({ data, orientation, layout }) => {
  const filteredPost =
    layout === "single" ? data.slice(0, 1) : data.slice(0, 4);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const alignment = {
    landscape:
      "gap-1.5 grid grid-cols-2 grid-rows-2 bg-white-default/60 h-full px-0 lg:px-4",
    portrait:
      "gap-1.5 grid grid-cols-3 grid-rows-3 bg-white-default/60 h-full px-0 lg:px-4",
  };

  const handleOnOpen = (index) => {
    console.log("POST 4 IMAGE INDEX", index);
    setSelectedImage(index);
  };

  const featuredMedia =
    orientation === "portrait" ? "first:row-span-3 first:col-span-2" : "";

  return (
    <div className={`${alignment[orientation]}`}>
      <ImagePostCarouselModal
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
            className={`${featuredMedia} relative bg-white-default/60 backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full p-0`}
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
              // width={700}
              // height={300}
              sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
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
          </Button>
        );
      })}
    </div>
  );
};

export default FourMedia;
