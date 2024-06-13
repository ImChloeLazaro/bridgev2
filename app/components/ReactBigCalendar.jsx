import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
const ReactBigCalendar = ({...props}) => {
    const localizer = momentLocalizer(moment);
    return (
        <Calendar
            localizer={localizer}
            events={props.events}
            onNavigate={props.onNavigate}
            onView={props.onView}
            view={props.view}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "90%", width: "100%" }}
            min={new Date(2024, 4, 1, 0, 0)} // Start at 12:00 AM
            max={new Date(2024, 4, 2, 23, 59)} // End at 11:59 PM
            // eventPropGetter={(event) => {
            //     let bgColor;
            //     switch (event.type) {
            //         case "Holidays in Philippines":
            //             bgColor = "#32449c";
            //             break;
            //         case "Holidays in Australia":
            //             bgColor = "#f28f33";
            //             break;
            //         default:
            //             bgColor = "#33B679";
            //     }
            //     return {
            //         style: {
            //             backgroundColor: bgColor,
            //             fontSize: "12px",
            //             borderRadius: "10px",
            //             color: "#fff",
            //             border: "0px",
            //             display: "block",
            //         },
            //     };
            // }}
            selectable
            onSelectEvent={props.onSelectEvent}
            dayLayoutAlgorithm='no-overlap'
            showMultiDayTimes
            timeslots={1}
            step={60}
            date={props.defaultDate}
            className="big-calendar"
        />
    );
}
export default ReactBigCalendar;