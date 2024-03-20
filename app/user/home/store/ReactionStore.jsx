import { atom } from "jotai";
import { restread, restupdate } from "@/app/utils/amplify-rest";
import { reactionIcons } from "../components/reaction/ReactionIcons";

let reactionIndex = 0;
export const reactionsSelectionAtom = atom([
  {
    id: 1,
    key: "love",
    label: "Love",
    selectIcon: reactionIcons.love.badge,
    displayIcon: reactionIcons.love.borderBadge,
  },
  {
    id: 2,
    key: "birthday",
    label: "Birthday",
    selectIcon: reactionIcons.birthday.badge,
    displayIcon: reactionIcons.birthday.borderBadge,
  },
  {
    id: 3,
    key: "star",
    label: "Star",
    selectIcon: reactionIcons.star.badge,
    displayIcon: reactionIcons.star.borderBadge,
  },
  {
    id: 4,
    key: "happy",
    label: "Happy",
    selectIcon: reactionIcons.happy.badge,
    displayIcon: reactionIcons.happy.borderBadge,
  },
]);
// Displayed Reaction on Post
export const displayedReactionAtom = atom();

// Default Reactions for Post in Posting
export const selectedReactionsAtom = atom(new Set([]));

// Selected Reaction on Hover
export const selectedReactionOnHoverAtom = atom("");

//
export const updateSelectedReactionAtom = atom(
  null,
  async (get, set, update) => {
    const { id, selectedReaction, reacted } = update;

    const selectedPost = get(postAtom).filter((post) => post._id === update.id);
    const updateReactionCount = reacted
      ? (selectedPost[0].reactions[selectedReaction] += 1)
      : (selectedPost[0].reactions[selectedReaction] -= 1);

    const updatedReactions = {
      ...selectedPost[0].reactions,
      [selectedReaction]: updateReactionCount <= 0 ? 0 : updateReactionCount,
    };

    const updatedPostReaction = {
      ...selectedPost[0],
      _id: id,
      reactions: updatedReactions,
      reacted: reacted,
    };

    const updateSelectedReaction = get(postAtom).map((post) => {
      if (id === post._id) {
        return { ...post, ...updatedPostReaction };
      }
      return { ...post };
    });

    set(postAtom, updateSelectedReaction);

    const posts = await restupdate("/post/greeting", updatedPostReaction);
    const isReactionUpdated = posts.response.acknowledged;

    if (isReactionUpdated) {
      console.log("REACTED ON POST SUCCESS");
      return { success: true };
    } else {
      console.log("REACTED ON POST FAILED");
      return { success: false };
    }
  }
);
