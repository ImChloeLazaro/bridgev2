"use client"
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
import { MdDeleteOutline } from "react-icons/md";
import { now, getLocalTimeZone } from "@internationalized/date";
import Invitees from "./Invitees";
import TypeCheckbox from "./TypeCheckbox";
import Recurrence from "./Recurrence";

import { useSession } from "next-auth/react";
import { createEvent } from "@/app/utils/calendar";

const EditEvent = ({
    event,
    isOpenEdit,
    onOpenChangeEdit,
    onDeleteHandler,
}) => {

    const editStartDateTime = (date) => {
        return {
            "calendar": {
                "identifier": "gregory"
            },
            "era": "AD",
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "day": date.getDate(),
            "timeZone": "Australia/Sydney",
            "offset": 36000000,
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds(),
            "millisecond": date.getMilliseconds()
        }
    }
    console.log('default value', now(getLocalTimeZone()))
    console.log('startEdit', editStartDateTime(new Date(event.start)))
    return (
        <>
            <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form>
                                <ModalHeader className="flex gap-1 justify-between m-2 items-center">
                                    <div>{event.title}</div>
                                    <button type="button"onClick={onDeleteHandler}>click</button>
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        size="md"
                                        type="text"
                                        label="Title"
                                        name="title"
                                        value={event.title}
                                    // onChange={formHandler}
                                    />
                                    <Input
                                        size="md"
                                        type="text"
                                        label="Description"
                                        name="description"
                                        value={event.desc}
                                    // onChange={formHandler}
                                    />
                                    <DatePicker
                                        name="start"
                                        label="Event Date"
                                        variant="bordered"
                                        hideTimeZone
                                        showMonthAndYearPickers
                                        onChange={(date) => console.log(startEdit(new Date(event.start)))}
                                        defaultValue={now(getLocalTimeZone())}
                                    />
                                    <DatePicker
                                        name="end"
                                        label="Event Date"
                                        variant="bordered"
                                        hideTimeZone
                                        showMonthAndYearPickers
                                        onChange={(date) => console.log(date)}
                                        defaultValue={now(getLocalTimeZone())}
                                    />
                                    {/* <Invitees
            name="invites"
            handleInvitees={handleInvitees}
        />
        <Recurrence 
            handleRecurrence={handleRecurrence}
            /> */}
                                    {/* <Checkbox
            isSelected={withAMeet}
            onValueChange={e => console.log(e)}
            name="ameet">
            With A Meet
        </Checkbox>
        <Checkbox
            isSelected={withGMeet}
            onValueChange={e => console.log(e)}
            name="gmeet">
            With G Meet
        </Checkbox> */}
                                    {/* <TypeCheckbox onChange={handleEventType} /> */}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Edit
                                    </Button>
                                </ModalFooter>
                            </form>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
export default EditEvent;