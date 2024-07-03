import {
    useDisclosure
} from "@nextui-org/react";
import AddTeamButton from "../Button/AddTeamButton";
import ModalComponent from "./ModalComponent";

const AddTeam = () => {
    const {
        isOpen,
        onOpen,
        onOpenChange
    } = useDisclosure();

    const onsubmit = (e) => {
        e.preventDefault();
        console.log('Add Team');
    }

    return (
        <>
            <AddTeamButton onClick={onOpenChange} />
            <ModalComponent
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={'Add Team'}
                action={onsubmit}
                actionName={'Add'}
            >
                test
            </ModalComponent>
        </>
    )
}

export default AddTeam;
