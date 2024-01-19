import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

// export const onboardingAtom = atom({
//   application: {
//     application_details: {
//       first_name: { value: "", label: "First Name" },
//       last_name: { value: "", label: "First Name" },
//       middle_name: { value: "", label: "First Name" },
//       vacancy_thru: { value: "", label: "First Name" },
//       referred_by: { value: "", label: "First Name" },
//       date_application: { value: "", label: "First Name" },
//       date_availability: { value: "", label: "First Name" },
//       applied_for: { value: "", label: "First Name" },
//       salary: { value: "", label: "First Name" },
//     },
//     employee_information: {
//       present_address: { value: "", label: "First Name" }, // with zip code
//       permanent_address: { value: "", label: "First Name" }, // with zip code
//       residence_status: { value: "", label: "First Name" },
//       gender: { value: "", label: "First Name" },
//       birthdate: { value: "", label: "First Name" }, // (mm/dd/yyyy)
//       civil_status: { value: "", label: "First Name" },
//       age: { value: 0, label: "Age" },
//       email_address: { value: "", label: "First Name" },
//       birthplace: { value: "", label: "First Name" },
//       home_phone_number: { value: "", label: "First Name" },
//       citizenship: { value: "", label: "First Name" },
//       mobile_number: { value: "", label: "First Name" },
//       religion: { value: "", label: "First Name" },
//       language: { value: "", label: "First Name" },
//     },
//     government_id_information: {
//       tin: { value: "", label: "First Name" },
//       sss: { value: "", label: "First Name" },
//       pagibig: { value: "", label: "First Name" },
//       philhealth: { value: "", label: "First Name" },
//     },
//   },
//   background: {
//     family_background: {
//       father: {
//         name: { value: "", label: "First Name" },
//         age: { value: 0, label: "Age" },
//         occupation: { value: "", label: "First Name" },
//         company: { value: "", label: "First Name" },
//       },
//       father: {
//         name: { value: "", label: "First Name" },
//         age: { value: 0, label: "Age" },
//         occupation: { value: "", label: "First Name" },
//         company: { value: "", label: "First Name" },
//       },
//       children: [
//         {
//           name: { value: "", label: "First Name" },
//           age: { value: 0, label: "Age" },
//           civil_status: { value: "", label: "First Name" },
//           occupation: { value: "", label: "First Name" },
//           company: { value: "", label: "First Name" },
//         },
//       ],
//     },
//     educational_background: {
//       highschool: {
//         date_of_attendance: { value: "", label: "First Name" },
//         degree_major: { value: "", label: "First Name" },
//       },
//       college: {
//         date_of_attendance: { value: "", label: "First Name" },
//         degree_major: { value: "", label: "First Name" },
//       },
//       post_graduate: {
//         date_of_attendance: { value: "", label: "First Name" },
//         degree_major: { value: "", label: "First Name" },
//       },
//       technical_vocational: {
//         date_of_attendance: { value: "", label: "First Name" },
//         degree_major: { value: "", label: "First Name" },
//       },
//     },
//     examination_taken: [
//       {
//         government_association: { value: "", label: "First Name" },
//         date_taken: { value: "", label: "First Name" },
//         certification: { value: "", label: "First Name" },
//       },
//     ],
//   },
//   employment: {
//     employment_history: [
//       {
//         position_held: { value: "", label: "First Name" },
//         duration: { value: "", label: "First Name" },
//         date_of_attendance: { value: "", label: "First Name" },
//         reason_leaving: { value: "", label: "First Name" },
//       },
//     ],
//     trainings_attended: [
//       {
//         program_name: { value: "", label: "First Name" },
//         duration: { value: "", label: "First Name" },
//         topic_specialization: { value: "", label: "First Name" },
//         provider: { value: "", label: "First Name" },
//       },
//     ],
//     references: [
//       {
//         name: { value: "", label: "First Name" },
//         position_held: { value: "", label: "First Name" },
//         company_name_address: { value: "", label: "First Name" },
//         contact_number: { value: "", label: "First Name" },
//       },
//     ],
//   },
//   contact: {
//     emergency_contact: {
//       name: { value: "", label: "First Name" },
//       address: { value: "", label: "First Name" },
//       relationship: { value: "", label: "First Name" },
//       contact_number: { value: "", label: "First Name" },
//     },
//   },
// });

export const stepsAtom = atom([
  "application",
  "background",
  "employment",
  "contact",
]);

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

export const familyBackgroundAtom = atom({
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
});
