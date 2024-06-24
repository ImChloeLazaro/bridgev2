import { userAtom } from "@/app/store/UserStore";
import { atom } from "jotai";

export const roleAtom = atom([]);
export const fetchRoleAtom = atom(null, async (get, set) => {
  const user = await get(userAtom);
  set(roleAtom, [user.role[0]?.name[0].toLowerCase()]);
});

export const selectedRoleAtom = atom(["user"]);

export const sidebarToggleAtom = atom(false);
export const cmsPathsAtom = atom(["/admin/clients", "/tl/cms", "/user/cms"]);

export const userRolesAtom = atom(["hr", "tl", "admin"]);
export const userOptionsAtom = atom({
  switch: { key: "switch", label: "Switch Roles" },
  settings: { key: "settings", label: "Settings" },
  help: { key: "help", label: "Help & Feedback" },
  logout: { key: "logout", label: "Log out" },
});

export const activeUserRouteAtom = atom({
  home: true,
  profile: false,
  dashboard: false,
  cms: false,
  empower: false,
  evp: false,
  culture: false,
  learning: false,
});

export const activeAdminRouteAtom = atom({
  admin: true,
  team: false,
  clients: false,
  appraisals: false,
  roles: false,
  help_desk: false,
});

export const activeTLRouteAtom = atom({
  team_lead: true,
  cms: false,
  team: false,
  schedule: false,
  appraisals: false,
});

export const activeHRRouteAtom = atom({
  hr: true,
  pre_employment: false,
  onboarding: false,
  team_endorse: false,
  employees: false,
  benefits: false,
  leaves: false,
  offboarding: false,
});
