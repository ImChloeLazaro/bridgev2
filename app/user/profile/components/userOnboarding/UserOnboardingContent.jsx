import { useAtomValue, useSetAtom } from "jotai";
import { personalInfoAtom } from "../../store/ProfileStore";
import UserOnboardingModal from "./UserOnboardingModal";
import { format, isValid } from "date-fns";
// import { fetchOnboardingDataAtom } from "@/app/onboarding/store/OnboardingStore";
// import { useEffect } from "react";

const UserOnboardingContent = () => {
  const { recruitment } = useAtomValue(personalInfoAtom);
  // const fetchOnBoardingData = useSetAtom(fetchOnboardingDataAtom);

  // useEffect(() => {
  //   fetchOnBoardingData();
  // }, [fetchOnBoardingData]);

  return (
    <div className="flex items-center justify-between p-1 lg:p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-sm sm:text-base font-bold text-black-default w-3/5">
            {"Start Date:"}
          </p>
          <p className="text-sm sm:text-base font-bold text-black-default w-3/5 ">
            {isValid(new Date(recruitment?.hiredate))
              ? format(new Date(recruitment?.hiredate), "MMMM dd yyyy")
              : "No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-sm sm:text-base font-bold text-black-default w-3/5">
            {"Status:"}
          </p>
          <p className="capitalize text-sm sm:text-base font-bold text-black-default w-3/5 ">
            {recruitment?.status?.length
              ? recruitment?.status
              : "No Data Available"}
          </p>
        </div>
      </div>
      <UserOnboardingModal />
    </div>
  );
};

export default UserOnboardingContent;
