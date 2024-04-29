import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import { MdCloseFullscreen, MdOpenInFull } from "react-icons/md";

const RightBarCard = ({
  title,
  description,
  children,
  icon,
  isExpandable = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardStyle = {
    expand: "pt-0 pb-2 px-2 w-full h-[450px] lg:h-[450px] xl:h-[550px] ",
    collapse: "pt-0 pb-2 px-2 w-full h-[250px] lg:h-[250px] xl:h-[350px] ",
  };

  return (
    <Card className="w-full h-min-fit px-2 py-1.5 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl">
      <CardHeader className="flex justify-between p-0 py-2 px-2 md:px-4">
        <div className="flex flex-col">
          <p className="font-bold text-md lg:text-lg xl:text-2xl text-black-default ">{title}</p>
          <p className="font-medium text-xs text-darkgrey-hover">
            {description}
          </p>
        </div>
        <Button
          aria-label={title}
          isDisabled={!isExpandable}
          isIconOnly
          className="bg-transparent"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpandable ? (
            isExpanded ? (
              <MdCloseFullscreen size={18} />
            ) : (
              <MdOpenInFull size={18} />
            )
          ) : (
            icon
          )}
        </Button>
      </CardHeader>
      <CardBody
        className={`p-0 py-2 px-2 md:px-4 w-full transition-[height] duration-300 overflow-y-scroll no-scrollbar 
        ${
          isExpandable
            ? isExpanded
              ? cardStyle["expand"]
              : cardStyle["collapse"]
            : "h-fit"
        }`}
      >
        {children}
      </CardBody>
    </Card>
  );
};

export default RightBarCard;
