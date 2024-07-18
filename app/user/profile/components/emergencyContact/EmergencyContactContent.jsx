import { useAtomValue } from "jotai";
import { personalInfoAtom } from "../../store/ProfileStore";

const EmergencyContactContent = () => {
  const { profileData } = useAtomValue(personalInfoAtom);
  return (
    <div className="flex justify-between p-1 lg:p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Name:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {profileData.emergency.name?.length
              ? profileData.emergency?.name
              : "No Data Available"}
          </p>
        </div>
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Relationship:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {profileData.emergency.relationship?.length
              ? profileData.emergency.relationship
              : "No Data Available"}
          </p>
        </div>
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Contact No:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {profileData.emergency.contact_number?.length
              ? profileData.emergency?.contact_number
              : "No Data Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactContent;
