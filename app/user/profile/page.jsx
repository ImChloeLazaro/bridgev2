"use client";
import MainContent from "@/app/components/MainContent";
import RightBar from "@/app/components/RightBar";
import RightBarCard from "@/app/components/RightBarCard";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAtomValue } from "jotai";
import {
  MdBolt,
  MdEmojiEvents,
  MdHealing,
  MdMarkunreadMailbox,
} from "react-icons/md";
import "../../aws-auth";
import { userAtom } from "../../store/UserStore";
import BenefitsContent from "./components/benefits/BenefitsContent";
import EmergencyContactContent from "./components/emergencyContact/EmergencyContactContent";
import LeaveBalanceContent from "./components/leaveBalance/LeaveBalanceContent";
import ProfileCard from "./components/profileInfo/ProfileCard";
import UserOnboardingContent from "./components/userOnboarding/UserOnboardingContent";

const Profile = () => {
  const user = useAtomValue(userAtom);

  return (
    user.isAuthenticated && (
      <>
        <MainContent>
          <ProfileCard data={user} />
        </MainContent>
        <RightBar>
          {/* LEAVE BALANCE */}
          <RightBarCard
            title={"Leave Balance"}
            description={"Shows your current balance for VL & SL"}
            icon={<MdBolt size={32} />}
            isExpandable={false}
          >
            <LeaveBalanceContent />
          </RightBarCard>

          {/* BENEFITS */}
          <RightBarCard
            title={"Benefits"}
            description={"Displays all of your currently unlocked benefits"}
            icon={<MdEmojiEvents size={32} />}
            isExpandable={false}
          >
            <BenefitsContent />
          </RightBarCard>

          {/* EMERGENCY CONTACT */}
          <RightBarCard
            title={"Emergency Contact"}
            description={"In case of emergency; please contact:"}
            icon={<MdHealing size={32} />}
            isExpandable={false}
          >
            <EmergencyContactContent />
          </RightBarCard>

          {/* ONBOARDING */}
          <RightBarCard
            title={"Onboarding"}
            description={"Shows your onboarding progress and status"}
            icon={<MdMarkunreadMailbox size={32} />}
            isExpandable={false}
          >
            <UserOnboardingContent />
          </RightBarCard>
        </RightBar>
      </>
    )
  );
};
export default withAuthenticator(Profile);
