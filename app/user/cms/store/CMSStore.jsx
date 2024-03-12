import { atom } from "jotai";
import { AvatarGroup, Avatar } from "@nextui-org/react";
import { format } from "date-fns";
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

let taskIndex = 0;
const avatarList = (
  <div className="h-full flex justify-start">
    <AvatarGroup
      size="md"
      max={4}
      total={10}
      // renderCount={(count) => (
      //   <p className="text-xs text-foreground font-medium ms-1">
      //     +{count} others
      //   </p>
      // )}
    >
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </AvatarGroup>
  </div>
);

export const taskTableRowsAtom = atom([
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
  {
    key: (taskIndex += 1),
    task: "Pellentesque suscipit fringilla libero eu ullamcorper. ",
    client: avatarList,
    startDate: format(new Date(), "d  MMMM yyyy"),
    endDate: format(new Date(), "d  MMMM yyyy"),
    assignees: avatarList,
  },
]);
export const taskTableColsAtom = atom([
  {
    key: "task",
    label: "Tasks",
  },
  {
    key: "startDate",
    label: "Start Date",
  },
  {
    key: "endDate",
    label: "End Date",
  },
  {
    key: "assignees",
    label: "Assignees",
  },
]);

export const taskTableRowsCountAtom = atom(
  (get) => get(taskTableRowsAtom).length
);

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
    datetimeOnboarded: "2023-01-16T00:00:00",
    assignedUsers: [""],
    status: {
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40) + 1,
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50) + 1,
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
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
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40) + 1,
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50) + 1,
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
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
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40) + 1,
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50) + 1,
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
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
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40) + 1,
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50) + 1,
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
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
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40) + 1,
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50) + 1,
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
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
      todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
      inProgress: {
        label: "In Progress",
        count: Math.floor(Math.random() * 40) + 1,
      },
      done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
      forReview: {
        label: "For Review",
        count: Math.floor(Math.random() * 50) + 1,
      },
      due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
    },
    contact: {
      name: "Rhonda Rhodes",
      number: "(406) 382-2670",
      companyEmail: "client.company@email.com",
      accountEmail: "r.g.rhodes@aol.com",
    },
    sla: [""],
  },
  // {
  //   id: (clientIndex += 1),
  //   key: `client-${clientIndex}`,
  //   name: "Total Network Development",
  //   location: "3522 West Fork Street, Missoula, MT 59801",
  //   state: "3522 West Fork Street, Missoula, MT 59801",
  //   address: "3522 West Fork Street, Missoula, MT 59801",
  //   datetimeOnboarded: "2024-02-16T00:00:00",
  //   assignedUsers: [""],
  //   status: {
  //     todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
  //     inProgress: {
  //       label: "In Progress",
  //       count: Math.floor(Math.random() * 40) + 1,
  //     },
  //     done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
  //     forReview: {
  //       label: "For Review",
  //       count: Math.floor(Math.random() * 50) + 1,
  //     },
  //     due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
  //   },
  //   contact: {
  //     name: "Rhonda Rhodes",
  //     number: "(406) 382-2670",
  //     companyEmail: "client.company@email.com",
  //     accountEmail: "r.g.rhodes@aol.com",
  //   },
  //   sla: [""],
  // },
  // {
  //   id: (clientIndex += 1),
  //   key: `client-${clientIndex}`,
  //   name: "Total Network Development",
  //   location: "3522 West Fork Street, Missoula, MT 59801",
  //   state: "3522 West Fork Street, Missoula, MT 59801",
  //   address: "3522 West Fork Street, Missoula, MT 59801",
  //   datetimeOnboarded: "2024-02-16T00:00:00",
  //   assignedUsers: [""],
  //   status: {
  //     todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
  //     inProgress: {
  //       label: "In Progress",
  //       count: Math.floor(Math.random() * 40) + 1,
  //     },
  //     done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
  //     forReview: {
  //       label: "For Review",
  //       count: Math.floor(Math.random() * 50) + 1,
  //     },
  //     due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
  //   },
  //   contact: {
  //     name: "Rhonda Rhodes",
  //     number: "(406) 382-2670",
  //     companyEmail: "client.company@email.com",
  //     accountEmail: "r.g.rhodes@aol.com",
  //   },
  //   sla: [""],
  // },
  // {
  //   id: (clientIndex += 1),
  //   key: `client-${clientIndex}`,
  //   name: "Total Network Development",
  //   location: "3522 West Fork Street, Missoula, MT 59801",
  //   state: "3522 West Fork Street, Missoula, MT 59801",
  //   address: "3522 West Fork Street, Missoula, MT 59801",
  //   datetimeOnboarded: "2024-02-16T00:00:00",
  //   assignedUsers: [""],
  //   status: {
  //     todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
  //     inProgress: {
  //       label: "In Progress",
  //       count: Math.floor(Math.random() * 40) + 1,
  //     },
  //     done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
  //     forReview: {
  //       label: "For Review",
  //       count: Math.floor(Math.random() * 50) + 1,
  //     },
  //     due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
  //   },
  //   contact: {
  //     name: "Rhonda Rhodes",
  //     number: "(406) 382-2670",
  //     companyEmail: "client.company@email.com",
  //     accountEmail: "r.g.rhodes@aol.com",
  //   },
  //   sla: [""],
  // },
  // {
  //   id: (clientIndex += 1),
  //   key: `client-${clientIndex}`,
  //   name: "Total Network Development",
  //   location: "3522 West Fork Street, Missoula, MT 59801",
  //   state: "3522 West Fork Street, Missoula, MT 59801",
  //   address: "3522 West Fork Street, Missoula, MT 59801",
  //   datetimeOnboarded: "2024-02-16T00:00:00",
  //   assignedUsers: [""],
  //   status: {
  //     todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
  //     inProgress: {
  //       label: "In Progress",
  //       count: Math.floor(Math.random() * 40) + 1,
  //     },
  //     done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
  //     forReview: {
  //       label: "For Review",
  //       count: Math.floor(Math.random() * 50) + 1,
  //     },
  //     due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
  //   },
  //   contact: {
  //     name: "Rhonda Rhodes",
  //     number: "(406) 382-2670",
  //     companyEmail: "client.company@email.com",
  //     accountEmail: "r.g.rhodes@aol.com",
  //   },
  //   sla: [""],
  // },
  // {
  //   id: (clientIndex += 1),
  //   key: `client-${clientIndex}`,
  //   name: "Total Network Development",
  //   location: "3522 West Fork Street, Missoula, MT 59801",
  //   state: "3522 West Fork Street, Missoula, MT 59801",
  //   address: "3522 West Fork Street, Missoula, MT 59801",
  //   datetimeOnboarded: "2024-02-16T00:00:00",
  //   assignedUsers: [""],
  //   status: {
  //     todo: { label: "To Do", count: Math.floor(Math.random() * 10) + 1 },
  //     inProgress: {
  //       label: "In Progress",
  //       count: Math.floor(Math.random() * 40) + 1,
  //     },
  //     done: { label: "Done", count: Math.floor(Math.random() * 100) + 1 },
  //     forReview: {
  //       label: "For Review",
  //       count: Math.floor(Math.random() * 50) + 1,
  //     },
  //     due: { label: "Due", count: Math.floor(Math.random() * 20) + 1 },
  //   },
  //   contact: {
  //     name: "Rhonda Rhodes",
  //     number: "(406) 382-2670",
  //     companyEmail: "client.company@email.com",
  //     accountEmail: "r.g.rhodes@aol.com",
  //   },
  //   sla: [""],
  // },
]);

export const selectedClientAtom = atom([]);

export const clientsListCountAtom = atom((get) => get(clientsListAtom).length);

let pageRowIndex = 0;
export const pageRowsSelectionAtom = atom([
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "10",
    value: "10",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "20",
    value: "20",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "50",
    value: "50",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "100",
    value: "100",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "200",
    value: "200",
  },
]);

export const selectedPage = atom(1);
