import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import MediaLayout from "../mediaLayout/MediaLayoutPost";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

const PostCard = ({ data }) => {
  return (
    // mb-[number] for spacing between posts

    <Card className="height-full h-full mb-2 mx-0 lg:mb-6 lg:mx-4 bg-white-default rounded-none lg:rounded-xl">
      <CardHeader className="flex flex-col p-2 m-2 w-full">
        <PostHeader data={data} />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-center items-center h-full m-0 p-0">
        <div className="w-full px-2 py-3 flex flex-col items-center justify-center gap-2 lg:gap-6">
          <p className="uppercase font-bold text-base lg:text-2xl">{data.title}</p>
          <p className="text-justify line-clamp-2 font-medium text-sm lg:text-base px-4 mx-4">
            {data.caption}
          </p>
        </div>
        <MediaLayout
          mediaList={data.media}
          orientation={data.orientation}
          layout={data.mediaLayout}
        />
      </CardBody>
      <CardFooter className="flex flex-col px-0 md:px-2 lg:px-4">
        <PostFooter data={data} />
      </CardFooter>
    </Card>
    
  );
};
export default PostCard;
