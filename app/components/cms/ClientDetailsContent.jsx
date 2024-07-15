import IconButton from "@/app/components/IconButton";
import { Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { MdContentCopy, MdInfoOutline } from "react-icons/md";

const ClientDetailsContent = ({ selectedClient }) => {
  const clientInfo = selectedClient[0];

  return (
    <>
      <div className="flex-col md:flex-row flex justify-center gap-6 lg:gap-4">
        {/* // ### Company INFORMATION} */}
        <div className="mt-2 mb-12 py-2 w-full lg:w-1/2 ">
          <div className="flex justify-start items-center gap-2 mb-8">
            <p className="font-bold text-lg">{"Company Information"}</p>
            <MdInfoOutline />
          </div>

          {/* // ### LIST */}
          <div className="flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
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
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">
                  {"Australian Company Number(ACN)"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {/* {"Australian Company Number"} */}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.company?.ACN?.length
                    ? clientInfo.company.ACN
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Complete Address"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Includes ZIP Code"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.company?.address?.length
                    ? clientInfo.company.address
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            <div className="w-full flex justify-between gap-4">
              {/* // ### Location */}
              <div className=" flex justify-between items-center gap-10 w-full">
                <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                  <p className="font-medium text-base">
                    {"Have other owners or directors"}
                  </p>
                  <p className="font-medium text-sm text-darkgrey-default">
                    {/* {"Includes ZIP Code"} */}
                  </p>
                </div>
                <div className="flex w-2/5">
                  <p className="text-base font-medium text-black-default">
                    {clientInfo?.company?.other_owner === undefined
                      ? "No Data Available"
                      : clientInfo.company.other_owner
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // ### Business INFORMATION} */}
        <div className="mt-2 mb-12 py-2 w-full lg:w-1/2 ">
          <div className="flex justify-start items-center gap-2 mb-8">
            <p className="font-bold text-lg">{"Business Information"}</p>
            <MdInfoOutline />
          </div>

          {/* // ### LIST */}
          <div className="flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-6 md:gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-2/5 lg:w-[40%] sm:sm:h-16 min-w-32">
                <p className="font-medium text-base">
                  {"Business Description"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {
                    "Description of the business in terms of industry and products/services offered"
                  }
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.description
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-6 md:gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-2/5 lg:w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Business Entity"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Type of entity does the business categorize itself as"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.entity
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-6 md:gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-2/5 lg:w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Tenure"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"How long has the business been in operation"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.tenure
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-6 md:gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-2/5 lg:w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Trading Name"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {"Trading name refers to"}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.business?.description?.length
                    ? clientInfo.business.trading_name
                    : "No Data Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // ### Financial INFORMATION} */}
      <div className="mt-2 mb-12 py-2 w-full ">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Financial Information"}</p>
          <MdInfoOutline />
        </div>

        <div className="w-full flex-col md:flex-row flex items-center justify-center gap-4">
          {/* // ### LIST */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Account Method"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.accounting_method?.length
                    ? clientInfo.financial.accounting_method
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Bills Paying Method"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.bills_paying_method?.length
                    ? clientInfo.financial.bills_paying_method
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">
                  {"Invoice Preparation Method"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.invoice_preparation_method?.length
                    ? clientInfo.financial.invoice_preparation_method
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Last Filed Tax"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.last_filed_tax?.length
                    ? format(clientInfo.financial.last_filed_tax, "PPP")
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Monthly Revenue"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.monthly_revenue?.length
                    ? clientInfo.financial.monthly_revenue
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">
                  {"Monthly Transactions"}
                </p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.monthly_transactions_count
                    ? clientInfo.financial.monthly_transactions_count
                    : "No Data Available"}
                </p>
              </div>
            </div>
          </div>

          {/* // ### LIST */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 ">
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Accounts"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.accounts
                    ? clientInfo.financial.accounts
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Contractors"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.contractors_count
                    ? clientInfo.financial.contractors_count
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Employee"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.employee_count
                    ? clientInfo.financial.employee_count
                    : "No Data Available"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Has Inventory"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.has_inventory === undefined
                    ? "No Data Available"
                    : clientInfo.financial.has_inventory
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"Outsource Payroll"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.has_outsource_payroll === undefined
                    ? "No Data Available"
                    : clientInfo.financial.has_outsource_payroll
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
            <Divider />
            {/* // ### Location */}
            <div className=" flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-start justify-center w-[40%] sm:h-16 min-w-32">
                <p className="font-medium text-base">{"GST Registered"}</p>
                <p className="font-medium text-sm text-darkgrey-default">
                  {""}
                </p>
              </div>
              <div className="flex w-2/5">
                <p className="text-base font-medium text-black-default">
                  {clientInfo?.financial?.is_GST_registered === undefined
                    ? "No Data Available"
                    : clientInfo.financial.is_GST_registered
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // ### Software INFORMATION} */}
      <div className="mt-2 mb-12 py-2 w-full ">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Software Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4 ">
          {/* // ### Location */}
          <div className=" flex justify-between items-center gap-10 lg:gap-6 w-full">
            <div className="flex flex-col items-start justify-center w-[40%] lg:w-1/2 sm:h-16 min-w-32">
              <p className="font-medium text-base">{"Accounting"}</p>
              <p className="font-medium text-sm text-darkgrey-default">{""}</p>
            </div>
            <div className="flex w-2/5 lg:w-1/2">
              <p className="text-base font-medium text-black-default">
                {clientInfo?.software?.accounting.length < 1
                  ? clientInfo.software.accounting.join(", ")
                  : "No Data Available"}
              </p>
            </div>
          </div>
          <Divider />
          {/* // ### Location */}
          <div className=" flex justify-between items-center gap-10 lg:gap-6 w-full">
            <div className="flex flex-col items-start justify-center w-[40%] lg:w-1/2 sm:h-16 min-w-32">
              <p className="font-medium text-base">{"Billing"}</p>
              <p className="font-medium text-sm text-darkgrey-default">{""}</p>
            </div>
            <div className="flex w-2/5 lg:w-1/2">
              <p className="text-base font-medium text-black-default">
                {clientInfo?.software?.billing.length < 1
                  ? clientInfo.software.billing.join(", ")
                  : "No Data Available"}
              </p>
            </div>
          </div>
          <Divider />
          {/* // ### Location */}
          <div className=" flex justify-between items-center gap-10 lg:gap-6 w-full">
            <div className="flex flex-col items-start justify-center w-[40%] lg:w-1/2 sm:h-16 min-w-32">
              <p className="font-medium text-base">{"Bookkeeping"}</p>
              <p className="font-medium text-sm text-darkgrey-default">{""}</p>
            </div>
            <div className="flex w-2/5 lg:w-1/2">
              <p className="text-base font-medium text-black-default">
                {clientInfo?.software?.bookkeeping.length < 1
                  ? clientInfo.software.bookkeeping.join(", ")
                  : "No Data Available"}
              </p>
            </div>
          </div>
          <Divider />
          {/* // ### Location */}
          <div className=" flex justify-between items-center gap-10 lg:gap-6 w-full">
            <div className="flex flex-col items-start justify-center w-[40%] lg:w-1/2 sm:h-16 min-w-32">
              <p className="font-medium text-base">{"Expense Management"}</p>
              <p className="font-medium text-sm text-darkgrey-default">{""}</p>
            </div>
            <div className="flex w-2/5 lg:w-1/2">
              <p className="text-base font-medium text-black-default">
                {clientInfo?.software?.expense_management.length < 1
                  ? clientInfo.software.expense_management.join(", ")
                  : "No Data Available"}
              </p>
            </div>
          </div>
          <Divider />
          {/* // ### Location */}
          <div className=" flex justify-between items-center gap-10 lg:gap-6 w-full">
            <div className="flex flex-col items-start justify-center w-[40%] lg:w-1/2 sm:h-16 min-w-32">
              <p className="font-medium text-base">{"Payroll"}</p>
              <p className="font-medium text-sm text-darkgrey-default">{""}</p>
            </div>
            <div className="flex w-2/5 lg:w-1/2">
              <p className="text-base font-medium text-black-default">
                {clientInfo?.software?.payroll.length < 1
                  ? clientInfo.software.payroll.join(", ")
                  : "No Data Available"}
              </p>
            </div>
          </div>
          <Divider />
          {/* // ### Location */}
          <div className=" flex justify-between items-center gap-10 lg:gap-6 w-full">
            <div className="flex flex-col items-start justify-center w-[40%] lg:w-1/2 sm:h-16 min-w-32">
              <p className="font-medium text-base">{"Reporting"}</p>
              <p className="font-medium text-sm text-darkgrey-default">{""}</p>
            </div>
            <div className="flex w-2/5 lg:w-1/2">
              <p className="text-base font-medium text-black-default">
                {clientInfo?.software?.reporting.length < 1
                  ? clientInfo.software.reporting.join(", ")
                  : "No Data Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetailsContent;
