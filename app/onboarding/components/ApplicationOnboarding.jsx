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

import FormFieldInput from "../../components/FormFieldInput";
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
      <div className="flex flex-wrap justify-between gap-5 mb-5">
        <FormFieldInput
          isDisabled={viewOnly}
          label={"FIRST NAME"}
          value={firstName}
          onValueChange={setFirstName}
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"LAST NAME"}
          value={lastName}
          onValueChange={setLastName}
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          label={"MIDDLE NAME (if None type N/A)"}
          value={middleName}
          onValueChange={setMiddleName}
          isRequired={false}
        />
      </div>
      <FormFieldInput
        isDisabled={viewOnly}
        label={"EMPLOYEE ID"}
        value={employeeID}
        onValueChange={setEmployeeID}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"REFERRED BY (if referrals)"}
        value={referredBy}
        onValueChange={setReferredBy}
        isRequired={false}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"VACANCY THRU"}
        value={vacancyThru}
        onValueChange={setVacancyThru}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"APPLIED FOR"}
        value={appliedFor}
        onValueChange={setAppliedFor}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"DATE OF APPLICATION"}
        value={dateApplication}
        onValueChange={setDateApplication}
        isRequired={true}
        withDate={true}
        date={dateApplication}
        onDateChange={setDateApplication}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"DATE OF AVAILABILITY"}
        value={dateAvailability}
        onValueChange={setDateAvailability}
        isRequired={true}
        withDate={true}
        date={dateAvailability}
        onDateChange={setDateAvailability}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"EXPECTED SALARY"}
        value={salary}
        onValueChange={setSalary}
        isRequired={true}
      />
    </>
  );

  const employee_information = (
    <>
      <FormFieldInput
        isDisabled={viewOnly}
        label={"PRESENT ADDRESS: (Complete address & ZIP code)"}
        value={presentAddress}
        onValueChange={setPresentAddress}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"PERMANENT ADDRESS: (Complete address & ZIP code)"}
        value={permanentAddress}
        onValueChange={setPermanentAddress}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"RESIDENCE STATUS"}
        value={residenceStatus}
        onValueChange={setResidenceStatus}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"GENDER"}
        value={gender}
        onValueChange={setGender}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"BIRTHDATE"}
        value={birthdate}
        onValueChange={setBirthdate}
        isRequired={true}
        withDate={true}
        date={birthdate}
        onDateChange={setBirthdate}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"CIVIL STATUS"}
        value={civilStatus}
        onValueChange={setCivilStatus}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"AGE"}
        value={age}
        onValueChange={setAge}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"EMAIL ADDRESS"}
        value={emailAddress}
        onValueChange={setEmailAddress}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"BIRTHPLACE"}
        value={birthplace}
        onValueChange={setBirthplace}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"LANDLINE NUMBER"}
        value={homePhoneNumber}
        onValueChange={setHomePhoneNumber}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"CITIZENSHIP"}
        value={citizenship}
        onValueChange={setCitizenship}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"MOBILE NUMBER"}
        value={mobileNumber}
        onValueChange={setMobileNumber}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"RELIGION"}
        value={religion}
        onValueChange={setReligion}
        isRequired={true}
      />
      <FormFieldInput
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
      <FormFieldInput
        isDisabled={viewOnly}
        label={"TAX IDENTIFICATION NUMBER (if any)"}
        value={TIN}
        onValueChange={setTIN}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"SOCIAL SECURITY NUMBER (if any)"}
        value={SSS}
        onValueChange={setSSS}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        label={"PAG-IBIG NUMBER (if any)"}
        value={pagibig}
        onValueChange={setPagibig}
      />
      <FormFieldInput
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
