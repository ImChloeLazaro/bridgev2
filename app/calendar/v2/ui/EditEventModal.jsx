import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, DatePicker, Checkbox } from "@nextui-org/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { now, getLocalTimeZone, parseDate, parseAbsoluteToLocal } from "@internationalized/date";
import TypeCheckbox from "../components/TypeCheckbox";
import { putEvent } from "@/app/utils/calendar";
import { useSession } from "next-auth/react";

const EditEventModal = ({ event, isOpenModal, onOpenModal, action }) => {
    const { data: session, status } = useSession();
    const [newEvent, setNewEvent] = useState({})
    const [eventData, setEventData] = useState({
        ...event,
        eventTypes: [],
    });
    const [selectedDate, setSelectedDate] = useState(now(getLocalTimeZone()));
    const arr = event.desc.match(/#\w+/g).map(tag => tag.slice(1)) || [];

    useEffect(() => {

        console.log('Event:', event)
        const descregex = desc => desc.replace(/Flags:\s*(#\w+\s*)+/g, '').trim();
        const newDesc = descregex(event.desc)
        setEventData({ ...eventData, desc: newDesc })

        if (eventData.eventTypes.length == 0) {
            setEventData((prevData) => ({
                ...prevData,
                eventTypes: arr,
            }));
        }
    }, [])

    const updateEvent = async (e) => {
        e.preventDefault();

        const newDesc = `${eventData.desc} Flags: #${eventData.eventTypes.join(' #')}`
        console.log('newDesc:', newDesc)
        setEventData({ ...eventData, desc: newDesc })
        // console.log('Event Data:', eventData)
        // try {
        //     await putEvent(session.token.access_token, eventData);
        // } catch (error) {
        //     console.error("Error updating event:", error);
        // }
    };
    const formatDate = (date) => {
        const { year, month, day, hour, minute, second } = date;
        return `${year}-${month}-${day}T${hour}:${minute}:${second}+10:00`;
    }
    const handleStartDate = (datetime) => {
        setSelectedDate(formatDate(datetime));  
        setEventData({ ...event, start: formatDate(datetime) });    
    }
    const handleEndDate = (datetime) => {
        
    }
    const handleEventTypeChange = (selectedTypes) => {
        console.log('Event Type:', selectedTypes);
        setEventData((prevData) => ({
            ...prevData,
            eventTypes: selectedTypes,
        }));
    };

    return (
        <Modal isOpen={isOpenModal} onOpenChange={onOpenModal}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={updateEvent}>
                        <ModalHeader className="flex gap-1 justify-between m-2 items-center">
                            <div>{event.title}</div>
                            <button type="button" onClick={action}>
                                <RiDeleteBin5Line />
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                size="md"
                                type="text"
                                label="Title"
                                name="title"
                                defaultValue={event.title}
                                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                            />
                            <Input
                                size="md"
                                type="text"
                                label="Description"
                                name="description"
                                defaultValue={event.desc}
                                onChange={(e) => setEventData({ ...eventData, desc: e.target.value })}
                            />
                            <DatePicker
                                name="start"
                                label="Event Date"
                                variant="bordered"
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={parseAbsoluteToLocal(new Date(eventData.start).toISOString())}
                                onChange={(date) => handleStartDate(date)}
                            />
                            <DatePicker
                                name="end"
                                label="Event Date"
                                variant="bordered"
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={parseAbsoluteToLocal(new Date(eventData.end).toISOString())}

                            />
                            <TypeCheckbox
                                onChange={handleEventTypeChange}
                                defaultSelected={arr}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Done
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditEventModal;
