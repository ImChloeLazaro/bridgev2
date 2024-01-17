"use client";
import React from "react";
import SignInGoogle from "./SignInGoogle";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

// ### BACKEND
import { Amplify } from "aws-amplify";
import config from "../../amplifyconfiguration.json"
import { signInWithRedirect } from "aws-amplify/auth";

Amplify.configure(config)

const SignInCard = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <Card
        className="p-4 h-max gap-1
        min-w-fit
        sm:min-w-fit
        md:w-80 
        lg:w-96
        max-w-2xl"
      >
        <CardHeader className="flex justify-left">
          {/*       
      responsiveness
      min-w-fit 
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
        <CardBody className="w-full gap-10">
          <div className="gap-1 mb-0">
            <div className="text-black-default text-2xl font-bold">
              {"Sign in"}
            </div>
            <div className="text-black-default text-base font-medium tracking-tighter">
              {"to continue to Aretex Bridge"}
            </div>
          </div>
          {/* // ### BACKEND */}
          <SignInGoogle handler={signInWithRedirect}/>
        </CardBody>
      </Card>
    </div>
  );
};
export default SignInCard;
