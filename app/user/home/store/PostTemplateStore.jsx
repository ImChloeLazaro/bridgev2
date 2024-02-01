import { BiNews } from "react-icons/bi";
import { FaMedal } from "react-icons/fa6";
import { MdCake, MdCalendarMonth, MdForum, MdGroups2 } from "react-icons/md";
import { atom } from "jotai";
let index = 0;
const iconSize = 20;

export const postTemplateSettingsAtom = atom({
  award: {
    id: "award",
    reactionList: ["star"],
    mediaLayout: "one",
    orientation: "landscape",
    title: "",
    tagPeople: "all",
    caption: "",
  },
  birthday: {
    id: "birthday",
    reactionList: ["birthday"],
    mediaLayout: "one",
    orientation: "portrait",
    title: "",
    tagPeople: "all",
    caption: "",
  },
  event: {
    id: "event",
    reactionList: ["happy"],
    mediaLayout: "",
    orientation: "landscape",
    title: "",
    tagPeople: "all",
    caption: "",
  },
  feedback: {
    id: "feedback",
    reactionList: ["star"],
    mediaLayout: "",
    orientation: "landscape",
    title: "",
    tagPeople: "all",
    caption: "",
  },
  news: {
    id: "news",
    reactionList: ["love"],
    mediaLayout: "",
    orientation: "landscape",
    title: "",
    tagPeople: "all",
    caption: "",
  },
  team: {
    id: "team",
    reactionList: ["star"],
    mediaLayout: "",
    orientation: "landscape",
    title: "",
    tagPeople: "all",
    caption: "",
  },
});

export const postTemplateItemsAtom = atom([
  {
    key: "choose",
    label: "Choose a Template",
    icon: <FaMedal size={iconSize} />,
  },
  {
    key: "awards",
    label: "Awards",
    icon: <FaMedal size={iconSize} />,
  },
  {
    key: "birthday",
    label: "Birthday",
    icon: <MdCake size={iconSize} />,
  },
  {
    key: "event",
    label: "Event",
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
