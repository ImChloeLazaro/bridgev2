import { atom } from "jotai";
import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { authenticationAtom } from "./AuthenticationStore";
import { get } from "aws-amplify/api";
import { readwithparams, restread } from "../utils/amplify-rest";
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

// User Data
export const userDataAtom = atom(async () => {
  return await fetchUserData();
});

// User
export const userAtom = atom(async (get) => {
  const data = await get(userDataAtom);
  const userID = get(employeeIDAtom);
  if (data != null) {
    // ### TODO ADD PLACEHOLDER VALUE WHEN IT'S NULL
    return {
      id: userID ?? "",
      name: data.name ?? "",
      picture: data.picture ?? "", // link to picture
      email: data.email ?? "",
      role: ["user", "admin"],
      team: "DMS-FAST",
    };
  } else {
    return {};
  }
});

// User List
export const usersListAtom = atom([{}]); // list of all employees

//Leaves
export const leaveStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/profile", { sub: auth.sub });
});

//Leave Request

//Benefits with user params
export const benefitsStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/benefits/profile", { sub: auth.sub });
});

//Onboarding
export const onboardingStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams('/profile/onboarding', {sub: auth.sub})
})

//Recruitment
export const recruitmentStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const recruitment = await readwithparams("/recruitment/profile", {
    sub: auth.sub,
  });

  const onboarding = await get(onboardingStatusAtom);
  const employee = onboarding.response;
  const data = await recruitment.response[0];
  const user = await get(userDataAtom);
  console.log("USER DATA", user); 
  return {
    id: data?.employee_number,
    sub: auth.sub,
    name: data?.name,
    profileURL: user?.picture, // link to picture
    email: data?.email,
    address: employee?.profile.application.employee_information.permanent_address || "N/A",
    birthday: employee?.profile.application.employee_information.birthdate || "1970-01-01T23:55:33.289+00:00",
    contactNumber: employee?.profile.application.employee_information.mobile_number || "N/A",
    status: data?.is_active, // true active : false inactive
    role: ["user", "admin"],
    team: "DMS-FAST",
    supervisor: "Madelyn Septimus",
    position: data?.position,
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
      startDate: data?.hiredate,
      status: data?.status.toUpperCase(),
    },
  };
  // return data
});

//Fetch Onboarding Status
export const fetchOnboardingStatus = atom(async (get) => {
  // const auth = await get(authenticationAtom);
  // console.log("INSIDE USER ATOM: ", auth);
  // const users = await readwithparams("/user", { sub: auth.sub });
  // console.log("users", users);
  // return users.result.hasOnboardingData;
  return true;
});
