"use client";
import "@aws-amplify/ui-react/styles.css";
import { useAtomValue, useSetAtom } from "jotai";
import "../aws-auth";
import MainContent from "../components/MainContent";
import RightBar from "../components/RightBar";
import RightBarCard from "../components/RightBarCard";
import { userAtom } from "../store/UserStore";
import BirthdayCard from "./home/components/birthday/BirthdayCard";
import HRBulletinBoardList from "./home/components/hrBulletinBoard/HRBulletinBoardList";
import CreatePostCard from "./home/components/createPost/CreatePostCard";
import PostCard from "./home/components/post/PostCard";
import RecognitionList from "./home/components/recognition/RecognitionList";
import RexWinnerCard from "./home/components/rexWinner/RexWinnerCard";
import TrainingList from "./home/components/training/TrainingList";
import { fetchedPostAtom, postAtom } from "./home/store/PostStore";
import { useEffect } from "react";

// ### TODO Rewrite scrolling behavior to add scrollbar for easier scrolling
// ###      make RightBar to be sticky without affecting its own scrolling

const User = () => {
  const posts = useAtomValue(postAtom);
  const user = useAtomValue(userAtom);

  const fetchedPost = useSetAtom(fetchedPostAtom);

  useEffect(() => {
    fetchedPost();
  }, [fetchedPost]);

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.datetimePublished) - new Date(a.datetimePublished)
  );

  console.log("INSIDE USER PAGE MAIN CONTENT: ", sortedPosts);

  return (
    user.isAuthenticated && (
      <>
        <MainContent>
          <CreatePostCard data={user} />
          {sortedPosts.map((post) => {
            return <PostCard key={post.key} data={post} />;
          })}
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

export default User;
