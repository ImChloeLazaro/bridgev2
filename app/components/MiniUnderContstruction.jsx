import React, { useState } from "react";
import { Card, Image } from "@nextui-org/react";
import { toast } from "sonner";

const MiniUnderContstruction = ({
  src = "/imageUnderContstruction.png",
  mini = true,
}) => {
  const [info, setInfo] = useState(false);

  const stillInProgress = () => {
    if (!info) {
      toast.info(
        "This feature is still in development. We will update you once it's done!"
      );
      setInfo(true);
      setTimeout(() => {
        setInfo(false);
      }, 3000);
    }
  };
  return (
    <Card className="h-full w-full">
      <div
        className="flex justify-center items-center h-full cursor-not-allowed"
        onClick={stillInProgress}
      >
        <div>
          <div className="flex justify-center items-center">
            <Image
              src={src}
              alt="Under Construction"
              className={`${
                mini ? "w-32 h-32" : "w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60"
              }`}
            />
          </div>
          <p
            className={`${
              mini
                ? "text-center font-medium text-darkgrey-default my-4 mx-6"
                : "text-lg sm:text-xl md:text-2xl text-center font-bold text-darkgrey-default my-4 sm:mx-40"
            }`}
          >
            {
              "This feature is still in development. We will update you once it's done!"
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MiniUnderContstruction;
