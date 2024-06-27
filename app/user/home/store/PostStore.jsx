import { restread, restupdate } from "@/app/utils/amplify-rest";
import { atom } from "jotai";

export const postAtom = atom([]);

export const postCountAtom = atom((get) => get(postAtom).length);

export const updatePostReactionAtom = atom(null, async (get, set, update) => {
  const { id, selectedReaction, reacted, reactions, isReacted } = update;
  const selectedPost = get(postAtom).filter((post) => post._id === update.id);

  const oldReactor = selectedPost[0].reacted;
  const isNew = oldReactor
    .map((react) => react)
    .find((react) => react.sub === reacted.sub);
  const userOldReaction = isNew?.reaction;


  const index = selectedPost[0].reacted.findIndex(
    (react) => react.sub === reacted.sub
  );

  let updatedReacted;

  if (index !== -1) {
    selectedPost[0].reacted[index] = reacted;
    updatedReacted = [...selectedPost[0].reacted];
  } else {
    updatedReacted = [...selectedPost[0].reacted, reacted];
  }

  const updatedReactions = isReacted
    ? selectedReaction === userOldReaction
      ? {
          ...reactions,
          [selectedReaction]:
            reactions[selectedReaction] <= 0 ? 0 : reactions[selectedReaction],
        }
      : !userOldReaction?.length
      ? {
          ...reactions,
          [selectedReaction]: reactions[selectedReaction],
          [selectedReaction]:
            reactions[selectedReaction] + 1 <= 0
              ? 0
              : reactions[selectedReaction] + 1,
        }
      : {
          ...reactions,
          [selectedReaction]:
            reactions[selectedReaction] + 1 <= 0
              ? 0
              : reactions[selectedReaction] + 1,
          [userOldReaction]:
            reactions[userOldReaction] - 1 <= 0
              ? 0
              : reactions[userOldReaction] - 1,
        }
    : {
        ...reactions,
        [selectedReaction]:
          reactions[selectedReaction] - 1 <= 0
            ? 0
            : reactions[selectedReaction] - 1,
      };


  const updatedPostReaction = {
    reactionList: [selectedReaction],
    reactions: updatedReactions,
    reacted: updatedReacted,
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
    return { success: true };
  } else {
    return { success: false };
  }
});

export const fetchPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  if (posts?.success) {
    const filteredPosts = posts.response.filter(
      (post) => post.status === "published"
    );
    set(postAtom, filteredPosts);
    return { success: true };
  } else {
    return { success: false };
  }
});
