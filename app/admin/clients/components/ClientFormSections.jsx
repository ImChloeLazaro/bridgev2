import FormFieldInput from "@/app/components/FormFieldInput";
import {
  contactNameAtom,
  contactAddressAtom,
  contactNumberAtom,
  contactEmailAtom,
  companyNameAtom,
  companyAddressAtom,
  companyNumberAtom,
  companyEmailAtom,
  companyABNAtom,
  companyACNAtom,
  companyOtherOwnerAtom,
  businessDescriptionAtom,
  businessEntityAtom,
  businessTenureAtom,
  businessTradingNameAtom,
  financialMonthlyRevenueAtom,
  financialEmployeeCountAtom,
  financialContractorCountAtom,
  financialOutsourcePayrollAtom,
  financialAccountCountAtom,
  financialMonthlyTransactionsCountAtom,
  financialLastFiledTaxAtom,
  financialAccountMethodAtom,
  financialInvoicePreparationMethodAtom,
  financialBillsPayingMethodAtom,
  financialGSTRegisteredAtom,
  financialInventoryAtom,
  softwareAccountingAtom,
  softwarePayrollAtom,
  softwareBillingAtom,
  softwareExpenseManagementAtom,
  softwareReportingAtom,
  softwareBookkeepingAtom,
  selectedClientTabAtom,
} from "@/app/store/ClientStore";
import { useAtom, useAtomValue } from "jotai";
import { RadioGroup, Radio } from "@nextui-org/react";
import FormFieldRadio from "@/app/components/FormFieldRadio";
import FormFieldTextArea from "@/app/components/FormFieldTextArea";

const ClientFormSections = () => {
  const selectedClientTab = useAtomValue(selectedClientTabAtom);

  const [contactName, setContactName] = useAtom(contactNameAtom);
  const [contactAddress, setContactAddress] = useAtom(contactAddressAtom);
  const [contactNumber, setContactNumber] = useAtom(contactNumberAtom);
  const [contactEmail, setContactEmail] = useAtom(contactEmailAtom);
  const [companyName, setCompanyName] = useAtom(companyNameAtom);
  const [companyAddress, setCompanyAddress] = useAtom(companyAddressAtom);
  const [companyNumber, setCompanyNumber] = useAtom(companyNumberAtom);
  const [companyEmail, setCompanyEmail] = useAtom(companyEmailAtom);
  const [companyABN, setCompanyABN] = useAtom(companyABNAtom);
  const [companyACN, setCompanyACN] = useAtom(companyACNAtom);
  const [companyOtherOwner, setCompanyOtherOwner] = useAtom(
    companyOtherOwnerAtom
  );
  const [businessDescription, setBusinessDescription] = useAtom(
    businessDescriptionAtom
  );
  const [businessEntity, setBusinessEntity] = useAtom(businessEntityAtom);
  const [businessTenure, setBusinessTenure] = useAtom(businessTenureAtom);
  const [businessTradingName, setBusinessTradingName] = useAtom(
    businessTradingNameAtom
  );
  const [financialMonthlyRevenue, setFinancialMonthlyRevenue] = useAtom(
    financialMonthlyRevenueAtom
  );
  const [financialEmployeeCount, setFinancialEmployeeCount] = useAtom(
    financialEmployeeCountAtom
  );
  const [financialContractorCount, setFinancialContractorCount] = useAtom(
    financialContractorCountAtom
  );
  const [financialOutsourcePayroll, setFinancialOutsourcePayroll] = useAtom(
    financialOutsourcePayrollAtom
  );
  const [financialAccountCount, setFinancialAccountCount] = useAtom(
    financialAccountCountAtom
  );
  const [
    financialMonthlyTransactionsCount,
    setFinancialMonthlyTransactionsCount,
  ] = useAtom(financialMonthlyTransactionsCountAtom);
  const [financialLastFiledTax, setFinancialLastFiledTax] = useAtom(
    financialLastFiledTaxAtom
  );
  const [financialAccountMethod, setFinancialAccountMethod] = useAtom(
    financialAccountMethodAtom
  );
  const [
    financialInvoicePreparationMethod,
    setFinancialInvoicePreparationMethod,
  ] = useAtom(financialInvoicePreparationMethodAtom);
  const [financialBillsPayingMethod, setFinancialBillsPayingMethod] = useAtom(
    financialBillsPayingMethodAtom
  );
  const [financialGSTRegistered, setFinancialGSTRegistered] = useAtom(
    financialGSTRegisteredAtom
  );
  const [financialInventory, setFinancialInventory] = useAtom(
    financialInventoryAtom
  );
  const [softwareAccounting, setSoftwareAccounting] = useAtom(
    softwareAccountingAtom
  );
  const [softwarePayroll, setSoftwarePayroll] = useAtom(softwarePayrollAtom);
  const [softwareBilling, setSoftwareBilling] = useAtom(softwareBillingAtom);
  const [softwareExpenseManagement, setSoftwareExpenseManagement] = useAtom(
    softwareExpenseManagementAtom
  );
  const [softwareReporting, setSoftwareReporting] = useAtom(
    softwareReportingAtom
  );
  const [softwareBookkeeping, setSoftwareBookkeeping] = useAtom(
    softwareBookkeepingAtom
  );

  const general = (
    <div className="flex flex-col w-full gap-6">
      {/* <p className="text-xs font-medium text-black-default">
        {"Client Information"}
      </p> */}
      <div className="w-full flex flex-wrap gap-3 justify-between">
        <FormFieldInput label={"Full Client Name"} fullWidth={true} />
        <FormFieldInput label={"Primary Contact Number"} fullWidth={false} />
        <FormFieldInput label={"Email Address"} fullWidth={false} />
        <FormFieldInput label={"Address"} fullWidth={true} />
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-wrap gap-3 justify-between">
          <FormFieldInput label={"Company Name"} fullWidth={true} />
          <FormFieldInput label={"Primary Contact Number"} fullWidth={false} />
          <FormFieldInput label={"Email Address"} fullWidth={false} />
          <FormFieldInput label={"Address"} fullWidth={true} />
        </div>
        <div className="w-full flex justify-center gap-3">
          <FormFieldRadio label="ACN" fullWidth={true} />
          <FormFieldInput label={"ABN"} fullWidth={true} />
          <FormFieldRadio
            label="Are there any other owners or directors?"
            choices={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "n/a", label: "N/A" },
            ]}
            fullWidth={true}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <FormFieldTextArea
          label={"In a few sentences, please describe your business."}
          placeholder={
            "What do you do? What industry does your business fall under? What products/services do you offer?"
          }
          fullWidth={true}
        />
        <FormFieldTextArea
          label={"What type of entity does your business categorize itself as?"}
          fullWidth={true}
        />
        <FormFieldTextArea
          label={"For how long has your business been in operation?"}
          fullWidth={true}
        />
        <FormFieldTextArea
          label={"Do you have any 'trading as' names?"}
          fullWidth={true}
        />
      </div>
      <div className="w-full flex flex-wrap gap-3 justify-between">
        <FormFieldRadio
          label="Are you coming to us from another bookkeeping company?"
          fullWidth={false}
        />
        <FormFieldRadio
          label="Do you currently work with an accounting firm?"
          fullWidth={false}
        />
      </div>
    </div>
  );
  const financial = (
    <>
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
      <FormFieldInput label={"financial"} fullWidth={true} />
    </>
  );
  const software = (
    <>
      <FormFieldInput label={"software"} fullWidth={true} />
      <FormFieldInput label={"software"} fullWidth={true} />
      <FormFieldInput label={"software"} fullWidth={true} />
      <FormFieldInput label={"software"} fullWidth={true} />
      <FormFieldInput label={"software"} fullWidth={true} />
      <FormFieldInput label={"software"} fullWidth={true} />
    </>
  );
  const documents = (
    <>
      <FormFieldInput label={"documents"} fullWidth={true} />
      <FormFieldInput label={"documents"} fullWidth={true} />
    </>
  );

  return (
    <div className="w-full h-fit flex flex-wrap justify-between gap-5 mt-4 ">
      {selectedClientTab === "general" && general}
      {selectedClientTab === "financial" && financial}
      {selectedClientTab === "software" && software}
      {selectedClientTab === "documents" && documents}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default ClientFormSections;
