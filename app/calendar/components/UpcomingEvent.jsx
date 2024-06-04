import { format } from "date-fns";
const UpcomingEvent = ({ upcomingEvents, width }) => {
    return (
        <div className={width}>
            <h1 className="text-center">Upcoming Events</h1>
            {upcomingEvents.length > 0 ? (
                <div className='flex w-full flex-col h-auto max-h-[500px] overflow-y-auto'>
                    {upcomingEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => console.log('EVENT TO CLICK:', event)}
                            className='hover:cursor-pointer w-full p-2 flex flex-col '
                        >
                            <div className={`w-full flex flex-col rounded-md p-2 ${event.type === "Holidays in Philippines"
                                    ? "bg-[#32449c] bg-opacity-50"
                                    : event.type === "Holidays in Australia"
                                        ? "bg-[#f28f33]"
                                        : "bg-[#33B679]"
                                    }`}
                            >
                                <p className='text-slate-100 text-[12px] font-semibold'>
                                    {event.title}
                                </p>
                                <p className='text-[10px] text-slate-50'>
                                    {format(event.start, "MMMM yyyy dd hh:mm a")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full p-2 text-gray-700'>No Upcoming event.</div>
            )}
        </div>
    )
}
export default UpcomingEvent;