import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { atom } from "jotai";
import "../aws-auth";

const initialState = {
  isAuthenticated: false,
  isSignedIn: false,
  sub: null,
};

async function fetchAuthentication() {
  try {
    const user = await fetchUserAttributes();
    const { username, userId } = await getCurrentUser();
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    return {
      isAuthenticated: true,
      isSignedIn: true,
      sub: user.sub
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      isSignedIn: false,
      sub: null,
    };
  }
}
export const authenticationAtom = atom(async () => {
  return await fetchAuthentication();
}, initialState);

