"use client";
import { useEffect, useState } from "react";
import {
  useDisclosure,
  Card
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import GoogleOAuth from "./GoogleOAuth";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import {addDays,} from "date-fns";
import { listEvents } from "../utils/calendar";
import UpcomingEvent from "./components/UpcomingEvent";
import EventTodayList from "./components/EventToday";
import EventSort from "./components/EventSort";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";

const CalendarPage = () => {
  const { data: session, status } = useSession();
  const [view, setView] = useState(Views.MONTH);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventToday, setEventToday] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [bySort, setBySort] = useState(["AU", "PH", "DEFAULT"]);
  //default date
  const [defaultDate, setDefaultDate] = useState(new Date());

  const today = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      if (session) {
        const events = await listEvents(session.token.access_token);
        // Create an array to accumulate the events
        const formattedEvents = events.map(event => ({
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
        setEvents(formattedEvents)
        setEventToday(eventsToday);
        setUpcomingEvents(sortedEvents);
        console.log(' EVENTS TODAY', eventToday);
      }
    }
    // Call the fetchEvents function
    fetchEvents();
    // No need to return a function here
  }, [session]);

  const localizer = momentLocalizer(moment);
  let views = Object.keys(Views).map((k) => Views[k]);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit
  } = useDisclosure();

  const handleOpenEvent = (event) => {
    setEvents(event)
    onOpenEdit()
  }

  const onDeleteHandler = (e) => {
    console.log('delete icon clicddked!')
  }
  return (
    <Card className="flex w-full h-full my-0 lg:my-4 px-0 lg:px-2 py-0 lg:py-1.5 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-lg">
      {status === 'unauthenticated' ? (
        <div className="h-full flex justify-center items-center">
          <GoogleOAuth />
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <GoogleOAuth />
            <AddEvent />
          </div>
          <div className="flex">
            <div>
              <EventSort
                sortFilteredEvents={filteredEvents}
                handleSetFilteredEvents={setFilteredEvents}
                events={events}
                session={session}
                setBySort={setBySort}
                bySort={bySort}
              />
              <UpcomingEvent
                width={72}
                upcomingEvents={upcomingEvents}
              />
              <EventTodayList
                width={72}
                event={eventToday}
              />
            </div>
            <div className=" h-full" >
              <div className="calendar-container">
                <Calendar
                  max={1}
                  timeslots={10}
                  view={view}
                  views={views}
                  onNavigate={(date) => setDefaultDate(new Date(date))}
                  onView={(view) => setView(view)}
                  events={filteredEvents}
                  localizer={localizer}
                  style={{ height: 500 }}
                  eventPropGetter={(event) => {
                    let bgColor;
                    switch (event.type) {
                      case "Holidays in Philippines":
                        bgColor = "#32449c";
                        break;
                      case "Holidays in Australia":
                        bgColor = "#f28f33";
                        break;
                      default:
                        bgColor = "#33B679";
                    }
                    return {
                      style: {
                        backgroundColor: bgColor,
                        fontSize: "12px",
                        borderRadius: "10px",
                        color: "#fff",
                        border: "0px",
                        display: "block",
                      },
                    };
                  }}
                  selectable
                  onSelectEvent={(event) => handleOpenEvent(event)}
                  dayLayoutAlgorithm='no-overlap'
                  showMultiDayTimes
                  step={10}
                  date={defaultDate}
                  className="big-calendar"
                />
                {isOpenEdit && (
                  <EditEvent
                    isOpenEdit={isOpenEdit}
                    onOpenEdit={onOpenEdit}
                    onOpenChangeEdit={onOpenChangeEdit}
                    event={events}
                    onDeleteHandler={onDeleteHandler}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
};

export default CalendarPage;
