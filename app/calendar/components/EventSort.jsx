const EventSort = ({events, session, setBySort, bySort, sortFilteredEvents, handleSetFilteredEvents}) => {
    const handleSort = (data) => {
        const auHolidays = events.filter(
            (event) => event.type === "Holidays in Australia"
        );
        const phHolidays = events.filter(
            (event) => event.type === "Holidays in Philippines"
        );
        const defaultEvent = events.filter((event) => event.type === undefined);
        let newEvents = sortFilteredEvents;
        if (bySort.includes(data)) {
            setBySort(bySort.filter((item) => item !== data));
            if (data === "AU") {
                newEvents = newEvents.filter(
                    (event) => event.type !== "Holidays in Australia"
                );
            }
            if (data === "PH") {
                newEvents = newEvents.filter(
                    (event) => event.type !== "Holidays in Philippines"
                );
            }
            if (data === "DEFAULT") {
                newEvents = newEvents.filter((event) => event.type !== undefined);
            }
            handleSetFilteredEvents(newEvents);
        } else {
            setBySort([...bySort, data]);
            if (data === "AU") {
                newEvents = [...newEvents, ...auHolidays];
            }
            if (data === "PH") {
                newEvents = [...newEvents, ...phHolidays];
            }
            if (data === "DEFAULT") {
                newEvents = [...newEvents, ...defaultEvent];
            }
            handleSetFilteredEvents(newEvents);
        }
    };
    return (
        <div className='w-full flex flex-col gap-y-3'>
            <div className='w-full flex flex-row pl-5 gap-x-2'>
                <input
                    type='checkbox'
                    checked={bySort.includes("AU")}
                    value='AU'
                    onChange={(e) => handleSort(e.target.value)}
                    className='checkbox checkbox-md [--chkbg:#f28f33] [--chkfg:white]'
                />
                <p className='text-gray-600'>AU Holiday</p>
            </div>

            <div className='w-full flex flex-row pl-5 gap-x-2'>
                <input
                    type='checkbox'
                    checked={bySort.includes("PH")}
                    value='PH'
                    onChange={(e) => handleSort(e.target.value)}
                    className='checkbox checkbox-md [--chkbg:#32449c] [--chkfg:white]'
                />
                <p className='text-gray-600'>PH Holiday</p>
            </div>
            <div className='w-full flex flex-row pl-5 gap-x-2'>
                <input
                    type='checkbox'
                    checked={bySort.includes("DEFAULT")}
                    value='DEFAULT'
                    onChange={(e) => handleSort(e.target.value)}
                    className='checkbox checkbox-md [--chkbg:#928e8e] [--chkfg:white]'
                />
                <p className='text-gray-600'>{session?.session?.user?.name}</p>
            </div>
        </div>
    );
}
export default EventSort;