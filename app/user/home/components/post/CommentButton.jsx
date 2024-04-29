import { Button } from "@nextui-org/react";
import { useState } from "react";
import { TbMessageCircle } from "react-icons/tb";

const CommentButton = () => {
  const [reaction, setReaction] = useState(false);

  return (
    <div className='flex justify-start items-center gap-1'>
      <Button
        size='lg'
        disableRipple
        disableAnimation
        className='bg-transparent'
        onPress={() => {
          setReaction(!reaction);
        }}
        startContent={
          <div className='text-inactive'>
            <TbMessageCircle size={24} />
          </div>
        }
      >
        <p className='text-sm lg:text-md font-semibold text-inactive'>
          {"Comment"}
        </p>
      </Button>
    </div>
  );
};

export default CommentButton;
