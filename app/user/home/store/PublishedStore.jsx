import {
  destroywithparams,
  restinsert,
  restread,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { postCountAtom } from "./PostStore";

// LIST FOR PUBLISHED POSTS
export const publishedPostListAtom = atom([]);

export const publishedPostCountAtom = atom(
  (get) => get(publishedPostListAtom).length
);

export const addPublishPostAtom = atom(
  null,
  async (get, set, selectedToBePublished) => {
    const handleAllAreTrue = (arr) => {
      return arr.every((element) => element === true);
    };

    console.log("SELECTED POST HERE", selectedToBePublished);

    let publishIndex = get(publishedPostCountAtom);
    let postIndex = get(postCountAtom);

    console.log("PUBLISH: publishPostCount postIndex", publishIndex, postIndex);

    const toBePosted = await Promise.all(
      selectedToBePublished.map(async (post) => {
        console.log("POST DETAILS", post);
        const deletedResponse = await destroywithparams("/post", {
          _id: post._id,
        });

        const newPost = {
          // ...post,
          caption: post.caption,
          comments: 0,
          datetimePublished: new Date(),
          datetimeScheduled: new Date(),
          id: (publishIndex += 1),
          key: `publish-${publishIndex}`,
          media: post.media,
          mediaLayout: post.mediaLayout,
          orientation: post.orientation,
          postKey: `post-${(postIndex += 1)}`,
          publisher: post.publisher,
          publisherPicture: post.publisherPicture,
          reacted: false,
          reactionList: post.reactionList,
          reactions: {
            star: 0,
            love: 0,
            birthday: 0,
            happy: 0,
          },
          sub: post.sub,
          status: "published",
          taggedPeople: post.taggedPeople, // key of users
          team: post.team,
          title: post.title,
          type: post.type,
        };
        // return newPost;
        console.log("POST DETAILS", newPost);
        const postedResponse = await restinsert("/post", { ...newPost });
        console.log("PUBLISH RESPONSE", postedResponse);
        console.log("DELETED RESPONSE", deletedResponse);

        return {
          success:
            ((await postedResponse.success) &&
              (await deletedResponse.success)) ??
            false,
        };
      })
    );

    console.log("PUBLISH: toBePosted TYPE", typeof toBePosted);
    console.log("PUBLISH: toBePosted", toBePosted);

    if (handleAllAreTrue(toBePosted.map((post) => post.success))) {
      console.log("POSTS ACKNOWLEDGED: ", toBePosted);
      console.log(
        `${toBePosted.length} ${
          toBePosted.length > 1 ? "posts are" : "post is"
        } successfully posted`
      );
      // Moves drafted post to published post
      set(
        publishedPostListAtom,
        get(publishedPostListAtom).filter(
          (publish) => !get(selectedPublishPostAtom).includes(publish.key)
        )
      );

      set(selectedPublishPostAtom, []); // clears the selection when deleting
      return { success: true, postedCount: toBePosted.length };
    } else {
      return { success: false };
    }
  }
);

export const removePublishPostAtom = atom(
  null,
  async (get, set, selectedPublish) => {
    const handleAllAreTrue = (arr) => {
      return arr.every((element) => element === true);
    };

    const toBeDeleted = await Promise.all(
      selectedPublish.map(async (publish) => {
        console.log("TO BE DELETED POST", publish._id);
        console.log("TO BE DELETED POST TYPE", typeof publish);
        const response = await destroywithparams("/post", { _id: publish._id });
        console.log("DELETE RESPONSE", response);
        return { success: response.success ?? false };
      })
    );
    if (handleAllAreTrue(toBeDeleted.map((post) => post.success))) {
      console.log("DELETED ACKNOWLEDGED: ", toBeDeleted);
      console.log(
        `${toBeDeleted.length} ${
          toBeDeleted.length > 1 ? "posts are" : "post is"
        } successfully deleted`
      );
      // Moves drafted post to published post
      set(
        publishedPostListAtom,
        get(publishedPostListAtom).filter(
          (publish) => !get(selectedPublishPostAtom).includes(publish.key)
        )
      );

      set(selectedPublishPostAtom, []); // clears the selection when deleting
      return { success: true, deletedCount: toBeDeleted.length };
    } else {
      return { success: false };
    }
  }
);

export const selectedPublishPostAtom = atom([]);

export const fetchPublishPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  if (posts.success) {
    console.log("POSTS DATA", posts);
    const filteredPublished = posts.response.filter(
      (post) => post.sub === sub && post.status === "published"
    );
    set(publishedPostListAtom, filteredPublished);
  } else {
    console.log("POSTS DATA FAILED");
  }
});
