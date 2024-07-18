import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import "../aws-auth";

export const authenticationAtom = atom(async () => {
  try {
    const auth = await fetchUserAttributes();
    console.log("Auth: ", auth);
    return {
      isAuthenticated: true,
      sub: auth.sub,
      auth,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      sub: null,
    };
  }
});
