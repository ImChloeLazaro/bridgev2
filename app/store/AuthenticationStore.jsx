import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import "../aws-auth";


async function fetchAuthentication() {
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
}
export const authenticationAtom = atom(async () => {
  return await fetchAuthentication();
});
