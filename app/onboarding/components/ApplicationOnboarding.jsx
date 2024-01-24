import { selectedTabAtom } from "../store/OnboardingStore";
import {
  firstNameAtom,
  lastNameAtom,
  middleNameAtom,
  vacancyThruAtom,
  referredByAtom,
  dateApplicationAtom,
  dateAvailabilityAtom,
  appliedForAtom,
  salaryAtom,
} from "../store/OnboardingStore";

import {
  presentAddressAtom,
  permanentAddressAtom,
  residenceStatusAtom,
  genderAtom,
  birthdateAtom,
  civilStatusAtom,
  ageAtom,
  emailAddressAtom,
  birthplaceAtom,
  homePhoneNumberAtom,
  citizenshipAtom,
  mobileNumberAtom,
  religionAtom,
  languageAtom,
} from "../store/OnboardingStore";

import {
  tinAtom,
  sssAtom,
  pagibigAtom,
  philhealthAtom,
} from "../store/OnboardingStore";

import OnboardingFieldInput from "../../components/OnboardingFieldInput";
import { useAtomValue, useAtom } from "jotai";

const ApplicationOnboarding = () => {
  const selectedTab = useAtomValue(selectedTabAtom);

  // Application Details
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [middleName, setMiddleName] = useAtom(middleNameAtom);
  const [vacancyThru, setVacancyThru] = useAtom(vacancyThruAtom);
  const [referredBy, setReferredBy] = useAtom(referredByAtom);
  const [dateApplication, setDateApplication] = useAtom(dateApplicationAtom);
  const [dateAvailability, setDateAvailability] = useAtom(dateAvailabilityAtom);
  const [appliedFor, setAppliedFor] = useAtom(appliedForAtom);
  const [salary, setSalary] = useAtom(salaryAtom);

  // Employee Information
  const [presentAddress, setPresentAddress] = useAtom(presentAddressAtom);
  const [permanentAddress, setPermanentAddress] = useAtom(permanentAddressAtom);
  const [residenceStatus, setResidenceStatus] = useAtom(residenceStatusAtom);
  const [gender, setGender] = useAtom(genderAtom);
  const [birthdate, setBirthdate] = useAtom(birthdateAtom);
  const [civilStatus, setCivilStatus] = useAtom(civilStatusAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [emailAddress, setEmailAddress] = useAtom(emailAddressAtom);
  const [birthplace, setBirthplace] = useAtom(birthplaceAtom);
  const [homePhoneNumber, setHomePhoneNumber] = useAtom(homePhoneNumberAtom);
  const [citizenship, setCitizenship] = useAtom(citizenshipAtom);
  const [mobileNumber, setMobileNumber] = useAtom(mobileNumberAtom);
  const [religion, setReligion] = useAtom(religionAtom);
  const [language, setLanguage] = useAtom(languageAtom);

  // Government ID Information
  const [TIN, setTIN] = useAtom(tinAtom);
  const [SSS, setSSS] = useAtom(sssAtom);
  const [pagibig, setPagibig] = useAtom(pagibigAtom);
  const [philhealth, setPhilhealth] = useAtom(philhealthAtom);

  const application_details = (
    <>
      <OnboardingFieldInput
        label={"FIRST NAME"}
        value={firstName}
        onValueChange={setFirstName}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"LAST NAME"}
        value={lastName}
        onValueChange={setLastName}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"MIDDLE NAME (if None type N/A)"}
        value={middleName}
        onValueChange={setMiddleName}
      />
      <OnboardingFieldInput
        label={"VACANCY THRU"}
        value={vacancyThru}
        onValueChange={setVacancyThru}
      />
      <OnboardingFieldInput
        label={"REFERRED BY (if referrals)"}
        value={referredBy}
        onValueChange={setReferredBy}
      />
      <OnboardingFieldInput
        label={"DATE OF APPLICATION"}
        value={dateApplication}
        onValueChange={setDateApplication}
      />
      <OnboardingFieldInput
        label={"DATE OF AVAILABILITY"}
        value={dateAvailability}
        onValueChange={setDateAvailability}
      />
      <OnboardingFieldInput
        label={"APPLIED FOR"}
        value={appliedFor}
        onValueChange={setAppliedFor}
      />
      <OnboardingFieldInput
        label={"SALARY"}
        value={salary}
        onValueChange={setSalary}
      />
    </>
  );

  const employee_information = (
    <>
      <OnboardingFieldInput
        label={"PRESENT ADDRESS: (Complete address & ZIP code)"}
        value={presentAddress}
        onValueChange={setPresentAddress}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"PERMANENT ADDRESS: (Complete address & ZIP code)"}
        value={permanentAddress}
        onValueChange={setPermanentAddress}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"RESIDENCE STATUS"}
        value={residenceStatus}
        onValueChange={setResidenceStatus}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"GENDER"}
        value={gender}
        onValueChange={setGender}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"BIRTHDATE: (mm/dd/yyyy)"}
        value={birthdate}
        onValueChange={setBirthdate}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"CIVIL STATUS"}
        value={civilStatus}
        onValueChange={setCivilStatus}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"AGE"}
        value={age}
        onValueChange={setAge}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"EMAIL ADDRESS"}
        value={emailAddress}
        onValueChange={setEmailAddress}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"BIRTHPLACE"}
        value={birthplace}
        onValueChange={setBirthplace}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"HOME PHONE NUMBER"}
        value={homePhoneNumber}
        onValueChange={setHomePhoneNumber}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"CITIZENSHIP"}
        value={citizenship}
        onValueChange={setCitizenship}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"MOBILE NUMBER"}
        value={mobileNumber}
        onValueChange={setMobileNumber}
        isRequired={true}
      />
      <OnboardingFieldInput
        label={"RELIGION"}
        value={religion}
        onValueChange={setReligion}
      />
      <OnboardingFieldInput
        label={"LANGUAGE"}
        value={language}
        onValueChange={setLanguage}
      />
    </>
  );

  const government_id_information = (
    <>
      <OnboardingFieldInput
        label={"TAX IDENTIFICATION NUMBER"}
        value={TIN}
        onValueChange={setTIN}
      />
      <OnboardingFieldInput
        label={"SOCIAL SECURITY NUMBER"}
        value={SSS}
        onValueChange={setSSS}
      />
      <OnboardingFieldInput
        label={"PAG-IBIG NUMBER"}
        value={pagibig}
        onValueChange={setPagibig}
      />
      <OnboardingFieldInput
        label={"PHILHEALTH NUMBER"}
        value={philhealth}
        onValueChange={setPhilhealth}
      />
    </>
  );

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-4 ">
      {selectedTab === "application_details" && application_details}
      {selectedTab === "employee_information" && employee_information}
      {selectedTab === "government_id_information" && government_id_information}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default ApplicationOnboarding;
