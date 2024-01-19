import React from "react";
import PostCard from "./post/PostCard";
import CreatePost from "./managePost/CreatePostCard";

import { useAtom, useAtomValue } from "jotai";
import { postAtom } from "../store/PostStore";
import { userAtom } from "../../../store/UserStore";

const NewsFeed = () => {
  const posts = useAtomValue(postAtom);
  const user = useAtomValue(userAtom);
  return (
    <div className="w-full max-h-screen basis-[72%] overflow-y-scroll no-scrollbar m-4 px-6">
      <CreatePost data={user} />
      {posts.map((post) => {
        // console.log(post)
        return <PostCard key={post.key} data={post} />;
      })}
    </div>
  );
};

export default NewsFeed;
