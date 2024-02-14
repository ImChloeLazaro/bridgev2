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

// Profile
export const profileAtom = atom(async (get) => {
  const auth = await get(authenticationAtom);
  const data = await readwithparams("/profile", { sub: auth.sub });
  if (auth != null || data != null) {
    return data;
  } else return {};
});
// profileAtom = atom({
//   about: {
//     idNumber: onboarding.application.employeeID,
//     status: profile.status,
//     regularization: onboarding.startDate,
//     immediateHead: { name: user.name, picture: user.picture },
//     address: onboarding.application.address,
//     contactNumber: onboarding.application.contactNumber,
//     birthday: onboarding.application.birthday,
//   },
//   profile: {
//     profilePicture: user.picture,
//     profileBanner: profile.banner,
//     jobTitle: onboarding.application.appliedFor,
//   },
//   clients: {},

//   team: {},
// });
export const fetchLeaveAtom = atom();
export const fetchBenefitAtom = atom();
export const fetchEmergencyContactAtom = atom();
export const fetchOnboardingStatusAtom = atom();
