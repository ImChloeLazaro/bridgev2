import { Button } from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { postAtom } from "../../store/PostStore";
import { reactionIcons } from "./ReactionIcons";

const ReactionButton = ({ id, data, reacted }) => {
  const setPost = useSetAtom(postAtom);
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

  const handleAddReaction = (post_id) => {
    setPost((prev) => {
      return prev.map((post) => {
        if (id === post.id) {
          if (reacted) {
            return {
              ...post,
              reacted: !reacted,
              reactions: {
                ...post.reactions,
                [post_id]: (post.reactions[post_id] -= 1),
              },
            };
          } else {
            return {
              ...post,
              reacted: !reacted,
              reactions: {
                ...post.reactions,
                [post_id]: (post.reactions[post_id] += 1),
              },
            };
          }
        }

        return { ...post };
      });
    });
  };

  console.log("DATA INSIDE REACTION BUTTON id", id);
  console.log("DATA INSIDE REACTION BUTTON data", data);
  console.log("DATA INSIDE REACTION BUTTON reacted", reacted);

  return (
    <div className="flex justify-start items-center gap-1">
      <Button
        size="lg"
        disableRipple
        disableAnimation
        className="bg-transparent"
        onPress={() => {
          handleAddReaction(data[0]);
        }}
        startContent={
          <div className="text-darkgrey-default">
            {data?.length
              ? reacted
                ? reactionIcons[data[0]]?.active
                : reactionIcons[data[0]]?.inactive
              : reacted
              ? reactionIcons.star.active
              : reactionIcons.star.inactive}
          </div>
        }
      >
        <p
          className={`${
            reacted
              ? `${label[data[0]]?.color}`
              : "font-semibold text-darkgrey-default capitalize"
          }`}
        >
          {label[data[0]]?.label}
        </p>
      </Button>
    </div>
  );
};

export default ReactionButton;
