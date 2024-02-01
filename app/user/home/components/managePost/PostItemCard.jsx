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
import { reactionIcons } from "../post/ReactionIcons";
import { MdPersonAdd } from "react-icons/md";

const PostItemCard = () => {
  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex-col gap-3 justify-start items-start">
        <User
          name={
            <p className="font-extrabold text-lg">Momentum / SEPTEMBER 2023</p>
          }
          avatarProps={{
            alt: "nextui logo",
            height: "30",

            src: "https://avatars.githubusercontent.com/u/86160567?s:200&v=4",
            width: "30",
          }}
        />

        <ChipTag text={"Aretex A-TEAM"} color={"blue"} />
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          {
            "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! "
          }
        </p>
        <div className="bg-grey-hover rounded-md mt-3 w-full h-32"></div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div>{reactionIcons.star.badge}</div>
          <div className="flex items-center gap-2">
            <MdPersonAdd size={22}/>
            <AvatarGroup
              isBordered
              max={4}
              total={10}
              renderCount={(count) => (
                <p className="text-small text-foreground font-medium ms-2">
                  +{count} others
                </p>
              )}
            >
              <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostItemCard;
