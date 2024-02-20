import { Divider } from "@nextui-org/react";
import CommentButton from "./CommentButton";
import CommentCount from "./CommentCount";
import ReactionButton from "../reaction/ReactionButton";
import ReactionCount from "../reaction/ReactionCount";

const PostFooter = ({ data }) => {
  console.log("INSIDE FOOTER POST: ", data);
  return (
    <>
      <div className="flex justify-between w-full px-8 mb-3">
        <ReactionCount data={data.reactions} />

        <CommentCount data={data.comments} />
      </div>
      <Divider />
      <div className="flex justify-between w-full px-8">
        <ReactionButton
          id={data.id} // post ID
          data={data.reactionList?.length ? data.reactionList : ["star"]}
          reacted={data.reacted}
        />

        <CommentButton />
      </div>
    </>
  );
};

export default PostFooter;
