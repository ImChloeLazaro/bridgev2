import { atom } from "jotai";

export const profileTabsAtom = atom([
  { key: "about", title: "About" },
  { key: "profile", title: "Profile" },
  { key: "clients", title: "Clients" },
  { key: "team", title: "Team" },
]);

export const selectedTabAtom = atom("about");
