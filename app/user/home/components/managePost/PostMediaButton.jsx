import { Button, useDisclosure } from "@nextui-org/react";
import { BsImage } from "react-icons/bs";
import ManagePostModal from "./ManagePostModal";

const PostMediaButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        disableRipple
        disableAnimation
        size="lg"
        startContent={<BsImage size={24} />}
        className="bg-transparent font-medium text-lg text-black-default hover:text-orange-default/90"
        onPress={onOpen}
      >
        {"Media"}
      </Button>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        
      />
    </>
  );
};

export default PostMediaButton;
