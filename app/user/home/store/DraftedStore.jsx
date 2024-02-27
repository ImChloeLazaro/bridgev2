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

// LIST FOR DRAFTED POSTS
export const draftPostListAtom = atom([]);

export const draftPostCountAtom = atom((get) => get(draftPostListAtom).length);

// ADDING DRAFTS TO MODAL WINDOW AND TO BACKEND
export const addDraftPostAtom = atom(null, async (get, set, selectedDraft) => {
  // fetching data needed for drafted post
  const user = await get(userAtom);
  const draftPostCount = get(draftPostCountAtom);
  const sub = selectedDraft.sub;

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

  const newDraft = {
    caption: postCaption,
    // comments: 0,
    // datetimePublished: new Date(),
    // datetimeScheduled: new Date(),
    id: draftPostCount,
    key: `draft-${draftPostCount + 1}`,
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
  console.log("ADDED POST RESPONSE", response);
  if (response.success) {
    set(draftPostListAtom, [...get(draftPostListAtom), newDraft]);
    return { success: true };
  } else {
    return { success: false };
  }
});

export const removeDraftPostAtom = atom(
  null,
  async (get, set, selectedDraft) => {
    const handleAllAreTrue = (arr) => {
      return arr.every((element) => element === true);
    };

    const toBeDeleted = await Promise.all(
      selectedDraft.map(async (draft) => {
        console.log("TO BE DELETED POST", draft._id);
        console.log("TO BE DELETED POST TYPE", typeof draft);
        const response = await destroywithparams("/post", { _id: draft._id });
        console.log("DELETE RESPONSE", response);
        return { success: response.success ?? false };
      })
    );
    if (handleAllAreTrue(toBeDeleted.map((post) => post.success))) {
      console.log("DELETED ACKNOWLEDGED: ", toBeDeleted);
      console.log(
        `${toBeDeleted.length} ${
          toBeDeleted.length > 1 ? "posts are" : "post is"
        } successfully deleted`
      );
      // Removes drafted post from post modal
      set(
        draftPostListAtom,
        get(draftPostListAtom).filter(
          (draft) => !get(selectedDraftPostAtom).includes(draft.key)
        )
      );

      set(selectedDraftPostAtom, []); // clears the selection when deleting
      return { success: true, deletedCount: toBeDeleted.length };
    } else {
      return { success: false };
    }
  }
);

export const selectedDraftPostAtom = atom([]);

export const fetchDraftPostAtom = atom(null, async (get, set, sub) => {
  const posts = await restread("/post");
  if (posts.success) {
    console.log("POSTS DATA", posts);
    const filteredDrafts = posts.response.filter(
      (post) => post.sub === sub && post.status === "drafts"
    );
    set(draftPostListAtom, filteredDrafts);
  } else {
    console.log("POSTS DATA FAILED");
  }
});
