import React from "react";
import ContactITButton from "./ContactITButton";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";

const SignInLockedOut = () => {
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
          {/*       
      responsiveness
      min-w-fit max-w-2xl
      sm:w-64 
      md:w-80 
      lg:w-96
      max-w-2xl */}
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
          {/* Automatic Signin */}
          <div className="gap-1 mb-2">
            <div className="text-black-default text-2xl font-bold">
              {"It seems you are trying too hard!"}
            </div>
            <div className="text-black-default text-base font-medium tracking-tighter">
              {"Max sign in attempts reached. You are now locked out."}
            </div>
          </div>
        </CardBody>
        {/* Contents className="py-4"*/}
        <CardFooter className="flex-col py-2 gap-4 rounded-none overflow-visible w-full">
          <div className="px-16 ">
            <Image
              width={300}
              height={300}
              src="locked-out.jpg"
              alt="You are Locked Out"
              radius="none"
              className=""
            />
          </div>
          <ContactITButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInLockedOut;
