import { atom } from "jotai";
// LIST FOR ARCHIVED POSTS
export const archivedPostListAtom = atom([]);

export const archivedPostCountAtom = atom(
  (get) => get(archivedPostListAtom).length
);
export const addArchivePostAtom = atom(null, (get, set, update) => {
  set(archivedPostListAtom, update);
  console.log("ADDED ARCHIVE", get(archivedPostListAtom));
 });
export const selectedArchivePostAtom = atom([]);
