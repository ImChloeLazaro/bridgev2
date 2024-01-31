import { Button } from "@nextui-org/react";
import { MdClose } from "react-icons/md";

const CloseButton = (props) => {
  return (
    <Button isIconOnly className="bg-transparent" {...props}>
      <MdClose size={24} />
    </Button>
  );
};

export default CloseButton;
