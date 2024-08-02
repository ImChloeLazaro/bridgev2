import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { userSubTeamsAtom } from "@/app/store/TeamStore";
import { userAtom } from "@/app/store/UserStore";
import { readwithparams } from "@/app/utils/amplify-rest";
import { atom, useAtomValue } from "jotai";

export const profileTabsAtom = atom([
  { key: "about", title: "About" },
  { key: "profile", title: "Profile" },
  { key: "clients", title: "Clients" },
  { key: "team", title: "Team" },
]);

export const selectedProfileTabAtom = atom("about");
export const selectedClientAtom = atom("");
export const selectClientAtom = atom(null, async (get, set, newClient) => {
  set(selectedClientAtom, newClient);
});
// Personal Information
export const personalInfoAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const response = await readwithparams("/profile/information", {
    sub: auth.sub,
  });
  if (response?.success) {
    return response.response;
  } else {
    return {};
  }
});

export const selectedMemberFilterKeysAtom = atom(new Set(["All"]));
export const selectedClientFilterKeysAtom = atom(new Set(["All"]));

// Employee Information
// export const employeeInfoAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   return await readwithparams("/recruitment/information", { sub: auth.sub });
// });

//Team
export const teamStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const response = await readwithparams("/teams/team/employee", {
    sub: auth.sub,
  });

  if (response?.success) {
    return response.response;
  } else {
    return {};
  }
});

//Leaves
// export const leaveStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   const leaveStatus = await readwithparams("/leave/balance", { sub: auth.sub });
//   if (leaveStatus?.success) {
//     return leaveStatus.response;
//   } else {
//     return {};
//   }
// });

export const leaveHistoryAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/history", { sub: auth.sub });
});
//Leave Request
export const leaveRequestAtom = atom();

//Benefits with user params
// export const benefitsStatusAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   const benefits = await readwithparams("/benefits/profile", { sub: auth.sub });
//   if (benefits?.success) {
//     return benefits.response;
//   } else {
//     return {};
//   }
// });

// Emergency Contact
// export const emergencyContactAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   const profile = await readwithparams("/profile/information", {
//     sub: auth.sub,
//   });
//   return profile.emergency;
// });

//Onboarding
// export const onboardingDataAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   return await readwithparams("/profile/self_data", { sub: auth.sub });
// });

//get clientsubteam
export const userTeamsAtom = atom(async (get) => {
  const user = get(userAtom);
  const filteredUserTeams = get(userSubTeamsAtom).filter((team) =>
    team.heads
      .map((head) => head.sub)
      .flat()
      .includes(user.sub)
  );
  return filteredUserTeams;
});
export const clientItemDataAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/teams/team/myTeam", {
    sub: auth.sub,
  });
});
