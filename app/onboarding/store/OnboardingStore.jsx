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
import { personalInfoAtom } from "@/app/user/profile/store/ProfileStore";
import { format, isValid } from "date-fns";

export const stepsAtom = atom([
  "application",
  "background",
  "employment",
  "contact",
]);

// Onboarding Tabs

export const onboardingTabsAtom = atom((get) => [
  [
    { title: "Application Details", key: "application_details", filled: false },
    {
      title: "Employee Information",
      key: "employee_information",
      filled: false,
    },
    {
      title: "Government ID Information",
      key: "government_id_information",
      filled: false,
    },
  ],
  [
    { title: "Family Background", key: "family_background", filled: false },
    {
      title: "Educational Background",
      key: "educational_background",
      filled: false,
    },
    { title: "Examination Taken", key: "examination_taken", filled: false },
  ],
  [
    { title: "Employment History", key: "employment_history", filled: false },
    { title: "Trainings Attended", key: "trainings_attended", filled: false },
    { title: "References", key: "references", filled: false },
  ],
  [{ title: "Emergency Contact", key: "emergency_contact", filled: false }],
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
export const headerClick = atom({ clicked: false, stepper: 0 });
export const footerClick = atom(false);

export const activeStepAtom = atom(0);
export const selectedTabIndexAtom = atom(0);

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
const formatDate = (dateData) => {
  if (isValid(new Date(dateData))) {
    return format(new Date(dateData), "MMM d, yyyy");
  } else {
    return "No date data available";
  }
};
export const fetchOnboardingDataAtom = atom(null, (get, set) => {
  const boardingData = get(personalInfoAtom);
  const application = boardingData?.value?.self_data?.profile?.application;
  const background = boardingData?.value?.self_data?.profile?.background;
  const employment = boardingData?.value?.self_data?.profile?.employment;
  const contact = boardingData?.value?.self_data?.profile?.contact;
  // console.log("application: ", application);
  // console.log("background: ", background);
  // console.log("employment: ", employment);
  // console.log("contact: ", contact);

  //application
  //application details
  set(firstNameAtom, application?.application_details?.first_name);
  set(lastNameAtom, application?.application_details?.last_name);
  set(middleNameAtom, application?.application_details?.middle_name);
  set(referredByAtom, application?.application_details?.referred_by);
  set(vacancyThruAtom, application?.application_details?.vacancy_thru);
  set(
    dateApplicationAtom,
    formatDate(application?.application_details?.date_application)
  );
  set(
    dateAvailabilityAtom,
    formatDate(application?.application_details?.date_availability)
  );
  set(appliedForAtom, application?.application_details?.applied_for);
  set(salaryAtom, application?.application_details?.salary);
  //employee information
  set(presentAddressAtom, application?.employee_information?.present_address);
  set(
    permanentAddressAtom,
    application?.employee_information?.permanent_address
  );
  set(residenceStatusAtom, application?.employee_information?.residence_status);
  set(genderAtom, application?.employee_information?.gender);
  set(birthdateAtom, formatDate(application?.employee_information?.birthdate));
  set(civilStatusAtom, application?.employee_information?.civil_status);
  set(ageAtom, application?.employee_information?.age);
  set(emailAddressAtom, application?.employee_information?.email_address);
  set(birthplaceAtom, application?.employee_information?.birthplace);
  set(
    homePhoneNumberAtom,
    application?.employee_information?.home_phone_number
  );
  set(citizenshipAtom, application?.employee_information?.citizenship);
  set(mobileNumberAtom, application?.employee_information?.mobile_number);
  set(religionAtom, application?.employee_information?.religion);
  set(languageAtom, application?.employee_information?.language);
  //government Information
  set(tinAtom, application?.government_id_information?.tin);
  set(sssAtom, application?.government_id_information?.sss);
  set(philhealthAtom, application?.government_id_information?.philhealth);
  set(pagibigAtom, application?.government_id_information?.pagibig);

  //background
  //family Background
  set(fatherAtom, background?.family_background?.father);
  set(motherAtom, background?.family_background?.mother);
  set(childrenAtom, background?.family_background?.children);
  //educational Background
  set(collegeAtom, background?.educational_background?.college);
  set(postGraduateAtom, background?.educational_background?.post_graduate);
  set(
    techVocSpecialAtom,
    background?.educational_background?.technical_vocational
  );
  //examination Background
  set(examinationTakenAtom, background?.examination_taken);
  //Employment
  set(employmentHistoryAtom, employment?.employment_history);
  employment?.trainings_attended &&
    set(trainingsAttendedAtom, employment?.trainings_attended);
  set(referencesAtom, employment?.references);
  //contact
  set(contactAtom, contact?.emergency_contact);
});

export const onboardingDataAtom = atom((get) => {
  console.log("collegeAtom: ", get(collegeAtom));
  console.log("postGraduateAtom: ", get(postGraduateAtom));
  console.log("techVocSpecialAtom: ", get(techVocSpecialAtom));
  return {
    application: {
      application_details: {
        first_name: get(firstNameAtom),
        last_name: get(lastNameAtom),
        middle_name: get(middleNameAtom),
        vacancy_thru: get(vacancyThruAtom),
        referred_by: get(referredByAtom),
        date_application: get(dateApplicationAtom),
        date_availability: get(dateAvailabilityAtom),
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
          other_courses: "",
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
          other_courses: "",
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
          other_courses: "",
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
    sub: `CHANGE SUB AFTER AUTOMATION - ${get(firstNameAtom)} ${get(
      lastNameAtom
    )}`, // Temp change for employee automation by @gerome - sub: user?.value?.sub,
  };
});
