"use client"
import { useState, useCallback, useEffect } from "react";
import { Card, useDisclosure } from "@nextui-org/react";

import MyCalendar from "../components/MyCalendar";
import { Views } from "react-big-calendar";
import { listEvents } from "@/app/utils/calendar";
//components
import SortEvent from "./SortEvent";
import EventToday from "./EventToday";
import UpcomingEvent from "./UpcomingEvent";
import EditEventModal from "./EditEventModal";
import AddEvent from "./AddEvent";

//date time
import { addDays } from "date-fns";
//oauth
import { useSession } from "next-auth/react";
import GoogleOAuth from "./GoogleOAuth";

const CalendarUI = () => {
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventToday, setEventToday] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [bySort, setBySort] = useState(["AU", "PH", "DEFAULT"]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event
  const [sessionName, setSessionName] = useState(null); // Store the session name
  const onView = useCallback((view) => setView(view), []);
  const onNavigate = useCallback((date) => setDefaultDate(date), []);

  const { data: session, status } = useSession();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onOpenChange: onChangeModal,
  } = useDisclosure();
 
  const today = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      if (session) {
        const events = await listEvents(session.token.access_token);
        // Create an array to accumulate the event
        const formattedEvents = events.map(event => ({
          data: event.data,
          id: event.id,
          title: event.title,
          start: new Date(
            event.start.getFullYear(),
            event.start.getMonth(),
            event.start.getDate(),
            event.start.getHours(),
            event.start.getMinutes()
          ),
          end: new Date(
            event.end.getFullYear(),
            event.end.getMonth(),
            event.end.getDate(),
            event.end.getHours(),
            event.end.getMinutes()
          ),
          desc: event.desc,
          type: event.type
        }));
        today.setHours(0, 0, 0, 0);
        const eventsToday = formattedEvents.filter((event) => {
          const eventStart = new Date(event.start);
          eventStart.setHours(0, 0, 0, 0);
          const eventEnd = new Date(event.end);
          eventEnd.setHours(0, 0, 0, 0);
          // Check if date included
          return (
            eventStart.getTime() <= today.getTime() &&
            eventEnd.getTime() >= today.getTime()
          );
        });
        const upcomingEvents = formattedEvents.filter((event) => {
          const eventStart = new Date(event.start);
          eventStart.setHours(0, 0, 0, 0);
          const eventEnd = new Date(event.end);
          eventEnd.setHours(0, 0, 0, 0);

          // Check if event occurs within the next week
          const nextWeek = addDays(today, 7);
          const dateToday = addDays(today, 1);
          return (
            eventStart.getTime() >= dateToday.getTime() &&
            eventStart.getTime() <= nextWeek.getTime()
          );
        });
        const sortedEvents = upcomingEvents.sort(
          (a, b) => new Date(a.start) - new Date(b.start)
        );
        setFilteredEvents(formattedEvents);
        setEvents(formattedEvents);
        setEventToday(eventsToday);
        setUpcomingEvents(sortedEvents);
        setSessionName(session.user?.name);
      }
    };
    fetchEvents();
  }, [status]);

  const onSelectEvent = useCallback((calEvent) => {
    setSelectedEvent(calEvent); // Set the selected event
    onOpenModal();
  }, [onOpenModal]);

  return (
    <>
      {
        status === "unauthenticated" ? (
          <GoogleOAuth />
        ) : (
          <Card className="flex flex-row w-full h-full my-0 lg:my-4 px-0 lg:px-2 py-0 lg:py-1.5 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-lg">
            <div className="w-96 overflow-auto">
              <SortEvent
                sortFilteredEvents={events}
                handleSetFilteredEvents={setEvents}
                events={events}
                session={sessionName}
                setBySort={setBySort}
                bySort={bySort}
              />
              <EventToday
                event={eventToday}
              />
              <UpcomingEvent
                upcomingEvents={upcomingEvents}
              />
            </div>
            <div className="w-full flex-col flex items-end">
              <AddEvent />
              <MyCalendar
                events={events}
                onNavigate={onNavigate}
                onView={onView}
                view={view}
                defaultDate={defaultDate}
                onSelectEvent={onSelectEvent} // Use the updated callback
              />
            </div>
            {isOpenModal && (
              <EditEventModal
                event={selectedEvent} // Pass the selected event
                isOpenModal={isOpenModal}
                onOpenModal={onChangeModal}
                onChangeModal={onChangeModal}
              />
            )}
          </Card>
        )
      }
    </>
  );
};
export default CalendarUI;
