import { Image } from "@nextui-org/react";
import { toast } from "sonner";

const MiniUnderContstruction = () => {
  const stillInProgress = () => {
    toast.error(
      "This feature is still in development. We will update you once it's done!"
    );
  };
  return (
    <div
      className="flex justify-center items-center h-full cursor-not-allowed"
      onClick={stillInProgress}
    >
      <div>
        <div className="flex justify-center items-center">
          <Image
            src="./imageUnderContstruction.png"
            alt="Under Construction"
            className="w-32 h-32"
          />
        </div>
        <p className="text-center font-medium text-darkgrey-default my-4 mx-6">
          {
            "This feature is still in development. We will update you once it's done!"
          }
        </p>
      </div>
    </div>
  );
};

export default MiniUnderContstruction;
