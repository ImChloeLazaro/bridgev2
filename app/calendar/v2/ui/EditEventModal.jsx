import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, DatePicker, Checkbox } from "@nextui-org/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { parseAbsoluteToLocal } from "@internationalized/date";
import TypeCheckbox from "../components/TypeCheckbox";
import { putEvent } from "@/app/utils/calendar";
import { useSession } from "next-auth/react";
import DeleteEvent from "./DeleteEvent";

const EditEventModal = ({ event, isOpenModal, onOpenModal }) => {
    const [newEvent, setNewEvent] = useState({})
    const [eventData, setEventData] = useState({
        ...event,
        eventTypes: [],
        creator: event.data.creator.self,
        desc: event.desc,
        newstart: new Date(event.start).toISOString(),
        newend: new Date(event.end).toISOString()
    });

    const { data: session, status } = useSession();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    useEffect(() => {
        if (event.desc) {
            const tags = event.desc.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
            const newDesc = event.desc.replace(/Flags:\s*(#\w+\s*)+/g, '').trim();
            setEventData(prevData => ({
                ...prevData,
                desc: newDesc,
                eventTypes: tags.length > 0 ? tags : prevData.eventTypes
            }));
            console.log("Extracted tags:", tags);
            console.log("Updated description:", newDesc);
        }
    }, [event]);

    const formatDate = (date) => {
        const { year, month, day, hour, minute, second } = date;
        return `${year}-${month}-${day}T${hour}:${minute}:${second}+10:00`;
    }

    const updateEvent = async (e) => {
        e.preventDefault();
        try {
            await putEvent(session.token.access_token, eventData);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };
   
    return (
        <Modal isOpen={isOpenModal} onOpenChange={onOpenModal}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={updateEvent}>
                        <ModalHeader className="flex gap-1 justify-between m-2 items-center">
                            <div>{event.title}</div>
                            {
                                eventData.creator ? (
                                    <>
                                        <button type="button" onClick={() => setIsOpenDeleteModal(true)}>
                                            <RiDeleteBin5Line />
                                        </button>
                                        <DeleteEvent event={eventData} isOpen={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)} />
                                    </>
                                ) : (
                                    <small className=" font-normal text-secondary-900">You cannot modify this event.</small>
                                )
                            }
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
                                onChange={(date) => setEventData({ ...eventData, newstart: formatDate(date) })}
                            />
                            <DatePicker
                                name="end"
                                label="Event Date"
                                variant="bordered"
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={parseAbsoluteToLocal(new Date(eventData.end).toISOString())}
                                onChange={(date) => setEventData({ ...eventData, newend: formatDate(date) })}
                            />
                            <TypeCheckbox
                                onChange={(selectedTypes) => setEventData({ ...eventData, eventTypes: selectedTypes })}
                                defaultSelected={event.desc ? event.desc.match(/#\w+/g)?.map(tag => tag.slice(1)) || [] : []}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button
                                className={`${eventData.creator ? '' : 'disabled disabled:opacity-50 disabled:cursor-not-allowed'}`}
                                color="primary"
                                type="submit"
                                disabled={eventData.creator !== undefined ? false : true}
                            >
                                Update
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditEventModal;
