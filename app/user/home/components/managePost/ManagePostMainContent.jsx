import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { Button } from "@nextui-org/react";
import { MdMinimize } from "react-icons/md";
import ManagePostTabs from "./ManagePostTabs";
import PostItemCard from "./PostItemCard";
import CTAButtons from "@/app/components/CTAButtons";
import { Divider } from "@aws-amplify/ui-react";

// ### TODO Add Functionality and Design
// ### TODO Add Note to media selection that images
// should be at least ...px width to avoid images not properly displayed
const actionButtons = {
  delete: {
    color: "red",
    label: "Delete Post",
    // action: ""
  },
  add: {
    color: "blue",
    label: "Add Post",
    // action: "",
  },
  publish: {
    color: "orange",
    label: "Publish Post",
    // action: "",
  },
};

const ManagePostMainContent = ({ onClose }) => {
  return (
    <div className="flex flex-col w-[72rem] h-[54rem]">
      {/* HEADER */}
      <div className="flex-col py-4 px-6 ">
        <div className="flex items-end justify-end text-lightgrey-default">
          <Button isIconOnly onPress={onClose} className={"bg-transparent"}>
            <MdMinimize size={24} />
          </Button>
          <CloseButton onPress={onClose} className={""} />
        </div>
        <div className="flex justify-between items-center px-1 ">
          <SearchBar />
          <ManagePostTabs />
        </div>
      </div>

      {/* BODY */}
      <div className="grid justify-center w-full h-full overflow-y-scroll px-6 ">
        <div className="grid grid-cols-3 gap-10 mt-4 mb-6 ">
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

      {/* FOOTER */}
      <Divider />
      <div className="flex items-end justify-end gap-2 px-7 py-4 bg-lightgrey-hover rounded">
        <CTAButtons
          // fullWidth={true}
          label={actionButtons.delete.label}
          color={actionButtons.delete.color}
          // onPress={actionButtons.delete.action}
        />
        <CTAButtons
          // fullWidth={true}
          label={actionButtons.add.label}
          color={actionButtons.add.color}
          // onPress={actionButtons.add.action}
        />
        <CTAButtons
          // fullWidth={true}
          label={actionButtons.publish.label}
          color={actionButtons.publish.color}
          // onPress={actionButtons.publish.action}
        />
      </div>
    </div>
  );
};

export default ManagePostMainContent;
