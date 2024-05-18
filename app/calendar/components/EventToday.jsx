import { format } from "date-fns";

const EventTodayList = ({event, width}) => {
    console.log("event: ", event);
    return (
        <div className={width}>
            <p className="text-center">Event today</p>
            {event.length > 0 ? (
                <div className='flex w-full flex-col max-h-full overflow-y-auto'>
                    {event.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => handleSelectEvent(event)}
                            className='hover:cursor-pointer w-full p-1 flex flex-col '
                        >
                            <div
                                className={`w-full flex flex-col rounded-md p-2 ${event.type === "Holidays in Philippines"
                                        ? "bg-[#32449c]"
                                        : event.type === "Holidays in Australia"
                                            ? "bg-[#f28f33]"
                                            : "bg-[#F6BF26]"
                                    }`}
                            >
                                <p className='text-gray-700 text-[12px] font-semibold'>
                                    {event.title}
                                </p>
                                <p className='text-[10px] text-gray-600'>
                                    Start: {format(event.start, "hh:mm a")}
                                </p>
                                <p className='text-[10px] text-gray-600'>
                                    End: {format(event.end, "hh:mm a")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full p-2 text-gray-700'>No event for today.</div>
            )}
        </div>
    )
}
export default EventTodayList;