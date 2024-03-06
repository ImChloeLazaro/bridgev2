import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../store/UserStore";
import UserOnboardingModal from "./UserOnboardingModal";
import { onboardingDataAtom } from "../../store/ProfileStore";

const UserOnboardingContent = () => {

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Start Date:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {/* {format(new Date(user.onboarding.startDate), "MMM dd yyyy") ?? "No Data Available"} */}
            {"No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Status:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {/* {user.onboarding.status ?? "No Data Available"} */}
            {"No Data Available"}
          </p>
        </div>
      </div>
      <UserOnboardingModal/>
      
    </div>
  );
};

export default UserOnboardingContent;
