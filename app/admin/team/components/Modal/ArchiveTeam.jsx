import {
    useDisclosure,
    Input
} from "@nextui-org/react";
import ArchiveTeamButton from "../Button/ArchiveTeamButton";
import ModalComponent from "./ModalComponent";

const ArchiveTeam = () => {
    const {
        isOpen,
        onOpen,
        onOpenChange
    } = useDisclosure();

    const onsubmit = (e) => {
        e.preventDefault();
        console.log('Archive Team');
    }

    return (
        <>
            <ArchiveTeamButton onClick={onOpenChange} />
            <ModalComponent
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={'Archive Team'}
                action={onsubmit}
                actionName={'Update'}
            >
                <div className="flex flex-col space-y-4">
                    <Input type="text" label="Enter Team Name" />
                    <Input type="text" label="Enter Team Head" />
                    <Input type="text" label="Enter Client" />
                </div>
            </ModalComponent>
        </>
    )
}

export default ArchiveTeam;
