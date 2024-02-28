import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";

export const authenticationAtom = atom(async () => {
  try {
    const auth = await fetchUserAttributes();
    return {
      isAuthenticated: true,
      sub: auth.sub,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      sub: null,
    };
  }
});
