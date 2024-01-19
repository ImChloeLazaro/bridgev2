import React, { useState } from "react";
import { reactionIcons } from "./ReactionIcons";
import { Button } from "@nextui-org/react";
import { TbMessageCircle } from "react-icons/tb";

const CommentButton = () => {
  const [reaction, setReaction] = useState(false);

  return (
    <div className="flex justify-start items-center gap-1">
      <Button
        size="lg"
        disableRipple
        disableAnimation
        className="bg-transparent"
        onPress={() => {
          setReaction(!reaction);
        }}
        startContent={
          <div className="text-darkgrey-default">
            <TbMessageCircle size={24} />
          </div>
        }
      >
        <p className="font-semibold text-darkgrey-default">Comment</p>
      </Button>
    </div>
  );
};

export default CommentButton;
