import React from "react";
import PostHeader from "./PostHeader";
import MediaLayout from "../mediaLayout/MediaLayout";
import PostFooter from "./PostFooter";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

const PostCard = ({ data }) => {
  return (
    // mb-[number] for spacing between posts
    <Card className="mb-6 mx-4 bg-white-default">
      <CardHeader className="flex flex-col p-2 m-2 w-full">
        <PostHeader data={data} />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-center items-center px-0 h-fit">
        <div className="w-fit px-2 mx-2 flex flex-col items-center justify-center gap-6">
          <p className="uppercase font-bold text-2xl">{data.title}</p>
          <p className="text-justify line-clamp-2 font-medium text-base px-4 mx-4">
            {data.caption}
          </p>
        </div>
        <MediaLayout data={data.media} />
      </CardBody>
      <CardFooter className="flex flex-col px-4">
        <PostFooter data={data} />
      </CardFooter>
    </Card>
  );
};
export default PostCard;
