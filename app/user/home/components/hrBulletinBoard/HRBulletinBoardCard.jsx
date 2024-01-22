import React, { useState } from "react";
import HRBulletinBoardList from "./HRBulletinBoardList";

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

const HRBulletinBoard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardStyle = {
    expand: "pt-0 pb-2 px-2 w-full h-[550px] ",
    collapse: "pt-0 pb-2 px-2 w-full h-[350px] ",
  };
  return (
    <Card className="w-full px-2 drop-shadow shadow-none bg-white-default ">
      <CardHeader className="flex justify-between pl-5 pr-4 pb-5">
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
      <CardBody
        className={`transition-all duration-300 overflow-y-scroll no-scrollbar ${
          isExpanded ? cardStyle["expand"] : cardStyle["collapse"]
        }`}
      >
        <HRBulletinBoardList />
      </CardBody>
    </Card>
  );
};

export default HRBulletinBoard;
