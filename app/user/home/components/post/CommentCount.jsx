import React from "react";

import { Link } from "@nextui-org/react";

const CommentCount = ({ data }) => {
  return (
    <Link className="flex justify-start items-center gap-1.5">
      <p className="font-bold text-darkgrey-default">{data}</p>
      <p className="font-bold text-darkgrey-default">comments</p>
    </Link>
  );
};

export default CommentCount;
