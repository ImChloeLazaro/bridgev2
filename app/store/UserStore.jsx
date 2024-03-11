import { atom } from "jotai";
import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { authenticationAtom } from "./AuthenticationStore";
import { readwithparams, restinsert, restread } from "../utils/amplify-rest";
import { employeeIDAtom } from "../onboarding/store/OnboardingStore";

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
// Register User Data
export const registerProfileAtom = atom(null, async (get, set, update) => {
  const data = get(userDataAtom);
  const userResponse = await restinsert("/user", data);
  if (userResponse.success) {
    return { success: true };
  } else {
    return { success: false };
  }
});

// User Data
export const userDataAtom = atom(async () => {
  return await fetchUserData();
});

// User
export const userAtom = atom(async (get) => {
  const user = await get(userDataAtom);
  const userID = get(employeeIDAtom);
  if (user != null) {
    // ### TODO ADD PLACEHOLDER VALUE WHEN IT'S NULL
    return {
      id: userID ?? "",
      name: user.name ?? "",
      picture: user.picture ?? "", // link to picture
      email: user.email ?? "",
      role: ["user"],
      team: "",
    };
  } else {
    return {};
  }
});

// User List
export const usersListAtom = atom([{}]); // list of all employees

// //Leaves
// export const leaveStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   return await readwithparams("/leave/profile", { sub: auth.sub });
// });

// //Leave Request

// //Benefits with user params
// export const benefitsStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   return await readwithparams("/benefits/profile", { sub: auth.sub });
// });

// //Onboarding
// export const onboardingStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   return await readwithparams("/profile/onboarding", { sub: auth.sub });
// });

// //Team
// export const teamStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   return await readwithparams("/teams/employee", { sub: auth.sub });
// });

//Recruitment
// export const recruitmentStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   const user = await get(userDataAtom);
//   const { response: employee } = await get(onboardingStatusAtom);
//   const {
//     response: [data],
//   } = await readwithparams("/recruitment/profile", { sub: auth.sub });
//   const { response: employee_team } = await get(teamStatusAtom);

//   return {
//     id: data?.employee_number,
//     sub: auth.sub,
//     name: data?.name ? data?.name : user.name,
//     picture: user?.picture, // link to picture
//     email: data?.email ? data?.email : user.email,
//     address:
//       employee?.profile.application.employee_information.permanent_address ||
//       "N/A",
//     birthday: employee?.profile.application.employee_information.birthdate,
//     contactNumber:
//       employee?.profile.application.employee_information.mobile_number || "N/A",
//     status: data?.is_active, // true active : false inactive
//     role: user.role,
//     team: user.team,
//     supervisor: {
//       name: employee_team?.immediate_head?.name,
//       picture: employee_team?.immediate_head?.picture,
//     },
//     position: data?.position,
//     clients: ["NON-BLOOMS"],
//     leaves: {
//       vl: 20,
//       sl: 5,
//     },
//     benefits: [
//       { name: "HMO", isAvailable: true, number: "100066" },
//       { name: "Philhealth", isAvailable: false, number: "##-###-#####" },
//       { name: "SSS", isAvailable: false, number: "##-######-#" },
//       { name: "PAGIBIG", isAvailable: true, number: "1234-5678-9000" },
//     ],

//     emergencyContact: {
//       name: "Aspen Donin",
//       relationship: "Spouse",
//       contactNumber: "+639123456789",
//     },
//     onboarding: {
//       startDate: data?.hiredate,
//       status: data?.status.toUpperCase(),
//     },
//   };

// });

//Fetch Onboarding Status
// export const fetchOnboardingStatus = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   const data = await readwithparams("/user", { sub: auth.sub });
//   if (!data) {
//     return false;
//   }
//   return data.result.hasOnboardingData;
// });
