import { restinsert, restread } from "@/app/utils/amplify-rest";
import { atom } from "jotai";
let clientIndex = 0;

export const testClientValue = atom(null, async (get, set, update) => {
  const { contact, company, business, financial, software, documents, another_bookkeeper, with_accountant } = update
  const insert = await restinsert('/cms/client', {
    contact, 
    company, 
    business, 
    financial, 
    software, 
    documents, 
    another_bookkeeper, 
    with_accountant 
  })

  console.log("ADDED CLIENT", get(clientsAtom));
})

export const clientsAtom = atom([
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "XXXX",
    location: "105 Jerry Dove Drive, Florence, SC 29501",
    state: "105 Jerry Dove Drive, Florence, SC 29501",
    address: "105 Jerry Dove Drive, Florence, SC 29501",
    datetimeOnboarded: "2023-01-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Blooms Contact Name",
      number: "(765) 322-1399",
      companyEmail: "client.company@email.com",
      accountEmail: "client.account@email.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Grey Fade",
    location: "4525 Saints Alley, Plant City, FL 33564",
    state: "4525 Saints Alley, Plant City, FL 33564",
    address: "4525 Saints Alley, Plant City, FL 33564",
    datetimeOnboarded: "2024-01-28T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Paula Mora",
      number: "(813) 752-5611",
      companyEmail: "client.company@email.com",
      accountEmail: "paula611@gmail.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Auto Works",
    location: "179 Sampson Street, Georgetown, CO 80444",
    state: "179 Sampson Street, Georgetown, CO 80444",
    address: "179 Sampson Street, Georgetown, CO 80444",
    datetimeOnboarded: "2021-08-17T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Corina McCoy",
      number: "(303) 569-1279",
      companyEmail: "client.company@email.com",
      accountEmail: "c_j_mccoy@gmail.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Pro Property Maintenance",
    location: "467 Stutler Lane, Altoona, PA 16602",
    state: "467 Stutler Lane, Altoona, PA 16602",
    address: "467 Stutler Lane, Altoona, PA 16602",
    datetimeOnboarded: "2024-01-22T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Chris Glasser",
      number: "(814) 413-9191",
      companyEmail: "client.company@email.com",
      accountEmail: "c.a.glasser@outlook.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Tam's Stationers",
    location: "2323 Dancing Dove Lane, Long Island City, NY 11101",
    state: "2323 Dancing Dove Lane, Long Island City, NY 11101",
    address: "2323 Dancing Dove Lane, Long Island City, NY 11101",
    datetimeOnboarded: "2024-01-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Frances Swann",
      number: "(347) 438-7215",
      companyEmail: "client.company@email.com",
      accountEmail: "f.j.swann@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    location: "3522 West Fork Street, Missoula, MT 59801",
    state: "3522 West Fork Street, Missoula, MT 59801",
    address: "3522 West Fork Street, Missoula, MT 59801",
    datetimeOnboarded: "2024-02-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40),
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50),
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) },
      pending: { label: "Pending", count: Math.floor(Math.random() * 10) },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
]);

export const addClientAtom = atom();
export const updateClientAtom = atom();
export const deleteClientAtom = atom();

export const selectedClientAtom = atom([]);
export const selectedClientToViewAtom = atom();
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
  if (clients.success) {
    console.log("CLIENT SUCCESS FETCH", clients.response);
    // const convertedTasks = clients.body.map((task, index) => {
    //   return {
    //     key: (index += 1),
    //     clientKey: `client-${index}`,
    //     task: task.name,
    //     startDate: task.duration.start,
    //     endDate: task.duration.end,
    //     assignees: task.processor,
    //   };
    // });
    // console.log("convertedTasks", convertedTasks);
  } else {
    console.log("CLIENT FAILED FETCH", clients);
  }
});
