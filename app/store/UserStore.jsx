import { atom } from "jotai";

import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";

let index = 0;

// export const userAtom = atom({
//   id: 1000,
//   name: "Cyrus Jarod Layugan",
//   profileURL: "/Tatiana Philips.png", // link to picture
//   email: "cyrus.layugan@aretex.com.au",
//   status: "active", // true active : false inactive
//   role: ["user", "admin"],
//   team: "DMS-FAST",
//   position: "Jr. IT Systems Analyst",
//   clients: ["NON-BLOOMS"],
//   benefits: {
//     HMO: true,
//     Philhealth: false,
//   },
//   onboarding: {
//     startdate: "09-09-2023",
//     status: "probationary",
//   },
//   shortcuts: [
//     {
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: "Timesheet",
//       link: "#",
//     },
//     {
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: "Timecharges",
//       link: "#",
//     },
//     {
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: "OT File",
//       link: "#",
//     },
//   ],
// });
// const initialState = {
//   isAuthenticated: false,
//   isSignedIn: false,
//   user: null,
// };

const fetchUserData = async () => {
  try {
    const user = await fetchUserAttributes();
    return {
      isAuthenticated: true,
      isSignedIn: isAuthenticated,
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
export const userDataAtom = atom(async () => await fetchUserData());

export const userAtom = atom(async () => await fetchUserAttributes());