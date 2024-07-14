import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldRadio from "@/app/components/FormFieldRadio";
import FormFieldTextArea from "@/app/components/FormFieldTextArea";
import {
  businessDescriptionAtom,
  businessEntityAtom,
  businessTenureAtom,
  businessTradingNameAtom,
  companyABNAtom,
  companyACNAtom,
  companyAddressAtom,
  companyEmailAtom,
  companyNameAtom,
  companyNumberAtom,
  companyOtherOwnerAtom,
  contactAddressAtom,
  contactEmailAtom,
  contactNameAtom,
  contactNumberAtom,
  documentASICAtom,
  documentTaxReturnAtom,
  financialAccountCountAtom,
  financialAccountMethodAtom,
  financialBillsPayingMethodAtom,
  financialContractorCountAtom,
  financialEmployeeCountAtom,
  financialGSTRegisteredAtom,
  financialInventoryAtom,
  financialInvoicePreparationMethodAtom,
  financialLastFiledTaxAtom,
  financialMonthlyRevenueAtom,
  financialMonthlyTransactionsCountAtom,
  financialOutsourcePayrollAtom,
  generalAnotherBookKeeperAtom,
  generalWithAccountantAtom,
  selectedClientTabAtom,
  softwareAccountingAtom,
  softwareBillingAtom,
  softwareBookkeepingAtom,
  softwareExpenseManagementAtom,
  softwarePayrollAtom,
  softwareReportingAtom,
} from "@/app/store/ClientStore";
import { useAtom, useAtomValue } from "jotai";
import { useRef } from "react";

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

  const [documentASIC, setDocumentASIC] = useAtom(documentASICAtom);
  const [documentTaxReturn, setDocumentTaxReturn] = useAtom(
    documentTaxReturnAtom
  );
  const [generalAnotherBookKeeper, setGeneralAnotherBookKeeper] = useAtom(
    generalAnotherBookKeeperAtom
  );
  const [generalWithAccountant, setGeneralWithAccountant] = useAtom(
    generalWithAccountantAtom
  );

  const documentASICRef = useRef(null);
  const documentTaxReturnRef = useRef(null);

  const general = (
    <div className="flex flex-col w-full gap-8">
      <div className="w-full flex flex-col gap-3 justify-center items-center">
        <FormFieldInput
          isRequired={true}
          type={"text"}
          label={"Full Client Name"}
          fullWidth={true}
          value={contactName}
          onValueChange={setContactName}
        />
        <div className="w-full flex justify-center gap-3">
          <FormFieldInput
            isRequired={true}
            type={"number"}
            inputType={"tel"}
            label={"Primary Contact Number"}
            fullWidth={true}
            value={contactNumber}
            onValueChange={setContactNumber}
          />
          <FormFieldInput
            isRequired={true}
            type={"email"}
            label={"Email Address"}
            fullWidth={true}
            value={contactEmail}
            onValueChange={setContactEmail}
          />
        </div>
        <FormFieldInput
          isRequired={true}
          label={"Complete Address"}
          type={"text"}
          description={
            "Please include street name, building number, and ZIP code; if any"
          }
          fullWidth={true}
          value={contactAddress}
          onValueChange={setContactAddress}
        />
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3 justify-center items-center">
          <FormFieldInput
            isRequired={true}
            type={"text"}
            label={"Company Name"}
            fullWidth={true}
            value={companyName}
            onValueChange={setCompanyName}
          />
          <div className="w-full flex justify-center gap-3">
            <FormFieldInput
              isRequired={true}
              type={"number"}
              inputType={"tel"}
              label={"Primary Contact Number"}
              fullWidth={true}
              value={companyNumber}
              onValueChange={setCompanyNumber}
            />
            <FormFieldInput
              isRequired={true}
              type={"email"}
              label={"Email Address"}
              fullWidth={true}
              value={companyEmail}
              onValueChange={setCompanyEmail}
            />
          </div>
          <FormFieldInput
            isRequired={true}
            type={"text"}
            description={
              "Please include street name, building number, and ZIP code; if any"
            }
            label={"Complete Address"}
            fullWidth={true}
            value={companyAddress}
            onValueChange={setCompanyAddress}
          />
        </div>
        <div className="w-full flex justify-center gap-3">
          <div className="w-full flex flex-col justify-between items-center gap-3">
            <FormFieldInput
              isRequired={true}
              type={"number"}
              inputType={"number"}
              label={"Australian Company Number(ACN)"}
              fullWidth={true}
              value={companyACN}
              onValueChange={setCompanyACN}
              className={"h-16"}
            />
            <FormFieldInput
              isRequired={true}
              type={"number"}
              inputType={"number"}
              label={"Australian Business Number(ABN)"}
              fullWidth={true}
              value={companyABN}
              onValueChange={setCompanyABN}
              className={"h-16"}
            />
          </div>
          <FormFieldRadio
            isRequired={true}
            label={"Are there any other owners or directors?"}
            fullWidth={true}
            value={companyOtherOwner}
            onValueChange={setCompanyOtherOwner}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <FormFieldTextArea
          isRequired={true}
          label={"In a few sentences, please describe your business."}
          placeholder={
            "What do you do? What industry does your business fall under? What products/services do you offer?"
          }
          fullWidth={true}
          value={businessDescription}
          onValueChange={setBusinessDescription}
        />
        <FormFieldTextArea
          isRequired={true}
          label={"What type of entity does your business categorize itself as?"}
          fullWidth={true}
          value={businessEntity}
          onValueChange={setBusinessEntity}
        />
        <FormFieldTextArea
          isRequired={true}
          label={"For how long has your business been in operation?"}
          fullWidth={true}
          value={businessTenure}
          onValueChange={setBusinessTenure}
        />
        <FormFieldTextArea
          isRequired={true}
          label={"Do you have any 'trading as' names?"}
          fullWidth={true}
          value={businessTradingName}
          onValueChange={setBusinessTradingName}
        />
      </div>
      <div className="w-full flex justify-center gap-3">
        <FormFieldRadio
          isRequired={true}
          label={"Are you coming to us from another bookkeeping company?"}
          fullWidth={true}
          value={generalAnotherBookKeeper}
          onValueChange={setGeneralAnotherBookKeeper}
        />
        <FormFieldRadio
          isRequired={true}
          label={"Do you currently work with an accounting firm?"}
          fullWidth={true}
          value={generalWithAccountant}
          onValueChange={setGeneralWithAccountant}
        />
      </div>
    </div>
  );
  const financial = (
    <>
      <div className="w-full flex justify-center gap-3">
        <FormFieldInput
          isRequired={true}
          type={"number"}
          label={"On average, what is your Gross Monthly Revenue?"}
          fullWidth={true}
          value={financialMonthlyRevenue}
          onValueChange={setFinancialMonthlyRevenue}
        />
        <FormFieldInput
          isRequired={true}
          type={"number"}
          inputType={"number"}
          label={"How many accounts do you have?"}
          description={
            "This should include:\n- Bank accounts - checking and savings\n- Credit card accounts\n- PayPal\n- Bank loans\n- Equipment leases"
          }
          fullWidth={true}
          value={financialAccountCount}
          onValueChange={setFinancialAccountCount}
        />
      </div>
      <div className="w-full flex justify-center gap-3">
        <FormFieldInput
          isRequired={true}
          type={"number"}
          inputType={"number"}
          label={"How many employees does your business have?"}
          fullWidth={true}
          value={financialEmployeeCount}
          onValueChange={setFinancialEmployeeCount}
        />
        <FormFieldInput
          isRequired={true}
          type={"number"}
          inputType={"number"}
          label={"How many contractors does your business work with?"}
          fullWidth={true}
          value={financialContractorCount}
          onValueChange={setFinancialContractorCount}
        />
      </div>

      <div className="w-full flex justify-center gap-3">
        <FormFieldInput
          isRequired={true}
          type={"number"}
          inputType={"number"}
          label={"How many transactions are made on a monthly basis?"}
          fullWidth={true}
          value={financialMonthlyTransactionsCount}
          onValueChange={setFinancialMonthlyTransactionsCount}
        />
        <FormFieldInput
          isRequired={true}
          type={"date"}
          label={"When was the last time you filed taxes?"}
          value={financialLastFiledTax}
          onValueChange={setFinancialLastFiledTax}
          placeholder={"Set a date"}
          showPastDate={true}
          withDate={true}
          date={financialLastFiledTax}
          onDateChange={setFinancialLastFiledTax}
          isDateModal={true}
          fullWidth={true}
        />
      </div>
      <div className="w-full flex justify-center gap-3">
        <FormFieldRadio
          isRequired={true}
          label={"Do you outsource payroll?"}
          fullWidth={false}
          value={financialOutsourcePayroll}
          onValueChange={setFinancialOutsourcePayroll}
          className={"w-1/2"}
        />
        <FormFieldRadio
          isRequired={true}
          label={"What accounting method do you use?"}
          choices={[
            { value: "cash", label: "Cash" },
            { value: "accrual", label: "Accrual" },
            { value: "unsure", label: "Unsure" },
          ]}
          fullWidth={false}
          value={financialAccountMethod}
          onValueChange={setFinancialAccountMethod}
          className={"w-1/2"}
        />
      </div>
      <FormFieldTextArea
        isRequired={true}
        label={
          "How do you normally prepare your invoices? Is this a service you'd like done for you?"
        }
        fullWidth={true}
        value={financialInvoicePreparationMethod}
        onValueChange={setFinancialInvoicePreparationMethod}
      />
      <FormFieldTextArea
        isRequired={true}
        label={
          "How do you normally pay your bills? Is this a service you'd like done for you?"
        }
        fullWidth={true}
        value={financialBillsPayingMethod}
        onValueChange={setFinancialBillsPayingMethod}
      />

      <div className="w-full flex justify-center gap-3">
        <FormFieldRadio
          isRequired={true}
          label={"Are you GST registered?"}
          fullWidth={true}
          value={financialGSTRegistered}
          onValueChange={setFinancialGSTRegistered}
        />
        <FormFieldRadio
          isRequired={true}
          label={"Do you have inventory?"}
          fullWidth={true}
          value={financialInventory}
          onValueChange={setFinancialInventory}
        />
      </div>
    </>
  );
  const software = (
    <>
      <FormFieldTextArea
        isRequired={true}
        label={
          "What general ledger / accounting software do you currently use?"
        }
        fullWidth={true}
        value={softwareAccounting}
        onValueChange={setSoftwareAccounting}
      />
      <FormFieldTextArea
        isRequired={true}
        label={"What payroll software do you currently use?"}
        fullWidth={true}
        value={softwarePayroll}
        onValueChange={setSoftwarePayroll}
      />
      <FormFieldTextArea
        isRequired={true}
        label={"What bill pay software do you currently use?"}
        fullWidth={true}
        value={softwareBilling}
        onValueChange={setSoftwareBilling}
      />
      <FormFieldTextArea
        isRequired={true}
        label={"What expense management software do you currently use?"}
        fullWidth={true}
        value={softwareExpenseManagement}
        onValueChange={setSoftwareExpenseManagement}
      />
      <FormFieldTextArea
        isRequired={true}
        label={"What reporting software do you currently use?"}
        fullWidth={true}
        value={softwareReporting}
        onValueChange={setSoftwareReporting}
      />
      <FormFieldTextArea
        isRequired={true}
        label={
          "Do you make use of any apps that integrate with your current bookkeeping software?"
        }
        placeholder={"Include anything you think we should know about"}
        fullWidth={true}
        value={softwareBookkeeping}
        onValueChange={setSoftwareBookkeeping}
      />
    </>
  );
  const documents = (
    <>
      <FormFieldInput
        isRequired={true}
        // isReadOnly={true}
        type={"file"}
        inputFileRef={documentASICRef}
        inputID={"uploadDocumentASIC"}
        description={"File size maximum: 5MB"}
        label={"Company Registration Certificate or Trust Deed"}
        placeholder={
          "Please upload your ASIC company registration certificate or trust deed."
        }
        withFile={true}
        fullWidth={true}
        value={documentASIC}
        onValueChange={setDocumentASIC}
      />
      <FormFieldInput
        isRequired={true}
        // isReadOnly={true}
        type={"file"}
        inputFileRef={documentTaxReturnRef}
        inputID={"uploadDocumentTaxReturn"}
        description={"File size maximum: 5MB"}
        label={"Recent tax returns"}
        placeholder={"Upload your tax returns for the previous financial year"}
        withFile={true}
        fullWidth={true}
        value={documentTaxReturn}
        onValueChange={setDocumentTaxReturn}
      />
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
