import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import OnboardingBody from "./OnboardingBody";
import OnboardingFooter from "./OnboardingFooter";

const OnboardingHeader = dynamic(() => import("./OnboardingHeader"), {
  ssr: false,
});

const OnboardingForm = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url(bg.png)" }}
    >
      <Card className="w-[850px] h-[760px]">
        <CardHeader className="flex justify-center p-1 mt-2">
          <OnboardingHeader />
        </CardHeader>
        <Divider />
        <CardBody className="gap-6 py-3 ">
          <OnboardingBody />
        </CardBody>
        <Divider />
        <CardFooter className="px-8">
          <OnboardingFooter />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingForm;
