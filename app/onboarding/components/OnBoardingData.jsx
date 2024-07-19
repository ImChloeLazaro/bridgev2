import {
  appliedForAtom,
  dateApplicationAtom,
  dateAvailabilityAtom,
  firstNameAtom,
  lastNameAtom,
  middleNameAtom,
  referredByAtom,
  salaryAtom,
  vacancyThruAtom,
  ageAtom,
  birthdateAtom,
  birthplaceAtom,
  citizenshipAtom,
  civilStatusAtom,
  emailAddressAtom,
  genderAtom,
  homePhoneNumberAtom,
  languageAtom,
  mobileNumberAtom,
  permanentAddressAtom,
  presentAddressAtom,
  religionAtom,
  residenceStatusAtom,
  pagibigAtom,
  philhealthAtom,
  sssAtom,
  tinAtom,
  childrenAtom,
  fatherAtom,
  motherAtom,
  collegeAtom,
  postGraduateAtom,
  techVocSpecialAtom,
  examinationTakenAtom,
  employmentHistoryAtom,
  referencesAtom,
  trainingsAttendedAtom,
  contactAtom,
} from "../store/OnboardingStore";

const { authenticationAtom } = require("@/app/store/AuthenticationStore");
const { useAtomValue } = require("jotai");
export const OnBoardingData = () => {
  const unique_key = useAtomValue(authenticationAtom);
  // Application Details
  const firstName = useAtomValue(firstNameAtom);
  const lastName = useAtomValue(lastNameAtom);
  const middleName = useAtomValue(middleNameAtom);
  const vacancyThru = useAtomValue(vacancyThruAtom);
  const referredBy = useAtomValue(referredByAtom);
  const dateApplication = useAtomValue(dateApplicationAtom);
  const dateAvailability = useAtomValue(dateAvailabilityAtom);
  const appliedFor = useAtomValue(appliedForAtom);
  const salary = useAtomValue(salaryAtom);

  // Employee Information
  const presentAddress = useAtomValue(presentAddressAtom);
  const permanentAddress = useAtomValue(permanentAddressAtom);
  const residenceStatus = useAtomValue(residenceStatusAtom);
  const gender = useAtomValue(genderAtom);
  const birthdate = useAtomValue(birthdateAtom);
  const civilStatus = useAtomValue(civilStatusAtom);
  const age = useAtomValue(ageAtom);
  const emailAddress = useAtomValue(emailAddressAtom);
  const birthplace = useAtomValue(birthplaceAtom);
  const homePhoneNumber = useAtomValue(homePhoneNumberAtom);
  const citizenship = useAtomValue(citizenshipAtom);
  const mobileNumber = useAtomValue(mobileNumberAtom);
  const religion = useAtomValue(religionAtom);
  const language = useAtomValue(languageAtom);

  // Government ID Information
  const TIN = useAtomValue(tinAtom);
  const SSS = useAtomValue(sssAtom);
  const pagibig = useAtomValue(pagibigAtom);
  const philhealth = useAtomValue(philhealthAtom);

  // Family Background
  const father = useAtomValue(fatherAtom);
  const mother = useAtomValue(motherAtom);
  const children = useAtomValue(childrenAtom);

  // Educational Background
  const college = useAtomValue(collegeAtom);
  const postGraduate = useAtomValue(postGraduateAtom);
  const techVocSpecial = useAtomValue(techVocSpecialAtom);

  // Examination Taken
  const examinationTaken = useAtomValue(examinationTakenAtom);

  // Employment History
  const employmentHistory = useAtomValue(employmentHistoryAtom);

  // Training Attended
  const trainingsAttended = useAtomValue(trainingsAttendedAtom);

  // References
  const references = useAtomValue(referencesAtom);

  // Emergency Contact
  const contact = useAtomValue(contactAtom);
  const onboardingData = {
    application: {
      application_details: {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        vacancy_thru: vacancyThru,
        referred_by: referredBy,
        date_application: dateApplication,
        date_availability: dateAvailability,
        applied_for: appliedFor,
        salary: salary, // expected salary
      },
      employee_information: {
        present_address: presentAddress, // with zip code
        permanent_address: permanentAddress, // with zip code
        residence_status: residenceStatus,
        gender: gender,
        birthdate: birthdate, // (mm/dd/yyyy)
        civil_status: civilStatus,
        age: age,
        email_address: emailAddress,
        birthplace: birthplace,
        home_phone_number: homePhoneNumber, // landline number
        citizenship: citizenship,
        mobile_number: mobileNumber,
        religion: religion,
        language: language,
      },
      government_id_information: {
        tin: TIN,
        sss: SSS,
        pagibig: pagibig,
        philhealth: philhealth,
      },
    },
    background: {
      family_background: {
        father: father,
        mother: mother,
        children: children,
      },
      educational_background: {
        college: college,
        post_graduate: postGraduate,
        technical_vocational: techVocSpecial,
      },
      examination_taken: examinationTaken,
    },
    employment: {
      employment_history: employmentHistory,
      trainings_attended: trainingsAttended,
      references: references,
    },
    contact: {
      emergency_contact: contact,
    },
    sub: unique_key.sub,
  };
  return onboardingData;
};
