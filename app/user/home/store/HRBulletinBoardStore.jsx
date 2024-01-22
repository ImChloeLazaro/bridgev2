import { atom } from "jotai";
let index = 0;

export const hrBulletinBoardAtom = atom([
  {
    id: (index += 1),
    key: `bulletin-${index}`,
    title: "Attention A-Family!",
    datetime: "2023-10-03T13:00:00",
    description:
      "This announcement is important! The announcement is very important! The important is the announcement because it is very important!",
    type: "announcement",
    color: "orange",
  },
  {
    id: (index += 1),
    key: `bulletin-${index}`,
    title: "New Policy!",
    datetime: "2023-07-07T13:00:00",
    description: "A new work policy is approved! The work policy is approved! The approved is the work policy because the work policy is approved.",
    type: "policy",
    color: "blue",
  },
  {
    id: (index += 1),
    key: `bulletin-${index}`,
    title: "Look Here!",
    datetime: "2023-03-28T13:00:00",
    description: "A-News! Here is this month\’s release. This is this month\’s release because it is A-News! The release for this month!",
    type: "release",
    color: "green",
  },
]);
