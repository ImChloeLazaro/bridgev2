import { Button, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ImagePostCarouselModal from "./ImagePostCarouselModal";
import NextImage from "next/image";

const TwoMedia = ({ data, orientation, layout }) => {
  const filteredPost =
    layout === "single" ? data.slice(0, 1) : data.slice(0, 2);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const alignment = {
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-2 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-1 my-5 bg-white-default/60 h-[900px] px-4",
  };

  const handleOnOpen = (index) => {
    console.log("POST 2 IMAGE INDEX", index);
    setSelectedImage(index);
  };

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
            className="relative bg-grey-default/60 backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full px-unit-0"
            onPress={() => {
              handleOnOpen(index);
              onOpen();
            }}
          >
            <div className="relative z-0 h-full w-full overflow-hidden flex justify-center items-center">
              <NextImage
                priority={true}
                fill={true}
                // placeholder={"blur"}
                key={index}
                // width={700}
                // height={900}
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
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default TwoMedia;
