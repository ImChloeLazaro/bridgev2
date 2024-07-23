import { atom } from "jotai";
import { readwithparams } from "@/app/utils/amplify-rest";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { userAtom } from "@/app/store/UserStore";
import {
  getLocalTimeZone,
  Time,
  toCalendarDateTime,
  today,
} from "@internationalized/date";

export const stepsAtom = atom([
  "application",
  "background",
  "employment",
  "contact",
]);

// Onboarding Tabs

export const onboardingTabsAtom = atom((get) => [
  [
    { title: "Application Details", key: "application_details" },
    { title: "Employee Information", key: "employee_information" },
    { title: "Government ID Information", key: "government_id_information" },
  ],
  [
    { title: "Family Background", key: "family_background" },
    { title: "Educational Background", key: "educational_background" },
    { title: "Examination Taken", key: "examination_taken" },
  ],
  [
    { title: "Employment History", key: "employment_history" },
    { title: "Trainings Attended", key: "trainings_attended" },
    { title: "References", key: "references" },
  ],
  [{ title: "Emergency Contact", key: "emergency_contact" }],
]);

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
export const selectedTabIndexAtom = atom(0)

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

export const dateApplicationDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});
export const dateAvailabilityDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

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

export const birthdateDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

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
  // date_of_attendance: "",
  degree_major: "",
  other_courses: "",
  // course_date_of_attendance: "",
});

export const collegeDateOfAttendanceAtom = atom("");
export const collegeDateOfAttendanceDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

export const collegeCourseDateOfAttendanceAtom = atom("");
export const collegeCourseDateOfAttendanceDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

export const postGraduateAtom = atom({
  name: "",
  address: "",
  // date_of_attendance: "",
  degree_major: "",
  other_courses: "",
  // course_date_of_attendance: "",
});

export const postGraduateDateOfAttendanceAtom = atom("");
export const postGraduateDateOfAttendanceDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

export const postGraduateCourseDateOfAttendanceAtom = atom("");
export const postGraduateCourseDateOfAttendanceDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

export const techVocSpecialAtom = atom({
  name: "",
  address: "",
  // date_of_attendance: "",
  degree_major: "",
  other_courses: "",
  // course_date_of_attendance: "",
});

export const techVocDateOfAttendanceAtom = atom("");
export const techVocDateOfAttendanceDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

export const techVocCourseDateOfAttendanceAtom = atom("");
export const techVocCourseDateOfAttendanceDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
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

export const examinationTakenDateRangeAtom = atom([
  {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  },
  {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  },
  {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
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

export const employmentHistoryDateRangeAtom = atom([
  {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  },
  {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  },
  {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
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

export const onboardingDataAtom = atom((get) => {
  const user = get(userAtom);
  return {
    application: {
      application_details: {
        first_name: get(firstNameAtom),
        last_name: get(lastNameAtom),
        middle_name: get(middleNameAtom),
        vacancy_thru: get(vacancyThruAtom),
        referred_by: get(referredByAtom),
        date_application: toCalendarDateTime(
          get(dateApplicationDateRangeAtom).start,
          new Time()
        ).toString(),
        date_availability: toCalendarDateTime(
          get(dateAvailabilityDateRangeAtom).start,
          new Time()
        ).toString(),
        applied_for: get(appliedForAtom),
        salary: get(salaryAtom), // expected salary
      },
      employee_information: {
        present_address: get(presentAddressAtom), // with zip code
        permanent_address: get(permanentAddressAtom), // with zip code
        residence_status: get(residenceStatusAtom),
        gender: get(genderAtom),
        birthdate: toCalendarDateTime(
          get(birthdateDateRangeAtom).start,
          new Time()
        ).toString(), // (mm/dd/yyyy)
        civil_status: get(civilStatusAtom),
        age: get(ageAtom),
        email_address: get(emailAddressAtom),
        birthplace: get(birthplaceAtom),
        home_phone_number: get(homePhoneNumberAtom), // landline number
        citizenship: get(citizenshipAtom),
        mobile_number: get(mobileNumberAtom),
        religion: get(religionAtom),
        language: get(languageAtom),
      },
      government_id_information: {
        tin: get(tinAtom),
        sss: get(sssAtom),
        pagibig: get(pagibigAtom),
        philhealth: get(philhealthAtom),
      },
    },
    background: {
      family_background: {
        father: get(fatherAtom),
        mother: get(motherAtom),
        children: get(childrenAtom),
      },
      educational_background: {
        college: {
          ...get(collegeAtom),
          date_of_attendance: toCalendarDateTime(
            get(collegeDateOfAttendanceDateRangeAtom).start,
            new Time()
          ).toString(),
          course_date_of_attendance: toCalendarDateTime(
            get(collegeCourseDateOfAttendanceDateRangeAtom).start,
            new Time()
          ).toString(),
        },
        post_graduate: {
          ...get(postGraduateAtom),
          date_of_attendance: toCalendarDateTime(
            get(postGraduateDateOfAttendanceDateRangeAtom).start,
            new Time()
          ).toString(),
          course_date_of_attendance: toCalendarDateTime(
            get(postGraduateCourseDateOfAttendanceDateRangeAtom).start,
            new Time()
          ).toString(),
        },
        technical_vocational: {
          ...get(techVocSpecialAtom),
          date_of_attendance: toCalendarDateTime(
            get(techVocDateOfAttendanceDateRangeAtom).start,
            new Time()
          ).toString(),
          course_date_of_attendance: toCalendarDateTime(
            get(techVocCourseDateOfAttendanceDateRangeAtom).start,
            new Time()
          ).toString(),
        },
      },
      examination_taken: get(examinationTakenAtom),
    },
    employment: {
      employment_history: get(employmentHistoryAtom),
      trainings_attended: get(trainingsAttendedAtom),
      references: get(referencesAtom),
    },
    contact: {
      emergency_contact: get(contactAtom),
    },
    sub: user?.sub,
  };
});
