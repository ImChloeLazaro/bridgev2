import React from "react";
import CreatePost from "./managePost/CreatePostCard";
import PostCard from "./post/PostCard";
import { postAtom } from "../store/PostStore";
import { userAtom } from "../../../store/UserStore";

import { useAtomValue } from "jotai";

const MainContent = () => {
  const posts = useAtomValue(postAtom);
  const user = useAtomValue(userAtom);
  return (
    <div className="w-full max-h-screen basis-[72%] overflow-y-scroll no-scrollbar mx-4 mt-4 px-6">
      <CreatePost data={user} />
      {posts.map((post) => {
        return <PostCard key={post.key} data={post} />;
      })}
    </div>
  );
};

export default MainContent;
