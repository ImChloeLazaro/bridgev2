import { atom } from "jotai";
import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { authenticationAtom } from "./AuthenticationStore";
import { get } from 'aws-amplify/api';
import { readwithparams, restread } from "../utils/amplify-rest";

const initialState = null;

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
      address: "105 Jerry Dove Drive, Florence, SC 29501",
      birthday: "2001-10-04T00:00:00",
      contactNumber: "(765) 322-1399",
      status: "active", // true active : false inactive
      role: ["user", "admin"],
      team: "DMS-FAST",
      supervisor: "Madelyn Septimus",
      position: "Junior IT Systems Analyst",
      clients: ["NON-BLOOMS"],
      leaves: {
        vl: 20,
        sl: 5,
      },
      benefits: [
        { name: "HMO", isAvailable: true, number: "100066" },
        { name: "Philhealth", isAvailable: false, number: "##-###-#####" },
        { name: "SSS", isAvailable: false, number: "##-######-#" },
        { name: "PAGIBIG", isAvailable: true, number: "1234-5678-9000" },
      ],

      emergencyContact: {
        name: "Aspen Donin",
        relationship: "Spouse",
        contactNumber: "+639123456789",
      },
      onboarding: {
        startDate: "2023-09-09T11:00:00",
        status: "Probationary",
      },
    };
  } else {
    return {};
  }
});
//Leaves
export const leaveStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/profile", { sub: auth.sub });
})
//Leave Request

//Benefits with user params
export const benefitsStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/benefits/profile", { sub: auth.sub });
})
//Fetch Onboarding Status
export const fetchOnboardingStatus = atom(async (read) => {
  const auth = await read(authenticationAtom);
  try {
    const fetch = get({
      apiName: 'bridgeApi',
      path: '/user',
      options: {
        queryParams: {
            sub: auth.sub
        }
      }
    });

    const { body } = await fetch.response;
    const response = await body.json();
    return response.result.hasOnboardingData
  } catch (e) {
    console.log('GET call failed: ', e);
  }
})
export const isFirstTime = atom(true);


