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
    set(contactNameAtom, "");
    set(contactAddressAtom, "");
    set(contactNumberAtom, "");
    set(contactEmailAtom, "");

    set(companyNameAtom, "");
    set(companyAddressAtom, "");
    set(companyNumberAtom, "");
    set(companyEmailAtom, "");
    set(companyABNAtom, "");
    set(companyACNAtom, "");
    set(companyOtherOwnerAtom, false);

    set(businessDescriptionAtom, "");
    set(businessEntityAtom, "");
    set(businessTenureAtom, "");
    set(businessTradingNameAtom, "");

    set(financialMonthlyRevenueAtom, "");
    set(financialEmployeeCountAtom, "");
    set(financialContractorCountAtom, "");
    set(financialOutsourcePayrollAtom, false);
    set(financialAccountCountAtom, "");
    set(financialMonthlyTransactionsCountAtom, "");
    set(financialLastFiledTaxAtom, "");
    set(financialAccountMethodAtom, false);
    set(financialInvoicePreparationMethodAtom, "");
    set(financialBillsPayingMethodAtom, "");
    set(financialGSTRegisteredAtom, false);
    set(financialInventoryAtom, false);

    set(softwareAccountingAtom, "");
    set(softwarePayrollAtom, "");
    set(softwareBillingAtom, "");
    set(softwareExpenseManagementAtom, "");
    set(softwareReportingAtom, "");
    set(softwareBookkeepingAtom, "");

    set(documentASICAtom, "");
    set(documentTaxReturnAtom, "");

    set(generalAnotherBookKeeperAtom, false);
    set(generalWithAccountantAtom, false);

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
export const clientsCountAtom = atom((get) => get(clientsAtom).length);
export const clientFilterKeysAtom = atom([
  {
    label: "All",
    value: "all",
  },
  // {
  //   label: "Admin/Ops",
  //   value: "adminOps",
  // },
  {
    label: "AP - Jayne",
    value: "apJayne",
  },
  {
    label: "AP - Lady",
    value: "apLady",
  },
  {
    label: "AP - Richmond",
    value: "apRichmond",
  },
  {
    label: "BMS - Lester",
    value: "bmsLester",
  },
  {
    label: "DMS - Austin",
    value: "dmsAustin",
  },
  {
    label: "DMS - Bea",
    value: "dmsBea",
  },
  {
    label: "DMS - Dennis",
    value: "dmsDennis",
  },
  {
    label: "DMS - James",
    value: "dmsJames",
  },
  {
    label: "DMS - Sheila",
    value: "dmsSheila",
  },
  {
    label: "Financials - Bert",
    value: "financialsBert",
  },
  {
    label: "Financials - Dom",
    value: "financialsDom",
  },
  {
    label: "Financials - Jess",
    value: "financialsJess",
  },
  {
    label: "Financials - Junalyn",
    value: "financialsJunalyn",
  },
  {
    label: "Financials - Kamille",
    value: "financialsKamille",
  },
  {
    label: "Financials - Mel",
    value: "financialsMel",
  },
  {
    label: "Financials - Melai",
    value: "financialsMelai",
  },
  {
    label: "Financials - Rhiziel",
    value: "financialsRhiziel",
  },
  {
    label: "Financials - Tin",
    value: "financialsTin",
  },
  {
    label: "SD - Charlene",
    value: "sdCharlene",
  },
  {
    label: "SD - CO",
    value: "sdCO",
  },
  {
    label: "SD - Raquel",
    value: "sdRaquel",
  },
]);

export const fetchClientAtom = atom(null, async (get, set, sub) => {
  const clients = await restread("/cms/client");

  if (clients?.success) {
    console.log("CLIENT SUCCESS FETCH", clients.response);
    const convertedClients = clients.response.map((client, index) => {
      return {
        ...client,
        // company: { ...client.company, picture: "https://picsum.photos/200" }, // default picture
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
    filled: false,
  },
  {
    key: "financial",
    title: "Financial Information",
    filled: false,
  },
  {
    key: "software",
    title: "Software Systems",
    filled: false,
  },
  {
    key: "documents",
    title: "Documentation",
    filled: false,
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
export const financialEmployeeCountAtom = atom("");
export const financialContractorCountAtom = atom("");
export const financialOutsourcePayrollAtom = atom(false);
export const financialAccountCountAtom = atom("");
export const financialMonthlyTransactionsCountAtom = atom("");
export const financialLastFiledTaxAtom = atom("");
export const financialAccountMethodAtom = atom(false);
export const financialInvoicePreparationMethodAtom = atom("");
export const financialBillsPayingMethodAtom = atom("");
export const financialGSTRegisteredAtom = atom(false);
export const financialInventoryAtom = atom(false);

export const softwareAccountingAtom = atom("");
export const softwarePayrollAtom = atom("");
export const softwareBillingAtom = atom("");
export const softwareExpenseManagementAtom = atom("");
export const softwareReportingAtom = atom("");
export const softwareBookkeepingAtom = atom("");

export const documentASICAtom = atom("");
export const documentTaxReturnAtom = atom("");

export const generalAnotherBookKeeperAtom = atom(false);
export const generalWithAccountantAtom = atom(false);

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
