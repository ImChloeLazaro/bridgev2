import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { MdOpenInFull, MdCloseFullscreen } from "react-icons/md";
import HRBulletinBoardList from "./HRBulletinBoardList";

const HRBulletinBoard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardStyle = {
    expand:
      "w-full h-[550px] px-2 drop-shadow shadow-none bg-white-default transition duration-500 ease-in-out",
    collapse:
      "w-full h-[350px] px-2 drop-shadow shadow-none bg-white-default transition duration-500 ease-in-out",
  };
  return (
    <Card
      className={`${isExpanded ? cardStyle["expand"] : cardStyle["collapse"]}`}
    >
      <CardHeader className="flex justify-between pl-5 pr-4 pb-0">
        <p className="font-bold text-2xl text-black-default">What&apos;s New</p>
        <Button
          isIconOnly
          className="bg-transparent text-black-default "
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <MdCloseFullscreen size={18} />
          ) : (
            <MdOpenInFull size={18} />
          )}
        </Button>
      </CardHeader>
      <CardBody className="pt-0 pb-2 px-2 w-full ">
        <HRBulletinBoardList />
      </CardBody>
    </Card>
  );
};

export default HRBulletinBoard;
