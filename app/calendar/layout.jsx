import GoogleOAuth from "./GoogleOAuth";
import Training from "./components/Trainings";
const CalendarLayout = ({children}) => {
    return (
        <>
            <div>Calendar Layout</div>
            <Training />
            <GoogleOAuth />
            {children}
        </>
    )
}

export default CalendarLayout;