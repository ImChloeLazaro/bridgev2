import { userAtom } from "@/app/store/UserStore";
import { atom } from "jotai";

export const roleAtom = atom([]);
export const fetchRoleAtom = atom(null, async (get, set) => {
  const user = await get(userAtom);
  set(roleAtom, user.role);
});

export const selectedRoleAtom = atom(["user"]);

export const userRolesAtom = atom(["hr", "tl", "admin"]);

// ### TODO active state of routes
// const [isActive, setIsActive] = useState({
//     user: true,
//     profile: false,
//     dashboard: false,
//     cms: false,
//     empower: false,
//   });

export const activeRouteAtom = atom({
  home: true,
  profile: false,
  dashboard: false, 
  cms: false,
  empower: false,
});
