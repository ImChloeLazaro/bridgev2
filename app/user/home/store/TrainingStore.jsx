import { atom } from "jotai";
let index = 0;

// blue - clients/tasks
// green - holidays
// orange - aretex events
// red - meetings
// yellow - misc events

//create atom for getsession
export const trainingsAtom = atom([
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "Excel Data Visualization",
    datetimeStart: "2023-10-03T13:00:00",
    datetimeEnd: "2023-10-03T14:00:00",
    description: "Training",
    color: "blue",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "VBA & Macro Training",
    datetimeStart: "2023-07-03T15:00:00",
    datetimeEnd: "2023-07-03T16:00:00",
    description: "Training",
    color: "yellow",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "Leadership Training",
    datetimeStart: "2023-12-18T08:00:00",
    datetimeEnd: "2023-12-18T18:00:00",
    description: "Training & Seminar",
    color: "green",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "AWSome Training Day",
    datetimeStart: "2023-05-04T11:00:00",
    datetimeEnd: "2023-05-04T14:40:00",
    description: "Webinar",
    color: "orange",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "Red Cross: First Aid Seminar",
    datetimeStart: "2024-01-24T09:00:00",
    datetimeEnd: "2024-01-24T12:00:00",
    description: "Seminar",
    color: "red",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "Excel Data Visualization",
    datetimeStart: "2023-08-30T13:00:00",
    datetimeEnd: "2023-08-30T14:00:00",
    description: "Training",
    color: "blue",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "Excel Data Visualization",
    datetimeStart: "2023-04-15T13:00:00",
    datetimeEnd: "2023-04-15T14:00:00",
    description: "Training",
    color: "blue",
  },
  {
    id: (index += 1),
    key: `train-${index}`,
    title: "VBA & Macro Training",
    datetimeStart: "2023-06-12T15:00:00",
    datetimeEnd: "2023-06-12T16:00:00",
    description: "Training",
    color: "yellow",
  },
]);
