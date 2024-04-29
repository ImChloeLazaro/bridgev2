import { Button } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { leaveStatusAtom } from "../../store/ProfileStore";
import { Tooltip, Link } from "@nextui-org/react";

const LeaveBalanceContent = () => {
  const leave = useAtomValue(leaveStatusAtom);
  return (
    <div className="flex items-center justify-between p-1 lg:p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Vacation Leave:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            <Tooltip
              showArrow={true}
              content={
                <p className="">{`You have ${leave.response.VL_BALANCE} VL left`}</p>
              }
            >
              <Link
                href="#"
                underline="none"
                className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
              >
                {leave.response !== null ? (
                  leave.response.VL_BALANCE
                ) : (
                  <p className='text-red-default'>No VL data</p>
                )}
              </Link>
            </Tooltip>
          </p>
        </div>
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Sick Leave:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default ">
            <Tooltip
              showArrow={true}
              content={
                <p className="">{`You have ${leave.response.SL_BALANCE} SL left`}</p>
              }
            >
              <Link
                href="#"
                underline="none"
                className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
              >
                {leave.response !== null ? (
                  leave.response.SL_BALANCE
                ) : (
                  <p className='text-red-default'>No SL data</p>
                )}
              </Link>
            </Tooltip>
          </p>
        </div>
      </div>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-sm sm:text-md lg:text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
      >
        {"File a Leave"}
      </Button>
    </div>
  );
};

export default LeaveBalanceContent;
