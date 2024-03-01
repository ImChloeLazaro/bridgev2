import { userAtom } from "@/app/store/UserStore";
import {
  destroywithparams,
  getfile,
  restinsert,
  restread,
  uploadfile,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import "../../../aws-auth";
import { postAtom } from "./PostStore";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

// LIST FOR DRAFTED POSTS
export const draftPostListAtom = atom([]);

export const draftPostCountAtom = atom((get) => get(draftPostListAtom).length);

// ADDING DRAFTS TO MODAL WINDOW AND TO BACKEND
export const addDraftPostAtom = atom(null, async (get, set, update) => {
  const { selectedDraft, sub } = update;
  const handleAllAreTrue = (arr) => {
    return arr.every((element) => element === true);
  };

  const user = await get(userAtom);
  let draftIndex = get(draftPostCountAtom);

  const templateName = selectedDraft.type;

  const postTitle = selectedDraft.title;
  const postCaption = selectedDraft.caption;
  const mediaFileList = selectedDraft.mediaFileList;
  const selectedMediaLayout = Array.from(selectedDraft.mediaLayout).join("");
  const selectedMediaOrientation = Array.from(selectedDraft.orientation).join(
    ""
  );
  const selectedReactions = selectedDraft.reactionList;
  const selectedTaggedPeople = selectedDraft.taggedPeople;

  console.log("mediaFileList type", typeof mediaFileList);

  // uploading then fetching filename from backend to be able to display it on frontend
  const mediaToBeUploaded = await Promise.all(
    Object.values(mediaFileList).map(async (media) => {
      console.log("file media", media);
      const fileUploaded = await uploadfile(media);
      console.log("fileUploaded", fileUploaded);
      return fileUploaded;
    })
  );

  const fileNameList = mediaToBeUploaded;
  console.log("DRAFT: fileNameList", fileNameList);

  if (handleAllAreTrue(mediaToBeUploaded.map((file) => file.success))) {
    const previewMediaList = fileNameList.map((media) => {
      if (media.success) {
        return getfile(media.filename);
      } else {
        console.log("MEDIA GET FILENAME FAILED");
        return ""; // default image placeholder
      }
    });
    console.log("previewMediaList", previewMediaList);
    // Add Validation

    const newDraft = {
      caption: postCaption,
      // comments: 0,
      // datetimePublished: new Date(),
      // datetimeScheduled: new Date(),
      id: (draftIndex += 1),
      key: `draft-${draftIndex}`,
      media: previewMediaList ? [...previewMediaList] : [],
      mediaLayout: selectedMediaLayout,
      orientation: selectedMediaOrientation,
      // postKey: postKey,
      publisher: user.name,
      publisherPicture: user.picture,
      // reacted: false,
      reactionList: [...selectedReactions],
      // reactions: {
      //   star: 0,
      //   love: 0,
      //   birthday: 0,
      //   happy: 0,
      // },
      sub: sub,
      status: "drafts",
      taggedPeople: [...selectedTaggedPeople], // key of users
      team: user.team,
      title: postTitle,
      type: templateName.toLowerCase(),
    };

    const response = await restinsert("/post", { ...newDraft });

    if (response.success) {
      set(selectedDraftPostAtom, []); // clears the selection when deleting
      set(draftPostListAtom, [...get(draftPostListAtom), response.response]);
      return { success: true };
    } else {
      return { success: false };
    }
  }
});

export const removeDraftPostAtom = atom(null, async (get, set, update) => {
  const { selectedDraft, sub } = update;
  const handleAllAreTrue = (arr) => {
    return arr.every((element) => element === true);
  };

  const toBeDeleted = await Promise.all(
    selectedDraft.map(async (draft) => {
      const response = await destroywithparams("/post", { _id: draft._id });

      return { success: response.success ?? false };
    })
  );
  if (handleAllAreTrue(toBeDeleted.map((post) => post.success))) {
    console.log(
      `${toBeDeleted.length} ${
        toBeDeleted.length > 1 ? "posts are" : "post is"
      } successfully deleted`
    );
    // Removes drafted post from post modal
    const updateDrafts = get(postAtom).filter(
      (draft) => draft.sub === sub && draft.status === "drafts"
    );
    set(draftPostListAtom, [...updateDrafts]);

    set(selectedDraftPostAtom, []); // clears the selection when deleting
    return { success: true, deletedCount: toBeDeleted.length };
  } else {
    return { success: false };
  }
});

export const selectedDraftPostAtom = atom([]);

export const fetchDraftPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  const filteredDrafts = posts.response.filter(
    (post) => post.sub === sub && post.status === "drafts"
  );
  set(draftPostListAtom, filteredDrafts);
});
