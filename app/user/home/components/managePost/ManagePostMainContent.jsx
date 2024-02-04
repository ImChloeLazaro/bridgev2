import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { Button, Checkbox, CheckboxGroup, cn } from "@nextui-org/react";
import { MdMinimize } from "react-icons/md";
import ManagePostTabs from "./ManagePostTabs";
import PostItemCard from "./PostItemCard";
import CTAButtons from "@/app/components/CTAButtons";
import { Divider } from "@aws-amplify/ui-react";
import { useAtomValue, useAtom } from "jotai";
import {
  archivedPostListAtom,
  draftPostListAtom,
  publishedPostListAtom,
  selectedDraftPostAtom,
  selectedPostStatusAtom,
} from "../../store/ManagePostStore";

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
  const draftsPost = useAtomValue(draftPostListAtom);
  const publishedPost = useAtomValue(publishedPostListAtom);
  const archivedPost = useAtomValue(archivedPostListAtom);

  const selectedPostStatus = useAtomValue(selectedPostStatusAtom);
  const [selectedDraftPost, setSelectedDraftPost] = useAtom(
    selectedDraftPostAtom
  );

  const postList =
    selectedPostStatus === "drafts"
      ? draftsPost
      : selectedPostStatus === "published"
      ? publishedPost
      : selectedPostStatus === "archived"
      ? archivedPost
      : [];

  console.log("selectedDraftPost:", selectedDraftPost);

  return (
    <div className="flex flex-col w-[72rem] h-fit">
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
      <div className="grid justify-center w-full h-[50rem] overflow-y-scroll px-6 ">
        <CheckboxGroup
          aria-label="Post Item Card Checkbox Group"
          value={selectedDraftPost}
          onValueChange={setSelectedDraftPost}
        >
          <div className="grid grid-cols-3 gap-x-2 gap-y-6 mt-4 mb-6 ">
            {postList &&
              postList.map((draft, index) => (
                <Checkbox
                  value={draft.key}
                  key={index}
                  aria-label="Post Item Card Checkbox"
                  classNames={{
                    base: cn(
                      "inline-flex w-full",
                      "items-start justify-start",
                      "cursor-pointer rounded-lg border-2 border-transparent",
                      "data-[selected=true]:bg-lightgrey-default"
                      // "p-0 m-0",
                      // "top"
                    ),
                    label: "w-full",
                  }}
                >
                  <PostItemCard data={draft} />
                </Checkbox>
              ))}
          </div>
        </CheckboxGroup>
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
