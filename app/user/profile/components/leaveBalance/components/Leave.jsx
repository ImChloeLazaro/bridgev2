import {
    Modal,
    ModalHeader,
    ModalContent,
    ModalBody,
    Listbox,
    ListboxSection,
    ListboxItem,
    Input,
    Select,
    SelectItem,
    DateInput,
    Textarea,
    Chip
} from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";

const LeaveSummary = ({ data, ...props }) => {
    return (
        <Modal
            isOpen={props.leaveSummaryIsOpen}
            onOpenChange={props.leaveSummaryOnOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            scrollBehavior="inside"
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">Leave Details</ModalHeader>
                    <ModalBody>
                        {
                            data && (
                                <>
                                    <Select
                                        label="Leave Type"
                                        placeholder={data.leaveType}
                                        className="w-full border border-slate-600 rounded-md"
                                        isDisabled
                                    >
                                        <SelectItem key='default'>
                                            {data.leaveType}
                                        </SelectItem>
                                    </Select>
                                    <Select
                                        label="Number of Hours"
                                        placeholder={data.numOfHours}
                                        className="w-full border border-slate-600 rounded-md"
                                        isDisabled
                                    >
                                        <SelectItem key='default'>
                                            {data.numOfHours}
                                        </SelectItem>
                                    </Select>
                                    <DateInput
                                        label={"Leave Date"}
                                        isDisabled
                                        defaultValue={parseDate(data.leaveDate.split('T')[0])}
                                        placeholderValue={new CalendarDate(1995, 11, 6)}
                                        className="w-full border border-slate-600 rounded-md"
                                    />
                                    <Textarea
                                        isDisabled
                                        label="Reason"
                                        labelPlacement="outside"
                                        defaultValue={data.reason}
                                        className="w-full border border-slate-600 rounded-md p-1"
                                    />
                                    <div className="flex justify-between">
                                        <p>TL Approval: </p>
                                        <Chip color={`${data.tlApproval == 'pending' ? 'warning' : data.tlApproval == 'approved' ? 'success' : 'danger'}`}>{`${data.tlApproval}`}</Chip>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Admin Approval: </p>
                                        <Chip color={`${data.adminApproval == 'pending' ? 'warning' : data.adminApproval == 'approved' ? 'success' : 'danger'}`}>{`${data.adminApproval}`}</Chip>
                                    </div>
                                </>
                            )
                        }
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
};

export default LeaveSummary;
