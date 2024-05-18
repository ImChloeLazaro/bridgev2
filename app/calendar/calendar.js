import axios from 'axios';
import { v4 } from 'uuid';
import { addHours, format } from 'date-fns';

export const listEvents = async (accessToken) => {
    try {
        const phurl = `https://www.googleapis.com/calendar/v3/calendars/en.philippines%23holiday@group.v.calendar.google.com/events?key=AIzaSyDt3PLW-Pp5TozR-AueRGQirUhbGMNp78k`;
        const auurl = `https://www.googleapis.com/calendar/v3/calendars/en.australian%23holiday@group.v.calendar.google.com/events?maxResults=2500&key=AIzaSyDt3PLW-Pp5TozR-AueRGQirUhbGMNp78k`;

        const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            params: {
              timeMin: new Date().toISOString(),
              singleEvents: true,
              orderBy: 'startTime'
            }
          });
          const PHHoliday = await axios.get(phurl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const AUHoliday = await axios.get(auurl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const defaultResponse = response.data.items.map((res) => {
            // Check if dateTime property is present and not empty
            if (res.start && res.start.dateTime && res.end && res.end.dateTime) {
              return {
                id: res.id,
                title: res.summary,
                start: new Date(format(res.start.dateTime, "yyyy/MM/dd HH:mm:ss")),
                end: new Date(format(res.end.dateTime, "yyyy/MM/dd HH:mm:ss")),
                allDay: false,
                desc: res.description,
                data: res,
                type: res.organizer.displayName,
              };
            } else { 
              return null; // or provide a default value
            }
          }).filter(event => event !== null);
          const PHHolidayResponse = PHHoliday.data.items.map((res) => ({
            id: res.id,
            title: res.summary,
            start: new Date(format(res.start.date, "yyyy/MM/dd HH:mm:ss")),
            end: new Date(format(res.end.date, "yyyy/MM/dd HH:mm:ss")),
            allDay: false,
            desc: res.description,
            data: res,
            type: res.organizer.displayName,
          }));
          const AUHolidayResponse = AUHoliday.data.items.map((res) => ({
            id: res.id,
            title: res.summary,
            start: new Date(format(res.start.date, "yyyy/MM/dd HH:mm:ss")),
            end: new Date(format(res.end.date, "yyyy/MM/dd HH:mm:ss")),
            allDay: false,
            desc: res.description,
            data: res,
            type: res.organizer.displayName,
          }));
          console.log("phHoliday: ", PHHolidayResponse);
          console.log("AUHoliday: ", AUHoliday);
          const returnedItems = [
            ...defaultResponse,
            ...PHHolidayResponse,
            ...AUHolidayResponse,
          ];
          return returnedItems || [];
    } catch (error) {
        console.error("Error fetching Google Calendar events:", error);
        throw error;
    }
}