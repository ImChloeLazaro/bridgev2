"use client";
import MainContent from "@/app/components/MainContent";
import RightBar from "@/app/components/RightBar";
import RightBarCard from "@/app/components/RightBarCard";
import NavigationTab from "@/app/navigation/components/NavigationTab";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue } from "jotai";
import {
  MdBolt,
  MdEmojiEvents,
  MdGridView,
  MdHealing,
  MdMarkunreadMailbox,
  MdPerson,
} from "react-icons/md";
import "../../aws-auth";
import BenefitsContent from "./components/benefits/BenefitsContent";
import EmergencyContactContent from "./components/emergencyContact/EmergencyContactContent";
import LeaveBalanceContent from "./components/leaveBalance/LeaveBalanceContent";
import ProfileCard from "./components/profileInfo/ProfileCard";
import UserOnboardingContent from "./components/userOnboarding/UserOnboardingContent";

const Profile = () => {
  const auth = useAtomValue(authenticationAtom);

  return (
    auth.isAuthenticated && (
      <>
        <MainContent>
          <NavigationTab
            className={"block lg:hidden"}
            mainIcon={<MdPerson size={24} />}
            rightIcon={<MdGridView size={24} />}
            main={<ProfileCard />}
            right={
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <RightBarCard
                  title={"Leave Balance"}
                  description={"Shows your current balance for VL & SL"}
                  icon={<MdBolt size={32} />}
                  isExpandable={false}
                >
                  <LeaveBalanceContent />
                </RightBarCard>

                <RightBarCard
                  title={"Benefits"}
                  description={
                    "Displays all of your currently unlocked benefits"
                  }
                  icon={<MdEmojiEvents size={32} />}
                  isExpandable={false}
                >
                  <BenefitsContent />
                </RightBarCard>

                <RightBarCard
                  title={"Emergency Contact"}
                  description={"In case of emergency; please contact:"}
                  icon={<MdHealing size={32} />}
                  isExpandable={false}
                >
                  <EmergencyContactContent />
                </RightBarCard>

                <RightBarCard
                  title={"Onboarding"}
                  description={"Shows your onboarding progress and status"}
                  icon={<MdMarkunreadMailbox size={32} />}
                  isExpandable={false}
                >
                  <UserOnboardingContent />
                </RightBarCard>
              </div>
            }
          />

          <ProfileCard className={"hidden lg:block"} />
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
