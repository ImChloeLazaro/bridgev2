import {
  getfile,
  restinsert,
  restread,
  uploadfile,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import "../../../aws-auth";
import {
  mediaFileListAtom,
  postCaptionAtom,
  postTitleAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedPostStatusAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
} from "./ManagePostStore";
import { userAtom } from "@/app/store/UserStore";
import { addPostAtom, postAtom } from "./PostStore";

// LIST FOR DRAFTED POSTS
export const draftPostListAtom = atom([]);

export const draftPostCountAtom = atom((get) => get(draftPostListAtom).length);

// ADDING DRAFTS TO MODAL WINDOW AND TO BACKEND
export const addDraftPostAtom = atom(null, async (get, set, draft) => {
  // fetching data needed for drafted post
  const user = await get(userAtom);
  const draftPostCount = get(draftPostCountAtom);

  const templateName = draft.type;
  const postKey = get(postCountAtom) + 1;
  const postTitle = draft.title;
  const postCaption = draft.caption;
  const mediaFileList = draft.mediaFileList;
  const selectedMediaLayout = Array.from(draft.mediaLayout).join("");
  const selectedMediaOrientation = Array.from(draft.orientation).join("");
  const selectedReactions = draft.reactionList;
  const selectedTaggedPeople = draft.taggedPeople;

  // uploading then fetching filename from backend to be able to display it on frontend
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

  const previewMediaList = fileNameList.map((media) => {
    console.log("MEDIA GET FILENAME", media);
    if (media.success) {
      console.log("MEDIA GET FILENAME SUCCESS");
      return getfile(media.filename);
    } else {
      console.log("MEDIA GET FILENAME FAILED");
      return ""; // default image placeholder
    }
  });
  console.log("NEED TO SEE THIS", previewMediaList);
  console.log("TYPE NEED TO SEE THIS", typeof previewMediaList);

  // Add Validation

  const newPost = {
    caption: postCaption,
    comments: 0,
    datetimePublished: new Date(),
    datetimeScheduled: new Date(),
    id: draftPostCount,
    key: `draft-${draftPostCount + 1}`,
    media: previewMediaList ? [...previewMediaList] : [],
    mediaLayout: selectedMediaLayout,
    orientation: selectedMediaOrientation,
    postKey: postKey,
    publisher: user.name,
    publisherPicture: user.picture,
    reacted: false,
    reactionList: [...selectedReactions],
    reactions: {
      star: 0,
      love: 0,
      birthday: 0,
      happy: 0,
    },
    status: "drafts",
    taggedPeople: [...selectedTaggedPeople], // key of users
    team: user.team,
    title: postTitle,
    type: templateName.toLowerCase(),
  };

  const response = await restinsert("/post", { ...newPost });
  console.log("RESPONSE", response);

  set(draftPostListAtom, [...get(draftPostListAtom), newPost]);

  // console.log("ADDED DRAFT", get(draftPostListAtom));
  return { success: true };
});
export const removeDraftPostAtom = atom(null, async (get, set, update) => {
  set(draftPostListAtom, update);
  console.log("PUBLISHED POST", get(draftPostListAtom));
});
export const selectedDraftPostAtom = atom([]);

export const fetchPostAtom = atom(null, async (get, set) => {
  const posts = await restread("/post");
  console.log("POSTS DATA", posts);

  set(draftPostListAtom, posts.response);
});
