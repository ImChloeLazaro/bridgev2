"use client"
import { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure,
    Input,
    Select,
    SelectItem,
    DatePicker,
    Textarea
} from "@nextui-org/react";

import {DateValue, parseDate, getLocalTimeZone} from "@internationalized/date";

import { FaHistory } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import LeaveHistory from "./LeaveHistory";

import { restinsert, restread } from "@/app/utils/amplify-rest";

const LeaveRequest = () => {
    const [formdata, setFormdata] = useState({
        leaveType: "vl",
        numberOfHours: 8,
        leaveDate: new Date().toISOString(),
        reason: ""
    });

    const {
        isOpen: leaveRequestIsOpen,
        onOpen: leaveRequestOnOpen,
        onOpenChange: leaveRequestOnOpenChange
    } = useDisclosure();
    const {
        isOpen: leaveHistoryIsOpen,
        onOpen: leaveHistoryOnOpen,
        onOpenChange: leaveHistoryOnOpenChange
    } = useDisclosure()
    const {
        isOpen: confirmationIsOpen,
        onOpen: confirmationOnOpen,
        onOpenChange: confirmationOnOpenChange
    } = useDisclosure()

    const leaveType = [
        { key: "vl", label: "Vacation Leave", value: "VL" },
        { key: "sl", label: "Sick Leave", value: "SL" },
        { key: "ml", label: "Maternity Leave", value: "ML" },
        { key: "pl", label: "Paternity Leave", value: "PL" },
    ]

    const numberOfHours = [
        { key: "half", label: "4", value: "4" },
        { key: "full", label: "8", value: "8" }
    ]

    const getLeaveLabel = (key) => {
        const leave = leaveType.find((item) => item.key === key);
        return leave ? leave.label : 'Unknown Leave Type';
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Call API to save the leave request leaverequest
        const response = await restinsert("/leaverequest", formdata);
        console.log(response);

    }
    return (
        <>
            <Button
                disableRipple={true}
                disableAnimation={true}
                className="bg-transparent text-sm sm:text-md lg:text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
                onPress={leaveRequestOnOpen}
            >
                {"File a Leave"}
            </Button>
            <Modal isOpen={leaveRequestIsOpen} onOpenChange={leaveRequestOnOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Request a Leave</ModalHeader>
                            <ModalBody>
                                <Select
                                    isRequired
                                    label="Leave Type"
                                    defaultSelectedKeys={["vl"]}
                                    className="w-full"
                                    onChange={e => setFormdata({ ...formdata, leaveType: e.target.value })}
                                    >
                                    {leaveType.map((leave) => (
                                        <SelectItem key={leave.key}>
                                            {leave.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isRequired
                                    label="Leave Hour"
                                    defaultSelectedKeys={["full"]}
                                    className="w-full"
                                    onChange={e => setFormdata({ ...formdata, numberOfHours: e.target.value })}
                                    >
                                    {numberOfHours.map((hour) => (
                                        <SelectItem key={hour.key}>
                                            {hour.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <DatePicker 
                                    className="w-full" 
                                    label="Leave Date" 
                                    value={parseDate(new Date().toISOString().split('T')[0])} 
                                    onChange={e => setFormdata({ ...formdata, leaveDate: new Date(e).toISOString() })} 
                                />
                                <Textarea
                                    label="Reason"
                                    placeholder="Type your reason here"
                                    className="w-full"
                                    onChange={e => setFormdata({ ...formdata, reason: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button color="danger" variant="secondary" onPress={leaveHistoryOnOpen}>
                                    <FaHistory /> See history
                                </Button>
                                <div className="flex gap-1">
                                    <Button color="warning" onPress={confirmationOnOpen}>
                                        Submit
                                    </Button>
                                    <Button variant="secondary" onPress={onClose}>
                                        Close
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Confirmation Modal */}
            <Modal isOpen={confirmationIsOpen} onOpenChange={confirmationOnOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center gap-1"><IoInformationCircle /> Confirmation</ModalHeader>
                            <ModalBody>
                                <p>Leave Date {new Date(formdata.leaveDate).toISOString().split('T')[0]}</p>
                                <p>{getLeaveLabel(formdata.leaveType)} - {formdata.numberOfHours == 8 ? 'Full Day' : 'Half Day'}</p>
                                <p>Do you confirm your Leave?</p>
                            </ModalBody>
                            <ModalFooter className="flex gap-1">
                                <Button className="text-white-default font-semibold" color="warning" onClick={handleFormSubmit}>
                                    Yes, I Confirm
                                </Button>
                                <Button variant="secondary" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Leave History */}
            <LeaveHistory
                leaveHistoryIsOpen={leaveHistoryIsOpen}
                leaveHistoryOnOpenChange={leaveHistoryOnOpenChange}
            />
        </>
    )
}
export default LeaveRequest;