import RightBarCard from "@/app/components/RightBarCard";
import BirthdayCard from "@/app/user/home/components/birthday/BirthdayCard";
import CreatePostCard from "@/app/user/home/components/createPost/CreatePostCard";
import HRBulletinBoardList from "@/app/user/home/components/hrBulletinBoard/HRBulletinBoardList";
import PostFeed from "@/app/user/home/components/post/PostFeed";
import RecognitionList from "@/app/user/home/components/recognition/RecognitionList";
import RexWinnerCard from "@/app/user/home/components/rexWinner/RexWinnerCard";
import TrainingList from "@/app/user/home/components/training/TrainingList";
import { Tabs, Tab, cn } from "@nextui-org/react";
import { MdFeed } from "react-icons/md";
import { MdGridView } from "react-icons/md";

const NavigationTab = ({ data, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        aria-label="Mobile Navigation"
        classNames={{
          base: cn("relative z-10 sticky top-0 w-full", className),
          panel: "w-full py-0 px-0",
          cursor: "w-full group-data-[selected=true]:bg-blue-default/80",
          tabList: "rounded-none py-1 w-full",
          tabContent: "group-data-[selected=true]:text-white-default",
        }}
      >
        <Tab key="feed" title={<MdFeed size={24} />}>
          <CreatePostCard data={data} />
          <PostFeed />
        </Tab>
        <Tab key="misc" title={<MdGridView size={24} />}>
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
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavigationTab;
