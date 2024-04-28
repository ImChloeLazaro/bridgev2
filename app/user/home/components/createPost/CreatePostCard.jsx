import { Avatar, Card, CardBody } from "@nextui-org/react";
import CreatePostButton from "./CreatePostButton";
import ManagePostMediaButton from "../managePost/ManagePostMediaButton";
import CreatePostTemplateButton from "./CreatePostTemplateButton";

const CreatePostCard = ({ data }) => {
  return (
    <Card className="p-2 md:p-4 mx-0 lg:mx-4 mb-2 md:mb-4 lg:mb-6 bg-white-default rounded-none md:rounded-lg">
      <CardBody>
        <div className="flex gap-6 px-2 md:px-6">
          <div className="hidden md:block ">
            <Avatar
              showFallback
              fallback={
                <div className="text-2xl font-medium ">{data.name[0]}</div>
              }
              src={data.picture}
              className="lg:w-[85px] lg:h-[85px] md:w-[70px] md:h-[70px] w-[65px] h-[65px] text-large"
            />
          </div>
          <div className="w-full flex flex-col md:px-4 gap-3 md:gap-5">
            <CreatePostButton />
            <div className="flex justify-between">
              <ManagePostMediaButton />
              <CreatePostTemplateButton />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default CreatePostCard;
