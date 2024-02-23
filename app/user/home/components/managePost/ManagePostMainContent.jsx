import CTAButtons from "@/app/components/CTAButtons";
import CloseButton from "@/app/components/CloseButton";
import SearchBar from "@/app/components/SearchBar";
import { userAtom } from "@/app/store/UserStore";
import {
  getfile,
  restdestroy,
  restinsert,
  uploadfile,
} from "@/app/utils/amplify-rest";
import { Divider } from "@aws-amplify/ui-react";
import { Button, Checkbox, CheckboxGroup, Image, cn } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState, useEffect } from "react";
import { MdMinimize } from "react-icons/md";
import {
  fileListAtom,
  fileUrlListAtom,
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
  templateNameAtom,
} from "../../store/ManagePostStore";
import {
  addPostAtom,
  deletePostAtom,
  postAtom,
  postCountAtom,
} from "../../store/PostStore";
import ManagePostItemCard from "./ManagePostItemCard";
import ManagePostTabs from "./ManagePostTabs";
import "../../../../aws-auth";
import {
  addDraftPostAtom,
  draftPostCountAtom,
  draftPostListAtom,
  selectedDraftPostAtom,
  fetchPostAtom,
} from "../../store/DraftedStore";
import {
  addPublishPostAtom,
  publishedPostCountAtom,
  publishedPostListAtom,
  selectedPublishPostAtom,
} from "../../store/PublishedStore";
import {
  addArchivePostAtom,
  archivedPostCountAtom,
  archivedPostListAtom,
  selectedArchivePostAtom,
} from "../../store/ArchivedStore";
import "../../../../aws-auth";
// ### TODO Add Note to media selection that images
// should be at least ...px width to avoid images not properly displayed

const ManagePostMainContent = ({ onClose }) => {
  const [values, setValues] = useState([]);

  const fetchPost = useSetAtom(fetchPostAtom);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const user = useAtomValue(userAtom);

  const posts = useAtomValue(postAtom);
  const setAddedPosts = useSetAtom(addPostAtom);
  const setDeletedPosts = useSetAtom(deletePostAtom);

  const postCount = useAtomValue(postCountAtom);

  const draftsPostList = useAtomValue(draftPostListAtom);
  const addDraftPost = useSetAtom(addDraftPostAtom);

  const publishedPostList = useAtomValue(publishedPostListAtom);
  const setPublishedPostList = useSetAtom(addPublishPostAtom);

  const archivedPostList = useAtomValue(archivedPostListAtom);
  const setArchivedPostList = useSetAtom(addArchivePostAtom);

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

  const selectedPostStatus = useAtomValue(selectedPostStatusAtom);
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

  // const [previewMediaList, setPreviewMediaList] = useAtom(previewMediaListAtom);

  const fileList = useAtomValue(fileListAtom);
  const fileUrlList = useAtomValue(fileUrlListAtom);

  const selectedPostStatusString = Array.from(selectedPostStatus).join("");
  const selectedTemplateTypeString = Array.from(selectedTemplateType).join("");

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

  const postKey =
    selectedPostStatusString === "drafts"
      ? `draft-${draftPostCount + 1}`
      : selectedPostStatusString === "published"
      ? `publish-${publishedPostCount + 1}`
      : selectedPostStatusString === "archived"
      ? `archive-${archivedPostCount + 1}`
      : 0;

  const handleAddPost = async () => {
    if (selectedPostStatusString === "drafts") {
      if (selectedTemplateTypeString !== "custom") {
        const draft = await addDraftPost();
        console.log("POST ADDED", draft);
        if (draft.success) {
          console.log("CONFIRM WINDOW ADDED POST", draft.success);
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

      // Deletes post from post modal
      // setDraftsPostList(() =>
      //   draftsPostList.filter((draft) => !selectedDraftPost.includes(draft.key))
      // );
      // setSelectedDraftPost([]);

      const toBeDeletedPost = draftsPostList.filter((draft) =>
        selectedDraftPost.includes(draft.key)
      );

      console.log("toBeDeletedPost", toBeDeletedPost);
      let deleted = await Promise.all(
        toBeDeletedPost.map(async (post) => {
          console.log("TO BE DELETED POST", post);
          console.log("TO BE DELETED POST TYPE", typeof post);
          let response = await restdestroy("/post", post);
          console.log("DELETE RESPONSE", response);
        })
      );
      console.log("deleted deleted", deleted);
      // await restdestroy("/post", { _id: "65d03577309cdd0e602454d0" });
    }

    if (selectedPostStatusString === "published") {
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

    if (selectedPostStatusString === "archived") {
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
    if (selectedPostStatusString === "drafts") {
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
      addDraftPost(() =>
        draftsPostList.filter((draft) => !selectedDraftPost.includes(draft.key))
      );
      setSelectedDraftPost([]);

      // Adds post to published status from post modal
      setPublishedPostList((prev) => [...prev, ...toBePublished]);

      let publishCountIndex = publishedPostCount;
      let postCountIndex = postCount;

      const toBePosted = await Promise.all(
        filteredDrafts.map(async (draft) => {
          console.log("NO MEDIA", draft.key);
          console.log("MEDIA HERE INSIDE: ", mediaFileList);
          console.log("TYPE MEDIA HERE INSIDE: ", typeof mediaFileList);

          const mediaToBeUploaded = async () => {
            let upload = await Promise.all(
              Object.values(mediaFileList).map(async (media) => {
                return await uploadfile(media);
              })
            );
            console.log("INSIDE ASYNC UPLOAD FILE: ", upload);
            return upload;
          };

          const fileNameList = await mediaToBeUploaded();

          const mediaToBePosted = fileNameList.map((media) => {
            if (media.success) {
              return getfile(media.filename);
            } else {
              (""); // default image placeholder
            }
          });
          console.log("NEED TO SEE THIS", mediaToBePosted);
          console.log("TYPE NEED TO SEE THIS", typeof mediaToBePosted);

          const dateToBePublished = new Date();
          const dateToBeScheduled = new Date();

          return {
            datetimePublished: dateToBePublished,
            datetimeScheduled: dateToBeScheduled,
            id: (publishCountIndex += 1),
            type: draft.type,
            key: `publish-${(publishCountIndex += 1)}`,
            postKey: `post-${(postCountIndex += 1)}`,
            title: draft.title,
            publisher: draft.publisher,
            publisherPicture: draft.publisherPicture,
            team: draft.team,
            caption: draft.caption,
            media: mediaToBePosted ? [...mediaToBePosted] : [],
            mediaLayout: draft.mediaLayout,
            orientation: draft.orientation,
            reactionList: draft.reactionList,
            taggedPeople: [...draft.taggedPeople], // key of users
            status: "published",
            reacted: false,
            reactions: {
              star: 1,
              love: 0,
              birthday: 0,
              happy: 0,
            },
            comments: 0,
          };
        })
      );

      console.log("TETETET toBePosted", toBePosted);

      // Adds post to backend via API call
      // const posts = await restinsert("/post", toBePosted);

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
    if (selectedPostStatusString === "published") {
      console.log("INSIDE ARCHIVE POST", selectedPublishPost);

      const filteredPublish = publishedPostList.filter((publish) =>
        selectedPublishPost.includes(publish.key)
      );
      let postIndex = archivedPostCount;
      const toBeArchived = filteredPublish.map((publish) => {
        return {
          ...publish,
          key: `archive-${(postIndex += 1)}`,
          status: "archived",
        };
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

  const filteredPostList = filteredPost;
  // .filter((post) => {
  //   return (
  //     post.team.toLowerCase().includes(searchItem.toLowerCase()) ||
  //     post.caption.toLowerCase().includes(searchItem.toLowerCase()) ||
  //     post.title.toLowerCase().includes(searchItem.toLowerCase())
  //   );
  // });

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
