import { Avatar, Card, CardBody, cn } from "@nextui-org/react";
import CreatePostButton from "./CreatePostButton";
import ManagePostMediaButton from "../managePost/ManagePostMediaButton";
import CreatePostTemplateButton from "./CreatePostTemplateButton";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/UserStore";

const CreatePostCard = ({ className }) => {
  const user = useAtomValue(userAtom);
  return (
    <Card
      className={cn(
        className,
        "p-2 lg:px-2 xl:px-4 xl:py-4 mx-0 lg:mx-4 mb-2 lg:mb-4 xl:mb-6",
        "bg-white-default rounded-none lg:rounded-xl"
      )}
    >
      <CardBody className="px-0">
        <div className="flex lg:gap-2 xl:gap-6 px-2 md:px-4 xl:px-6">
          <div className="hidden md:flex justify-center items-center">
            <Avatar
              showFallback
              fallback={
                <div className="text-2xl font-medium ">{user?.name[0]}</div>
              }
              src={user?.picture}
              className="xl:w-[80px] xl:h-[80px] lg:w-[70px] lg:h-[70px] md:w-[65px] md:h-[65px] w-[50px] h-[50px] text-large"
            />
          </div>
          <div className="w-full flex flex-col px-0 lg:px-2 md:px-4 gap-2">
            <CreatePostButton />
            <div>
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
