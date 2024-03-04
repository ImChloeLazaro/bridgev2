"use client";
import MainContent from "@/app/components/MainContent";
import RightBar from "@/app/components/RightBar";
import RightBarCard from "@/app/components/RightBarCard";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Spinner } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect } from "react";
import "../aws-auth";
import { userAtom } from "../store/UserStore";
import BirthdayCard from "./home/components/birthday/BirthdayCard";
import CreatePostCard from "./home/components/createPost/CreatePostCard";
import HRBulletinBoardList from "./home/components/hrBulletinBoard/HRBulletinBoardList";
import PostCard from "./home/components/post/PostCard";
import RecognitionList from "./home/components/recognition/RecognitionList";
import RexWinnerCard from "./home/components/rexWinner/RexWinnerCard";
import TrainingList from "./home/components/training/TrainingList";
import {
  fetchArchivePostAtom
} from "./home/store/ArchivedStore";
import {
  fetchDraftPostAtom
} from "./home/store/DraftedStore";
import { fetchPostAtom, postAtom } from "./home/store/PostStore";
import {
  fetchPublishPostAtom
} from "./home/store/PublishedStore";


const User = () => {
  const posts = useAtomValue(postAtom);
  const user = useAtomValue(userAtom);
  const auth = useAtomValue(authenticationAtom);

  const fetchPost = useSetAtom(fetchPostAtom);
  const fetchDraftPost = useSetAtom(fetchDraftPostAtom);
  const fetchPublishPost = useSetAtom(fetchPublishPostAtom);
  const fetchArchivePost = useSetAtom(fetchArchivePostAtom);

  useEffect(() => {
    fetchPost();
    fetchDraftPost(auth.sub);
    fetchPublishPost(auth.sub);
    fetchArchivePost(auth.sub);
  }, [auth, fetchArchivePost, fetchDraftPost, fetchPost, fetchPublishPost]);

  const filteredPosts = posts.filter((post) => post.datetimePublished);

  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.datetimePublished) - new Date(a.datetimePublished)
  );

  return (
    auth.isAuthenticated && (
      <>
        <MainContent>
          <CreatePostCard data={user} />
          <Suspense fallback={<Spinner />}>
            <div className="">
              {sortedPosts.map((post) => {
                return <PostCard key={post._id} data={post} />;
              })}
            </div>
          </Suspense>
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
