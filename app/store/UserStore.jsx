import { atom } from "jotai";
import "../aws-auth";
import { restread } from "../utils/amplify-rest";
import { authenticationAtom } from "./AuthenticationStore";

// User
export const userAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const list = await restread("/user/tagged");
  if (list?.success) {
    const user = list.result.filter((user) => user.sub === auth.sub)[0];
    return user;
  } else {
    return {};
  }
});

// User List
export const userListAtom = atom([]);

export const fetchUserListAtom = atom(null, async (get, set, sub) => {
  const list = await restread("/user/tagged");
  if (list.success) {
    console.log("USER LIST", list.result);
    set(userListAtom, list.result);
  }
}); // list of all employees
