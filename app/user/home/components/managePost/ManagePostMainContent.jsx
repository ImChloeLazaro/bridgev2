import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { Button } from "@nextui-org/react";
import { MdMinimize } from "react-icons/md";
import ManagePostTabs from "./ManagePostTabs";
import PostItemCard from "./PostItemCard";

// ### TODO Add Functionality and Design
// ### TODO Add Note to media selection that images
// should be at least ...px width to avoid images not properly displayed

const ManagePostMainContent = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col py-4 px-6 gap-4 w-[1200px]">
      {/* HEADER */}
      <div className="w-full flex-col">
        <div className="flex items-end justify-end">
          <Button isIconOnly onPress={onClose} className={"bg-transparent"}>
            <MdMinimize size={24} />
          </Button>
          <CloseButton onPress={onClose} className={""} />
        </div>
        <div className="">
          <div className="flex justify-between items-center px-1 ">
            <SearchBar />
            <ManagePostTabs />
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-wrap gap-6 overflow-y-scroll no-scrollbar">
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
        <PostItemCard />
      </div>
    </div>
  );
};

export default ManagePostMainContent;
