import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { reactionIcons } from "./ReactionIcons";
import { updatePostReactionAtom } from "../../store/PostStore";
import { Tooltip, Button } from "@nextui-org/react";
import { reactionsSelectionAtom } from "../../store/ReactionStore";
import { useState, useEffect } from "react";
import { RxDotFilled } from "react-icons/rx";
import { VscBlank } from "react-icons/vsc";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { userAtom } from "@/app/store/UserStore";

const ReactionButton = ({ id, reactionList, reacted, reactionsCount }) => {
  const updatePostReaction = useSetAtom(updatePostReactionAtom);
  const reactionsSelection = useAtomValue(reactionsSelectionAtom);
  const [selectedReaction, setSelectedReaction] = useState(reactionList[0]);
  const [isReacted, setIsReacted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAtomValue(authenticationAtom);
  const user = useAtomValue(userAtom);

  const checkReactionStatus = () => {
    const reactedUser = reacted?.find((react) => react.sub === auth.sub);
    if (reactedUser && reactedUser?.reaction !== "") {
      setIsReacted(true);
      setSelectedReaction(reactedUser?.reaction || reactionList[0]);
    }
  };

  useEffect(() => {
    if (reacted && reacted.length > 0) {
      checkReactionStatus();
    }
  }, [reacted]);

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
              if (isReacted && reaction.key === selectedReaction) {
                setIsReacted(false);
                setSelectedReaction(reaction.key);
                handleAddReaction(reaction.key, true);
              } else {
                setIsReacted(true);
                setSelectedReaction(reaction.key);
                handleAddReaction(reaction.key, false);
              }
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

  const handleAddReaction = async (reaction, status) => {
    setSelectedReaction(reaction);

    console.log("BEFORE PASSING TO ATOM", {
      id: id,
      selectedReaction: reaction,
      reacted: {
        sub: auth?.sub,
        name: user.name,
        picture: user.picture,
        reaction:
          status === ""
            ? !isReacted
              ? reaction
              : ""
            : !status
            ? reaction
            : "",
        reactedAt: new Date(),
      },
      reactions: reactionsCount,
      isReacted: status === "" ? !isReacted : !status,
    });

    const response = await updatePostReaction({
      id: id,
      selectedReaction: reaction,
      reacted: {
        sub: auth?.sub,
        name: user.name,
        picture: user.picture,
        reaction:
          status === ""
            ? !isReacted
              ? reaction
              : ""
            : !status
            ? reaction
            : "",
        reactedAt: new Date(),
      },
      reactions: reactionsCount,
      isReacted: status === "" ? !isReacted : !status,
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
            handleAddReaction(selectedReaction, "");
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
                ? `text-sm lg:text-md font-semibold
                capitalize ${label[selectedReaction]?.color}`
                : "text-sm lg:text-md font-semibold capitalize text-darkgrey-default"
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
