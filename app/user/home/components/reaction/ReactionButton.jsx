import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { reactionIcons } from "./ReactionIcons";
import { updatePostReactionAtom } from "../../store/PostStore";
import { Tooltip, Button } from "@nextui-org/react";
import { reactionsSelectionAtom } from "../../store/ReactionStore";
import { useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { VscBlank } from "react-icons/vsc";

const ReactionButton = ({ id, reactionList, reacted, reactionsCount }) => {
  const updatePostReaction = useSetAtom(updatePostReactionAtom);
  const reactionsSelection = useAtomValue(reactionsSelectionAtom);
  const [selectedReaction, setSelectedReaction] = useState(reactionList[0]);
  const [isReacted, setIsReacted] = useState(reacted);
  const [isOpen, setIsOpen] = useState(false);
  const [prevReaction, setPrevReaction] = useState(selectedReaction)

  const label = {
    love: { label: "love", color: "text-[#FF4949]" },
    star: {
      label: "congrats",
      color: "text-[#EF8B16]",
    },
    birthday: {
      label: "greetings",
      color: "text-[#A44BFD]",
    },
    happy: {
      label: "greetings",
      color: "text-[#FDCA4B]",
    },
  };

  const reactionHoverSelection = (
    <div className="flex gap-1">
      {reactionsSelection.map((reaction) => (
        <div
          key={reaction.key}
          className="flex flex-col items-center justify-start "
        >
          <Button
            aria-label={reaction.label}
            isIconOnly
            className={"bg-transparent hover:animate-bounce "}
            onPress={() => {
              if (reaction.key === selectedReaction) {
                setIsReacted(!isReacted);
              } else {
                setIsReacted(!isReacted);
              }
              setPrevReaction(reaction.key)
              handleAddReaction(reaction.key);
              setIsOpen(false);
            }}
            key={reaction.key}
          >
            {reaction.displayIcon}
          </Button>
          <div className="-mt-3">
            {isReacted & (reaction.key === selectedReaction) ? (
              <div className="text-blue-default">
                <RxDotFilled size={18} />
              </div>
            ) : (
              <div className="text-blue-default">
                <VscBlank size={18} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const handleAddReaction = async (reaction) => {
    setSelectedReaction(reaction);

    console.log("BEFORE PASSING TO ATOM", {
      id: id,
      selectedReaction: reaction,
      reacted: !isReacted,
      reactions: reactionsCount,
      prevReaction: prevReaction,
    });

    const response = await updatePostReaction({
      id: id,
      selectedReaction: reaction,
      reacted: !isReacted,
      reactions: reactionsCount,
      prevReaction: prevReaction,
    });

    if (response.success) {
      console.log("CONFIRM WINDOW UPDATED POST REACTION", response.success);
    } else {
      console.log("NO POST REACTION UPDATED");
    }
  };

  return (
    <div className="flex justify-start items-center gap-1">
      <Tooltip
        content={reactionHoverSelection}
        delay={1250} // 1250
        closeDelay={700}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Button
          size="lg"
          disableRipple
          disableAnimation
          className="bg-transparent"
          onPress={() => {
            setIsReacted(!isReacted);
            handleAddReaction(selectedReaction);
          }}
          startContent={
            <div className="text-darkgrey-default">
              {isReacted
                ? reactionIcons[selectedReaction]?.active
                : reactionIcons[selectedReaction]?.inactive}
            </div>
          }
        >
          <p
            className={`${
              isReacted
                ? `font-semibold
                capitalize ${label[selectedReaction]?.color}`
                : "font-semibold capitalize text-darkgrey-default"
            }`}
          >
            {`${label[selectedReaction]?.label}`}
          </p>
        </Button>
      </Tooltip>
    </div>
  );
};

export default ReactionButton;
