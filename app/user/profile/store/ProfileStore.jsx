import { atom } from "jotai";
import "../../../aws-auth";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { readwithparams } from "@/app/utils/amplify-rest";
import { userDataAtom } from "@/app/store/UserStore";

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

// Profile
// export const profileAtom = atom(async (get) => {
//   const auth = await get(authenticationAtom);
//   const data = await readwithparams("/profile", { sub: auth.sub });
//   if (auth != null || data != null) {
//     console.log("PROFILE DATA:", data);
//     return data;
//   } else return {};
// });

//Leaves
export const leaveStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/profile", { sub: auth.sub });
});

//Leave Request

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


//Onboarding
export const onboardingStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/profile/onboarding", { sub: auth.sub });
});

//Team
export const teamStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/teams/employee", { sub: auth.sub });
});

export const profileAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const user = await get(userDataAtom);
  const { response: employee } = await get(onboardingStatusAtom);
  const {
    response: [data],
  } = await readwithparams("/recruitment/profile", { sub: auth.sub });
  const { response: employee_team } = await get(teamStatusAtom);

  return {
    id: data?.employee_number,
    sub: auth.sub,
    name: data?.name ? data?.name : user.name,
    picture: user?.picture, // link to picture
    email: data?.email ? data?.email : user.email,
    address:
      employee?.profile.application.employee_information.permanent_address ||
      "N/A",
    birthday: employee?.profile.application.employee_information.birthdate,
    contactNumber:
      employee?.profile.application.employee_information.mobile_number || "N/A",
    status: data?.is_active, // true active : false inactive
    role: user.role,
    team: user.team,
    supervisor: {
      name: employee_team?.immediate_head?.name,
      picture: employee_team?.immediate_head?.picture,
    },
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
});
