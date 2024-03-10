import { Link } from "@nextui-org/react";

const CommentCount = ({ data }) => {
  return (
    <Link className="flex justify-start items-center gap-1.5">
      <p className="font-bold text-darkgrey-default">
        {`${data > 0 ? data : "No"} ${data > 1 ? "comments" : "comment"}`}
      </p>
    </Link>
  );
};

export default CommentCount;
