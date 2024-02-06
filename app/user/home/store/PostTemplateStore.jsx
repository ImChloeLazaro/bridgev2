import { BiNews } from "react-icons/bi";
import { FaMedal } from "react-icons/fa6";
import { MdCake, MdCalendarMonth, MdForum, MdGroups2 } from "react-icons/md";
import { atom } from "jotai";
let index = 0;
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
