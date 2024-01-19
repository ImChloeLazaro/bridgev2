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
import RecognitionList from "./RecognitionList";
const RecognitionCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full h-min-fit px-2 drop-shadow shadow-none bg-white-default">
      <CardHeader className="flex justify-between pl-5 pr-4 pb-0">
        <p className="font-bold text-2xl text-black-default">Recognitions</p>
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
      <CardBody className="pt-0 pb-2 px-2 w-full">
        <RecognitionList />
      </CardBody>
    </Card>
  );
};

export default RecognitionCard;
