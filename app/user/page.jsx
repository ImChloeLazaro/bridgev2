"use client";
import MainContent from "@/app/components/MainContent";
import RightBar from "@/app/components/RightBar";
import RightBarCard from "@/app/components/RightBarCard";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { MdFeed, MdGridView } from "react-icons/md";
import NavigationTab from "../navigation/components/NavigationTab";
import { userRegisterAtom } from "../store/UserStore";
import BirthdayCard from "./home/components/birthday/BirthdayCard";
import CreatePostCard from "./home/components/createPost/CreatePostCard";
import HRBulletinBoardList from "./home/components/hrBulletinBoard/HRBulletinBoardList";
import PostFeed from "./home/components/post/PostFeed";
import RecognitionList from "./home/components/recognition/RecognitionList";
import RexWinnerCard from "./home/components/rexWinner/RexWinnerCard";
import TrainingList from "./home/components/training/TrainingList";

const User = () => {
  const userRegister = useSetAtom(userRegisterAtom);

  useEffect(() => {
    userRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainContent>
        <NavigationTab
          className={"block lg:hidden"}
          mainIcon={<MdFeed size={28} />}
          rightIcon={<MdGridView size={28} />}
          main={
            <>
              <CreatePostCard />
              <PostFeed />
            </>
          }
          right={
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <RexWinnerCard />
              <BirthdayCard />

              <RightBarCard
                title={"What's New"}
                description={"Shows the latest announcements from HR"}
                isExpandable={true}
              >
                <HRBulletinBoardList />
              </RightBarCard>

              <RightBarCard
                title={"Recognition"}
                description={"Displays all your feedbacks and recognitions"}
                isExpandable={true}
              >
                <RecognitionList />
              </RightBarCard>

              <RightBarCard
                title={"Trainings"}
                description={"Displays all your latest trainings this year"}
                isExpandable={true}
              >
                <TrainingList />
              </RightBarCard>
            </div>
          }
        />
        <CreatePostCard className={"hidden lg:block"} />
        <PostFeed className={"hidden lg:block"} />
      </MainContent>
      <RightBar>
        <RexWinnerCard />
        <BirthdayCard />
        {/* HR BULLETIN */}
        <RightBarCard
          title={"What's New"}
          description={"Shows the latest announcements from HR"}
          isExpandable={true}
        >
          <HRBulletinBoardList />
        </RightBarCard>
        {/* RECOGNITION */}
        <RightBarCard
          title={"Recognition"}
          description={"Displays all your feedbacks and recognitions"}
          isExpandable={true}
        >
          <RecognitionList />
        </RightBarCard>
        {/* TRAINING */}
        <RightBarCard
          title={"Trainings"}
          description={"Displays all your latest trainings this year"}
          isExpandable={true}
        >
          <TrainingList />
        </RightBarCard>
      </RightBar>
    </>
  );
};

export default withAuthenticator(User);
