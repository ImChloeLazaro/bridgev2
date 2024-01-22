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

const HRBulletinBoard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between pl-4 pr-8">
        <p className="font-bold text-2xl">What&apos;s New</p>
        <Button
          isIconOnly
          className="bg-transparent"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <MdCloseFullscreen size={18} />
          ) : (
            <MdOpenInFull size={18} />
          )}
        </Button>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="overflow-y-scroll h-64"></div>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default HRBulletinBoard;
