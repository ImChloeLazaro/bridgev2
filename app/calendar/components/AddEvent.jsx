'use client';
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Checkbox,
    DatePicker
} from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import Invitees from "./Invitees";
import TypeCheckbox from "./TypeCheckbox";
import Recurrence from "./Recurrence";

import EditEvent from "./EditEvent";

import { useSession } from "next-auth/react";
import { createEvent } from "@/app/utils/calendar";
const AddEvent = () => {
    const { data: session, status } = useSession();
    const [loaders, setLoaders] = useState({
        isLoading: false,
        loadingMessage: "",
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedDate, setSelectedDate] = useState(now(getLocalTimeZone()));
    const [withAMeet, setWithAMeet] = useState(true);
    const [withGMeet, setWithGMeet] = useState(true);

    const [event, setEvent] = useState({
        withAMeet,
        withGMeet,
        eventTypes: [],
    })
    const formatDate = (date) => {
        const { year, month, day, hour, minute, second } = date;
        return `${year}-${month}-${day}T${hour}:${minute}:${second}+10:00`;
    }
    const handleStartDate = (datetime) => {
        console.log('start', datetime)
        setSelectedDate(datetime);
        setEvent({ ...event, start: datetime });
    }
    const handleEndDate = (datetime) => {
        console.log('end', datetime)
        setSelectedDate(datetime);
        setEvent({ ...event, end: datetime });
    }
    const handleInvitees = (selectedKeys) => {
        setEvent({ ...event, invitees: selectedKeys });
    }
    const handleAMeet = (status) => {
        console.log('withAMeet', status)
        setWithAMeet(status);
        setEvent({ ...event, withAMeet: status });
    }
    const handleGMeet = (status) => {
        console.log('withGMeet', status)
        setWithGMeet(status);
        setEvent({ ...event, withGMeet: status });
    }
    const handleEventType = (event) => {
        console.log('event', event)
        setEvent(prevEvent => ({ ...prevEvent, eventTypes: event }));
    }
    const handleRecurrence = (event) => {
        console.log('recurrence', event)
        setEvent(prevEvent => ({ ...prevEvent, recurrence: event }));
    }
    const formHandler = (e) => {
        if (e.target && e.target.name) {
            setEvent({ ...event, [e.target.name]: e.target.value });
        }
    }
    const handleAddEvent = async (e) => {
        e.preventDefault();
        setLoaders({ isLoading: true, loadingMessage: "Creating Event..." });
        try {
            await createEvent(session.token.access_token,event);
        } catch (error) {
            throw error;
        }finally{
            setLoaders({ isLoading: false, loadingMessage: "Done" });
        }
    }
    return (
        <div className="flex">
            <div>
                <Button className="bg-green-700 rounded-md p-1 m-1 text-slate-50" onPress={onOpen}>
                    Create Event
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <form onSubmit={handleAddEvent}>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add Event
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        size="md"
                                        type="text"
                                        label="Title"
                                        name="title"
                                        onChange={formHandler}
                                    />
                                    <Input
                                        size="md"
                                        type="text"
                                        label="Description"
                                        name="description"
                                        onChange={formHandler}
                                    />
                                    <DatePicker
                                        name="start"
                                        label="Event Date"
                                        variant="bordered"
                                        hideTimeZone
                                        showMonthAndYearPickers
                                        onChange={(date) => handleStartDate(formatDate(date))}
                                        defaultValue={now(getLocalTimeZone())}
                                    />
                                    <DatePicker
                                        name="end"
                                        label="Event Date"
                                        variant="bordered"
                                        hideTimeZone
                                        showMonthAndYearPickers
                                        onChange={(date) => handleEndDate(formatDate(date))}
                                        defaultValue={now(getLocalTimeZone())}
                                    />
                                    <Invitees
                                        name="invites"
                                        handleInvitees={handleInvitees}
                                    />
                                    <Recurrence 
                                        handleRecurrence={handleRecurrence}
                                        />
                                    <Checkbox
                                        isSelected={withAMeet}
                                        onValueChange={e => handleAMeet(e)}
                                        name="ameet">
                                        With A Meet
                                    </Checkbox>
                                    <Checkbox
                                        isSelected={withGMeet}
                                        onValueChange={e => handleGMeet(e)}
                                        name="gmeet">
                                        With G Meet
                                    </Checkbox>
                                    <TypeCheckbox onChange={handleEventType} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit">
                                        {loaders.isLoading ? loaders.loadingMessage : "Add Event"}
                                    </Button>
                                </ModalFooter>
                            </form>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default AddEvent;
