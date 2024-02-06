import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { Button, Image, Checkbox, CheckboxGroup, cn } from "@nextui-org/react";
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
  selectedArchivePostAtom,
  selectedDraftPostAtom,
  selectedFilterKeysAtom,
  selectedPostStatusAtom,
  selectedPublishPostAtom,
} from "../../store/ManagePostStore";
import { useState, useMemo } from "react";

// ### TODO Add Functionality and Design
// ### TODO Add Note to media selection that images
// should be at least ...px width to avoid images not properly displayed

const handleAddPost = () => {
  console.log("POST ADDED");
};

const handleDeletePost = () => {
  console.log("POST DELETED");
};

const handlePublishPost = () => {
  console.log("POST PUBLISHED");
};

const handleArchivePost = () => {
  console.log("POST ARCHIVED");
};

const draftActionsButtons = {
  delete: {
    color: "red",
    label: "Delete Post",
    action: handleDeletePost,
  },
  add: {
    color: "blue",
    label: "Add Post",
    action: handleAddPost,
  },
  publish: {
    color: "orange",
    label: "Publish Post",
    action: handlePublishPost,
  },
};

const publishedActionsButtons = {
  archive: {
    color: "black",
    label: "Archive Post",
    action: handleArchivePost,
  },
};

const archivedActionButtons = {
  delete: {
    color: "red",
    label: "Delete Post",
    action: handleDeletePost,
  },
};

const ManagePostMainContent = ({ onClose }) => {
  const [values, setValues] = useState([]);

  const draftsPost = useAtomValue(draftPostListAtom);
  const publishedPost = useAtomValue(publishedPostListAtom);
  const archivedPost = useAtomValue(archivedPostListAtom);

  const selectedPostStatus = useAtomValue(selectedPostStatusAtom);
  const [selectedDraftPost, setSelectedDraftPost] = useAtom(
    selectedDraftPostAtom
  );
  const [selectedPublishPost, setSelectedPublishPost] = useAtom(
    selectedPublishPostAtom
  );
  const [selectedArchivePost, setSelectedArchivePost] = useAtom(
    selectedArchivePostAtom
  );

  const selectedFilterKeys = useAtomValue(selectedFilterKeysAtom);

  const actionButtons =
    selectedPostStatus === "drafts"
      ? draftActionsButtons
      : selectedPostStatus === "published"
      ? publishedActionsButtons
      : selectedPostStatus === "archived"
      ? archivedActionButtons
      : {};

  const postList =
    selectedPostStatus === "drafts"
      ? draftsPost
      : selectedPostStatus === "published"
      ? publishedPost
      : selectedPostStatus === "archived"
      ? archivedPost
      : [];

  const selectedPosts =
    selectedPostStatus === "drafts"
      ? selectedDraftPost
      : selectedPostStatus === "published"
      ? selectedPublishPost
      : selectedPostStatus === "archived"
      ? selectedArchivePost
      : values;

  const setSelectedPosts =
    selectedPostStatus === "drafts"
      ? setSelectedDraftPost
      : selectedPostStatus === "published"
      ? setSelectedPublishPost
      : selectedPostStatus === "archived"
      ? setSelectedArchivePost
      : setValues;

  const filteredPost = selectedFilterKeys.has("all")
    ? postList
    : postList.filter((post) => {
        return selectedFilterKeys.has(post.type);
      });

  const [searchItem, setSearchItem] = useState("");

  const filteredPostList = filteredPost.filter((post) => {
    return (
      post.team.toLowerCase().includes(searchItem.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchItem.toLowerCase()) ||
      post.title.toLowerCase().includes(searchItem.toLowerCase())
    );
  });

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
          <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
          <ManagePostTabs />
        </div>
      </div>

      {/* BODY */}
      {filteredPostList.length != 0 ? (
        <div className="grid justify-center w-full h-[50rem] overflow-y-scroll px-6 ">
          <CheckboxGroup
            aria-label="Post Item Card Checkbox Group"
            value={selectedPosts}
            onValueChange={setSelectedPosts}
          >
            <div className="grid grid-cols-3 gap-x-2 gap-y-6 mt-4 mb-6 ">
              {filteredPostList.map((post, index) => (
                <Checkbox
                  value={post.key}
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
                  <PostItemCard data={post} />
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      ) : (
        <div className="w-full h-[48rem] flex justify-center mt-6">
          <div className="flex-col">
            <Image
              width={500}
              height={500}
              alt={"No Posts Found"}
              src={"/no-found-posts.png"}
            />
            <p className="text-center text-lg font-medium text-black-default/80">
              {`No ${
                Array.from(selectedPostStatus).join("") === "drafts"
                  ? "drafted"
                  : Array.from(selectedPostStatus).join("")
              } post found!`}
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Divider />
      <div className="flex items-end justify-end gap-2 px-7 py-4 bottom-0 bg-lightgrey-hover rounded">
        {Object.values(actionButtons).map((button) => {
          return (
            <CTAButtons
              key={button.label}
              // fullWidth={true}
              label={button.label}
              color={button.color}
              onPress={button.action}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ManagePostMainContent;
