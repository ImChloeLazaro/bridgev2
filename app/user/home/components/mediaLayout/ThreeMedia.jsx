import { Button, Image, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ImagePostCarousel from "../mediaLayout/ImagePostCarousel";

const ThreeMedia = ({ data, type }) => {
  const filteredPost = data.slice(0, 3);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const layout = {
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-3 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-[900px] px-4",
  };

  const handleOnOpen = (index) => {
    console.log("POST 3 IMAGE INDEX", index);
    setSelectedImage(index);
  };

  const featuredMedia = type === "portrait" ? "first:row-span-2" : "";

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
            className={`${featuredMedia} bg-grey-default/60 backdrop-blur-sm flex justify-center items-center overflow-clip h-full w-full px-unit-0`}
            onPress={() => {
              handleOnOpen(index);
              onOpen();
            }}
          >
            <Image
              //   isZoomed
              key={index}
              width={700}
              //   height={900}
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

export default ThreeMedia;
