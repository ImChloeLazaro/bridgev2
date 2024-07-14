import { Link } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";

const OnboardingStatusAlert = ({ showAlert }) => {
  return (
    <div
      data-show={showAlert}
      className="data-[show=true]:hidden flex bg-red-default py-2 text-white-default px-2 w-full items-center gap-2 tracking-tight"
    >
      <MdWarning size={30} />
      <Link
        isExternal
        className="font-medium text-white-default gap-2"
        href="/onboarding"
        underline="hover"
        showAnchorIcon
      >
        <p className="font-semibold uppercase">{"REMINDER : "}</p>
        {" You don't have any onboarding data yet, click here to proceed."}
      </Link>
    </div>
  );
};

export default OnboardingStatusAlert;
