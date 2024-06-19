'use state'
import React, { useState } from "react";
import { Modal, ModalHeader, ModalContent, ModalBody, useDisclosure, Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { FcOk, FcCancel } from "react-icons/fc";
import LeaveSummary from "./components/Leave";

const LeaveHistory = ({ ...props }) => {
    const leave = [
        {
            'id': 1,
            'leaveDate': '2024-06-14T06:52:35.510Z', //iso format
            'leaveType': 'VL',
            'isTLApproved': true,
            'isAdminApproved': true,
            'numOfHours': 8,
            'reason': 'UNPLANNED LEAVE',
            'borrowedLeave': false
        },
        {
            'id': 2,
            'leaveDate': '2023-06-14T06:52:35.510Z',
            'leaveType': 'SL',
            'isTLApproved': false,
            'isAdminApproved': false,
            'numOfHours': 8,
            'reason': 'Broken Hearted due to break up',
            'borrowedLeave': true
        },
        {
            'id': 3,
            'leaveDate': '2023-06-14T06:52:35.510Z',
            'leaveType': 'SL',
            'isTLApproved': true,
            'isAdminApproved': false,
            'numOfHours': 8,
            'reason': 'Broken Hearted due to break up part 2',
            'borrowedLeave': true
        }
    ];

    const {
        isOpen: leaveSummaryIsOpen,
        onOpen: leaveSummaryOnOpen,
        onOpenChange: leaveSummaryOnOpenChange
    } = useDisclosure();

    // State to track the selected leave item
    const [selectedLeave, setSelectedLeave] = useState(null);

    // Sort leave items by date in descending order
    const sortedLeave = leave.sort((a, b) => new Date(b.leaveDate) - new Date(a.leaveDate));

    // Grouping leaves by year and type
    const groupedLeaves = sortedLeave.reduce((group, item) => {
        const year = new Date(item.leaveDate).getFullYear();
        if (!group[year]) {
            group[year] = {};
        }
        if (!group[year][item.leaveType]) {
            group[year][item.leaveType] = [];
        }
        group[year][item.leaveType].push(item);
        return group;
    }, {});

    return (
        <>
            <Modal
                isOpen={props.leaveHistoryIsOpen}
                onOpenChange={props.leaveHistoryOnOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                scrollBehavior="inside"
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Leave History</ModalHeader>
                        <ModalBody>
                            <div className="w-full">
                                <Listbox variant="flat" aria-label="Listbox menu with sections">
                                    {
                                        Object.keys(groupedLeaves).sort((a, b) => b - a).map(year => (
                                            <ListboxSection key={year} title={year} showDivider>
                                                {
                                                    Object.keys(groupedLeaves[year]).map(type => (
                                                        groupedLeaves[year][type].map(item => (
                                                            <ListboxItem
                                                                key={item.id}
                                                                description={`${new Date(item.leaveDate).toLocaleDateString()} | ${item.numOfHours} Hours`}
                                                                startContent={item.isAdminApproved && item.isTLApproved ? <FcOk /> : <FcCancel />}
                                                                onPress={() => {
                                                                    setSelectedLeave(item);
                                                                    leaveSummaryOnOpen();
                                                                }}
                                                            >
                                                                {item.leaveType === 'VL' ? 'Vacation Leave' : 'Sick Leave'} - {item.reason}
                                                            </ListboxItem>
                                                        ))
                                                    ))
                                                }
                                            </ListboxSection>
                                        ))
                                    }
                                </Listbox>
                            </div>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
            <LeaveSummary 
                data={selectedLeave} // Pass the selected leave data
                leaveSummaryIsOpen={leaveSummaryIsOpen} 
                leaveSummaryOnOpenChange={leaveSummaryOnOpenChange} 
            />
        </>
    );
};

export default LeaveHistory;
