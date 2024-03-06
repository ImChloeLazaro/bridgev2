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

//Leaves
export const leaveStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/leave/balance", { sub: auth.sub });
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
  return await readwithparams("/profile/information", { sub: auth.sub });
});

//Team
export const teamStatusAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  return await readwithparams("/teams/employee", { sub: auth.sub });
});

export const profileAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const user = await get(userDataAtom);
  const employee = await get(onboardingStatusAtom);
  const {
    response: [data],
  } = await readwithparams("/recruitment/profile", { sub: auth.sub });
  const { response: employee_team } = await get(teamStatusAtom);

  return {
    id: data?.employee_number,
    sub: auth.sub,
    name: user?.name,
    picture: user?.picture, // link to picture
    email: user?.email,
    address: employee?.address,
    birthday: employee?.birthday,
    contactNumber: employee?.contact,
    status: data?.is_active, // true active : false inactive
    role: user.role,
    team: user.team,
    supervisor: {
      name: employee_team?.immediate_head?.name,
      picture: employee_team?.immediate_head?.picture,
    },
    position: data?.position,
    clients: ["NON-BLOOMS"],
    onboarding: {
      startDate: data?.hiredate,
      status: data?.status.toUpperCase(),
    },
  };
  // return {
  //   id: data?.employee_number,
  //   sub: auth.sub,
  //   name: data?.name ? data?.name : user.name,
  //   picture: user?.picture, // link to picture
  //   email: data?.email ? data?.email : user.email,
  //   address:
  //     employee?.profile.application.employee_information.permanent_address ||
  //     "N/A",
  //   birthday: employee?.profile.application.employee_information.birthdate,
  //   contactNumber:
  //     employee?.profile.application.employee_information.mobile_number || "N/A",
  //   status: data?.is_active, // true active : false inactive
  //   role: user.role,
  //   team: user.team,
  //   supervisor: {
  //     name: employee_team?.immediate_head?.name,
  //     picture: employee_team?.immediate_head?.picture,
  //   },
  //   position: data?.position,
  //   clients: ["NON-BLOOMS"],
  //   onboarding: {
  //     startDate: data?.hiredate,
  //     status: data?.status.toUpperCase(),
  //   },
  // };
});
