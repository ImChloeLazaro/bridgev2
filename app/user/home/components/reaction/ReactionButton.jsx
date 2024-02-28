import { Button } from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { reactionIcons } from "./ReactionIcons";
import { updatePostReactionAtom } from "../../store/PostStore";

const ReactionButton = ({ id, reactionList, reacted }) => {
  const updatePostReaction = useSetAtom(updatePostReactionAtom);

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

  const handleAddReaction = async (reaction) => {
    console.log("BEFORE PASSING TO ATOM", {
      id: id,
      selectedReaction: reaction,
      reacted: !reacted,
    });

    const response = await updatePostReaction({
      id: id,
      selectedReaction: reaction,
      reacted: !reacted,
    });

    if (response.success) {
      console.log("CONFIRM WINDOW UPDATED POST REACTION", response.success);
    } else {
      console.log("NO POST REACTION UPDATED");
    }
  };

  return (
    <div className="flex justify-start items-center gap-1">
      <Button
        size="lg"
        disableRipple
        disableAnimation
        className="bg-transparent"
        onPress={() => {
          handleAddReaction(reactionList[0]);
        }}
        startContent={
          <div className="text-darkgrey-default">
            {reactionList?.length
              ? reacted
                ? reactionIcons[reactionList[0]]?.active
                : reactionIcons[reactionList[0]]?.inactive
              : reacted
              ? reactionIcons.star.active
              : reactionIcons.star.inactive}
          </div>
        }
      >
        <p
          className={`${
            reacted
              ? `${label[reactionList[0]]?.color}`
              : "font-semibold text-darkgrey-default capitalize"
          }`}
        >
          {label[reactionList[0]]?.label}
        </p>
      </Button>
    </div>
  );
};

export default ReactionButton;
