import { atom } from "jotai";
import { fetchUserAttributes } from "aws-amplify/auth";
import "../aws-auth";

const initialState = {
  isAuthenticated: false,
  isSignedIn: false.se,
  sub: null,
};

const fetchAuthentication = async () => {
  try {
    const user = await fetchUserAttributes();
    console.log("AUTH", user)
    return {
      isAuthenticated: true,
      isSignedIn: authenticatedAtom,
      sub: user.sub,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      isSignedIn: false,
      sub: null,
    };
  }
};
export const authenticatedAtom = atom(async () => {
  return await fetchAuthentication();
}, initialState);
