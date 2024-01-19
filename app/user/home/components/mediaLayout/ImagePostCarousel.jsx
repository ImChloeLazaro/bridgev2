import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import ImageSwiper from "../mediaLayout/ImageSwiper";

const ImagePostCarousel = ({ isOpen, onOpenChange, isDismissable, data }) => {
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
      <ModalContent>
        {(onClose) => (
          <ModalBody className="max-h-screen">
            <ImageSwiper data={data} />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImagePostCarousel;
