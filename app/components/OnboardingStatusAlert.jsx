import Link from "next/link";

const OnboardingStatusAlert = () => {
  return (
    <>
      <div className="bg-red-700 py-2 text-white px-2">
        <p>
          <span className="font-semibold uppercase">{"REMINDER"}</span>
          {": You don't have any onboarding data yet, click "}
          <Link className="font-semibold" href="/onboarding">
            {"here"}
          </Link>{" "}
          {"to proceed."}
        </p>
      </div>
    </>
  );
};

export default OnboardingStatusAlert;
