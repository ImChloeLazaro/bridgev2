'use client'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, ModalContent } from "@nextui-org/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { deleteEvent } from "@/app/utils/calendar";
import { useSession } from "next-auth/react";
const DeleteEvent = ({ isOpen, onClose, event }) => {
    const [deleteOption, setDeleteOption] = useState("this");
    const { data: session, status } = useSession();
    const handleDelete = () => {
        
        try {
            deleteEvent(session.token.access_token, event.id, deleteOption === 'all' ? true : false, event.data.recurringEventId);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
        onClose(); // Close the modal after deleting
    };
    return (<>
        {event.data.recurringEventId ? (
            <Modal isOpen={isOpen} onOpenChange={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Event</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this event?</p>
                                <div>
                                    <input
                                        type="radio"
                                        id="delete-this"
                                        name="delete-option"
                                        value="this"
                                        checked={deleteOption === "this"}
                                        onChange={() => setDeleteOption("this")}
                                    />
                                    <label htmlFor="delete-this"> Delete this event</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="delete-all"
                                        name="delete-option"
                                        value="all"
                                        checked={deleteOption === "all"}
                                        onChange={() => setDeleteOption("all")}
                                    />
                                    <label htmlFor="delete-all"> Delete all recurring events</label>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        ): (
            <Modal isOpen={isOpen} onOpenChange={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Event</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this event?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        )
        }
    </>);
}

export default DeleteEvent;
