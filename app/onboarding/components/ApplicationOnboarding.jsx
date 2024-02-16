import { employeeIDAtom, selectedTabAtom } from "../store/OnboardingStore";

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

const ApplicationOnboarding = ({ viewOnly }) => {
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
  const [employeeID, setEmployeeID] = useAtom(employeeIDAtom);

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
        isDisabled={viewOnly}
        label={"FIRST NAME"}
        value={firstName}
        onValueChange={setFirstName}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"LAST NAME"}
        value={lastName}
        onValueChange={setLastName}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"MIDDLE NAME (if None type N/A)"}
        value={middleName}
        onValueChange={setMiddleName}
        isRequired={false}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"VACANCY THRU"}
        value={vacancyThru}
        onValueChange={setVacancyThru}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"REFERRED BY (if referrals)"}
        value={referredBy}
        onValueChange={setReferredBy}
        isRequired={false}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"DATE OF APPLICATION"}
        value={dateApplication}
        onValueChange={setDateApplication}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"DATE OF AVAILABILITY"}
        value={dateAvailability}
        onValueChange={setDateAvailability}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"APPLIED FOR"}
        value={appliedFor}
        onValueChange={setAppliedFor}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"EXPECTED SALARY"}
        value={salary}
        onValueChange={setSalary}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"EMPLOYEE ID"}
        value={employeeID}
        onValueChange={setEmployeeID}
        isRequired={true}
      />
    </>
  );

  const employee_information = (
    <>
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"PRESENT ADDRESS: (Complete address & ZIP code)"}
        value={presentAddress}
        onValueChange={setPresentAddress}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"PERMANENT ADDRESS: (Complete address & ZIP code)"}
        value={permanentAddress}
        onValueChange={setPermanentAddress}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"RESIDENCE STATUS"}
        value={residenceStatus}
        onValueChange={setResidenceStatus}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"GENDER"}
        value={gender}
        onValueChange={setGender}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"BIRTHDATE: (mm/dd/yyyy)"}
        value={birthdate}
        onValueChange={setBirthdate}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"CIVIL STATUS"}
        value={civilStatus}
        onValueChange={setCivilStatus}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"AGE"}
        value={age}
        onValueChange={setAge}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"EMAIL ADDRESS"}
        value={emailAddress}
        onValueChange={setEmailAddress}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"BIRTHPLACE"}
        value={birthplace}
        onValueChange={setBirthplace}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"LANDLINE NUMBER"}
        value={homePhoneNumber}
        onValueChange={setHomePhoneNumber}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"CITIZENSHIP"}
        value={citizenship}
        onValueChange={setCitizenship}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"MOBILE NUMBER"}
        value={mobileNumber}
        onValueChange={setMobileNumber}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"RELIGION"}
        value={religion}
        onValueChange={setReligion}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"LANGUAGE"}
        value={language}
        onValueChange={setLanguage}
        isRequired={true}
      />
    </>
  );

  const government_id_information = (
    <>
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"TAX IDENTIFICATION NUMBER (if any)"}
        value={TIN}
        onValueChange={setTIN}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"SOCIAL SECURITY NUMBER (if any)"}
        value={SSS}
        onValueChange={setSSS}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"PAG-IBIG NUMBER (if any)"}
        value={pagibig}
        onValueChange={setPagibig}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        label={"PHILHEALTH NUMBER (if any)"}
        value={philhealth}
        onValueChange={setPhilhealth}
      />
    </>
  );

  return (
    <div className="h-fit flex flex-wrap justify-between gap-5 mt-4 ">
      {selectedTab === "application_details" && application_details}
      {selectedTab === "employee_information" && employee_information}
      {selectedTab === "government_id_information" && government_id_information}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default ApplicationOnboarding;
