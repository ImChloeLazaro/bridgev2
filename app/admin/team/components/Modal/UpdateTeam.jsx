import {
    useDisclosure,
    Input
} from "@nextui-org/react";
import UpdateTeamButton from "../Button/UpdateTeamButton";
import ModalComponent from "./ModalComponent";

const UpdateTeam = () => {
    const {
        isOpen,
        onOpen,
        onOpenChange
    } = useDisclosure();

    const onsubmit = (e) => {
        e.preventDefault();
        console.log('update Team');
    }

    return (
        <>
            <UpdateTeamButton onClick={onOpenChange} />
            <ModalComponent
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={'Update Team'}
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

export default UpdateTeam;
