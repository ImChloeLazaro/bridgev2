"use client";
import ReactBigCalendar from "@/app/components/ReactBigCalendar";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import { Views } from "react-big-calendar";
const Leaves = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  const [view, setView] = useState(Views.MONTH);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [events] = useState([
    {
      id: 1,
      title: "Meeting with John",
      start: new Date(2024, 4, 1, 10, 0), // May 1, 2024, 10:00 AM
      end: new Date(2024, 4, 1, 11, 0), // May 1, 2024, 11:00 AM
      type: "Meeting",
    },
    {
      id: 2,
      title: "Lunch Break",
      start: new Date(2024, 4, 1, 12, 0), // May 1, 2024, 12:00 PM
      end: new Date(2024, 4, 1, 13, 0), // May 1, 2024, 1:00 PM
      type: "Break",
    },
    {
      id: 3,
      title: "Conference Call",
      start: new Date(2024, 4, 1, 14, 0), // May 1, 2024, 2:00 PM
      end: new Date(2024, 4, 1, 15, 0), // May 1, 2024, 3:00 PM
      type: "Call",
    },
    {
      id: 4,
      title: "Project Deadline",
      start: new Date(2024, 4, 1, 17, 0), // May 1, 2024, 5:00 PM
      end: new Date(2024, 4, 1, 18, 0), // May 1, 2024, 6:00 PM
      type: "Deadline",
    },
  ]);

  const onView = useCallback((view) => setView(view), []);
  const onNavigate = useCallback((date) => setDefaultDate(date), []);

  const handleSelectEvent = (event) => {
    alert(`Event: ${event.title}`);
  };

  return (
    <ReactBigCalendar
      events={events}
      onNavigate={onNavigate}
      onView={onView}
      view={view}
      defaultDate={new Date(2024, 4, 1)}
      onSelectEvent={handleSelectEvent}
    />
  );
};

export default Leaves;
