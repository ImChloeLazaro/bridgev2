import { fetchUserAttributes } from "aws-amplify/auth";
import { atom } from "jotai";
import "../aws-auth";

const initialState = {
  isAuthenticated: false,
  sub: null,
};

async function fetchAuthentication() {
  try {
    const user = await fetchUserAttributes();
    return {
      isAuthenticated: true,
      sub: user.sub,
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
}, initialState);
