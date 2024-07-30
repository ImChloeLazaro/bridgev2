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
  dateApplicationDateRangeAtom,
  dateAvailabilityDateRangeAtom,
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
  birthdateDateRangeAtom,
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

  const [dateApplicationDateRange, setDateApplicationDateRange] = useAtom(
    dateApplicationDateRangeAtom
  );
  const [dateAvailabilityDateRange, setDateAvailabilityDateRange] = useAtom(
    dateAvailabilityDateRangeAtom
  );

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

  const [birthdateDateRange, setBirthdateDateRange] = useAtom(birthdateDateRangeAtom)

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
          type={"text"}
          label={"FIRST NAME"}
          value={firstName}
          onValueChange={setFirstName}
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          type={"text"}
          label={"LAST NAME"}
          value={lastName}
          onValueChange={setLastName}
          isRequired={true}
        />
        <FormFieldInput
          isDisabled={viewOnly}
          type={"text"}
          label={"MIDDLE NAME (if None type N/A)"}
          value={middleName}
          onValueChange={setMiddleName}
          isRequired={false}
        />
      </div>
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"EMPLOYEE ID"}
        value={employeeID}
        onValueChange={setEmployeeID}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"REFERRED BY (if referrals)"}
        value={referredBy}
        onValueChange={setReferredBy}
        isRequired={false}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"VACANCY THRU"}
        value={vacancyThru}
        onValueChange={setVacancyThru}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"APPLIED FOR"}
        value={appliedFor}
        onValueChange={setAppliedFor}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"date"}
        label={"DATE OF APPLICATION"}
        value={dateApplication}
        onValueChange={setDateApplication}
        isRequired={true}
        showPastDate={true}
        withDate={true}
        dateRangeValue={dateApplicationDateRange}
        onDateRangeValueChange={setDateApplicationDateRange}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"date"}
        label={"DATE OF AVAILABILITY"}
        value={dateAvailability}
        onValueChange={setDateAvailability}
        isRequired={true}
        showPastDate={true}
        withDate={true}
        dateRangeValue={dateAvailabilityDateRange}
        onDateRangeValueChange={setDateAvailabilityDateRange}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
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
        type={"text"}
        label={"PRESENT ADDRESS: (Complete address & ZIP code)"}
        value={presentAddress}
        onValueChange={setPresentAddress}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"PERMANENT ADDRESS: (Complete address & ZIP code)"}
        value={permanentAddress}
        onValueChange={setPermanentAddress}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"RESIDENCE STATUS"}
        value={residenceStatus}
        onValueChange={setResidenceStatus}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"GENDER"}
        value={gender}
        onValueChange={setGender}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"date"}
        label={"BIRTHDATE"}
        value={birthdate}
        onValueChange={setBirthdate}
        isRequired={true}
        showPastDate={true}
        withDate={true}
        dateRangeValue={birthdateDateRange}
        onDateRangeValueChange={setBirthdateDateRange}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"CIVIL STATUS"}
        value={civilStatus}
        onValueChange={setCivilStatus}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"AGE"}
        value={age}
        onValueChange={setAge}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"EMAIL ADDRESS"}
        value={emailAddress}
        onValueChange={setEmailAddress}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"BIRTHPLACE"}
        value={birthplace}
        onValueChange={setBirthplace}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"LANDLINE NUMBER"}
        value={homePhoneNumber}
        onValueChange={setHomePhoneNumber}
        isRequired={false}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"CITIZENSHIP"}
        value={citizenship}
        onValueChange={setCitizenship}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"MOBILE NUMBER"}
        value={mobileNumber}
        onValueChange={setMobileNumber}
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"RELIGION"}
        value={religion}
        onValueChange={setReligion}
        isRequired={false}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"LANGUAGE"}
        value={language}
        onValueChange={setLanguage}
        isRequired={false}
      />
    </>
  );

  const government_id_information = (
    <>
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"TAX IDENTIFICATION NUMBER (if any)"}
        value={TIN}
        onValueChange={setTIN}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"SOCIAL SECURITY NUMBER (if any)"}
        value={SSS}
        onValueChange={setSSS}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
        label={"PAG-IBIG NUMBER (if any)"}
        value={pagibig}
        onValueChange={setPagibig}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"}
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
