import React from "react";
import { userAtom } from "../../../store/UserStore";

import { Button } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { format } from "date-fns";

const UserOnboardingCard = () => {
  const user = useAtomValue(userAtom);

  // const dateAgo = format(new Date(datetime), "d MMM yyyy");

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Start Date:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {format(new Date(user.onboarding.startDate), "MMM dd yyyy")}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-3/5">
            {"Status:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {user.onboarding.status}
          </p>
        </div>
      </div>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-lg font-medium text-[#45C2F9] hover:underline hover:underline-offset-2"
      >
        {"View Form"}
      </Button>
    </div>
  );
};

export default UserOnboardingCard;
