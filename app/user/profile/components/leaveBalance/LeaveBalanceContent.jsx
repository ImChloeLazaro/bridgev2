import { Link, Tooltip } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { leaveStatusAtom } from "../../store/ProfileStore";
import LeaveRequest from "./LeaveRequest";

const LeaveBalanceContent = () => {
  const leaveStatus = useAtomValue(leaveStatusAtom);
  // console.log("leave", leaveStatus);
  return (
    <div className="flex items-center justify-between p-1 lg:p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex gap-2">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Vacation Leave:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            <Tooltip
              showArrow={true}
              content={`You have ${leaveStatus?.VL_BALANCE} VL left`}
            >
              <Link
                href="#"
                underline="none"
                className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
              >
                {leaveStatus.VL_BALANCE ?? "No VL data"}
              </Link>
            </Tooltip>
          </p>
        </div>
        <div className="w-full flex gap-2">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Sick Leave:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default ">
            <Tooltip
              showArrow={true}
              content={`You have ${leaveStatus?.SL_BALANCE} SL left`}
            >
              <Link
                href="#"
                underline="none"
                className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
              >
                {leaveStatus.SL_BALANCE ?? "No SL data"}
              </Link>
            </Tooltip>
          </p>
        </div>
      </div>
      <LeaveRequest />
    </div>
  );
};

export default LeaveBalanceContent;
