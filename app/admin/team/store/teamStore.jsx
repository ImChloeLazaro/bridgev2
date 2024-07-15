import { atom } from 'jotai';
import { restread } from '@/app/utils/amplify-rest';

export const departmentAtom = atom(async () => {
  const data = await restread('/teams/department');
  return data.response;
});

export const clientsAtom = atom(() => {

  let key = 0
  const clients = [
    {
      "_id": "668f39f04b63d5b60a1bc5bc",
      "contact": {
        "name": " John Doe",
        "address": "123 King Street, Albury, NSW 2640, Australia",
        "number": "+61 2 1234 5678",
        "email": "johndoe@alburytechsolutions.com.au"
      },
      "company": {
        "name": "Albury",
        "address": "123 King Street, Albury, NSW 2640, Australia",
        "contact_number": "+61 2 8765 4321",
        "email": "info@alburytechsolutions.com.au",
        "ABN": "123456789",
        "ACN": "987654321",
        "other_owner": false
      },
      "business": {
        "description": "Information Technology",
        "entity": "Private Company",
        "tenure": " 5 years",
        "trading_name": "Yes, Albury IT Services"
      },
      "financial": {
        "monthly_revenue": "50,000",
        "employee_count": 10,
        "contractors_count": 5,
        "has_outsource_payroll": true,
        "accounts": 3,
        "monthly_transactions_count": 200,
        "last_filed_tax": {
          "$date": "2024-07-15T00:00:00.000Z"
        },
        "accounting_method": "accrual",
        "invoice_preparation_method": "Using accounting software",
        "bills_paying_method": "Online banking",
        "is_GST_registered": true,
        "has_inventory": true
      },
      "software": {
        "accounting": [
          "Xero"
        ],
        "payroll": [
          "Gusto"
        ],
        "billing": [
          "Bill.com"
        ],
        "expense_management": [
          "Expensify"
        ],
        "reporting": [
          "QuickBooks"
        ],
        "bookkeeping": [
          " Yes, Hubdoc and Receipt Bank"
        ]
      },
      "documents": {
        "ASIC": "dummy certificate.pdf",
        "tax_return": "Tax Return.pdf"
      },
      "another_bookkeeper": true,
      "with_accountant": true,
      "__v": 0
    },
    {
      "_id": "668f3b9a53349bb74525057c",
      "contact": {
        "name": "Now ra",
        "address": "123 Main Street, Anytown, NSW 2000, AU",
        "number": "+61 1234 5678",
        "email": "abc@example.com"
      },
      "company": {
        "name": "Now ra",
        "address": "123 Main Street, Anytown, NSW 2000, AU",
        "contact_number": "+61 1234 5678",
        "email": "abc@example.com",
        "ABN": "987654320",
        "ACN": "123456789",
        "other_owner": false
      },
      "business": {
        "description": "",
        "entity": "IT Services",
        "tenure": "Pty Ltd",
        "trading_name": "ABC IT"
      },
      "financial": {
        "monthly_revenue": "100,000",
        "employee_count": 25,
        "contractors_count": 5,
        "has_outsource_payroll": true,
        "accounts": 15,
        "monthly_transactions_count": 500,
        "last_filed_tax": {
          "$date": "2024-07-11T00:00:00.000Z"
        },
        "accounting_method": "accrual",
        "invoice_preparation_method": "Manual",
        "bills_paying_method": "Bank Transfer",
        "is_GST_registered": true,
        "has_inventory": true
      },
      "software": {
        "accounting": [
          "Xero"
        ],
        "payroll": [
          "\tADP"
        ],
        "billing": [
          "Bill.com"
        ],
        "expense_management": [
          "\tExpensify"
        ],
        "reporting": [
          "Tableau"
        ],
        "bookkeeping": [
          "QuickBooks, Slack"
        ]
      },
      "documents": {
        "ASIC": "dummy certificate.pdf",
        "tax_return": "Tax Return.pdf"
      },
      "another_bookkeeper": false,
      "with_accountant": true,
      "__v": 0
    },
    {
      "_id": "668f3c9253349bb7452505a7",
      "contact": {
        "name": "Now ra Junction",
        "address": "456 Oak Avenue, Othertown, VIC 3000, AU",
        "number": "+61 2345 6789",
        "email": "xyz@example.com"
      },
      "company": {
        "name": "Now ra Junction",
        "address": "456 Oak Avenue, Othertown, VIC 3000",
        "contact_number": "123456789",
        "email": "xyz@company.com",
        "ABN": "234567890",
        "ACN": "987654321",
        "other_owner": false
      },
      "business": {
        "description": "Marketing",
        "entity": "Pty Ltd",
        "tenure": "8",
        "trading_name": "XYZ Marketing"
      },
      "financial": {
        "monthly_revenue": "80,000",
        "employee_count": 20,
        "contractors_count": 3,
        "has_outsource_payroll": true,
        "accounts": 12,
        "monthly_transactions_count": 400,
        "last_filed_tax": {
          "$date": "2024-07-11T00:00:00.000Z"
        },
        "accounting_method": "cash",
        "invoice_preparation_method": "Manual",
        "bills_paying_method": "Credit Card",
        "is_GST_registered": false,
        "has_inventory": false
      },
      "software": {
        "accounting": [
          "QuickBooks"
        ],
        "payroll": [
          "Gusto"
        ],
        "billing": [
          "Revolut"
        ],
        "expense_management": [
          "Zoho Expense"
        ],
        "reporting": [
          "Power BI"
        ],
        "bookkeeping": [
          "Slack"
        ]
      },
      "documents": {
        "ASIC": "dummy certificate.pdf",
        "tax_return": "Tax Return.pdf"
      },
      "another_bookkeeper": true,
      "with_accountant": false,
      "__v": 0
    }
  ]

  const clientsWithKeys = clients.map(client => ({
    ...client,
    key: key++
  }));

  return clientsWithKeys;
})