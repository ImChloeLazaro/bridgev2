import { Link } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";

const OnboardingStatusAlert = () => {
  return (
    <div className="bg-red-700 py-2 text-white-default px-2 w-full flex items-center gap-2 tracking-tight">
      <MdWarning size={30} />
      <span className="font-semibold uppercase">{"REMINDER :"}</span>
      {"You don't have any onboarding data yet, click"}
      <span className="">
        <Link
          isExternal
          className="font-extrabold underline text-white-default"
          href="/onboarding"
        >
          {"here"}
        </Link>
      </span>
      {"to proceed."}
    </div>
  );
};

export default OnboardingStatusAlert;
