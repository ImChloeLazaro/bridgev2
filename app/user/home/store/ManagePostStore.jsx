import { atom } from "jotai";

export const templateItemsAtom = atom([
  {
    label: "Custom",
    value: "custom",
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

export const postTemplatesAtom = atom([
  {
    name: "Award",
    title: "",
    caption: "",
    type: "award",
    reactionsList: ["star"],
    mediaLayout: "",
    taggedPeople: [""],
  },
  {
    name: "Team",
    title: "",
    caption: "",
    type: "team",
    reactionsList: ["star"],
    mediaLayout: "",
    taggedPeople: [""],
  },
  {
    name: "Feedback",
    title: "",
    caption: "",
    type: "feedback",
    reactionsList: ["star"],
    mediaLayout: "",
    taggedPeople: [""],
  },
  {
    name: "News",
    title: "",
    caption: "",
    type: "news",
    reactionsList: ["star"],
    mediaLayout: "",
    taggedPeople: [""],
  },
  {
    name: "Events",
    title: "",
    caption: "",
    type: "events",
    reactionsList: ["star"],
    mediaLayout: "",
    taggedPeople: [""],
  },
  {
    name: "Birthday",
    title: "",
    caption: "",
    type: "birthday",
    reactionsList: ["star"],
    mediaLayout: "",
    taggedPeople: [""],
  },
]);
