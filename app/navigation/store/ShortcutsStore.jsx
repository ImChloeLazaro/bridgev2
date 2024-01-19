import { atom } from "jotai";

let index = 0;

export const shortcutsAtom = atom([
  {
    id: (index += 1),
    key: `sct-${index}`,
    label: "Timesheet",
    link: "#",
  },
  {
    id: (index += 1),
    key: `sct-${index}`,
    label: "Timecharges",
    link: "#",
  },
  {
    id: (index += 1),
    key: `sct-${index}`,
    label: "OT File",
    link: "#",
  },
]);

export const shortcutCountAtom = atom((get) => get(shortcutsAtom).length);

export const addShortcutNameAtom = atom("");
export const addShortcutLinkAtom = atom("");

// export const editShortcutNameAtom = atom("");
// export const editShortcutLinkAtom = atom("");

export const disableDraggableAtom = atom(false);