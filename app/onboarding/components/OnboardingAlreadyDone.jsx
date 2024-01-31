import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import ContinueButton from "./ContinueButton";
import ReturnButton from "./ReturnButton";

const OnboardingAlreadyDone = () => {
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
          <div className="gap-1 mb-2">
            <div className="text-black-default text-2xl font-bold">
              {"Nothing to see here!"}
            </div>
            <div className="text-black-default text-base font-medium tracking-tighter">
              {
                "You already completed and submitted your onboarding form"
              }
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex-col py-2 gap-4 rounded-none overflow-visible w-full">
          <div className="px-16 ">
            <Image
              width={300}
              height={300}
              src="onboarding-already-done.jpg"
              alt="Onboarding Form Already Submitted"
              radius="none"
              className=""
            />
          </div>
          <ReturnButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingAlreadyDone;
