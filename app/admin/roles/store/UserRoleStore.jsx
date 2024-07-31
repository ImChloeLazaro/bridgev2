import { userAtom } from "@/app/store/UserStore";
import { restread, restupdate } from "@/app/utils/amplify-rest";
import { atom } from "jotai";

export const userRolesListAtom = atom([]);

export const fetchUserRolesListAtom = atom(null, async (get, set, sub) => {
  const list = await restread("/user/tagged");
  if (list.success) {
    const convertedRoles = list.result.map((user) => {
      return {
        key: user.sub,
        role: user.role,
        name: user.name,
        picture: user.picture,
        email: user.email,
        sub: user.sub,
        _id: user._id,
      };
    });

    set(userRolesListAtom, convertedRoles);
    return convertedRoles;
  } else {
    return [];
  }
});

export const updateUserRolesAtom = atom(null, async (get, set, update) => {
  const { updatedRoles } = update;
  const user = get(userAtom);

  try {
    const updatedUser = await restupdate(`/user/update-role`, {
      sub: user.sub,
      role: updatedRoles,
    });

    set(fetchUserRolesListAtom, {});
    return updatedUser;
  } catch (error) {
    console.error("Error while updating user roles:", error);
    return {};
  }
});

export const selectedRolesAtom = atom(new Set([]));

export const selectedRoleTabAtom = atom("all");
export const roleTabsAtom = atom([
  { key: "all", title: "All" },
  { key: "admin", title: "Admin" },
  { key: "tl", title: "Team Lead" },
  { key: "hr", title: "Human Resource" },
  { key: "user", title: "User" },
]);

export const roleSelectionAtom = atom([
  { key: "user", title: "User" },
  { key: "admin", title: "Admin" },
  { key: "tl", title: "Team Lead" },
  { key: "hr", title: "Human Resource" },
]);
