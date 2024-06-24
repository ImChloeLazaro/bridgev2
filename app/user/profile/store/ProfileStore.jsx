import { atom } from "jotai";
import "../../../aws-auth";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { readwithparams } from "@/app/utils/amplify-rest";

export const profileTabsAtom = atom([
  { key: "about", title: "About" },
  { key: "profile", title: "Profile" },
  { key: "clients", title: "Clients" },
  { key: "team", title: "Team" },
]);

export const selectedProfileTabAtom = atom("about");
export const isVisibleJobTitleAtom = atom(false);
export const currentPasswordAtom = atom("ooooooooo");
export const newPasswordAtom = atom("ooooooooo");
export const confirmPasswordAtom = atom("ooooooooo");

export const isCurrentPasswordVisibleAtom = atom(false);
export const isNewPasswordVisibleAtom = atom(false);
export const isConfirmPasswordVisibleAtom = atom(false);

// Personal Information
export const personalInfoAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/profile/information", { sub: auth.sub });
});

// Employee Information
export const employeeInfoAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/recruitment/information", { sub: auth.sub });
});

//Team
export const teamStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const teams = await readwithparams("/teams/employee", {
    // sub: "d0229811-67cc-4fb8-915b-38d8029b85df",
    sub: auth.sub,
  });

  if (teams.success) {
    return teams.response;
  } else {
    return null;
  }
});

//Leaves
export const leaveStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/balance", { sub: auth.sub });
});

export const leaveHistoryAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/history", { sub: auth.sub });
})
//Leave Request
export const leaveRequestAtom = atom();

//Benefits with user params
export const benefitsStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const benefits = await readwithparams("/benefits/profile", { sub: auth.sub });
  if (benefits.success) {
    return benefits.response;
  } else {
    return {};
  }
});

// Emergency Contact
export const emergencyContactAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const profile = await readwithparams("/profile/information", {
    sub: auth.sub,
  });
  console.log("CONTACT ATOM", profile.emergency);
  return profile.emergency;
});

//Onboarding
export const onboardingDataAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/profile/self_data", { sub: auth.sub });
});
