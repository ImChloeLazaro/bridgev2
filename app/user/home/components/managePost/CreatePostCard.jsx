import React from "react";
import PostTemplateButton from "./PostTemplateButton";
import PostMediaButton from "./PostMediaButton";

import { Card, CardBody, Avatar } from "@nextui-org/react";
import CreatePostButton from "./CreatePostButton";

const CreatePost = ({ data }) => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="mx-4 mb-6 p-4 bg-white-default">
      <CardBody>
        <div className="flex gap-6 px-6">
          <div className="">
            <Avatar
              src={data.profileURL}
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
export default CreatePost;
