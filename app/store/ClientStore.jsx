import { restinsert, restread } from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { tasksAtom } from "./TaskStore";

export const clientsAtom = atom([]);

export const addClientAtom = atom(null, async (get, set, update) => {
  const {
    contact,
    company,
    business,
    financial,
    software,
    documents,
    another_bookkeeper,
    with_accountant,
  } = update;
  console.log("CLIENT DATA TO BE ADDED:", update);
  const response = await restinsert("/cms/client", {
    contact,
    company,
    business,
    financial,
    software,
    documents,
    another_bookkeeper,
    with_accountant,
  });

  console.log("RESPONSE FROM API", response);

  if (response.success) {
    console.log("ADDED CLIENT", response.response);
    console.log("ADDED CLIENT", get(clientsAtom));
    return { success: true };
  } else {
    console.log("FAILED ADDING CLIENT");
    return { success: false };
  }
});
export const updateClientAtom = atom();
export const deleteClientAtom = atom();

export const tableColumnsAtom = atom([
  { label: "Image", key: "image" },
  { label: "Client", key: "client", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Assignees", key: "assignees", sortable: true },
]);

export const selectedClientToEditAtom = atom([]);
export const selectedClientToViewAtom = atom("");
export const selectedClientFilterKeysAtom = atom(new Set(["all"]));

export const clientsCountAtom = atom((get) => get(clientsAtom).length);

export const showClientDetailsAtom = atom(false);
export const clientFilterKeysAtom = atom([
  {
    label: "All",
    value: "all",
  },
  {
    label: "Blooms",
    value: "blooms",
  },
  {
    label: "Client 1",
    value: "client1",
  },
  {
    label: "Client 2",
    value: "client2",
  },
]);

export const fetchClientAtom = atom(null, async (get, set, sub) => {
  const clients = await restread("/cms/client");
  console.log("CLIENTS:", clients);

  if (clients.success) {
    console.log("CLIENT SUCCESS FETCH", clients.response);
    const convertedClients = clients.response.map((client, index) => {
      return {
        ...client,
        company: { ...client.company, picture: "https://picsum.photos/200" },
      };
    });
    console.log("convertedClients", convertedClients);
    set(clientsAtom, convertedClients);
  } else {
    console.log("CLIENT FAILED FETCH", clients);
  }
});

export const selectedClientTabAtom = atom("contact");
export const clientTabsAtom = atom([
  {
    key: "general",
    title: "General Information",
  },
  {
    key: "financial",
    title: "Financial Information",
  },
  {
    key: "software",
    title: "Software Systems",
  },
  {
    key: "documents",
    title: "Documentation",
  },
]);

export const contactNameAtom = atom("");
export const contactAddressAtom = atom("");
export const contactNumberAtom = atom("");
export const contactEmailAtom = atom("");

export const companyNameAtom = atom("");
export const companyAddressAtom = atom("");
export const companyNumberAtom = atom("");
export const companyEmailAtom = atom("");
export const companyABNAtom = atom("");
export const companyACNAtom = atom("");
export const companyOtherOwnerAtom = atom(false);

export const businessDescriptionAtom = atom("");
export const businessEntityAtom = atom("");
export const businessTenureAtom = atom("");
export const businessTradingNameAtom = atom("");

export const financialMonthlyRevenueAtom = atom("");
export const financialEmployeeCountAtom = atom(null);
export const financialContractorCountAtom = atom(null);
export const financialOutsourcePayrollAtom = atom(false);
export const financialAccountCountAtom = atom(null);
export const financialMonthlyTransactionsCountAtom = atom(null);
export const financialLastFiledTaxAtom = atom("");
export const financialAccountMethodAtom = atom("");
export const financialInvoicePreparationMethodAtom = atom("");
export const financialBillsPayingMethodAtom = atom("");
export const financialGSTRegisteredAtom = atom(false);
export const financialInventoryAtom = atom(false);

export const softwareAccountingAtom = atom([]);
export const softwarePayrollAtom = atom([]);
export const softwareBillingAtom = atom([]);
export const softwareExpenseManagementAtom = atom([]);
export const softwareReportingAtom = atom([]);
export const softwareBookkeepingAtom = atom([]);

export const documentASICAtom = atom("");
export const documentTaxReturnAtom = atom("");

export const generalAnotherBookKeeperAtom = atom(null);
export const generalWithAccountantAtom = atom(null);

export const clientDataAtom = atom((get) => {
  return {
    contact: {
      name: get(contactNameAtom),
      address: get(contactAddressAtom),
      number: get(contactNumberAtom),
      email: get(contactEmailAtom),
    },
    company: {
      // Company details
      name: get(companyNameAtom),
      address: get(companyAddressAtom),
      contact_number: get(companyNumberAtom),
      email: get(companyEmailAtom),
      ABN: get(companyABNAtom),
      ACN: get(companyACNAtom),
      other_owner: get(companyOtherOwnerAtom),
    },
    business: {
      // Business details
      description: get(businessDescriptionAtom),
      entity: get(businessEntityAtom),
      tenure: get(businessTenureAtom),
      trading_name: get(businessTradingNameAtom),
    },
    financial: {
      // Financial details
      monthly_revenue: get(financialMonthlyRevenueAtom),
      employee_count: get(financialEmployeeCountAtom),
      contractors_count: get(financialContractorCountAtom),
      has_outsource_payroll: get(financialOutsourcePayrollAtom),
      accounts: get(financialAccountCountAtom),
      monthly_transactions_count: get(financialMonthlyTransactionsCountAtom),
      last_filed_tax: get(financialLastFiledTaxAtom),
      accounting_method: get(financialAccountMethodAtom),
      invoice_preparation_method: get(financialInvoicePreparationMethodAtom),
      bills_paying_method: get(financialBillsPayingMethodAtom),
      is_GST_registered: get(financialGSTRegisteredAtom),
      has_inventory: get(financialInventoryAtom),
    },
    software: {
      // Software details
      accounting: get(softwareAccountingAtom),
      payroll: get(softwarePayrollAtom),
      billing: get(softwareBillingAtom),
      expense_management: get(softwareExpenseManagementAtom),
      reporting: get(softwareReportingAtom),
      bookkeeping: get(softwareBookkeepingAtom),
    },
    documents: {
      ASIC: get(documentASICAtom), //ASIC company registration certificate or trust deed.
      tax_return: get(documentTaxReturnAtom), //previous year financial year
    },
    another_bookkeeper: get(generalAnotherBookKeeperAtom),
    with_accountant: get(generalWithAccountantAtom),
  };
});
