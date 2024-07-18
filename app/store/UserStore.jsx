import { atom } from "jotai";
import "../aws-auth";
import { restinsert, restread } from "../utils/amplify-rest";
import { authenticationAtom } from "./AuthenticationStore";

// User
export const userAtom = atom({});
export const fetchUserAtom = atom(null, async (get, set) => {
  console.log("Fetch Trigger");
  const auth = await get(authenticationAtom);
  const list = await restread("/user/tagged");
  if (list?.success) {
    const user = list.result.filter((user) => user.sub === auth.sub)[0];
    set(userAtom, user);
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
export const userRegisterAtom = atom(null, async (get, set, onBoardData) => {
  console.log("trigger");
  const auth = await get(authenticationAtom);
  if (auth?.sub) {
    const result = await restinsert("/user", {
      sub: auth.auth.sub,
      name: auth.auth.name,
      picture: auth.auth.picture,
      email: auth.auth.email,
      application: onBoardData.application,
      background: onBoardData.background,
      contact: onBoardData.contact,
      employment: onBoardData.employment,
    });
    console.log("result: ", result);
    return { result };
  } else {
    await restinsert("/user", {
      sub: auth.auth.sub,
      name: auth.auth.name,
      picture: auth.auth.picture,
      email: auth.auth.email,
      email: auth.auth.email,
      application: onBoardData.application,
      background: onBoardData.background,
      contact: onBoardData.contact,
      employment: onBoardData.employment,
    });
  }
});
