import { atom } from "jotai";

export const profileTabsAtom = atom([
  { key: "about", title: "About" },
  { key: "profile", title: "Profile" },
  { key: "clients", title: "Clients" },
  { key: "team", title: "Team" },
]);

export const selectedTabAtom = atom("about");

export const isVisibleJobTitleAtom = atom(false);

export const currentPasswordAtom = atom("ooooooooo");
export const newPasswordAtom = atom("ooooooooo");
export const confirmPasswordAtom = atom("ooooooooo");
