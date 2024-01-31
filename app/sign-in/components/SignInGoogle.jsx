import { Button, Link } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { MdChevronRight } from "react-icons/md";

const SignInGoogle = ({ handler }) => {
  return (
    <div className="">
      <Button
        onClick={handler}
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
