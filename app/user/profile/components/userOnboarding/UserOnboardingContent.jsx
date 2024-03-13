import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../store/UserStore";
import UserOnboardingModal from "./UserOnboardingModal";
import { employeeInfoAtom } from "../../store/ProfileStore";

const UserOnboardingContent = () => {
  const {response: data} = useAtomValue(employeeInfoAtom);
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Start Dates:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {format(new Date(data?.hiredate), "MMM dd yyyy") ?? "No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Status:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {data?.status ?? "No Data Available"}
          </p>
        </div>
      </div>
      <UserOnboardingModal />
    </div>
  );
};

export default UserOnboardingContent;
