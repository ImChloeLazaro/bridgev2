import { Link } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";

const OnboardingStatusAlert = () => {
  return (
    <div className="bg-red-700 py-2 text-white-default px-2 w-full flex items-center gap-2 tracking-tight">
      <MdWarning size={30} />
      <Link
        isExternal
        className="font-medium text-white-default"
        href="/onboarding"
        underline="hover"
        showAnchorIcon
      >
        <span className="font-semibold uppercase">{"REMINDER :"}</span>
        {"You don't have any onboarding data yet, click here to proceed."}
      </Link>
    </div>
  );
};

export default OnboardingStatusAlert;
