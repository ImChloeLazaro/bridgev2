import { useAtomValue } from "jotai";
import { userAtom } from "../../../../store/UserStore";

const EmergencyContactContent = () => {
  const user = useAtomValue(userAtom);

  return (
    <div className="flex justify-between p-2">
          <div className="flex flex-col w-full gap-2">
            <div className="flex">
              <p className="text-base font-bold text-black-default w-2/5">
                {"Name:"}
              </p>
              <p className="text-base font-bold text-black-default w-3/5 ">
                {user.emergencyContact.name}
              </p>
            </div>
            <div className="flex">
              <p className="text-base font-bold text-black-default w-2/5">
                {"Relationship:"}
              </p>
              <p className="text-base font-bold text-black-default w-3/5 ">
                {user.emergencyContact.relationship}
              </p>
            </div>
            <div className="flex">
              <p className="text-base font-bold text-black-default w-2/5">
                {"Contact No:"}
              </p>
              <p className="text-base font-bold text-black-default w-3/5 ">
                {user.emergencyContact.contactNumber}
              </p>
            </div>
          </div>
        </div>
  );
};

export default EmergencyContactContent;
