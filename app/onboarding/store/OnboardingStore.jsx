import { atom } from "jotai";
import { readwithparams } from "@/app/utils/amplify-rest";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  personalInfoAtom,
} from "@/app/user/profile/store/ProfileStore";

export const stepsAtom = atom([
  "application",
  "background",
  "employment",
  "contact",
]);

// Onboarding Tabs
export const applicationTabsAtom = atom([
  "application_details",
  "employee_information",
  "government_id_information",
]);
export const backgroundTabsAtom = atom([
  "family_background",
  "educational_background",
  "examination_taken",
]);
export const employmentTabsAtom = atom([
  "employment_history",
  "trainings_attended",
  "references",
]);
export const contactTabsAtom = atom(["emergency_contact"]);

// Indicators
export const selectedTabAtom = atom("application_details");
export const selectedStepperAtom = atom("application");

export const activeStepAtom = atom(0);

// Application Onboarding.
export const firstNameAtom = atom("");
export const lastNameAtom = atom("");
export const middleNameAtom = atom("");
export const vacancyThruAtom = atom("");
export const referredByAtom = atom("");
export const dateApplicationAtom = atom("");
export const dateAvailabilityAtom = atom("");
export const appliedForAtom = atom("");
export const salaryAtom = atom("");
export const employeeIDAtom = atom("");

// Employee Information
export const presentAddressAtom = atom("");
export const permanentAddressAtom = atom("");
export const residenceStatusAtom = atom("");
export const genderAtom = atom("");
export const birthdateAtom = atom("");
export const civilStatusAtom = atom("");
export const ageAtom = atom("");
export const emailAddressAtom = atom("");
export const birthplaceAtom = atom("");
export const homePhoneNumberAtom = atom("");
export const citizenshipAtom = atom("");
export const mobileNumberAtom = atom("");
export const religionAtom = atom("");
export const languageAtom = atom("");

// Goverment ID Information
export const tinAtom = atom("");
export const sssAtom = atom("");
export const pagibigAtom = atom("");
export const philhealthAtom = atom("");

//// Background Onboarding

// Family Background
export const fatherAtom = atom({
  name: "",
  age: "",
  occupation: "",
  company: "",
});

export const motherAtom = atom({
  name: "",
  age: "",
  occupation: "",
  company: "",
});

let childIndex = 0;
export const childrenAtom = atom([
  {
    id: (childIndex += 1),
    name: "",
    age: "",
    civil_status: "",
    occupation: "",
    company: "",
  },
  {
    id: (childIndex += 1),
    name: "",
    age: "",
    civil_status: "",
    occupation: "",
    company: "",
  },
]);

// Educational Background
export const collegeAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
  other_courses: "",
  course_date_of_attendance: "",
});

export const postGraduateAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
  other_courses: "",
  course_date_of_attendance: "",
});

export const techVocSpecialAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
  other_courses: "",
  course_date_of_attendance: "",
});

// Examination Taken
let examIndex = 0;
export const examinationTakenAtom = atom([
  {
    id: (examIndex += 1),
    government_association: "",
    date_taken: "",
    certification: "",
  },
  {
    id: (examIndex += 1),
    government_association: "",
    date_taken: "",
    certification: "",
  },
  {
    id: (examIndex += 1),
    government_association: "",
    date_taken: "",
    certification: "",
  },
]);

//// Employment Onboarding

// Employment History
let employmentIndex = 0;
export const employmentHistoryAtom = atom([
  {
    id: (employmentIndex += 1),
    position_held: "",
    duration: "",
    date_of_attendance: "",
    reason_leaving: "",
  },
  {
    id: (employmentIndex += 1),
    position_held: "",
    duration: "",
    date_of_attendance: "",
    reason_leaving: "",
  },
  {
    id: (employmentIndex += 1),
    position_held: "",
    duration: "",
    date_of_attendance: "",
    reason_leaving: "",
  },
]);

// Training Attended
let trainingIndex = 0;
export const trainingsAttendedAtom = atom([
  {
    id: (trainingIndex += 1),
    program_name: "",
    duration: "",
    topic_specialization: "",
    provider: "",
  },
  {
    id: (trainingIndex += 1),
    program_name: "",
    duration: "",
    topic_specialization: "",
    provider: "",
  },
  {
    id: (trainingIndex += 1),
    program_name: "",
    duration: "",
    topic_specialization: "",
    provider: "",
  },
]);

// References
let referenceIndex = 0;
export const referencesAtom = atom([
  {
    id: (referenceIndex += 1),
    name: "",
    position_held: "",
    company_name_address: "",
    contact_number: "",
  },
  {
    id: (referenceIndex += 1),
    name: "",
    position_held: "",
    company_name_address: "",
    contact_number: "",
  },
  {
    id: (referenceIndex += 1),
    name: "",
    position_held: "",
    company_name_address: "",
    contact_number: "",
  },
]);

// Emergency Contact
export const contactAtom = atom({
  name: "",
  address: "",
  relationship: "",
  contact_number: "",
});

// Updating Onboarding Data
export const browseOnboardingDataAtom = atom(null, (get, set, update) => {
  set(
    firstNameAtom,
    get(personalInfoAtom)?.response?.profileData?.application
      ?.application_details?.first_name
  );
  set(lastNameAtom, "new data");
  set(middleNameAtom, "new data");
  set(vacancyThruAtom, "new data");
  set(referredByAtom, "new data");
  set(dateApplicationAtom, "new data");
  set(dateAvailabilityAtom, "new data");
  set(appliedForAtom, "new data");
  set(salaryAtom, "new data");
  set(employeeIDAtom, "new data");
});
