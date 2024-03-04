import { useAtomValue } from "jotai";
import { onboardingStatusAtom } from "../../store/ProfileStore";

const EmergencyContactContent = () => {
  // const contact = useAtomValue(onboardingStatusAtom);
  // console.log("CONTACT IN PROFILE", contact);
  const data = useAtomValue(onboardingStatusAtom)?.response?.profile?.contact?.emergency_contact;
  console.log(data)
  return (
    <div className="flex justify-between p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Name:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {data?.name ?? "No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Relationship:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {data?.relationship ?? "No Data Available"}
          </p>
        </div>
        <div className="flex">
          <p className="text-base font-bold text-black-default w-2/5">
            {"Contact No:"}
          </p>
          <p className="text-base font-bold text-black-default w-3/5 ">
            {data?.contact_number ?? "No Data Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactContent;
