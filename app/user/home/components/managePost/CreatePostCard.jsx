import React from "react";
import CreatePostButton from "./CreatePostButton";
import PostMediaButton from "./PostMediaButton";
import PostTemplateButton from "./PostTemplateButton";

import { Card, CardBody, Avatar } from "@nextui-org/react";

const CreatePostCard = ({ data }) => {
  return (
    <Card className="mx-4 mb-6 p-4 bg-white-default">
      <CardBody>
        <div className="flex gap-6 px-6">
          <div className="">
            <Avatar
              showFallback
              fallback={
                <div className="text-2xl font-medium ">{data.name[0]}</div>
              }
              src={data.picture}
              className="w-[85px] h-[85px] text-large"
            />
          </div>
          <div className="w-full px-4 flex flex-col gap-5">
            <CreatePostButton />
            <div className="flex justify-between">
              <PostMediaButton />
              <PostTemplateButton />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default CreatePostCard;
