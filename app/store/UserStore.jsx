import { atom } from "jotai";
import "../aws-auth";
import { restinsert, restread } from "../utils/amplify-rest";
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
    set(userListAtom, list.result);
  }
});

// User Register (New Users)
export const userRegisterAtom = atom(null, async (get, set, update) => {
  const auth = await get(authenticationAtom);
  if (auth?.sub) {
    return;
  } else {
    await restinsert("/user", {
      sub: auth.auth.sub,
      name: auth.auth.name,
      picture: auth.auth.picture,
      email: auth.auth.email,
    });
  }
});
