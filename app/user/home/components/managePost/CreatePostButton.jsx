import React from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import ManagePostModal from "./ManagePostModal";

const CreatePostButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        disableRipple
        disableAnimation
        isIconOnly
        className="bg-transparent w-full h-16 text-lg font-medium text-black-default border-[2.5px] rounded-lg border-[#BEBEBE]/80 border-solid flex justify-start items-center pl-4"
        onPress={onOpen}
      >
        Create Post
      </Button>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        type={"create post"}

      />
    </>
  );
};

export default CreatePostButton;
