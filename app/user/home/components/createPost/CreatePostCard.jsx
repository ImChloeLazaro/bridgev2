import { Avatar, Card, CardBody, cn } from "@nextui-org/react";
import CreatePostButton from "./CreatePostButton";
import ManagePostMediaButton from "../managePost/ManagePostMediaButton";
import CreatePostTemplateButton from "./CreatePostTemplateButton";

const CreatePostCard = ({ data, className }) => {
  return (
    <Card
      className={cn(
        className,
        "p-2 lg:px-2 lg:py-4 xl:px-4 xl:py-4 mx-0 lg:mx-4 mb-2 lg:mb-4 xl:mb-6",
        "bg-white-default rounded-none lg:rounded-xl"
      )}
    >
      <CardBody className="px-0">
        <div className="flex lg:gap-2 xl:gap-6 px-2 md:px-4 xl:px-6">
          <div className="hidden md:block ">
            <Avatar
              showFallback
              fallback={
                <div className="text-2xl font-medium ">{data.name[0]}</div>
              }
              src={data.picture}
              className="xl:w-[85px] xl:h-[85px] lg:w-[70px] lg:h-[70px] md:w-[65px] md:h-[65px] w-[50px] h-[50px] text-large"
            />
          </div>
          <div className="w-full flex flex-col px-0 lg:px-2 md:px-4 gap-3 xl:gap-5">
            <CreatePostButton />
            <div className="flex justify-between mr-2 lg:mr-0">
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
