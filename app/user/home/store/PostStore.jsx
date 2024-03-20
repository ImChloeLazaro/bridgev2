import { fetchRoleAtom } from "@/app/navigation/store/NavSideBarStore";
import { restread, restupdate } from "@/app/utils/amplify-rest";
import { atom } from "jotai";

export const testPostAtom = atom();

export const postAtom = atom([]);

export const postCountAtom = atom((get) => get(postAtom).length);
// const auth = useAtomValue(authenticationAtom);
export const updatePostReactionAtom = atom(null, async (get, set, update) => {
  // console.log(auth);
  const { id, selectedReaction, reacted, reactions, prevReaction, isReacted } =
    update;
  const selectedPost = get(postAtom).filter((post) => post._id === update.id);
  // const updatedSelectedReaction = reacted
  //   ? (reactions[selectedReaction] += 1)
  //   : (reactions[selectedReaction] -= 1);

  // const updatedPrevReaction = reacted
  //   ? (reactions[prevReaction] += 1)
  //   : (reactions[prevReaction] -= 1);

  // const updatedReactions = {
  //   ...reactions,
  //   [selectedReaction]:
  //     updatedSelectedReaction < 0 ? 0 : updatedSelectedReaction,
  // };
  //new one

  const oldReactor = selectedPost[0].reacted;
  const isNew = oldReactor
    .map((react) => react)
    .find((react) => react.sub === reacted.sub);
  const userOldReaction = isNew?.reaction;
  // const UpdatedReactor = oldReactor.map((react) =>
  //   react.sub === reacted.sub
  //     ? { ...selectedPost[0].reacted, reacted }
  //     : reacted
  // );
  console.log("New Reacted at post store: ", reacted.sub);
  const index = selectedPost[0].reacted.findIndex(
    (react) => react.sub === reacted.sub
  );

  let updatedReacted;

  if (index !== -1) {
    selectedPost[0].reacted[index] = reacted;
    updatedReacted = selectedPost[0].reacted;
  } else {
    updatedReacted = [
      ...selectedPost[0].reacted,
      {
        sub: reacted.sub,
        reaction: reacted.reaction,
        reactedAt: reacted.reactedAt,
      },
    ];
  }

  const updatedReactions = isReacted
    ? selectedReaction === userOldReaction
      ? {
          ...reactions,
          [selectedReaction]:
            reactions[selectedReaction] <= 0 ? 0 : reactions[selectedReaction],
        }
      : userOldReaction === ""
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
  // const updatedReactions = isReacted
  //   ? selectedReaction === userOldReaction
  //     ? {
  //         ...reactions,
  //         [selectedReaction]: (reactions[selectedReaction] += 1),
  //       }
  //     : {
  //         ...reactions,
  //         [selectedReaction]: (reactions[selectedReaction] -= 1),
  //         [userOldReaction]: (reactions[userOldReaction] -= 1 <= 0)
  //           ? 0
  //           : (reactions[userOldReaction] -= 1),
  //       }
  //   : selectedReaction !== userOldReaction
  //   ? {
  //       ...reactions,
  //       [selectedReaction]: (reactions[selectedReaction] -= 1 <= 0)
  //         ? 0
  //         : (reactions[selectedReaction] -= 1),
  //     }
  //   : {
  //       ...reactions,
  //       [selectedReaction]: (reactions[selectedReaction] -= 1 <= 0)
  //         ? 0
  //         : (reactions[selectedReaction] -= 1),
  //     };
  // const handleReaction = () => {
  //   console.log("reacted", reacted);
  //   console.log("selectedReaction", selectedReaction);
  //   console.log("prevReaction", prevReaction);
  //   if (reacted) {
  //     console.log("reacted T", reacted);

  //     if (selectedReaction === prevReaction) {
  //       console.log("selectedReaction T", selectedReaction);

  //       return {
  //         ...reactions,
  //         [selectedReaction]: (reactions[selectedReaction] += 1),
  //       };
  //     }
  // else {
  //   console.log("selectedReaction F", selectedReaction);

  //   return {
  //     ...reactions,
  //     [selectedReaction]: (reactions[selectedReaction] += 1),
  //     [prevReaction]:
  //       (reactions[prevReaction] -= 1) < 0
  //         ? 0
  //         : (reactions[prevReaction] -= 1),
  //   };
  // }
  //   } else {
  //     console.log("reacted F", reacted);

  //     return {
  //       ...reactions,
  //       [selectedReaction]:
  //         (reactions[selectedReaction] -= 1) < 0
  //           ? 0
  //           : (reactions[selectedReaction] -= 1),
  //     };
  //   }
  // };
  // const t =
  //   selectedReaction === prevReaction
  //     ? {
  //         ...reactions,
  //         [selectedReaction]:
  //           updatedSelectedReaction < 0 ? 0 : updatedSelectedReaction,
  //       }
  //     : {
  //         ...reactions,
  //         [selectedReaction]:
  //           updatedSelectedReaction < 0 ? 0 : updatedSelectedReaction,
  //         [prevReaction]: updatedPrevReaction < 0 ? 0 : updatedPrevReaction,
  //       };

  console.log("reactions: HERE", updatedReactions);

  const updatedPostReaction = {
    ...selectedPost[0],
    // _id: id,
    reactionList: [selectedReaction],
    reactions: updatedReactions,
    reacted: updatedReacted,
  };
  console.log("Post: ", updatedPostReaction);

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
