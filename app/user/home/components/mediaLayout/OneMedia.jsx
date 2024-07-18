import { Button, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ImagePostCarouselModal from "./ImagePostCarouselModal";
import NextImage from "next/image";

const OneMedia = ({ data, orientation, layout }) => {
  const filteredPost =
    layout === "single" ? data.slice(0, 1) : data.slice(0, 1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const alignment = {
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-1 bg-white-default/60 h-[16rem] md:h-[28rem] lg:h-[32rem] xl:h-[54rem] px-0 lg:px-4",
    portrait:
      "gap-1.5 grid grid-cols-1 grid-rows-1 bg-white-default/60 h-[16rem] md:h-[28rem] lg:h-[32rem] xl:h-[54rem] px-0 lg:px-4",
  };

  const handleOnOpen = (index) => {
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
            radius='none'
            disableRipple
            disableAnimation
            className='relative bg-grey-default/60 backdrop-blur-sm flex justify-center items-center overflow-clip h-[16rem] md:h-[28rem] lg:h-[32rem] xl:h-[54rem] w-full p-0'
            onPress={() => {
              handleOnOpen(index);
              onOpen();
            }}
          >
            <NextImage
              priority={true}
              fill={true}
              // placeholder={"blur"}
              key={index}
              // width={700}
              // height={900}
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

export default OneMedia;
