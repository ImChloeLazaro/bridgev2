import { restread } from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import "../../../aws-auth";

export const postAtom = atom([]);

export const postCountAtom = atom((get) => get(postAtom).length);

export const fetchPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  if (posts.success) {
    const filteredPosts = posts.response.filter(
      (post) => post.status === "published"
    );
    set(postAtom, filteredPosts);
  } else {
    console.log("POSTS DATA FAILED");
  }
});
