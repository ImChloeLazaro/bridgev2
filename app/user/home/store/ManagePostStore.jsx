import { atom } from "jotai";
import { reactionIcons } from "../components/reaction/ReactionIcons";
import { userAtom } from "@/app/store/UserStore";

let templateIndex = 0;
export const templateTypeSelectionAtom = atom([
  {
    key: `template-${(templateIndex += 1)}`,
    label: "Custom",
    value: "custom",
  },
  {
    key: `template-${(templateIndex += 1)}`,
    label: "Award",
    value: "award",
  },
  {
    key: `template-${(templateIndex += 1)}`,
    label: "Team",
    value: "team",
  },
  {
    key: `template-${(templateIndex += 1)}`,
    label: "Feedback",
    value: "feedback",
  },
  {
    key: `template-${(templateIndex += 1)}`,
    label: "News",
    value: "news",
  },
  {
    key: `template-${(templateIndex += 1)}`,
    label: "Events",
    value: "events",
  },
  {
    key: `template-${(templateIndex += 1)}`,
    label: "Birthday",
    value: "birthday",
  },
]);

export const templateTypeCountAtom = atom(
  (get) => get(templateTypeSelectionAtom).length
);

export const selectedTemplateTypeAtom = atom(new Set(["custom"]));

export const templateNameAtom = atom("");

export const reactionsSelectionAtom = atom([
  {
    id: 1,
    key: "love",
    label: "Love",
    selectIcon: reactionIcons.love.badge,
    displayIcon: reactionIcons.love.borderBadge,
  },
  {
    id: 2,
    key: "birthday",
    label: "Birthday",
    selectIcon: reactionIcons.birthday.badge,
    displayIcon: reactionIcons.birthday.borderBadge,
  },
  {
    id: 3,
    key: "star",
    label: "Star",
    selectIcon: reactionIcons.star.badge,
    displayIcon: reactionIcons.star.borderBadge,
  },
  {
    id: 4,
    key: "happy",
    label: "Happy",
    selectIcon: reactionIcons.happy.badge,
    displayIcon: reactionIcons.happy.borderBadge,
  },
]);
export const selectedReactionsAtom = atom(new Set([]));

export const mediaLayoutAtom = atom();
export const mediaFileListAtom = atom();

export const postTitleAtom = atom("");

let taggedIndex = 0;
export const taggedPeopleListAtom = atom([
  {
    id: (taggedIndex += 1),
    key: "all",
    name: "@all",
    email: "tagged everyone",
    picture: null,
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "team",
    name: "@team",
    email: "tagged your team",
    picture: null,
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "tatiana philips", // ### TODO employee id for reference
    name: "Tatiana Philips",
    email: "tatiana.philips@aretex.com.au",
    picture: "/Tatiana Philips.png",
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "aspen donin",
    name: "Aspen Donin",
    email: "aspen.donin@aretex.com.au",
    picture: "/Aspen Donin.png",
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "kaylynn bergson",
    name: "Kaylynn Bergson",
    email: "kaylynn.bergson@aretex.com.au",
    picture: "/Kaylynn Bergson.png",
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "madelyn septimus",
    name: "Madelyn Septimus",
    email: "madelyn.septimus@aretex.com.au",
    picture: "/Madelyn Septimus.png",
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "skylar curtis",
    name: "Skylar Curtis",
    email: "skylar.curtis@aretex.com.au",
    picture: "/Skylar Curtis.png",
    team: "",
  },
  {
    id: (taggedIndex += 1),
    key: "wilson herwitz",
    name: "Wilson Herwitz",
    email: "wilson.herwitz@aretex.com.au",
    picture: "/Wilson Herwitz.png",
    team: "",
  },
]);

export const taggedPeopleCountAtom = atom(
  (get) => get(taggedPeopleListAtom).length
);

export const selectedTaggedPeopleAtom = atom(new Set([]));

export const postCaptionAtom = atom("");

let postTemplatesIndex = 0;
export const postTemplatesAtom = atom([
  {
    id: (postTemplatesIndex += 1),
    name: "Custom",
    type: "custom",
    reactionList: [],
    mediaLayout: "one",
    orientation: "landscape",
    title: "",
    tagPeople: [],
    caption: "",
  },
  {
    id: (postTemplatesIndex += 1),
    name: "Award",
    type: "award",
    reactionList: ["star"],
    mediaLayout: "one",
    orientation: "landscape",
    title: "Rex Winner Month of JANUARY",
    tagPeople: ["all"],
    caption: "Congratulations!!! Good Job!!",
  },
  {
    id: (postTemplatesIndex += 1),
    name: "Birthday",
    type: "birthday",
    reactionList: ["birthday"],
    mediaLayout: "one",
    orientation: "portrait",
    title: "HAPPY BIRTHDAY!!!",
    tagPeople: ["all"],
    caption:
      "“Another adventure filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor. Wishing you a very happy and fun-filled birthday!”",
  },
  {
    id: (postTemplatesIndex += 1),
    name: "Events",
    type: "events",
    reactionList: ["happy"],
    mediaLayout: "",
    orientation: "landscape",
    title: "LOOK HERE!!!",
    tagPeople: ["all"],
    caption: "Witness what we have prepared for you and hope that you enjoy!!!",
  },
  {
    id: (postTemplatesIndex += 1),
    name: "Feedback",
    type: "feedback",
    reactionList: ["star"],
    mediaLayout: "",
    orientation: "landscape",
    title: "CLIENT FEEDBACK",
    tagPeople: ["all"],
    caption: "Thank you for your hard work!!! Cheers!",
  },
  {
    id: (postTemplatesIndex += 1),
    name: "News",
    type: "news",
    reactionList: ["love"],
    mediaLayout: "",
    orientation: "landscape",
    title: "ATTENTION A-FAMILY!!!",
    tagPeople: ["all"],
    caption: "Look alive! \nHere are some of the hottest news today!",
  },
  {
    id: (postTemplatesIndex += 1),
    name: "Team",
    type: "team",
    reactionList: ["happy"],
    mediaLayout: "",
    orientation: "landscape",
    title: "NEW TEAM MEMBERS",
    tagPeople: ["all"],
    caption: "Let us welcome our newest members of our A-Family!!!",
  },
]);

export const postTemplatesCountAtom = atom(
  (get) => get(postTemplatesAtom).length
);

export const selectedTemplateAtom = atom();

export const reactionListAtom = atom();

let draftIndex = 0;
export const draftPostListAtom = atom([
  {
    id: (draftIndex += 1),
    type: "news",
    key: `draft-${draftIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["love"],
    tagPeople: [""], // key of users
  },
  {
    id: (draftIndex += 1),
    type: "team",
    key: `draft-${draftIndex}`,
    title: "Momentum = SEPTEMBER 2023",
    picture: "/Madelyn Septimus.png",
    team: "Aretex B-TEAM",
    caption:
      "Another JOB well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (draftIndex += 1),
    type: "team",
    key: `draft-${draftIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (draftIndex += 1),
    type: "news",
    key: `draft-${draftIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  // {
  //   id: (draftIndex += 1),
  //   type: "feedback",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "feedback",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "feedback",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "birthday",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "team",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "team",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "news",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (draftIndex += 1),
  //   type: "birthday",
  //   key: `draft-${draftIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
]);

export const draftPostCountAtom = atom((get) => get(draftPostListAtom).length);
export const addDraftPostAtom = atom(null, (get, set, update) => {});
export const selectedDraftPostAtom = atom([]);

let publishIndex = 0;
export const publishedPostListAtom = atom([
  {
    id: (publishIndex += 1),
    type: "award",
    key: `publish-${publishIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (publishIndex += 1),
    type: "birthday",
    key: `publish-${publishIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (publishIndex += 1),
    type: "award",
    key: `publish-${publishIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (publishIndex += 1),
    type: "award",
    key: `publish-${publishIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (publishIndex += 1),
    type: "birthday",
    key: `publish-${publishIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (publishIndex += 1),
    type: "birthday",
    key: `publish-${publishIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  // {
  //   id: (publishIndex += 1),
  //   type: "event",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "feedback",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "news",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "news",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "news",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "team",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "feedback",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "team",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "feedback",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
  // {
  //   id: (publishIndex += 1),
  //   type: "feedback",
  //   key: `publish-${publishIndex}`,
  //   title: "Momentum / SEPTEMBER 2023",
  //   picture: "/Tatiana Philips.png",
  //   team: "Aretex A-TEAM",
  //   caption:
  //     "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
  //   media: [],
  //   mediaLayout: "one",
  //   reactionList: ["star"],
  //   tagPeople: [""], // key of users
  // },
]);

export const publishedPostCountAtom = atom(
  (get) => get(publishedPostListAtom).length
);
export const addPublishPostAtom = atom(null, (get, set, update) => {});
export const selectedPublishPostAtom = atom([]);

let archiveIndex = 0;
export const archivedPostListAtom = atom([
  {
    id: (archiveIndex += 1),
    type: "feedback",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "feedback",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "feedback",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "feedback",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "award",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "award",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "team",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
  {
    id: (archiveIndex += 1),
    type: "news",
    key: `archive-${archiveIndex}`,
    title: "Momentum / SEPTEMBER 2023",
    picture: "/Tatiana Philips.png",
    team: "Aretex A-TEAM",
    caption:
      "Another job well done A-Team! Thank you all for your hard work, the work you do matters and makes a difference! Cheers! ",
    media: [],
    mediaLayout: "one",
    reactionList: ["star"],
    tagPeople: [""], // key of users
  },
]);

export const archivedPostCountAtom = atom(
  (get) => get(archivedPostListAtom).length
);
export const addArchivePostAtom = atom(null, (get, set, update) => {});
export const selectedArchivePostAtom = atom([]);

export const postStatusTabsAtom = atom((get) => [
  {
    key: "drafts",
    title: "Drafts",
    count: get(draftPostListAtom).length,
  },
  {
    key: "published",
    title: "Published",
    count: get(publishedPostListAtom).length,
  },
  {
    key: "archived",
    title: "Archived",
    count: get(archivedPostListAtom).length,
  },
]);
export const selectedPostStatusAtom = atom("drafts");

export const filterKeysAtom = atom([
  {
    label: "All",
    value: "all",
  },
  {
    label: "Award",
    value: "award",
  },
  {
    label: "Team",
    value: "team",
  },
  {
    label: "Feedback",
    value: "feedback",
  },
  {
    label: "News",
    value: "news",
  },
  {
    label: "Events",
    value: "events",
  },
  {
    label: "Birthday",
    value: "birthday",
  },
]);

export const selectedFilterKeysAtom = atom(new Set(["all"]));
