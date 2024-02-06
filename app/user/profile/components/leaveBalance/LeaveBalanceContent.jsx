import { Button } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { leaveStatusAtom } from "../../../../store/UserStore";

const LeaveBalanceContent = () => {
  const leave = useAtomValue(leaveStatusAtom);
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Vacation Leave:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {leave.response.VL_BALANCE}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Sick Leave:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
          {leave.response.SL_BALANCE}
          </p>
        </div>
      </div>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
      >
        {"File a Leave"}
      </Button>
    </div>
  );
};

export default LeaveBalanceContent;
