import { Button, Link } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { MdChevronRight } from "react-icons/md";
import CTAButtons from "@/app/components/CTAButtons";

const SignInGoogle = ({ handler }) => {
  const handleSignIn = () => {
    try {
      handler();
    } catch (err) {
      console.log("ERROR SIGNIN", err);
    }
  };
  return (
    <div className="">
      <Button
        onClick={handleSignIn}
        as={Link}
        variant="light"
        className="justify-start bg-grey-default hover:bg-grey-hover w-full"
        size="lg"
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center hover:translate-x-2 transition ease-in-out delay-150">
            <FcGoogle className="text-3xl" />
            <div className="ml-4 tracking-tighter font-medium text-base text-black-default">
              {"Continue with Google"}
            </div>
          </div>
          <MdChevronRight className="text-2xl text-black-default" />
        </div>
      </Button>
    </div>
  );
};

export default SignInGoogle;
