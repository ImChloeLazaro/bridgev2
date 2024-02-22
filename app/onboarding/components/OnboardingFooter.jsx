import { authenticationAtom } from "@/app/store/AuthenticationStore";
import "../../aws-auth";
import CTAButtons from "../../components/CTAButtons";

import {
  activeStepAtom,
  selectedStepperAtom,
  stepsAtom,
} from "../store/OnboardingStore";

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
} from "../store/OnboardingStore";

import {
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
} from "../store/OnboardingStore";

import {
  pagibigAtom,
  philhealthAtom,
  sssAtom,
  tinAtom,
} from "../store/OnboardingStore";

import { childrenAtom, fatherAtom, motherAtom } from "../store/OnboardingStore";

import {
  collegeAtom,
  postGraduateAtom,
  techVocSpecialAtom,
} from "../store/OnboardingStore";

import { examinationTakenAtom } from "../store/OnboardingStore";

import {
  employmentHistoryAtom,
  referencesAtom,
  trainingsAttendedAtom,
} from "../store/OnboardingStore";

import { contactAtom } from "../store/OnboardingStore";

import { isSubmittedOnboardingFormAtom } from "../store/OnboardingStore";

import { useAtomValue, useSetAtom } from "jotai";

import { restinsert, updatewithparams } from "../../utils/amplify-rest";
const OnboardingFooter = () => {
  const unique_key = useAtomValue(authenticationAtom);
  const steps = useAtomValue(stepsAtom);
  const activeStep = useAtomValue(activeStepAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setSelectedStepper = useSetAtom(selectedStepperAtom);

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

  const setIsSubmittedOnboardingForm = useSetAtom(
    isSubmittedOnboardingFormAtom
  );

  const handleSubmit = async () => {
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

    const profileresponse = await restinsert("/profile", onboardingData);
    const updateonboardingstatus = await updatewithparams("/user", {
      sub: unique_key.sub,
    });
    const benefitsresponse = await restinsert("/benefits", {
      sub: unique_key.sub,
    });
    const leaveresponse = await restinsert("/leave", { sub: unique_key.sub });
    console.log("PROFILE RESPONSE", profileresponse);
    console.log("ONBOARDING STATUS RESPONSE", updateonboardingstatus);
    console.log("BENEFITS RESPONSE", benefitsresponse);
    console.log("LEAVE RESPONSE", leaveresponse);
    console.log("ONBOARDING FORM SUBMITTED!", onboardingData);

    
  };

  const handleNext = () => {
    if (activeStep <= steps.length - 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSelectedStepper(steps[activeStep]);
    }
  };

  const handleBack = () => {
    if (activeStep >= 1) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setSelectedStepper(steps[activeStep]);
    }
  };

  const actionButtons = {
    back: { color: "blue", label: "Back", action: handleBack },
    next: {
      color: "blue",
      label: activeStep === steps.length - 1 ? "Submit" : "Next",
      action: activeStep === steps.length - 1 ? handleSubmit : handleNext,
    },
  };
  return (
    <>
      <div className="w-full flex justify-between gap-14 py-4">
        {activeStep != 0 ? (
          <CTAButtons
            fullWidth={true}
            label={actionButtons.back.label}
            color={actionButtons.back.color}
            onPress={actionButtons.back.action}
            isDisabled={activeStep === 0}
          />
        ) : (
          <CTAButtons
            fullWidth={true}
            label={""}
            color={"clear"}
            isDisabled={activeStep === 0}
          />
        )}

        <CTAButtons
          fullWidth={true}
          label={actionButtons.next.label}
          color={actionButtons.next.color}
          onPress={actionButtons.next.action}
        />
      </div>
    </>
  );
};

export default OnboardingFooter;
