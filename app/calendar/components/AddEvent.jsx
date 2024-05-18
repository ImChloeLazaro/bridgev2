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
    DatePicker
} from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
const AddEvent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [event, setEvent] = useState({});

    const formHandler = (e) => {
        if (e.target && e.target.name) {
            setEvent({ ...event, [e.target.name]: e.target.value });
        }
    };
    const handleAddEvent = (e) => {
        e.preventDefault();
        console.log("Add Event", event);
    };

    return (
        <div>
            <div>
                <Button className="bg-green-700 rounded-md p-1 m-1 text-slate-50" onPress={onOpen}>
                    Open Modal
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
                                        defaultValue={now(getLocalTimeZone())}
                                        onChange={(date) => setEvent({ ...event, start: date })}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Create
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
