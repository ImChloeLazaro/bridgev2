import {
  destroywithparams,
  restread,
  restupdate,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { postAtom, postCountAtom } from "./PostStore";
import { draftPostListAtom, selectedDraftPostAtom } from "./DraftedStore";

// LIST FOR PUBLISHED POSTS
export const publishedPostListAtom = atom([]);

export const publishedPostCountAtom = atom(
  (get) => get(publishedPostListAtom).length
);

export const addPublishPostAtom = atom(null, async (get, set, update) => {
  const { selectedToBePublished, sub } = update;
  const handleAllAreTrue = (arr) => {
    return arr.every((element) => element === true);
  };

  let publishIndex = get(publishedPostCountAtom);
  let postIndex = get(postCountAtom);


  const toBePosted = await Promise.all(
    selectedToBePublished.map(async (post) => {
      const newPost = {
        ...post,
        // caption: post.caption,
        comments: 0,
        datetimePublished: new Date(),
        datetimeScheduled: new Date(),
        id: (publishIndex += 1),
        key: `publish-${publishIndex}`,
        // media: post.media,
        // mediaLayout: post.mediaLayout,
        // orientation: post.orientation,
        postKey: `post-${(postIndex += 1)}`,
        // publisher: post.publisher,
        // publisherPicture: post.publisherPicture,
        reacted: false,
        // reactionList: post.reactionList,
        reactions: {
          star: 0,
          love: 0,
          birthday: 0,
          happy: 0,
        },
        // sub: post.sub,
        status: "published",
        // taggedPeople: post.taggedPeople, // key of users
        // team: post.team,
        // title: post.title,
        // type: post.type,
      };
      // return newPost;
      const postedResponse = await restupdate("/post", newPost);
      const isPosted = await postedResponse?.success;
      if (isPosted) {
        return { success: true };
      } else {
        return { success: false };
      }
    })
  );

  if (handleAllAreTrue(toBePosted.map((post) => post?.success))) {
    // console.log(
    //   `${toBePosted.length} ${
    //     toBePosted.length > 1 ? "posts are" : "post is"
    //   } successfully posted`
    // );
    // Moves drafted post to published post
    set(
      draftPostListAtom,
      get(postAtom).filter(
        (draft) => draft.sub === sub && draft.status === "drafts"
      )
    );

    set(
      publishedPostListAtom,
      get(postAtom).filter(
        (publish) => publish.sub === sub && publish.status === "published"
      )
    );
    // clears the selection when deleting
    set(selectedDraftPostAtom, []);
    set(selectedPublishPostAtom, []);
    return { success: true, postedCount: toBePosted.length };
  } else {
    return { success: false };
  }
});

export const removePublishPostAtom = atom(null, async (get, set, update) => {
  const { selectedPublish, sub } = update;
  const handleAllAreTrue = (arr) => {
    return arr.every((element) => element === true);
  };

  const toBeDeleted = await Promise.all(
    selectedPublish.map(async (publish) => {
      const response = await destroywithparams("/post", { _id: publish._id });

      return { success: response?.success ?? false };
    })
  );
  if (handleAllAreTrue(toBeDeleted.map((post) => post?.success))) {
    // console.log(
    //   `${toBeDeleted.length} ${
    //     toBeDeleted.length > 1 ? "posts are" : "post is"
    //   } successfully deleted`
    // );
    // Moves drafted post to published post
    set(
      publishedPostListAtom,
      get(postAtom).filter(
        (publish) => publish.sub === sub && publish.status === "published"
      )
    );

    set(selectedPublishPostAtom, []); // clears the selection when deleting
    return { success: true, deletedCount: toBeDeleted.length };
  } else {
    return { success: false };
  }
});

export const selectedPublishPostAtom = atom([]);

export const fetchPublishPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  const filteredPublished = posts.response.filter(
    (post) => post.sub === sub && post.status === "published"
  );
  set(publishedPostListAtom, filteredPublished);
});
