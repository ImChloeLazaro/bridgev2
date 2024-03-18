import { atom } from "jotai";
import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { authenticationAtom } from "./AuthenticationStore";
import { readwithparams, restinsert, restread } from "../utils/amplify-rest";
import { employeeIDAtom } from "../onboarding/store/OnboardingStore";

async function fetchUserData() {
  try {
    const user = await fetchUserAttributes();
    if (user.sub) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

// Register User Data
export const registerProfileAtom = atom(null, async (get, set, update) => {
  const data = get(userDataAtom);
  const userResponse = await restinsert("/user", data);
  if (userResponse.success) {
    return { success: true };
  } else {
    return { success: false };
  }
});

// User Data
export const userDataAtom = atom(async () => {
  return await fetchUserData();
});

// User
export const userAtom = atom(async (get) => {
  const user = await get(userDataAtom);
  const userID = get(employeeIDAtom);
  if (user != null) {
    // ### TODO ADD PLACEHOLDER VALUE WHEN IT'S NULL
    return {
      id: userID ?? "",
      name: user.name ?? "",
      picture: user.picture ?? "", // link to picture
      email: user.email ?? "",
      role: ["user"],
      team: "",
    };
  } else {
    return {};
  }
});

// User List
export const usersListAtom = atom([{}]); // list of all employees
