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

export const postTemplatesAtom = {}

export const draftPostListAtom = atom([{}])
export const publishPostListAtom = atom([{}])
export const archivePostListAtom = atom([{}])

export const selectedTemplateAtom = atom({})