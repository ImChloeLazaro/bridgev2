import axios from 'axios';
import { v4 } from 'uuid';
import { addHours, format } from 'date-fns';

// export const refreshToken = async (refreshToken) => {

// }
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
    if (error.response && error.response.status === 401) {
      console.log('Access token expired, refreshing token...');
    } else {
      console.error("Error fetching Google Calendar events:", error);
      throw error;
    }
  }
}

export const createEvent = async (accessToken, event) => {
  const { title, description, start, end, invitees, recurrence, withAMeet, withGMeet, eventTypes } = event;

  console.log("event: ", event);
  let descriptionText = `${description || ""}`;
  let flags = [];
  if (withAMeet) {
    descriptionText += `${description || ""}\nJoin with Aretex Meet: https://meet.vps-aretex.space/${v4()}`;
  }
  if(eventTypes.length > 0) {
    flags = eventTypes.map((type) => {
      return `#${type}`;
    });
    descriptionText += `${description || ""}\nFlags: ${flags.join(" ")}`;
  }

  let formattedDate = new Date(new Date().getTime() + (10 * 60 * 60 * 1000)).toISOString().split('.')[0] + '+10:00';

  let recurrenceArray = []
  if(recurrence !== undefined && recurrence !== "NOREPEAT") {
    recurrenceArray = [`RRULE:FREQ=${recurrence};`]
  }

  let inviteArr= invitees > 0 ? [...invitees.map((email) => ({ email }))] : [];

  const response = await axios.post(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
    {
      summary: title,
      description: descriptionText,
      start: {
        dateTime: start || formattedDate,
        timeZone: "Australia/Sydney",
      },
      end: {
        dateTime: end || formattedDate,
        timeZone: "Australia/Sydney",
      },
      attendees: inviteArr,
      conferenceData: {
        createRequest: {
          requestId: withAMeet ? v4() : "",
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: true,
      },
      recurrence: recurrenceArray,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      params: {
        calendarId: "primary",
        sendUpdates: "all",
        conferenceDataVersion: 1,
      },
    }
  );
  const defaultResponse = {
    id: response.data.id,
    title: response.data.summary,
    start: new Date(
      format(response.data.start.dateTime, "yyyy/MM/dd HH:mm:ss")
    ),
    end: new Date(format(response.data.end.dateTime, "yyyy/MM/dd HH:mm:ss")),
    allDay: false,
    desc: response.data.description,
    data: response.data,
    type: response.data.organizer.displayName,
  };
  return defaultResponse;
}

export async function deleteEvent(accessToken, id, recurring, recurringId) {
  try {
    let url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`;
    const eventParams = {
      sendUpdates: "all",
      recurrence: recurring ? "all" : "none",
    };
    if (recurring === true && recurringId) {
      url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${recurringId}`;
    }
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      params: eventParams,
    });
    console.log("Event(s) Deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting Google Calendar event: ", error);
  }
}
