import React from "react";
import PostCard from "./PostCard";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { fetchPostAtom, postAtom } from "../../store/PostStore";
import { useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect, useCallback } from "react";

const PostFeed = () => {
  const posts = useAtomValue(postAtom);
  const fetchPost = useSetAtom(fetchPostAtom);

  useEffect(() => {
    console.log("FETCHED POSTS");
    fetchPost();
  }, [fetchPost]);

  const filteredPosts = posts.filter((post) => post.datetimePublished);

  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.datetimePublished) - new Date(a.datetimePublished)
  );
  return sortedPosts.map((post) => {
    return <PostCard key={post._id} data={post} />;
  });
};

export default PostFeed;
