import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { fetchPostAtom, postAtom } from "../../store/PostStore";
import PostCard from "./PostCard";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

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
    return (
      <Suspense
        key={post._id}
        fallback={<Skeleton className="w-full h-full rounded-lg" />}
      >
        <PostCard key={post._id} data={post} />
      </Suspense>
    );
  });
};

export default PostFeed;
