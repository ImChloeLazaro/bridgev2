import { getfile, restread, uploadfile } from "@/app/utils/amplify-rest";
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
export const addDraftPostAtom = atom(null, async (get, set) => {
  const user = await get(userAtom);
  const draftPostCount = get(draftPostCountAtom);
  const templateName = get(templateNameAtom);
  const postTitle = get(postTitleAtom);
  const postCaption = get(postCaptionAtom);
  const selectedMediaLayout = get(selectedMediaLayoutAtom);
  const selectedMediaOrientation = get(selectedMediaOrientationAtom);
  const selectedReactions = get(selectedReactionsAtom);
  const selectedTaggedPeople = get(selectedTaggedPeopleAtom);

  //   const previewMediaList = Object.values(get(mediaFileListAtom)).map((file) => {
  //     return URL.createObjectURL(file);
  //   });

  const mediaToBeUploaded = async () => {
    let upload = await Promise.all(
      Object.values(get(mediaFileListAtom)).map(async (media) => {
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
    id: draftPostCount,
    type: templateName.toLowerCase(),
    key: `draft-${draftPostCount + 1}`,
    title: postTitle,
    publisher: user.name,
    publisherPicture: user.picture,
    team: user.team,
    caption: postCaption,
    media: previewMediaList ? [...previewMediaList] : [],
    mediaLayout: [...selectedMediaLayout],
    orientation: [...selectedMediaOrientation],
    reactionList: [...selectedReactions],
    taggedPeople: [...selectedTaggedPeople], // key of users
    status: "drafts",
  };

  //   const postToBeDrafted = get(draftPostListAtom).map((draft) => {
  //     return { ...draft, ...newPost };
  //   });

  set(draftPostListAtom, [...get(draftPostListAtom), newPost]);
  set(postAtom, [...get(draftPostListAtom), newPost]);

  console.log("ADDED DRAFT", get(draftPostListAtom));
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
