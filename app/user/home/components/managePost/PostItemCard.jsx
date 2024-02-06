import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  User,
  Image,
  Avatar,
  AvatarGroup,
} from "@nextui-org/react";
import ChipTag from "@/app/components/ChipTag";
import { reactionIcons } from "../reaction/ReactionIcons";
import { MdPersonAdd } from "react-icons/md";

const PostItemCard = ({ data }) => {
  return (
    // {/* border-blue-default border-2 */}
    <Card className="max-w-[330px] h-fit scale-100 rounded-lg hover:scale-105 ml-2">
      <CardHeader className="flex-col gap-1 justify-start items-start pb-2">
        <User
          name={<p className="font-bold text-base">{data.title}</p>}
          avatarProps={{
            alt: "nextui logo",
            size: "sm",
            src: data.picture,
            width: "30",
            className: "w-[28px] h-[28px]",
          }}
          className="mb-1"
        />
        <div className="flex gap-2">
          <ChipTag text={data.team} color={"lightblue"} size={"xs"} />
          <ChipTag text={data.type} color={"orange"} size={"xs"} />
        </div>
      </CardHeader>

      <CardBody className="py-0">
        <p className="font-medium text-sm tracking-tight leading-tight">
          {data.caption}
        </p>
        <div className="bg-grey-hover rounded-md mt-3 w-full h-32"></div>
      </CardBody>

      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div>{reactionIcons.star.badge}</div>
          <div className="flex items-center gap-2">
            <MdPersonAdd size={22} />
            <AvatarGroup
              size="sm"
              max={4}
              total={10}
              renderCount={(count) => (
                <p className="text-small text-foreground font-medium ms-1">
                  +{count} others
                </p>
              )}
            >
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              />
            </AvatarGroup>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostItemCard;
