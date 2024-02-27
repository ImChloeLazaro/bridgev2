import CTAButtons from "@/app/components/CTAButtons";
import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { Divider } from "@aws-amplify/ui-react";
import { Button, Checkbox, CheckboxGroup, Image, cn } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { MdMinimize } from "react-icons/md";
import {
  filterKeysAtom,
  mediaFileListAtom,
  postCaptionAtom,
  postTitleAtom,
  selectedFilterKeysAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedPostStatusAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  taggedPeopleListAtom,
  templateNameAtom,
} from "../../store/ManagePostStore";
import { deletePostAtom, fetchPostAtom, postAtom } from "../../store/PostStore";
import ManagePostItemCard from "./ManagePostItemCard";
import ManagePostTabs from "./ManagePostTabs";

import { authenticationAtom } from "@/app/store/AuthenticationStore";
import "../../../../aws-auth";
import {
  addArchivePostAtom,
  archivedPostCountAtom,
  archivedPostListAtom,
  fetchArchivePostAtom,
  removeArchivePostAtom,
  selectedArchivePostAtom,
} from "../../store/ArchivedStore";
import {
  addDraftPostAtom,
  draftPostCountAtom,
  draftPostListAtom,
  fetchDraftPostAtom,
  removeDraftPostAtom,
  selectedDraftPostAtom,
} from "../../store/DraftedStore";
import {
  addPublishPostAtom,
  fetchPublishPostAtom,
  publishedPostCountAtom,
  publishedPostListAtom,
  removePublishPostAtom,
  selectedPublishPostAtom,
} from "../../store/PublishedStore";
// ### TODO Add Note to media selection that images
// should be at least ...px width to avoid images not properly displayed

const ManagePostMainContent = ({ onClose }) => {
  const auth = useAtomValue(authenticationAtom);
  const [values, setValues] = useState([]);

  const fetchPost = useSetAtom(fetchPostAtom);
  const fetchDraftPost = useSetAtom(fetchDraftPostAtom);
  const fetchPublishPost = useSetAtom(fetchPublishPostAtom);
  const fetchArchivePost = useSetAtom(fetchArchivePostAtom);

  useEffect(() => {
    fetchDraftPost(auth.sub);
    fetchPublishPost(auth.sub);
    fetchArchivePost(auth.sub);
  }, [auth, fetchArchivePost, fetchDraftPost, fetchPublishPost]);

  const draftsPostList = useAtomValue(draftPostListAtom);
  const addDraftPost = useSetAtom(addDraftPostAtom);
  const removeDraftPost = useSetAtom(removeDraftPostAtom);

  const publishedPostList = useAtomValue(publishedPostListAtom);
  const addPublishPost = useSetAtom(addPublishPostAtom);
  const removePublishPost = useSetAtom(removePublishPostAtom);

  const archivedPostList = useAtomValue(archivedPostListAtom);
  const addArchivePost = useSetAtom(addArchivePostAtom);
  const removeArchivePost = useSetAtom(removeArchivePostAtom);

  const [selectedDraftPost, setSelectedDraftPost] = useAtom(
    selectedDraftPostAtom
  );
  const [selectedPublishPost, setSelectedPublishPost] = useAtom(
    selectedPublishPostAtom
  );
  const [selectedArchivePost, setSelectedArchivePost] = useAtom(
    selectedArchivePostAtom
  );

  const selectedMediaOrientation = useAtomValue(selectedMediaOrientationAtom);
  const selectedMediaLayout = useAtomValue(selectedMediaLayoutAtom);

  const [selectedFilterKeys, setSelectedFilterKeys] = useAtom(
    selectedFilterKeysAtom
  );
  const filterKeys = useAtomValue(filterKeysAtom);

  const selectedPostStatus = useAtomValue(selectedPostStatusAtom);
  const selectedTemplateType = useAtomValue(selectedTemplateTypeAtom);

  const postTitle = useAtomValue(postTitleAtom);
  const postCaption = useAtomValue(postCaptionAtom);
  const templateName = useAtomValue(templateNameAtom);

  const selectedReactions = useAtomValue(selectedReactionsAtom);
  const selectedTaggedPeople = useAtomValue(selectedTaggedPeopleAtom);

  const taggedPeopleList = useAtomValue(taggedPeopleListAtom);

  const selectedPostStatusString = Array.from(selectedPostStatus).join("");
  const selectedTemplateTypeString = Array.from(selectedTemplateType).join("");
  const selectedTaggedPeopleString = Array.from(selectedTaggedPeople).join("");

  const mediaFileList = useAtomValue(mediaFileListAtom);

  const draftPostCount = useAtomValue(draftPostCountAtom);
  const publishedPostCount = useAtomValue(publishedPostCountAtom);
  const archivedPostCount = useAtomValue(archivedPostCountAtom);

  const postStatusCount =
    selectedPostStatusString === "drafts"
      ? draftPostCount + 1
      : selectedPostStatusString === "published"
      ? publishedPostCount + 1
      : selectedPostStatusString === "archived"
      ? archivedPostCount + 1
      : 0;

  const handleAddPost = async () => {
    if (selectedPostStatusString === "drafts") {
      if (selectedTemplateTypeString !== "custom") {
        const taggedPeople = taggedPeopleList.filter(
          (people) => people.key === selectedTaggedPeopleString
        );

        const draftedPost = {
          sub: auth.sub,
          type: templateName.toLowerCase(),
          reactionList: [...selectedReactions],
          mediaLayout: selectedMediaLayout,
          orientation: selectedMediaOrientation,
          mediaFileList: mediaFileList,
          title: postTitle,
          taggedPeople: taggedPeople, // key of users
          caption: postCaption,
        };
        const response = await addDraftPost(draftedPost);
        console.log("POST ADDED", response);
        if (response.success) {
          console.log("CONFIRM WINDOW ADDED POST", response.success);
        }
      } else {
        console.log("NO EMPTY TEMPLATE ALLOWED");
      }
    }

    console.log("ADD postCount: ", postStatusCount);
  };

  const handleDeletePost = async () => {
    if (selectedPostStatusString === "drafts") {
      console.log("INSIDE DELETE DRAFT POST", selectedDraftPost);

      const toBeDeletedPost = draftsPostList.filter((draft) => {
        console.log("KEY", draft.key);
        return selectedDraftPost.includes(draft.key);
      });

      console.log("toBeDeletedPost", toBeDeletedPost);
      const response = await removeDraftPost(toBeDeletedPost);
      console.log("POST DELETED", response);
      if (response.success) {
        console.log("CONFIRM WINDOW DELETED POST", response.success);
      } else {
        console.log("NO POST DELETED");
      }
    }

    if (selectedPostStatusString === "published") {
      console.log("INSIDE DELETE PUBLISH POST", selectedPublishPost);

      const toBeDeletedPost = publishedPostList.filter((publish) => {
        console.log("KEY", publish.key);
        return selectedPublishPost.includes(publish.key);
      });

      console.log("toBeDeletedPost", toBeDeletedPost);
      const response = await removePublishPost(toBeDeletedPost);
      console.log("POST DELETED", response);
      if (response.success) {
        console.log("CONFIRM WINDOW DELETED POST", response.success);
      } else {
        console.log("NO POST DELETED");
      }
    }

    if (selectedPostStatusString === "archived") {
      console.log("INSIDE DELETE ARCHIVE POST", selectedArchivePost);

      const toBeDeletedPost = archivedPostList.filter((archive) => {
        console.log("KEY", archivedPostList);
        return selectedArchivePost.includes(archive.key);
      });

      console.log("toBeDeletedPost", toBeDeletedPost);
      const response = await removeArchivePost(toBeDeletedPost);
      console.log("POST DELETED", response);
      if (response.success) {
        console.log("CONFIRM WINDOW DELETED POST", response.success);
      } else {
        console.log("NO POST DELETED");
      }
    }
  };

  const handlePublishPost = async () => {
    if (selectedPostStatusString === "drafts") {
      console.log("INSIDE PUBLISH POST", selectedDraftPost);

      // ### TODO Add validation for data to be completed first before publishing to post feed

      const selectedDrafts = draftsPostList.filter((draft) =>
        selectedDraftPost.includes(draft.key)
      );

      console.log("PUBLISH: selectedDraftPost", selectedDraftPost);
      console.log("PUBLISH: selectedDrafts", selectedDrafts);

      const response = await addPublishPost(selectedDrafts);
      console.log("PUBLISHED POST RESPONSE", response);
      fetchPost(auth.sub);
      fetchDraftPost(auth.sub);
      fetchPublishPost(auth.sub);
    }

    console.log("PUBLISH postCount: ", postStatusCount);
    console.log("POST PUBLISHED");
  };

  const handleArchivePost = async () => {
    if (selectedPostStatusString === "published") {
      console.log("INSIDE ARCHIVE POST", selectedPublishPost);

      const selectedPublish = publishedPostList.filter((publish) =>
        selectedPublishPost.includes(publish.key)
      );

      console.log("ARCHIVE: selectedPublishPost", selectedPublishPost);
      console.log("ARCHIVE: selectedPublish", selectedPublish);

      const response = await addArchivePost(selectedPublish);
      console.log("ARCHIVED POST RESPONSE", response);
      fetchPost(auth.sub);
      fetchPublishPost(auth.sub);
      fetchArchivePost(auth.sub);
    }

    console.log("ARCHIVE postCount: ", postStatusCount);
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
    delete: {
      color: "red",
      label: "Delete Post",
      action: handleDeletePost,
    },
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

  const actionButtons =
    selectedPostStatusString === "drafts"
      ? draftActionsButtons
      : selectedPostStatusString === "published"
      ? publishedActionsButtons
      : selectedPostStatusString === "archived"
      ? archivedActionButtons
      : {};

  const postList =
    selectedPostStatusString === "drafts"
      ? draftsPostList
      : selectedPostStatusString === "published"
      ? publishedPostList
      : selectedPostStatusString === "archived"
      ? archivedPostList
      : [];

  const selectedPosts =
    selectedPostStatusString === "drafts"
      ? selectedDraftPost
      : selectedPostStatusString === "published"
      ? selectedPublishPost
      : selectedPostStatusString === "archived"
      ? selectedArchivePost
      : values;

  const setSelectedPosts =
    selectedPostStatusString === "drafts"
      ? setSelectedDraftPost
      : selectedPostStatusString === "published"
      ? setSelectedPublishPost
      : selectedPostStatusString === "archived"
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
      <div className="flex-col ">
        <div className="flex items-end justify-end pt-4 pb-3 px-6 text-lightgrey-default bg-lightgrey-hover">
          <Button isIconOnly onPress={onClose} className={"bg-transparent"}>
            <MdMinimize size={24} />
          </Button>
          <CloseButton onPress={onClose} className={""} />
        </div>
        <Divider />
        <div className="flex justify-between items-center px-7 mt-4 mb-3">
          <SearchBar
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            filterKeys={filterKeys}
            selectedFilterKeys={selectedFilterKeys}
            setSelectedFilterKeys={setSelectedFilterKeys}
          />
          <ManagePostTabs />
        </div>
      </div>

      {/* BODY */}
      {filteredPostList.length != 0 ? (
        <div className="grid justify-center w-full h-[50rem] overflow-y-scroll px-6 ">
          <CheckboxGroup
            aria-label="Post Item Card Checkbox Group"
            value={selectedPosts}
            onValueChange={(value) => {
              setSelectedPosts(value);
              console.log("SELECTED POST:", value);
            }}
            className="w-full"
          >
            <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-4 mb-6 w-full ">
              {filteredPostList.map((post, index) => (
                <Checkbox
                  value={post.key}
                  key={index}
                  aria-label="Post Item Card Checkbox"
                  classNames={{
                    base: cn(
                      "inline-flex w-[500px]",
                      "items-start justify-start",
                      "cursor-pointer rounded-lg border-2 border-transparent",
                      "data-[selected=true]:bg-lightgrey-default"
                    ),
                    label: "w-full",
                  }}
                >
                  <ManagePostItemCard data={post} />
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
