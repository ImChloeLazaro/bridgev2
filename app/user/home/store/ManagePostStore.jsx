import { restread } from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { BiNews } from "react-icons/bi";
import { FaMedal } from "react-icons/fa6";
import { MdCake, MdCalendarMonth, MdForum, MdGroups2 } from "react-icons/md";
import { reactionIcons } from "../components/reaction/ReactionIcons";
import { draftPostCountAtom } from "./DraftedStore";
import { publishedPostCountAtom } from "./PublishedStore";
import { archivedPostCountAtom } from "./ArchivedStore";

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

let reactionIndex = 0;
export const reactionsSelectionAtom = atom([
  {
    id: (reactionIndex += 1),
    key: "love",
    label: "Love",
    selectIcon: reactionIcons.love.badge,
    displayIcon: reactionIcons.love.borderBadge,
  },
  {
    id: (reactionIndex += 1),
    key: "birthday",
    label: "Birthday",
    selectIcon: reactionIcons.birthday.badge,
    displayIcon: reactionIcons.birthday.borderBadge,
  },
  {
    id: (reactionIndex += 1),
    key: "star",
    label: "Star",
    selectIcon: reactionIcons.star.badge,
    displayIcon: reactionIcons.star.borderBadge,
  },
  {
    id: (reactionIndex += 1),
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
    key: `mediaLayout-${(mediaLayoutIndex += 1)}`,
    label: "Single",
    value: "single",
  },
  {
    key: `mediaLayout-${(mediaLayoutIndex += 1)}`,
    label: "Multiple",
    value: "multiple",
  },
]);
export const selectedMediaLayoutAtom = atom(new Set([]));

let mediaOrientationIndex = 0;
export const mediaOrientationSelectionAtom = atom([
  {
    key: `mediaLayout-${(mediaOrientationIndex += 1)}`,
    label: "Landscape",
    value: "landscape",
  },
  {
    key: `mediaLayout-${(mediaOrientationIndex += 1)}`,
    label: "Portrait",
    value: "portrait",
  },
]);
export const selectedMediaOrientationAtom = atom(new Set([]));

export const mediaFileListAtom = atom([]);

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
export const fetchTaggedPeopleListAtom = atom(null, (get, set, update) => { });
export const selectedTaggedPeopleAtom = atom(new Set([]));

export const postCaptionAtom = atom("");

let postTemplatesIndex = 0;
export const postTemplatesAtom = atom([
  {
    id: (postTemplatesIndex += 1),
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
    count: get(draftPostCountAtom)
  },
  {
    key: "published",
    title: "Published",
    count: get(publishedPostCountAtom)
  },
  {
    key: "archived",
    title: "Archived",
    count: get(archivedPostCountAtom)
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

export const fileListAtom = atom(undefined)
export const fileUrlListAtom = atom(undefined)

export const previewMediaListAtom = atom(undefined)