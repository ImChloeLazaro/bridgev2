import { atom } from "jotai";
import { BiNews } from "react-icons/bi";
import { FaMedal } from "react-icons/fa6";
import { MdCake, MdCalendarMonth, MdForum, MdGroups2 } from "react-icons/md";
import { reactionIcons } from "../components/reaction/ReactionIcons";
import { draftPostCountAtom } from "./DraftedStore";
import { publishedPostCountAtom } from "./PublishedStore";
import { archivedPostCountAtom } from "./ArchivedStore";
import { restread } from "@/app/utils/amplify-rest";
import { userListAtom } from "@/app/store/UserStore";

const iconSize = 20;
export const postTemplateItemsAtom = atom([
  {
    key: "choose",
    label: "Choose a Template",
    icon: <FaMedal size={iconSize} />,
  },
  {
    key: "award",
    label: "Award",
    icon: <FaMedal size={iconSize} />,
  },
  {
    key: "birthday",
    label: "Birthday",
    icon: <MdCake size={iconSize} />,
  },
  {
    key: "events",
    label: "Events",
    icon: <MdCalendarMonth size={iconSize} />,
  },
  {
    key: "feedback",
    label: "Feedback",
    icon: <MdForum size={iconSize} />,
  },
  {
    key: "news",
    label: "News",
    icon: <BiNews size={iconSize} />,
  },
  {
    key: "team",
    label: "Team",
    icon: <MdGroups2 size={iconSize} />,
  },
]);

let templateIndex = 0;
export const templateTypeSelectionAtom = atom([
  {
    key: "custom",
    label: "Custom",
    value: "custom",
  },
  {
    key: "award",
    label: "Award",
    value: "award",
  },
  {
    key: "team",
    label: "Team",
    value: "team",
  },
  {
    key: "feedback",
    label: "Feedback",
    value: "feedback",
  },
  {
    key: "news",
    label: "News",
    value: "news",
  },
  {
    key: "events",
    label: "Events",
    value: "events",
  },
  {
    key: "birthday",
    label: "Birthday",
    value: "birthday",
  },
]);

export const templateTypeCountAtom = atom(
  (get) => get(templateTypeSelectionAtom).length
);
export const selectedTemplateTypeAtom = atom(new Set(["custom"]));

export const templateNameAtom = atom("");

let reactionIndex = 0;
export const reactionsSelectionAtom = atom([
  {
    // id: (reactionIndex += 1),
    key: "love",
    label: "Love",
    selectIcon: reactionIcons.love.badge,
    displayIcon: reactionIcons.love.borderBadge,
  },
  {
    // id: (reactionIndex += 1),
    key: "birthday",
    label: "Birthday",
    selectIcon: reactionIcons.birthday.badge,
    displayIcon: reactionIcons.birthday.borderBadge,
  },
  {
    // id: (reactionIndex += 1),
    key: "star",
    label: "Star",
    selectIcon: reactionIcons.star.badge,
    displayIcon: reactionIcons.star.borderBadge,
  },
  {
    // id: (reactionIndex += 1),
    key: "happy",
    label: "Happy",
    selectIcon: reactionIcons.happy.badge,
    displayIcon: reactionIcons.happy.borderBadge,
  },
]);
export const selectedReactionsAtom = atom(new Set([]));

let mediaLayoutIndex = 0;
export const mediaLayoutSelectionAtom = atom([
  {
    key: "single",
    label: "Single",
    value: "single",
  },
  {
    key: "multiple",
    label: "Multiple",
    value: "multiple",
  },
]);
export const selectedMediaLayoutAtom = atom(new Set([]));

let mediaOrientationIndex = 0;
export const mediaOrientationSelectionAtom = atom([
  {
    key: "landscape",
    label: "Landscape",
    value: "landscape",
  },
  {
    key: "portrait",
    label: "Portrait",
    value: "portrait",
  },
]);
export const selectedMediaOrientationAtom = atom(new Set([]));

export const mediaFileListAtom = atom([]);

export const postTitleAtom = atom("");

export const chipListAtom = atom(async (get) => {
  return (await restread("/user/tagged")).result;
});
let taggedIndex = 0;
export const taggedPeopleListAtom = atom((get) => {
  const list = get(userListAtom);

  // console.log("list", list);

  const allEmails = list.map((person) => person.email);
  const allSubs = list.map((person) => person.sub);

  const all = {
    // id: (taggedIndex += 1),
    key: "all",
    name: "@all",
    email: allEmails,
    subs: allSubs,
    picture: null,
  };

  const peopleList = list.map((person) => ({
    // id: (taggedIndex += 1),
    key: person.sub,
    name: person.name,
    picture: person.picture,
    email: person.email,
    sub: person.sub,
    _id: person._id,
  }));

  return [all, ...peopleList];
});

export const taggedPeopleCountAtom = atom(
  (get) => get(taggedPeopleListAtom).length
);

export const fetchTaggedPeopleListAtom = atom(null, (get, set, update) => {});
export const selectedTaggedPeopleAtom = atom(new Set([]));

export const postCaptionAtom = atom("");

let postTemplatesIndex = 0;
export const postTemplatesAtom = atom([
  {
    id: (postTemplatesIndex += 1),
    key: "custom",
    name: "Custom",
    type: "",
    reactionList: [],
    media: [],
    mediaLayout: [],
    orientation: [],
    title: "",
    taggedPeople: [],
    caption: "",
  },
  {
    id: (postTemplatesIndex += 1),
    key: "award",
    name: "Award",
    type: "award",
    reactionList: ["star"],
    media: [],
    mediaLayout: ["multiple"],
    orientation: ["landscape"],
    title: "Rex Winner Month of JANUARY",
    taggedPeople: ["all"],
    caption: "Congratulations!!! Good Job!!",
  },
  {
    id: (postTemplatesIndex += 1),
    key: "birthday",
    name: "Birthday",
    type: "birthday",
    reactionList: ["birthday"],
    media: [],
    mediaLayout: ["multiple"],
    orientation: ["portrait"],
    title: "HAPPY BIRTHDAY!!!",
    taggedPeople: ["all"],
    caption:
      "“Another adventure filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor. Wishing you a very happy and fun-filled birthday!”",
  },
  {
    id: (postTemplatesIndex += 1),
    key: "events",
    name: "Events",
    type: "events",
    reactionList: ["happy"],
    media: [],
    mediaLayout: ["multiple"],
    orientation: ["landscape"],
    title: "LOOK HERE!!!",
    taggedPeople: ["all"],
    caption: "Witness what we have prepared for you and hope that you enjoy!!!",
  },
  {
    id: (postTemplatesIndex += 1),
    key: "feedback",
    name: "Feedback",
    type: "feedback",
    reactionList: ["star"],
    media: [],
    mediaLayout: ["multiple"],
    orientation: ["landscape"],
    title: "CLIENT FEEDBACK",
    taggedPeople: ["all"],
    caption: "Thank you for your hard work!!! Cheers!",
  },
  {
    id: (postTemplatesIndex += 1),
    key: "news",
    name: "News",
    type: "news",
    reactionList: ["love"],
    media: [],
    mediaLayout: ["multiple"],
    orientation: ["landscape"],
    title: "ATTENTION A-FAMILY!!!",
    taggedPeople: ["all"],
    caption: "Look alive! \nHere are some of the hottest A-news today!",
  },
  {
    id: (postTemplatesIndex += 1),
    key: "team",
    name: "Team",
    type: "team",
    reactionList: ["happy"],
    media: [],
    mediaLayout: ["multiple"],
    orientation: ["landscape"],
    title: "NEW TEAM MEMBERS",
    taggedPeople: ["all"],
    caption: "Let us welcome our newest members of our A-Family!!!",
  },
]);

export const postTemplatesCountAtom = atom(
  (get) => get(postTemplatesAtom).length
);

// POST STATUS TABS
export const postStatusTabsAtom = atom((get) => [
  {
    key: "drafts",
    title: "Drafts",
    count: get(draftPostCountAtom),
  },
  {
    key: "published",
    title: "Published",
    count: get(publishedPostCountAtom),
  },
  {
    key: "archived",
    title: "Archived",
    count: get(archivedPostCountAtom),
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

export const fileListAtom = atom(undefined);
export const fileUrlListAtom = atom(undefined);
