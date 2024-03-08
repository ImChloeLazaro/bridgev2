import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { fetchPostAtom, postAtom } from "../../store/PostStore";
import PostCard from "./PostCard";
const PostFeed = () => {
  const posts = useAtomValue(postAtom);
  const fetchPost = useSetAtom(fetchPostAtom);

  useEffect(() => {
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
