import { Skeleton, cn } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { fetchPostAtom, postAtom } from "../../store/PostStore";
import PostCard from "./PostCard";

const PostFeed = ({ className }) => {
  const posts = useAtomValue(postAtom);
  const fetchPost = useSetAtom(fetchPostAtom);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const filteredPosts = posts.filter((post) => post.datetimePublished);

  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.datetimePublished) - new Date(a.datetimePublished)
  );
  return (
    <div className={cn(className)}>
      {sortedPosts.map((post) => {
        return (
          <Suspense
            key={post._id}
            fallback={<Skeleton className="w-full h-full" />}
          >
            <PostCard key={post._id} data={post} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default PostFeed;
