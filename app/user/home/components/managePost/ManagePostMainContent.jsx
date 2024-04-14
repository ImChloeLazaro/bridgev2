import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { Divider } from "@aws-amplify/ui-react";
import { Button, Checkbox, CheckboxGroup, Image, cn } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { MdMinimize } from "react-icons/md";
import "../../../../aws-auth";
import {
  addArchivePostAtom,
  archivedPostListAtom,
  fetchArchivePostAtom,
  removeArchivePostAtom,
  selectedArchivePostAtom,
} from "../../store/ArchivedStore";
import {
  addDraftPostAtom,
  draftPostListAtom,
  fetchDraftPostAtom,
  removeDraftPostAtom,
  selectedDraftPostAtom,
} from "../../store/DraftedStore";
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
import { fetchPostAtom, postAtom } from "../../store/PostStore";
import {
  addPublishPostAtom,
  fetchPublishPostAtom,
  publishedPostListAtom,
  removePublishPostAtom,
  selectedPublishPostAtom,
} from "../../store/PublishedStore";
import ManagePostItemCard from "./ManagePostItemCard";
import ManagePostTabs from "./ManagePostTabs";

const ManagePostMainContent = ({ onClose }) => {
  const auth = useAtomValue(authenticationAtom);
  const [values, setValues] = useState([]);

  const fetchPost = useSetAtom(fetchPostAtom);
  const fetchDraftPost = useSetAtom(fetchDraftPostAtom);
  const fetchPublishPost = useSetAtom(fetchPublishPostAtom);
  const fetchArchivePost = useSetAtom(fetchArchivePostAtom);

  const draftsPostList = useAtomValue(draftPostListAtom);
  const addDraftPost = useSetAtom(addDraftPostAtom);
  const removeDraftPost = useSetAtom(removeDraftPostAtom);

  const publishedPostList = useAtomValue(publishedPostListAtom);
  const addPublishPost = useSetAtom(addPublishPostAtom);
  const removePublishPost = useSetAtom(removePublishPostAtom);

  const archivedPostList = useAtomValue(archivedPostListAtom);
  const addArchivePost = useSetAtom(addArchivePostAtom);
  const removeArchivePost = useSetAtom(removeArchivePostAtom);

  const post = useAtomValue(postAtom);

  useEffect(() => {
    // fetchPost();
    fetchDraftPost(auth.sub);
    fetchPublishPost(auth.sub);
    fetchArchivePost(auth.sub);
  }, [auth, fetchDraftPost, fetchPublishPost, fetchArchivePost, fetchPost]);

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
        const response = await addDraftPost({
          selectedDraft: draftedPost,
          sub: auth.sub,
        });

        if (response.success) {
          console.log("CONFIRM WINDOW ADDED POST", response.success);
        }
      } else {
        console.log("NO EMPTY TEMPLATE ALLOWED");
      }
    }
    fetchDraftPost(auth.sub);
  };

  const handleDeletePost = async () => {
    if (selectedPostStatusString === "drafts") {
      const toBeDeletedPost = draftsPostList.filter((draft) => {
        return selectedDraftPost.includes(draft.key);
      });

      const response = await removeDraftPost({
        selectedDraft: toBeDeletedPost,
        sub: auth.sub,
      });

      if (response.success) {
        console.log("CONFIRM WINDOW DELETED POST", response.success);
      } else {
        console.log("NO DRAFT POST DELETED");
      }
      fetchDraftPost(auth.sub);
    }

    if (selectedPostStatusString === "published") {
      const toBeDeletedPost = publishedPostList.filter((publish) => {
        return selectedPublishPost.includes(publish.key);
      });

      const response = await removePublishPost({
        selectedPublish: toBeDeletedPost,
        sub: auth.sub,
      });

      if (response.success) {
        console.log("CONFIRM WINDOW DELETED POST", response.success);
      } else {
        console.log("NO PUBLISH POST DELETED");
      }
      fetchPublishPost(auth.sub);
      fetchPost();
    }

    if (selectedPostStatusString === "archived") {
      const toBeDeletedPost = archivedPostList.filter((archive) => {
        return selectedArchivePost.includes(archive.key);
      });

      const response = await removeArchivePost({
        selectedArchive: toBeDeletedPost,
        sub: auth.sub,
      });

      if (response.success) {
        console.log("CONFIRM WINDOW DELETED POST", response.success);
      } else {
        console.log("NO ARCHIVE POST DELETED");
      }
    }
    fetchArchivePost(auth.sub);
  };

  const handlePublishPost = async () => {
    if (selectedPostStatusString === "drafts") {
      console.log("POSTS DATA: post", post);
      const selectedDrafts = draftsPostList.filter((draft) =>
        selectedDraftPost.includes(draft.key)
      );
      console.log("DRAFT: selectedDrafts", selectedDrafts);
      const response = await addPublishPost({
        selectedToBePublished: selectedDrafts,
        sub: auth.sub,
      });
      if (response.success) {
        console.log("CONFIRM WINDOW PUBLISHED POST", response.success);
      } else {
        console.log("NO POST PUBLISHED");
      }

      fetchDraftPost(auth.sub);
      fetchPublishPost(auth.sub);
      fetchPost();
    }
  };

  const handleArchivePost = async () => {
    if (selectedPostStatusString === "published") {
      const selectedPublish = publishedPostList.filter((publish) =>
        selectedPublishPost.includes(publish.key)
      );

      const response = await addArchivePost({
        selectedToBeArchived: selectedPublish,
        sub: auth.sub,
      });
      if (response.success) {
        console.log("CONFIRM WINDOW ARCHIVED POST", response.success);
      } else {
        console.log("NO POST ARCHIVED");
      }

      fetchPublishPost(auth.sub);
      fetchArchivePost(auth.sub);
      fetchPost();
    }
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
    <div className="flex flex-col h-full justify-between items-stretch p-0 rounded-r-lg">
      {/* HEADER */}
      <div className="flex-col rounded-r-lg">
        <div className="flex items-end justify-end py-1 px-2 rounded-r-lg text-lightgrey-default bg-lightgrey-hover">
          <Button isIconOnly onPress={onClose} className={"bg-transparent"}>
            <MdMinimize size={18} />
          </Button>
          <IconButton onPress={onClose}>
            <MdClose size={18} />
          </IconButton>
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
        <div className="grid justify-center w-full h-full overflow-y-scroll px-6 ">
          <CheckboxGroup
            aria-label="Post Item Card Checkbox Group"
            value={selectedPosts}
            onValueChange={(value) => {
              setSelectedPosts(value);
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
        <div className="w-full h-full flex justify-center mt-6">
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
      <div className="flex flex-col">
        <Divider />
        <div className="flex items-end justify-end gap-4 px-8 py-4 bottom-0 bg-lightgrey-hover rounded">
          {Object.values(actionButtons).map((button) => {
            return (
              <CTAButtons
                key={button.label}
                fullWidth={false}
                size="md"
                label={button.label}
                color={button.color}
                onPress={button.action}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManagePostMainContent;
