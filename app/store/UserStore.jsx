import { atom } from "jotai";

import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";

import { authenticationAtom } from "./AuthenticationStore";

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

export const isFirstTime = atom(true);
