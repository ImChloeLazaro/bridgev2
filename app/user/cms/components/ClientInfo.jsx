import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { MdInfoOutline } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

import { useAtomValue } from "jotai";

const ClientInfo = () => {
  return (
    <>
      {/* // ### CLIENT INFORMATION} */}
      <div className="mt-2 mb-12 py-2 w-full ">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Client Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4 ">
          {/* // ### Location */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Location"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is the location of the store"}
              </p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### State */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"State"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is the state of where the store is located"}
              </p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Address */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Address"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is the store's current address"}
              </p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
        </div>
      </div>

      {/* // ### CONTACT INFORMATION*/}
      <div className="mt-2 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-5">
          <p className="font-bold text-lg">{"Contact Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4">
          {/* // ### Contact Person */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Contact Person"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Contact Number */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Contact Number"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Contact Email */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Contact Email"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Account Email */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Account Email"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
        </div>
      </div>

      {/* // ### CONTACT INFORMATION*/}
      <div className="mt-2 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-5">
          <p className="font-bold text-lg">{"SLA"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4">
          {/* // ### Contact Person */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"SLA"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Contact Number */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"SLA"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Contact Email */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"SLA"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
          {/* // ### Account Email */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"SLA"}</p>
            </div>
            <p className="">{"No Data Available"}</p>
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
};

export default ClientInfo;
