import { Link, Tooltip } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { personalInfoAtom } from "../../store/ProfileStore";
import LeaveRequest from "./LeaveRequest";

const LeaveBalanceContent = () => {
  const { balance } = useAtomValue(personalInfoAtom);
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
              content={
                <p className="">{`You have ${balance?.VL_BALANCE} VL left`}</p>
              }
            >
              <Link
                href="#"
                underline="none"
                className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
              >
                {balance !== null ? (
                  balance?.VL_BALANCE
                ) : (
                  <p className="text-red-default">No VL data</p>
                )}
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
              content={
                <p className="">{`You have ${balance?.SL_BALANCE} SL left`}</p>
              }
            >
              <Link
                href="#"
                underline="none"
                className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
              >
                {balance !== null ? (
                  balance?.SL_BALANCE
                ) : (
                  <p className="text-red-default">No SL data</p>
                )}
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
