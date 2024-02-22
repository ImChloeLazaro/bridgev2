import { useAtom, useAtomValue } from "jotai";
import OnboardingFieldInput from "../../components/OnboardingFieldInput";
import { employmentHistoryAtom, referencesAtom, selectedTabAtom, trainingsAttendedAtom } from "../store/OnboardingStore";

const EmploymentOnboarding = ({ viewOnly }) => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const handleUpdateValue = (data, index, property, value, setFunction) => {
    const updatedValue = data.map((obj) => {
      if (obj.id === index) {
        return { ...obj, [property]: value };
      }
      return obj;
    });
    setFunction(updatedValue);
  };

  // Employment History
  const [employmentHistory, setEmploymentHistory] = useAtom(
    employmentHistoryAtom
  );

  // Training Attended
  const [trainingsAttended, setTrainingsAttended] = useAtom(
    trainingsAttendedAtom
  );

  // References
  const [references, setReferences] = useAtom(referencesAtom);

  const employment_history = employmentHistory.map((history, h_index) => (
    <div
      key={"history" + h_index}
      className="flex flex-wrap justify-between gap-5 mb-5"
    >
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"employment_position_held" + h_index}
        label={"POSITION HELD"}
        value={history.position_held}
        onValueChange={(text) => {
          handleUpdateValue(
            employmentHistory,
            h_index + 1,
            "position_held",
            text,
            setEmploymentHistory
          );
        }}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"employment_date_of_attendance" + h_index}
        label={"DATE OF ATTENDANCE"}
        value={history.date_of_attendance}
        onValueChange={(text) => {
          handleUpdateValue(
            employmentHistory,
            h_index + 1,
            "date_of_attendance",
            text,
            setEmploymentHistory
          );
        }}
        isRequired={true}
        // withDate={true}
        // date={history.date_of_attendance}
        // onDateChange={setEmploymentHistory}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"employment_duration" + h_index}
        label={"DURATION"}
        value={history.duration}
        onValueChange={(text) => {
          handleUpdateValue(
            employmentHistory,
            h_index + 1,
            "duration",
            text,
            setEmploymentHistory
          );
        }}
        isRequired={true}
      />

      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"employment_reason_leaving" + h_index}
        label={"REASON FOR LEAVING"}
        value={history.reason_leaving}
        onValueChange={(text) => {
          handleUpdateValue(
            employmentHistory,
            h_index + 1,
            "reason_leaving",
            text,
            setEmploymentHistory
          );
        }}
        isRequired={true}
      />
    </div>
  ));

  const trainings_attended = trainingsAttended.map((training, t_index) => (
    <div
      key={"training" + t_index}
      className="flex flex-wrap justify-between gap-5 mb-5"
    >
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"training_program_name" + t_index}
        label={"NAME OF PROGRAM"}
        value={training.program_name}
        onValueChange={(text) => {
          handleUpdateValue(
            trainingsAttended,
            t_index + 1,
            "program_name",
            text,
            setTrainingsAttended
          );
        }}
        isRequired={true}
      />

      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"training_topic_specialization" + t_index}
        label={"TOPIC/SPECIALIZATION"}
        value={training.topic_specialization}
        onValueChange={(text) => {
          handleUpdateValue(
            trainingsAttended,
            t_index + 1,
            "topic_specialization",
            text,
            setTrainingsAttended
          );
        }}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"training_duration" + t_index}
        label={"DURATION"}
        value={training.duration}
        onValueChange={(text) => {
          handleUpdateValue(
            trainingsAttended,
            t_index + 1,
            "duration",
            text,
            setTrainingsAttended
          );
        }}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"training_provider" + t_index}
        label={"PROVIDER"}
        value={training.provider}
        onValueChange={(text) => {
          handleUpdateValue(
            trainingsAttended,
            t_index + 1,
            "provider",
            text,
            setTrainingsAttended
          );
        }}
        isRequired={true}
      />
    </div>
  ));
  const employment_reference = references.map((reference, r_index) => (
    <div
      key={"reference" + r_index}
      className="flex flex-wrap justify-between gap-5 mb-5"
    >
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"reference_name" + r_index}
        label={"NAME"}
        value={reference.name}
        onValueChange={(text) => {
          handleUpdateValue(
            references,
            r_index + 1,
            "name",
            text,
            setReferences
          );
        }}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"reference_company_name_address" + r_index}
        label={"COMPANY NAME AND ADDRESS"}
        value={reference.company_name_address}
        onValueChange={(text) => {
          handleUpdateValue(
            references,
            r_index + 1,
            "company_name_address",
            text,
            setReferences
          );
        }}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"reference_position_held" + r_index}
        label={"POSITION HELD"}
        value={reference.position_held}
        onValueChange={(text) => {
          handleUpdateValue(
            references,
            r_index + 1,
            "position_held",
            text,
            setReferences
          );
        }}
        isRequired={true}
      />
      <OnboardingFieldInput
        isDisabled={viewOnly}
        key={"reference_contact_number" + r_index}
        label={"CONTACT NUMBER"}
        value={reference.contact_number}
        onValueChange={(text) => {
          handleUpdateValue(
            references,
            r_index + 1,
            "contact_number",
            text,
            setReferences
          );
        }}
        isRequired={true}
      />
    </div>
  ));

  return (
    <div className="h-fit flex flex-wrap justify-between gap-5 mt-4">
      {selectedTab === "employment_history" && employment_history}
      {selectedTab === "trainings_attended" && trainings_attended}
      {selectedTab === "references" && employment_reference}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default EmploymentOnboarding;
