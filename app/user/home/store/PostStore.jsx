import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { atom } from "jotai";
import "../../../aws-auth";
import { restread, restinsert } from "@/app/utils/amplify-rest";
let index = 0;

export const postAtom = atom([]);

export const addPostAtom = atom(null, async (get, set, update) => {
  set(postAtom, update);
  console.log("ADDED POST", get(postAtom));
});

export const updatePostAtom = atom(null, (get, set, update) => {
  set(postAtom, update);
  console.log("UPDATED POST", get(postAtom));
});

export const deletePostAtom = atom(null, (get, set, update) => {
  set(postAtom, update);
  console.log("DELETE POST", get(postAtom));
});

export const postCountAtom = atom((get) => get(postAtom).length);

export const fetchPostAtom = atom(null, async (get, set) => {
  const posts = await restread("/post");
  console.log("POSTS DATA", posts);

  set(postAtom, posts.response)
});
