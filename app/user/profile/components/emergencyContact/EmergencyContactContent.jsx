import { useAtomValue } from "jotai";
import { emergencyContactAtom } from "../../store/ProfileStore";

const EmergencyContactContent = () => {
  const data = useAtomValue(emergencyContactAtom);
  return (
    <div className="flex justify-between p-1 lg:p-2">
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Name:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {data?.name ?? "No Data Available"}
          </p>
        </div>
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Relationship:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {data?.relationship ?? "No Data Available"}
          </p>
        </div>
        <div className="w-full flex">
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {"Contact No:"}
          </p>
          <p className="w-1/2 text-sm sm:text-base font-bold text-black-default">
            {data?.contact_number ?? "No Data Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactContent;
