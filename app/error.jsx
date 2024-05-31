"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log("ERROR");
    console.log(error);
    console.error(error);
  }, [error]);
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <Card
        className="p-4 h-max gap-1
        min-w-fit
        w-1/4 
        "
      >
        <CardHeader className="flex justify-left">
          <div className="">
            <Image
              src="/header.png"
              alt="Aretex Logo"
              radius="none"
              className=""
            />
          </div>
        </CardHeader>
        <CardBody className="w-auto gap-10">
          <div className="gap-1 mb-2">
            <div className="text-black-default text-2xl font-bold">
              {"Oh no! There's something wrong! "}
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex-col py-2 gap-4 rounded-none overflow-visible w-full">
          <div className="px-16 ">
            <Image
              width={600}
              height={500}
              src="/error.jpg"
              alt="Error Occurred"
              radius="none"
              className=""
            />
          </div>
          <Button
            onPress={() => reset()}
            className="w-full text-lg font-medium text-white-default bg-orange-default"
            variant="flat"
            radius="lg"
          >
            {"Try Again"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
