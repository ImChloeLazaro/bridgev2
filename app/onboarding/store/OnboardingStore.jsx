import { atom } from "jotai";
import { fetchOnboardingStatus } from "@/app/store/UserStore";
// ### TODO Merge all data object before submitting to server

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

export const applicationOnboardingAtom = atom({
  application_details: {
    first_name: { value: "", label: "FIRST NAME" },
    last_name: { value: "", label: "LAST NAME" },
    middle_name: { value: "", label: "MIDDLE NAME (if None type N/A)" },
    vacancy_thru: { value: "", label: "VACANCY THRU" },
    referred_by: { value: "", label: "REFERRED BY (if referrals)" },
    date_application: { value: "", label: "DATE OF APPLICATION" },
    date_availability: { value: "", label: "DATE OF AVAILABILITY" },
    applied_for: { value: "", label: "APPLIED FOR" },
    salary: { value: "", label: "SALARY" },
  },

  employee_information: {
    present_address: {
      value: "",
      label: "PRESENT ADDRESS: (Complete address & ZIP code)",
    }, // with zip code
    permanent_address: {
      value: "",
      label: "PERMANENT ADDRESS: (Complete address & ZIP code)",
    }, // with zip code
    residence_status: { value: "", label: "RESIDENCE STATUS" },
    gender: { value: "", label: "GENDER" },
    birthdate: { value: "", label: "BIRTHDATE: (mm/dd/yyyy)" }, // (mm/dd/yyyy)
    civil_status: { value: "", label: "CIVIL STATUS" },
    age: { value: "", label: "AGE" },
    email_address: { value: "", label: "EMAIL ADDRESS" },
    birthplace: { value: "", label: "BIRTHPLACE" },
    home_phone_number: { value: "", label: "HOME PHONE NUMBER" },
    citizenship: { value: "", label: "CITIZENSHIP" },
    mobile_number: { value: "", label: "MOBILE NUMBER" },
    religion: { value: "", label: "RELIGION" },
    language: { value: "", label: "LANGUAGE" },
  },

  government_id_information: {
    tin: { value: "", label: "TAX IDENTIFICATION NUMBER" },
    sss: { value: "", label: "SOCIAL SECURITY NUMBER" },
    pagibig: { value: "", label: "PAG-IBIG NUMBER" },
    philhealth: { value: "", label: "PHILHEALTH NUMBER" },
  },
});

export const backgroundOnboardingAtom = atom({
  family_background: {
    father: {
      name: { value: "", label: "FATHER'S NAME" },
      age: { value: "", label: "AGE" },
      occupation: { value: "", label: "OCCUPATION" },
      company: { value: "", label: "COMPANY" },
    },
    mother: {
      name: { value: "", label: "MOTHER'S NAME" },
      age: { value: "", label: "AGE" },
      occupation: { value: "", label: "OCCUPATION" },
      company: { value: "", label: "COMPANY" },
    },
    children: [
      {
        name: { value: "", label: "NAME/S OF CHILDREN" },
        age: { value: "", label: "AGE" },
        civil_status: { value: "", label: "CIVIL STATUS" },
        occupation: { value: "", label: "OCCUPATION" },
        company: { value: "", label: "COMPANY" },
      },
    ],
  },

  educational_background: {
    highschool: {
      school: { value: "", label: "HIGHSCHOOL" },
      address: { value: "", label: "ADDRESS" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      degree_major: { value: "", label: "DEGREE/MAJOR" },
    },
    college: {
      school: { value: "", label: "COLLEGE" },
      address: { value: "", label: "ADDRESS" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      degree_major: { value: "", label: "DEGREE/MAJOR" },
    },
    post_graduate: {
      school: { value: "", label: "POST GRADUATE" },
      address: { value: "", label: "ADDRESS" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      degree_major: { value: "", label: "DEGREE/MAJOR" },
    },
    tech_voc_special: {
      school: { value: "", label: "TECHNICAL/VOCATIONAL/SPECIAL COURSES" },
      address: { value: "", label: "ADDRESS" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      degree_major: { value: "", label: "DEGREE/MAJOR" },
    },
  },

  examination_taken: [
    {
      government_association: {
        value: "",
        label: "GOVERNMENT AGENCY/ASSOCIATION",
      },
      date_taken: { value: "", label: "DATE TAKEN" },
      certification: { value: "", label: "CERTIFICATION" },
    },
  ],
});

export const employmentOnboardingAtom = atom({
  employment_history: [
    {
      position_held: { value: "", label: "POSITION HELD" },
      duration: { value: "", label: "DURATION" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      reason_leaving: { value: "", label: "REASON FOR LEAVING" },
    },
    {
      position_held: { value: "", label: "POSITION HELD" },
      duration: { value: "", label: "DURATION" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      reason_leaving: { value: "", label: "REASON FOR LEAVING" },
    },
    {
      position_held: { value: "", label: "POSITION HELD" },
      duration: { value: "", label: "DURATION" },
      date_of_attendance: { value: "", label: "DATE OF ATTENDANCE" },
      reason_leaving: { value: "", label: "REASON FOR LEAVING" },
    },
  ],

  trainings_attended: [
    {
      program_name: { value: "", label: "NAME OF PROGRAM" },
      duration: { value: "", label: "DURATION" },
      topic_specialization: { value: "", label: "TOPIC/SPECIALIZATION" },
      provider: { value: "", label: "PROVIDER" },
    },
    {
      program_name: { value: "", label: "NAME OF PROGRAM" },
      duration: { value: "", label: "DURATION" },
      topic_specialization: { value: "", label: "TOPIC/SPECIALIZATION" },
      provider: { value: "", label: "PROVIDER" },
    },
    {
      program_name: { value: "", label: "NAME OF PROGRAM" },
      duration: { value: "", label: "DURATION" },
      topic_specialization: { value: "", label: "TOPIC/SPECIALIZATION" },
      provider: { value: "", label: "PROVIDER" },
    },
  ],

  references: [
    {
      name: { value: "", label: "NAME" },
      position_held: { value: "", label: "POSITION HELD" },
      company_name_address: { value: "", label: "COMPANY NAME AND ADDRESS" },
      contact_number: { value: "", label: "CONTACT NUMBER" },
    },
    {
      name: { value: "", label: "NAME" },
      position_held: { value: "", label: "POSITION HELD" },
      company_name_address: { value: "", label: "COMPANY NAME AND ADDRESS" },
      contact_number: { value: "", label: "CONTACT NUMBER" },
    },
    {
      name: { value: "", label: "NAME" },
      position_held: { value: "", label: "POSITION HELD" },
      company_name_address: { value: "", label: "COMPANY NAME AND ADDRESS" },
      contact_number: { value: "", label: "CONTACT NUMBER" },
    },
  ],
});

export const contactOnboardingAtom = atom({
  emergency_contact: {
    name: { value: "", label: "NAME" },
    address: { value: "", label: "ADDRESS" },
    relationship: { value: "", label: "RELATIONSHIP" },
    contact_number: { value: "", label: "CONTACT NUMBER" },
  },
});

//// Application Onboarding

// Application Details
export const firstNameAtom = atom("");
export const lastNameAtom = atom("");
export const middleNameAtom = atom("");
export const vacancyThruAtom = atom("");
export const referredByAtom = atom("");
export const dateApplicationAtom = atom("");
export const dateAvailabilityAtom = atom("");
export const appliedForAtom = atom("");
export const salaryAtom = atom("");

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
export const highschoolAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
});

export const collegeAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
});

export const postGraduateAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
});

export const techVocSpecialAtom = atom({
  name: "",
  address: "",
  date_of_attendance: "",
  degree_major: "",
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

//// Contact Onboarding

// Emergency Contact
export const contactAtom = atom({
  name: "",
  address: "",
  relationship: "",
  contact_number: "",
});

export const isSubmittedOnboardingFormAtom = atom(async (get) => {
  return await get(fetchOnboardingStatus)
});
