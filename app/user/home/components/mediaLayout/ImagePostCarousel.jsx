import React from "react";
import ImageSwiper from "../mediaLayout/ImageSwiper";

import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

const ImagePostCarousel = ({
  isOpen,
  onOpenChange,
  isDismissable,
  data,
  selectedImage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      placement={"top"}
      scrollBehavior={"outside"}
      size={"full"}
      classNames={{
        wrapper: "my-0 h-full",
        base: "my-0 h-full bg-transparent shadow-none",
        closeButton:
          "mt-4 mr-6 text-white-default text-2xl font-extrabold hover:bg-lightgrey-default/40",
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent className="">
        {(onClose) => (
          <ModalBody className="max-h-screen ">
            <ImageSwiper data={data} selectedImage={selectedImage} />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImagePostCarousel;
