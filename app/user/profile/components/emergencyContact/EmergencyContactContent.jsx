import { useAtomValue } from "jotai";
import { userAtom } from "../../../../store/UserStore";

const EmergencyContactContent = () => {
  const user = useAtomValue(userAtom);
  // ### TODO Connect data from onboarding data

  return (
    <div className="flex justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Name:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {/* {user.emergencyContact.name ?? "No Data Available"} */}
            {"No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Relationship:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {/* {user.emergencyContact.relationship ?? "No Data Available"} */}
            {"No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Contact No:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {/* {user.emergencyContact.contactNumber ?? "No Data Available"} */}
            {"No Data Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactContent;
