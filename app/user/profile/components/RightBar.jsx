import React from "react";
import LeaveBalanceCard from "./LeaveBalanceCard";
import BenefitsCard from "./BenefitsCard";
import UserOnboardingCard from "./UserOnboardingCard";
import EmergencyContactCard from "./EmergencyContactCard";
import RightBarCard from "../../../components/RightBarCard";

import {
  MdBolt,
  MdEmojiEvents,
  MdHealing,
  MdMarkunreadMailbox,
} from "react-icons/md";

const RightBar = () => {
  return (
    <div className="w-full max-h-screen basis-[28%] overflow-y-scroll no-scrollbar mt-4 mr-4 ml-0 pr-4">
      <div className=" flex flex-col gap-6 ">
        {/* LEAVE BALANCE */}
        <RightBarCard
          title={"Leave Balance"}
          description={"Shows your current balance for VL & SL"}
          icon={<MdBolt size={32} />}
          isExpandable={false}
        >
          <LeaveBalanceCard />
        </RightBarCard>

        {/* BENEFITS */}
        <RightBarCard
          title={"Benefits"}
          description={"Shows your current balance for VL & SL"}
          icon={<MdEmojiEvents size={32} />}
          isExpandable={false}
        >
          <BenefitsCard />
        </RightBarCard>

        {/* EMERGENCY CONTACT */}
        <RightBarCard
          title={"Emergency Contact"}
          description={"Shows your current balance for VL & SL"}
          icon={<MdHealing size={32} />}
          isExpandable={false}
        >
          <EmergencyContactCard />
        </RightBarCard>

        {/* ONBOARDING */}
        <RightBarCard
          title={"Onboarding"}
          description={"Shows your current balance for VL & SL"}
          icon={<MdMarkunreadMailbox size={32} />}
          isExpandable={false}
        >
          <UserOnboardingCard />
        </RightBarCard>
      </div>
    </div>
  );
};

export default RightBar;
