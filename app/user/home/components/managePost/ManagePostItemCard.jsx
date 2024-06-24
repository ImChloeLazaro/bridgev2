import LabelTagChip from "@/app/components/LabelTagChip";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import "../../../../aws-auth";
import MediaLayoutPreview from "../mediaLayout/MediaLayoutPreview";
import { reactionIcons } from "../reaction/ReactionIcons";

const ManagePostItemCard = ({ data }) => {
  const reactionStack = {
    0: "-ml-1",
    1: "-ml-2",
    2: "-ml-2.5",
    3: "-ml-3",
    4: "-ml-4",
  };

  const handleReactionCount = (object) => {
    return Object.values(object).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  };

  return (
    <Card className="max-w-[20rem] w-[20rem] h-fit rounded-lg scale-100 hover:scale-105 transition-all duration-300">
      <CardHeader className="flex-col gap-1 justify-start items-start pb-2">
        <User
          name={
            <p className="font-bold text-base line-clamp-1 w-full max-w-56">
              {data.title?.length ? data.title : "NO TITLE"}
            </p>
          }
          avatarProps={{
            alt: "nextui logo",
            size: "sm",
            src: data.publisherPicture,
            width: "30",
            className: "w-[28px] h-[28px]",
          }}
          className="mb-1"
        />
        <div className="flex gap-2">
          {data.team?.length ? (
            <LabelTagChip
              text={data.team}
              color={"lightblue"}
              size={"xs"}
              isFilled={false}
              className={"h-6 lg:h-6"}
              classNameLabel={"lg:text-xs"}
            />
          ) : (
            <div></div>
          )}
          {data.type?.length ? (
            <LabelTagChip
              text={data.type}
              color={"orange"}
              size={"xs"}
              isFilled={false}
              className={"h-6 lg:h-6"}
              classNameLabel={"lg:text-xs"}
            />
          ) : (
            <div></div>
          )}
        </div>
      </CardHeader>

      <CardBody className="w-full py-0">
        <p className="px-2 h-[2.25rem] font-medium text-sm tracking-tight leading-tight line-clamp-2">
          {data.caption?.length ? data.caption : "NO CAPTION"}
        </p>
        <div className="h-40 bg-white-default flex justify-center items-center py-2 m-0 rounded-md ">
          <MediaLayoutPreview
            mediaFileList={data.media}
            layout={data.mediaLayout}
            orientation={data.orientation}
          />
        </div>
      </CardBody>

      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="flex relative isolate ml-1">
            {/* {Object.keys(data.reactions).map((reaction, index) => (
              <div key={reaction} className={`${reactionStack[index]}`}>
                {reactionIcons[`${reaction}`].badge}
              </div>
            ))} */}
            <p className="ml-2 font-bold text-darkgrey-default">
              {/* {handleReactionCount(data.reactions)} */}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AvatarGroup
              max={4}
              total={10}
              renderCount={(count) => (
                <p className="text-xs text-foreground font-medium ms-1">
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
            </AvatarGroup>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ManagePostItemCard;
