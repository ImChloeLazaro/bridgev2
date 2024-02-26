import { restread } from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import "../../../aws-auth";
import { addDraftPostAtom, draftPostCountAtom } from "./DraftedStore";
import {
  mediaFileListAtom,
  postCaptionAtom,
  postTitleAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedPostStatusAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
} from "./ManagePostStore";
import { userAtom } from "@/app/store/UserStore";
let index = 0;

export const postAtom = atom([]);

export const testAtom = atom([{ ttttt: "JAJAJAJAJ" }]);

export const addPostAtom = atom(null, async (get, set, update) => {
  set(postAtom, update);
  console.log("ADDED POST", get(postAtom));
});

export const publishPostAtom = atom(null, async (get, set, update) => {
  set(postAtom, update);
  console.log("PUBLISHED POST", get(postAtom));
});

export const updatePostAtom = atom(null, (get, set, update) => {
  set(postAtom, update);
  console.log("UPDATED POST", get(postAtom));
});

export const deletePostAtom = atom(null, (get, set, update) => {
  // REWRITE THIS ATOM CODE
  // console.log("DELETE THE UPDATE", update);
  // const toBeDeleted = get(testAtom).map((prev) => {
  //   console.log("PREV UPDATE", prev);
  //   return { ...prev, ...update };
  // });
  // console.log("TESTING toBeDeleted", toBeDeleted);
  // set(testAtom, toBeDeleted);
  // console.log("DELETE POST", get(testAtom));
  set(postAtom, update);
  console.log("DELETED POST", get(postAtom));
});

export const postCountAtom = atom((get) => get(postAtom).length);

export const fetchPostAtom = atom(null, async (get, set) => {
  const posts = await restread("/post");
  if (posts.success) {
    console.log("POSTS DATA", posts);
    set(postAtom, posts.response);
  } else {
    console.log("POSTS DATA FAILED");
  }
});
