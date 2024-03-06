import { restread, restupdate } from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import "../../../aws-auth";

export const postAtom = atom([]);

export const postCountAtom = atom((get) => get(postAtom).length);

export const updatePostReactionAtom = atom(null, async (get, set, update) => {
  const { id, selectedReaction, reacted } = update;

  const selectedPost = get(postAtom).filter((post) => post._id === update.id);
  const updateReactionCount = reacted
    ? (selectedPost[0].reactions[selectedReaction] += 1)
    : (selectedPost[0].reactions[selectedReaction] -= 1);

  const updatedReactions = {
    ...selectedPost[0].reactions,
    [selectedReaction]: updateReactionCount < 0 ? 0 : updateReactionCount,
  };

  const updatedPostReaction = {
    ...selectedPost[0],
    _id: id,
    reactions: updatedReactions,
    reacted: reacted,
  };

  const updateDisplayedReaction = get(postAtom).map((post) => {
    if (id === post._id) {
      return { ...post, ...updatedPostReaction };
    }
    return { ...post };
  });

  set(postAtom, updateDisplayedReaction);

  const posts = await restupdate("/post/greeting", updatedPostReaction);
  const isReactionUpdated = posts.response.acknowledged;

  if (isReactionUpdated) {
    console.log("REACTED ON POST SUCCESS");
    return { success: true };
  } else {
    console.log("REACTED ON POST FAILED");
    return { success: false };
  }
});

export const fetchPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  if (posts.success) {
    const filteredPosts = posts.response.filter(
      (post) => post.status === "published"
    );
    set(postAtom, filteredPosts);
    return { success: true };
  } else {
    console.log("POSTS DATA FAILED");
    return { success: false };
  }
});
