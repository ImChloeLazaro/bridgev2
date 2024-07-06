'use client'
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalContent, ModalBody, useDisclosure, Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { FcOk, FcCancel, FcDisclaimer, FcMinus } from "react-icons/fc";
import LeaveSummary from "./components/Leave";

import { readwithparams } from "@/app/utils/amplify-rest";
import { useAtomValue } from "jotai";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const LeaveHistory = ({ ...props }) => {
    const { sub } = useAtomValue(authenticationAtom);
    // const leave = [
    //     {
    //         'id': 1,
    //         'leaveDate': '2024-06-14T06:52:35.510Z', //iso format
    //         'leaveType': 'VL',
    //         'tlApproval': 'pending',
    //         'adminApproval': 'pending',
    //         'numOfHours': 8,
    //         'reason': 'UNPLANNED LEAVE',
    //         'borrowedLeave': false
    //     },
    //     {
    //         'id': 2,
    //         'leaveDate': '2023-06-14T06:52:35.510Z',
    //         'leaveType': 'SL',
    //         'tlApproval': 'approved',
    //         'adminApproval': 'pending',
    //         'numOfHours': 8,
    //         'reason': 'Broken Hearted due to break up',
    //         'borrowedLeave': true
    //     },
    //     {
    //         'id': 3,
    //         'leaveDate': '2023-06-14T06:52:35.510Z',
    //         'leaveType': 'SL',
    //         'tlApproval': 'pending',
    //         'adminApproval': 'rejected',
    //         'numOfHours': 8,
    //         'reason': 'Broken Hearted due to break up part 2',
    //         'borrowedLeave': true
    //     },
    //     {
    //         'id': 4,
    //         'leaveDate': '2023-06-14T06:52:35.510Z',
    //         'leaveType': 'SL',
    //         'tlApproval': 'rejected',
    //         'adminApproval': 'approved',
    //         'numOfHours': 8,
    //         'reason': 'Broken Hearted due to break up part 3',
    //         'borrowedLeave': true
    //     },
    //     {
    //         'id': 5,
    //         'leaveDate': '2023-06-14T06:52:35.510Z',
    //         'leaveType': 'SL',
    //         'tlApproval': 'pending',
    //         'adminApproval': 'approved',
    //         'numOfHours': 8,
    //         'reason': 'Broken Hearted due to break up part 4',
    //         'borrowedLeave': true
    //     }
    // ];

    const {
        isOpen: leaveSummaryIsOpen,
        onOpen: leaveSummaryOnOpen,
        onOpenChange: leaveSummaryOnOpenChange
    } = useDisclosure();

    // State to track the selected leave item
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [leave, setLeaveHistory] = useState([]);

    useEffect(() => {
        const getLeaveHistory = async () => {
            const leave = await readwithparams("/leaverequest/myLeaveRequest", { sub: sub });
            // console.log('Leave history: =>', leave.response);
            setLeaveHistory(leave.response);
        }
        getLeaveHistory();
    }, [])

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
                                                                description={`${new Date(item.leaveDate).toLocaleDateString()} | ${item.numberOfHours} Hours`}
                                                                startContent={item.adminApproval === 'pending' && item.tlApproval === 'pending'
                                                                    ? <FcMinus />
                                                                    : item.adminApproval === 'approved' && item.tlApproval === 'approved'
                                                                        ? <FcOk />
                                                                        : item.adminApproval === 'rejected' || item.tlApproval === 'rejected'
                                                                            ? <FcDisclaimer />
                                                                            : <FcMinus />
                                                                }
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
