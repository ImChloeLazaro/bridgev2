import { Divider } from "@nextui-org/react";
import CommentButton from "./CommentButton";
import CommentCount from "./CommentCount";
import ReactionButton from "./ReactionButton";
import ReactionCount from "./ReactionCount";

const PostFooter = ({ data }) => {
  return (
    <>
      <div className="flex justify-between w-full px-8 mb-3">
        <ReactionCount data={data.reactions} />

        <CommentCount data={data.comments} />
      </div>
      <Divider />
      <div className="flex justify-between w-full px-8">
        <ReactionButton
          id={data.id}
          data={data.reactionsList}
          reacted={data.reacted}
        />

        <CommentButton />
      </div>
    </>
  );
};

export default PostFooter;
