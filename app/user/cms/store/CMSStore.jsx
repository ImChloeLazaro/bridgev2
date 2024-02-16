import { atom } from "jotai";
export const filterKeysAtom = atom([
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

export const selectedFilterKeysAtom = atom(new Set(["all"]));

let clientIndex = 0;
export const clientsListAtom = atom([
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Blooms",
    location: "105 Jerry Dove Drive, Florence, SC 29501",
    state: "105 Jerry Dove Drive, Florence, SC 29501",
    address: "105 Jerry Dove Drive, Florence, SC 29501",
    assignedUsers: [""],
    status: {
      todo: Math.floor(Math.random() * 10) + 1,
      inProgress: Math.floor(Math.random() * 40) + 1,
      done: Math.floor(Math.random() * 100) + 1,
      forReview: Math.floor(Math.random() * 50) + 1,
      due: Math.floor(Math.random() * 20) + 1,
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
    assignedUsers: [""],
    status: {
      todo: Math.floor(Math.random() * 10) + 1,
      inProgress: Math.floor(Math.random() * 40) + 1,
      done: Math.floor(Math.random() * 100) + 1,
      forReview: Math.floor(Math.random() * 50) + 1,
      due: Math.floor(Math.random() * 20) + 1,
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
    assignedUsers: [""],
    status: {
      todo: Math.floor(Math.random() * 10) + 1,
      inProgress: Math.floor(Math.random() * 40) + 1,
      done: Math.floor(Math.random() * 100) + 1,
      forReview: Math.floor(Math.random() * 50) + 1,
      due: Math.floor(Math.random() * 20) + 1,
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
    assignedUsers: [""],
    status: {
      todo: Math.floor(Math.random() * 10) + 1,
      inProgress: Math.floor(Math.random() * 40) + 1,
      done: Math.floor(Math.random() * 100) + 1,
      forReview: Math.floor(Math.random() * 50) + 1,
      due: Math.floor(Math.random() * 20) + 1,
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
    assignedUsers: [""],
    status: {
      todo: Math.floor(Math.random() * 10) + 1,
      inProgress: Math.floor(Math.random() * 40) + 1,
      done: Math.floor(Math.random() * 100) + 1,
      forReview: Math.floor(Math.random() * 50) + 1,
      due: Math.floor(Math.random() * 20) + 1,
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
    assignedUsers: [""],
    status: {
      todo: Math.floor(Math.random() * 10) + 1,
      inProgress: Math.floor(Math.random() * 40) + 1,
      done: Math.floor(Math.random() * 100) + 1,
      forReview: Math.floor(Math.random() * 50) + 1,
      due: Math.floor(Math.random() * 20) + 1,
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

export const selectedClientAtom = atom();
export const clientsListCountAtom = atom();
