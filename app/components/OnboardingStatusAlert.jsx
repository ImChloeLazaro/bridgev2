import Link from "next/link";
import { MdWarning } from "react-icons/md";

const OnboardingStatusAlert = () => {
  return (
    <div className="bg-red-700 py-2 text-white-default px-2 w-full flex items-center gap-2">
      <MdWarning size={30} />
      <span className="font-semibold uppercase">{"REMINDER :"}</span>
      {"You don't have any onboarding data yet, click"}
      <Link className="font-extrabold underline" href="/onboarding">
        {"here"}
      </Link>
      {"to proceed."}
    </div>
  );
};

export default OnboardingStatusAlert;
