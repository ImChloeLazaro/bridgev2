import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { signInWithRedirect } from "aws-amplify/auth";
import SignInGoogle from "./SignInGoogle";
import CTAButtons from "@/app/components/CTAButtons";
import { FcGoogle } from "react-icons/fc";
import { MdChevronRight } from "react-icons/md";
import "../../aws-auth";
//test 10
const SignInCard = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <Card
        className="
        p-4 h-max gap-1
        min-w-fit
        sm:min-w-fit
        md:w-80 
        lg:w-96
        max-w-2xl
        "
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

          {/* <SignInGoogle handler={signInWithRedirect} /> */}

          {/* updated to use shared components */}

          <CTAButtons
            onClick={signInWithRedirect}
            label={"Continue with Google"}
            size={"lg"}
            startContent={<FcGoogle className="text-3xl" />}
            endContent={
              <MdChevronRight className="text-2xl text-black-default" />
            }
            className={"w-full tracking-tight px-4"}
            chevron={true}
            radius="lg"
            cnLabel={"font-medium"}
          />
        </CardBody>
      </Card>
    </div>
  );
};
export default SignInCard;
