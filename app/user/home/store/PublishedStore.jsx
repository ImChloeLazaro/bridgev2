import { atom } from "jotai";
// LIST FOR PUBLISHED POSTS
export const publishedPostListAtom = atom([]);

export const publishedPostCountAtom = atom(
  (get) => get(publishedPostListAtom).length
);
export const addPublishPostAtom = atom(null, (get, set, update) => {
  set(publishedPostListAtom, update);
  console.log("ADDED PUBLISH", get(publishedPostListAtom));
 });
export const selectedPublishPostAtom = atom([]);
