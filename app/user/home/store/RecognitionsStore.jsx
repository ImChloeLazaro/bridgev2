import { atom } from "jotai";
import { recognitionsIcons } from "../components/recognition/RecognitionIcons";
let index = 0;

export const recognitionsAtom = atom([
  {
    id: (index += 1),
    key: `recognition-${index}`,
    icon: recognitionsIcons.tickets,
    title: "Congratulations!",
    datetime: "2023-10-03T13:00:00",
    description: "You have received 50 Rex Tickets!",
    type: "ticket"
  },
  {
    id: (index += 1),
    key: `recognition-${index}`,
    icon: recognitionsIcons.promotion,
    title: "Congratulations!",
    datetime: "2023-10-03T13:00:00",
    description: "You have been promoted to Data Analyst!",
    type: "promotion"
  },
  {
    id: (index += 1),
    key: `recognition-${index}`,
    icon: recognitionsIcons.feedback,
    title: "Good Job!",
    datetime: "2023-10-03T13:00:00",
    description: "A client is happy with your work!",
    type: "feedback"
  },
  {
    id: (index += 1),
    key: `recognition-${index}`,
    icon: recognitionsIcons.tickets,
    title: "Congratulations!",
    datetime: "2023-10-03T13:00:00",
    description: "You have received 50 Rex Tickets!",
    type: "ticket"
  },
  {
    id: (index += 1),
    key: `recognition-${index}`,
    icon: recognitionsIcons.tickets,
    title: "Congratulations!",
    datetime: "2023-10-03T13:00:00",
    description: "You have received 50 Rex Tickets!",
    type: "ticket"
  },
  
]);
