import {
  destroywithparams,
  restinsert,
  restread,
} from "@/app/utils/amplify-rest";
import {
  getLocalTimeZone,
  Time,
  toCalendarDateTime,
  today,
} from "@internationalized/date";
import { atom } from "jotai";

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

  if (response?.success) {
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

    return { success: true };
  } else {
    return { success: false };
  }
});

// export const updateClientAtom = atom();
export const deleteClientAtom = atom(null, async (get, set, update) => {
  const response = await destroywithparams("/cms/client", {
    // _id of sla #/cms/task
    // _id of client obj #/cms/client
    _id: "667222db41a835187038f0db", // "665922e6167b35aedc883977"
  });
  if (response?.success) {
    return { success: true };
  } else {
    return { success: false };
  }
});

export const tableColumnsAtom = atom([
  { label: "Image", key: "image" },
  { label: "Client", key: "client", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Assignees", key: "assignees", sortable: true },
]);

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
  // {
  //   label: "DMS - Dennis",
  //   value: "dmsDennis",
  // },
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
    const convertedClients = clients.response.map((client, index) => {
      return {
        ...client,
        // company: { ...client.company, picture: "https://picsum.photos/200" }, // default picture
      };
    });
    set(clientsAtom, convertedClients);
  } else {
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

export const financialLastFiledTaxDateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

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
      name: get(contactNameAtom).trim(),
      address: get(contactAddressAtom).trim(),
      number: get(contactNumberAtom).trim(),
      email: get(contactEmailAtom).trim(),
    },
    company: {
      // Company details
      name: get(companyNameAtom).trim(),
      address: get(companyAddressAtom).trim(),
      contact_number: get(companyNumberAtom).trim(),
      email: get(companyEmailAtom).trim(),
      ABN: get(companyABNAtom).trim(),
      ACN: get(companyACNAtom).trim(),
      other_owner: get(companyOtherOwnerAtom),
    },
    business: {
      // Business details
      description: get(businessDescriptionAtom).trim(),
      entity: get(businessEntityAtom).trim(),
      tenure: get(businessTenureAtom).trim(),
      trading_name: get(businessTradingNameAtom).trim(),
    },
    financial: {
      // Financial details
      monthly_revenue: get(financialMonthlyRevenueAtom).trim(),
      employee_count: get(financialEmployeeCountAtom).trim(),
      contractors_count: get(financialContractorCountAtom).trim(),
      has_outsource_payroll: get(financialOutsourcePayrollAtom),
      accounts: get(financialAccountCountAtom).trim(),
      monthly_transactions_count: get(financialMonthlyTransactionsCountAtom).trim(),
      last_filed_tax: toCalendarDateTime(
        get(financialLastFiledTaxDateRangeAtom).start,
        new Time()
      ).toString(),
      accounting_method: get(financialAccountMethodAtom),
      invoice_preparation_method: get(financialInvoicePreparationMethodAtom).trim(),
      bills_paying_method: get(financialBillsPayingMethodAtom).trim(),
      is_GST_registered: get(financialGSTRegisteredAtom),
      has_inventory: get(financialInventoryAtom),
    },
    software: {
      // Software details
      accounting: get(softwareAccountingAtom).trim(),
      payroll: get(softwarePayrollAtom).trim(),
      billing: get(softwareBillingAtom).trim(),
      expense_management: get(softwareExpenseManagementAtom).trim(),
      reporting: get(softwareReportingAtom).trim(),
      bookkeeping: get(softwareBookkeepingAtom).trim(),
    },
    documents: {
      ASIC: get(documentASICAtom), //ASIC company registration certificate or trust deed.
      tax_return: get(documentTaxReturnAtom), //previous year financial year
    },
    another_bookkeeper: get(generalAnotherBookKeeperAtom),
    with_accountant: get(generalWithAccountantAtom),
  };
});
