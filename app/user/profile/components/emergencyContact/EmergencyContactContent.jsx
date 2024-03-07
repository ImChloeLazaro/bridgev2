import { useAtomValue } from "jotai";
import { emergencyContactAtom } from "../../store/ProfileStore";

const EmergencyContactContent = () => {
  const emergencyContact = useAtomValue(emergencyContactAtom);
  console.log("CONTACT IN PROFILE", emergencyContact);

  return (
    <div className="flex justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Name:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {emergencyContact?.name ?? "No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Relationship:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {emergencyContact?.relationship ?? "No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Contact No:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {emergencyContact?.contact_number ?? "No Data Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactContent;
