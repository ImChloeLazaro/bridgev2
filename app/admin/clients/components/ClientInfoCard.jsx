import { Divider } from "@nextui-org/react";
import { MdInfoOutline } from "react-icons/md";
import { useAtomValue } from "jotai";
import { MdVerified } from "react-icons/md";
import CTAButtons from "@/app/components/CTAButtons";
import { IoMdClipboard } from "react-icons/io";
import IconButton from "@/app/components/IconButton";
import { MdContentCopy } from "react-icons/md";

const ClientInfoCard = ({ selectedClient }) => {
  console.log("INSIDE CLIENT INFO: ", selectedClient);
  const clientInfo = selectedClient[0];

  return (
    <>
      <div className="flex justify-center gap-6">
        {/* // ### Business INFORMATION} */}
        <div className="mt-2 mb-12 py-2 w-full ">
          <div className="flex justify-start items-center gap-2 mb-8">
            <p className="font-bold text-lg">{"Company Information"}</p>
            <MdInfoOutline />
          </div>

          {/* // ### LIST */}
          <div className="flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">
                  {"Australian Business Number(ABN)"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {/* {"Australian Business Number"} */}
                </p>
              </div>
              <div className="flex items-center gap-2 w-2/5">
                {/* <CTAButtons
                  startContent={<IoMdClipboard size={20} />}
                  label={
                    <p className="">
                      {clientInfo?.company?.ABN?.length
                        ? clientInfo.company.ABN
                        : "No Data Available"}
                    </p>
                  }
                  color={"clear"}
                  className={"px-0"}
                /> */}
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.company?.ABN?.length
                    ? clientInfo.company.ABN
                    : "No Data Available"}
                </p>
                <IconButton variant="bordered">
                  <MdContentCopy size={16} />
                </IconButton>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">
                  {"Australian Company Number(ACN)"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {/* {"Australian Company Number"} */}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.company?.ACN?.length
                    ? clientInfo.company.ACN
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Complete Address"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Includes ZIP Code"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.company?.address?.length
                    ? clientInfo.company.address
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        <div className="mt-2 mb-12 py-2 w-full ">
          <div className="flex justify-start items-center gap-2 mb-8">
            <p className="font-bold text-lg">{"Business Information"}</p>
            <MdInfoOutline />
          </div>

          {/* // ### LIST */}
          <div className="flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Business Description"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {
                    "Description of the business in terms of industry and products/services offered"
                  }
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.description
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Business Entity"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Type of entity does the business categorize itself as"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.entity
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Tenure"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"How long has the business been in operation"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.tenure
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Trading Name"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Trading name refers to"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.trading_name
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        {/* // ### Business INFORMATION} */}
        <div className="mt-2 mb-12 py-2 w-full ">
          <div className="flex justify-start items-center gap-2 mb-8">
            <p className="font-bold text-lg">{"Financial Information"}</p>
            <MdInfoOutline />
          </div>

          {/* // ### LIST */}
          <div className="flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">
                  {"Australian Business Number(ABN)"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {/* {"Australian Business Number"} */}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.company?.ABN?.length
                    ? clientInfo.company.ABN
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">
                  {"Australian Company Number(ACN)"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {/* {"Australian Company Number"} */}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.company?.ACN?.length
                    ? clientInfo.company.ACN
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Complete Address"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Includes ZIP Code"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.company?.address?.length
                    ? clientInfo.company.address
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        <div className="mt-2 mb-12 py-2 w-full ">
          <div className="flex justify-start items-center gap-2 mb-8">
            <p className="font-bold text-lg">{"Business Information"}</p>
            <MdInfoOutline />
          </div>

          {/* // ### LIST */}
          <div className="flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Industry"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {
                    "Description of the business in terms of industry and products/services offered"
                  }
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.description
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Business Entity"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Type of entity does the business categorize itself as"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.entity
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Tenure"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"How long has the business been in operation"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.tenure
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] h-16">
                <p className="font-medium text-base">{"Trading Name"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Trading name refers to"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.trading_name
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientInfoCard;
