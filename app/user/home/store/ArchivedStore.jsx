import {
  destroywithparams,
  restinsert,
  restread,
  restupdate,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { postAtom } from "./PostStore";
import {
  publishedPostListAtom,
  selectedPublishPostAtom,
} from "./PublishedStore";

// LIST FOR ARCHIVED POSTS
export const archivedPostListAtom = atom([]);

export const archivedPostCountAtom = atom(
  (get) => get(archivedPostListAtom).length
);

export const addArchivePostAtom = atom(null, async (get, set, update) => {
  const { selectedToBeArchived, sub } = update;

  const handleAllAreTrue = (arr) => {
    return arr.every((element) => element === true);
  };

  let archiveIndex = get(archivedPostCountAtom);

  const toBeArchived = await Promise.all(
    selectedToBeArchived.map(async (post) => {

      const newArchive = {
        ...post,
        // caption: post.caption,
        // comments: post.comments,
        // datetimePublished: post.datetimePublished,
        // datetimeScheduled: post.datetimeScheduled,
        id: (archiveIndex += 1),
        key: `archive-${archiveIndex}`,
        // media: post.media,
        // mediaLayout: post.mediaLayout,
        // orientation: post.orientation,
        // postKey: post.postKey,
        // publisher: post.publisher,
        // publisherPicture: post.publisherPicture,
        // reacted: post.reacted,
        // reactionList: post.reactionList,
        // reactions: post.reactions,
        // sub: post.sub,
        status: "archived",
        // taggedPeople: post.taggedPeople, // key of users
        // team: post.team,
        // title: post.title,
        // type: post.type,
      };
      // return newPost;

      const archivedResponse = await restupdate("/post", newArchive);
      const isPosted = await archivedResponse?.success;
      if (isPosted) {
        return { success: true };
      } else {
        return { success: false };
      }
    })
  );

  if (handleAllAreTrue(toBeArchived.map((post) => post?.success))) {
    // console.log(
    //   `${toBeArchived.length} ${
    //     toBeArchived.length > 1 ? "posts are" : "post is"
    //   } successfully archived`
    // );
    // Moves drafted post to published post
    set(
      archivedPostListAtom,
      get(postAtom).filter(
         (archive) => archive.sub === sub && archive.status === "archived"
      )
    );

    set(
      publishedPostListAtom,
      get(postAtom).filter(
         (publish) => publish.sub === sub && publish.status === "published"
      )
    );

    set(selectedPublishPostAtom, []);
    set(selectedArchivePostAtom, []); // clears the selection when deleting
    return { success: true, postedCount: toBeArchived.length };
  } else {
    return { success: false };
  }
});

export const removeArchivePostAtom = atom(null, async (get, set, update) => {
  const { selectedArchive, sub } = update;
  const handleAllAreTrue = (arr) => {
    return arr.every((element) => element === true);
  };

  const toBeArchived = await Promise.all(
    selectedArchive.map(async (archive) => {
      const response = await destroywithparams("/post", { _id: archive._id });

      return { success: response?.success ?? false };
    })
  );
  if (handleAllAreTrue(toBeArchived.map((post) => post?.success))) {
    // console.log(
    //   `${toBeArchived.length} ${
    //     toBeArchived.length > 1 ? "posts are" : "post is"
    //   } successfully archived`
    // );
    // Moves published post to archived post
    set(
      archivedPostListAtom,
      get(postAtom).filter(
         (archive) => archive.sub === sub && archive.status === "archived"
      )
    );

    set(selectedArchivePostAtom, []); // clears the selection when deleting
    return { success: true, deletedCount: toBeArchived.length };
  } else {
    return { success: false };
  }
});

export const selectedArchivePostAtom = atom([]);

export const fetchArchivePostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  const filteredArchived = posts.response.filter(
    (post) => post.sub === sub && post.status === "archived"
  );
  set(archivedPostListAtom, filteredArchived);
});
