import { atom } from "jotai";

import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { authenticationAtom } from "./AuthenticationStore";
import { post, get, put } from 'aws-amplify/api';

const initialState = null;

async function fetchUserData() {
  try {
    const user = await fetchUserAttributes();
    console.log("USER", user);
    console.log("SUB USER", user.sub);
    if (user.sub) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const userDataAtom = atom(async () => {
  return await fetchUserData();
}, initialState);

export const userAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const data = await get(userDataAtom);

  if (auth != null || data != null) {
    return {
      id: 1000,
      sub: auth.sub,
      isAuthenticated: auth.isAuthenticated ?? false,
      name: data?.name,
      profileURL: data?.picture, // link to picture
      email: data?.email,
      status: "active", // true active : false inactive
      role: ["user", "admin"],
      team: "DMS-FAST",
      supervisor: "Madelyn Septimus",
      position: "Junior IT Systems Analyst",
      clients: ["NON-BLOOMS"],
      benefits: {
        HMO: true,
        Philhealth: false,
      },
      onboarding: {
        startDate: "09-09-2023",
        status: "probationary",
      },
    };
  } else {
    return {};
  }
});

export const fetchOnboardingStatus = atom(async (read) => {
  // const auth = await read(authenticationAtom);
  // try {
  //   const fetch = get({
  //     apiName: 'bridgeApi',
  //     path: '/user',
  //     options: {
  //       queryParams: {
  //           sub: 'd0229811-67cc-4fb8-915b-38d8029b85df'
  //       }
  //     }
  //   });

  //   const { body } = await fetch.response;
  //   const response = await body.json();
  //   console.log(response.result.hasOnboardingData)
  //   // return response.result.hasOnboardingData
  //   return true
  // } catch (e) {
  //   console.log('GET call failed: ', e);
  // }
  return false
})
export const isFirstTime = atom(true);


