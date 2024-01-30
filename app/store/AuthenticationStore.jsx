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
    // console.log(`The username: ${username}`);
    // console.log(`The userId: ${userId}`);
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    // console.log(`Access Token: ${accessToken}`);
    // console.log(`ID Token: ${idToken}`);
    // console.log("AUTH", user);
    return {
      isAuthenticated: true,
      isSignedIn: true,
      sub: user.sub,
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

