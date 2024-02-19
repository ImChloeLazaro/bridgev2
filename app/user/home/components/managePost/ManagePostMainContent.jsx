import CTAButtons from "@/app/components/CTAButtons";
import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { userAtom } from "@/app/store/UserStore";
import { restinsert } from "@/app/utils/amplify-rest";
import { Divider } from "@aws-amplify/ui-react";
import { Button, Checkbox, CheckboxGroup, Image, cn } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { MdMinimize } from "react-icons/md";
import {
  addArchivePostAtom,
  addDraftPostAtom,
  addPublishPostAtom,
  archivedPostCountAtom,
  archivedPostListAtom,
  draftPostCountAtom,
  draftPostListAtom,
  filterKeysAtom,
  mediaFileListAtom,
  postCaptionAtom,
  postTitleAtom,
  publishedPostCountAtom,
  publishedPostListAtom,
  selectedArchivePostAtom,
  selectedDraftPostAtom,
  selectedFilterKeysAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedPostStatusAtom,
  selectedPublishPostAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
} from "../../store/ManagePostStore";
import { addPostAtom, deletePostAtom, postAtom, postCountAtom } from "../../store/PostStore";
import ManagePostItemCard from "./ManagePostItemCard";
import ManagePostTabs from "./ManagePostTabs";

// ### TODO Add Note to media selection that images
// should be at least ...px width to avoid images not properly displayed

const ManagePostMainContent = ({ onClose }) => {
  const [values, setValues] = useState([]);

  const user = useAtomValue(userAtom);

  const posts = useAtomValue(postAtom);
  const setAddedPosts = useSetAtom(addPostAtom);
  const setDeletedPosts = useSetAtom(deletePostAtom);

  const postCount = useAtomValue(postCountAtom);

  const draftsPostList = useAtomValue(draftPostListAtom);
  const setDraftsPostList = useSetAtom(addDraftPostAtom);

  const publishedPostList = useAtomValue(publishedPostListAtom);
  const setPublishedPostList = useSetAtom(addPublishPostAtom);

  const archivedPostList = useAtomValue(archivedPostListAtom);
  const setArchivedPostList = useSetAtom(addArchivePostAtom);

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

  const [selectedMediaOrientation, setSelectedMediaOrientation] = useAtom(
    selectedMediaOrientationAtom
  );
  const [selectedMediaLayout, setSelectedMediaLayout] = useAtom(
    selectedMediaLayoutAtom
  );

  const [selectedFilterKeys, setSelectedFilterKeys] = useAtom(
    selectedFilterKeysAtom
  );
  const filterKeys = useAtomValue(filterKeysAtom);

  const [selectedTemplateType, setSelectedTemplateType] = useAtom(
    selectedTemplateTypeAtom
  );

  const [postTitle, setPostTitle] = useAtom(postTitleAtom);
  const [postCaption, setPostCaption] = useAtom(postCaptionAtom);
  const [templateName, setTemplateName] = useAtom(templateNameAtom);

  const [selectedReactions, setSelectedReactions] = useAtom(
    selectedReactionsAtom
  );
  const [selectedTaggedPeople, setSelectedTaggedPeople] = useAtom(
    selectedTaggedPeopleAtom
  );

  const selectedTemplateTypeString = Array.from(selectedTemplateType).join("");

  const mediaFileList = useAtomValue(mediaFileListAtom);

  const draftPostCount = useAtomValue(draftPostCountAtom);
  const publishedPostCount = useAtomValue(publishedPostCountAtom);
  const archivedPostCount = useAtomValue(archivedPostCountAtom);

  const postStatusCount =
    selectedPostStatus === "drafts"
      ? draftPostCount + 1
      : selectedPostStatus === "published"
      ? publishedPostCount + 1
      : selectedPostStatus === "archived"
      ? archivedPostCount + 1
      : 0;

  const postKey =
    selectedPostStatus === "drafts"
      ? `draft-${draftPostCount + 1}`
      : selectedPostStatus === "published"
      ? `publish-${publishedPostCount + 1}`
      : selectedPostStatus === "archived"
      ? `archive-${archivedPostCount + 1}`
      : 0;

  const handleAddPost = () => {
    if (selectedPostStatus === "drafts") {
      if (selectedTemplateTypeString !== "custom") {
        const newPost = {
          id: postStatusCount,
          type: templateName.toLowerCase(),
          key: `draft-${draftPostCount + 1}`,
          title: postTitle,
          publisher: user.name,
          publisherPicture: user.picture,
          team: user.team,
          caption: postCaption,
          media: mediaFileList ? [...mediaFileList] : [],
          mediaLayout: [...selectedMediaLayout],
          orientation: [...selectedMediaOrientation],
          reactionList: [...selectedReactions],
          taggedPeople: [...selectedTaggedPeople], // key of users
          status: selectedPostStatus,
        };

        // Adds post to post modal
        setDraftsPostList((prev) => [...prev, newPost]);
        console.log("newPost", newPost);
      } else {
        console.log("NO EMPTY TEMPLATE ALLOWED");
      }
    }

    console.log("ADD postCount: ", postStatusCount);
    console.log("POST ADDED");
  };

  const handleDeletePost = () => {
    if (selectedPostStatus === "drafts") {
      console.log("INSIDE DELETE DRAFT POST", selectedDraftPost);
      
      // Deletes post from post modal
      setDraftsPostList(() =>
        draftsPostList.filter((draft) => !selectedDraftPost.includes(draft.key))
      );
      setSelectedDraftPost([]);
    }

    if (selectedPostStatus === "published") {
      console.log("INSIDE DELETE PUBLISH POST", selectedPublishPost);
      
      // Deletes post from post modal
      setPublishedPostList(() =>
        publishedPostList.filter(
          (publish) => !selectedPublishPost.includes(publish.key)
        )
      );
      setSelectedPublishPost([]);

      // Deletes post from feed
      setDeletedPosts(() =>
        posts.filter(
          (publish) => !selectedPublishPost.includes(publish.postKey)
        )
      );
    }

    if (selectedPostStatus === "archived") {
      console.log("INSIDE DELETE ARCHIVE POST", selectedArchivePost);
      
      // Deletes post from post modal
      setArchivedPostList(() =>
        archivedPostList.filter(
          (archive) => !selectedArchivePost.includes(archive.key)
        )
      );
      setSelectedArchivePost([]);
    }

    console.log("DELETE postCount: ", postStatusCount);
    console.log("POST DELETED");
  };

  const handlePublishPost = async () => {
    if (selectedPostStatus === "drafts") {
      console.log("INSIDE PUBLISH POST", selectedDraftPost);

      // ### TODO Add validation for data to be completed first before publishing to post feed

      const filteredDrafts = draftsPostList.filter((draft) =>
        selectedDraftPost.includes(draft.key)
      );

      const toBePublished = filteredDrafts.map((draft) => {
        return { ...draft, key: `publish-${publishedPostCount + 1}` };
      });

      console.log("PUBLISH: filteredDrafts", filteredDrafts);
      console.log("PUBLISH: toBePublished", toBePublished);
      console.log("PUBLISH: postCount", postCount);
      console.log("PUBLISH: publishedPostCount", publishedPostCount);

      // Removes post from post modal
      setDraftsPostList(() =>
        draftsPostList.filter((draft) => !selectedDraftPost.includes(draft.key))
      );
      setSelectedDraftPost([]);

      // Adds post to published status from post modal
      setPublishedPostList((prev) => [...prev, ...toBePublished]);

      let postCountIndex = publishedPostCount;
      const toBePosted = filteredDrafts.map((draft) => {
        console.log("NO MEDIA", draft.key);
        return {
          ...draft,
          id: (postCountIndex += 1),
          key: `publish-${postCountIndex}`,
          datetimePublished: new Date(),
          datetimeScheduled: new Date(),
          reacted: false,
          reactions: {
            star: 1,
            love: 0,
            birthday: 0,
            happy: 0,
          },
          comments: 0,
          taggedPeople: [...draft.taggedPeople], // key of users
          status: draft.status,
        };
      });

      // Adds post to backend via API call
      const posts = await restinsert("/post", toBePosted);

      console.log("PUBLISHED POSTS FOR FEED");
      console.log("POSTS SUCCESS", posts);
      console.log("POSTS DATA", posts);

      // Adds post to post feed
      setAddedPosts((prev) => [...prev, ...toBePosted]);
    }

    console.log("PUBLISH postCount: ", postStatusCount);
    console.log("POST PUBLISHED");
  };

  const handleArchivePost = () => {
    if (selectedPostStatus === "published") {
      console.log("INSIDE ARCHIVE POST", selectedPublishPost);

      const filteredPublish = publishedPostList.filter((publish) =>
        selectedPublishPost.includes(publish.key)
      );
      let postIndex = archivedPostCount;
      const toBeArchived = filteredPublish.map((publish) => {
        return { ...publish, key: `archive-${(postIndex += 1)}` };
      });

      // Removes post from post modal
      setPublishedPostList(() =>
        publishedPostList.filter(
          (publish) => !selectedPublishPost.includes(publish.key)
        )
      );
      setSelectedPublishPost([]);

      // Adds post to archived status from post modal
      setArchivedPostList((prev) => [...prev, ...toBeArchived]);

      // Deletes post from post feed
      setDeletedPosts(() =>
        posts.filter(
          (archive) => !selectedPublishPost.includes(archive.postKey)
        )
      );
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
    selectedPostStatus === "drafts"
      ? draftActionsButtons
      : selectedPostStatus === "published"
      ? publishedActionsButtons
      : selectedPostStatus === "archived"
      ? archivedActionButtons
      : {};

  const postList =
    selectedPostStatus === "drafts"
      ? draftsPostList
      : selectedPostStatus === "published"
      ? publishedPostList
      : selectedPostStatus === "archived"
      ? archivedPostList
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
