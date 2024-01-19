import React, { useState, useMemo } from "react";
import { reactionIcons } from "./ReactionIcons";
import { Button } from "@nextui-org/react";

const ReactionButton = ({ id, data }) => {
  const [reaction, setReaction] = useState(false);
  const label = {
    love: { label: "love", color: "font-semibold text-[#FF4949] capitalize" },
    star: {
      label: "congrats",
      color: "font-semibold text-[#EF8B16] capitalize",
    },
    birthday: {
      label: "greetings",
      color: "font-semibold text-[#A44BFD] capitalize",
    },
    happy: {
      label: "greetings",
      color: "font-semibold text-[#FDCA4B] capitalize",
    },
  };

  return (
    <div className="flex justify-start items-center gap-1">
      <Button
        size="lg"
        disableRipple
        disableAnimation
        className="bg-transparent"
        onPress={() => {
          setReaction(!reaction);
          console.log("POST ID", id);
        }}
        startContent={
          <div className="text-darkgrey-default">
            {reaction
              ? reactionIcons[data[0]].active
              : reactionIcons[data[0]].inactive}
          </div>
        }
      >
        <p
          className={`${
            reaction
              ? `${label[data[0]].color}`
              : "font-semibold text-darkgrey-default capitalize"
          }`}
        >
          {label[data[0]].label}
        </p>
      </Button>
    </div>
  );
};

export default ReactionButton;
