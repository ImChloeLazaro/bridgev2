import { atom } from "jotai";

export const profileTabsAtom = atom([
  { key: "about", title: "About" },
  { key: "profile", title: "Profile" },
  { key: "clients", title: "Clients" },
  { key: "team", title: "Team" },
]);

export const selectedProfileTabAtom = atom("about");
export const isVisibleJobTitleAtom = atom(false);
export const currentPasswordAtom = atom("ooooooooo");
export const newPasswordAtom = atom("ooooooooo");
export const confirmPasswordAtom = atom("ooooooooo");

export const isCurrentPasswordVisibleAtom = atom(false);
export const isNewPasswordVisibleAtom = atom(false);
export const isConfirmPasswordVisibleAtom = atom(false);

