import { Button } from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../store/UserStore";

const UserOnboardingContent = () => {
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
        className="bg-transparent text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
      >
        {"View Form"}
      </Button>
    </div>
  );
};

export default UserOnboardingContent;
