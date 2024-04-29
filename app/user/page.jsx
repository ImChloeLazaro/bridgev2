"use client";
import MainContent from "@/app/components/MainContent";
import RightBar from "@/app/components/RightBar";
import RightBarCard from "@/app/components/RightBarCard";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import "../aws-auth";
import { userAtom } from "../store/UserStore";
import BirthdayCard from "./home/components/birthday/BirthdayCard";
import CreatePostCard from "./home/components/createPost/CreatePostCard";
import HRBulletinBoardList from "./home/components/hrBulletinBoard/HRBulletinBoardList";
import PostFeed from "./home/components/post/PostFeed";
import RecognitionList from "./home/components/recognition/RecognitionList";
import RexWinnerCard from "./home/components/rexWinner/RexWinnerCard";
import TrainingList from "./home/components/training/TrainingList";
import { fetchPostAtom } from "./home/store/PostStore";
import { restinsert } from "../utils/amplify-rest";
import NavigationTab from "../navigation/components/NavigationTab";

const User = () => {
  const user = useAtomValue(userAtom);
  const auth = useAtomValue(authenticationAtom);

  useEffect(() => {
    const insertProfile = async () => {
      await restinsert("/user", {
        sub: auth.sub,
        name: user.name,
        picture: user.picture,
        email: user.email,
      });
    };

    return () => insertProfile();
  }, []);

  return (
    auth.isAuthenticated && (
      <>
        <MainContent>
          <NavigationTab data={user} className={"block lg:hidden "} />
          <CreatePostCard data={user} className={"hidden lg:block"} />
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
    )
  );
};

export default withAuthenticator(User);
