'use client'
import { useState } from "react";
import {
    useDisclosure,
    Input
} from "@nextui-org/react";
import AddTeamButton from "../Button/AddTeamButton";
import ModalComponent from "./ModalComponent";
import MemberSelect from "../MemberSelect";

import { restinsert } from "@/app/utils/amplify-rest";

const AddTeam = ({ addNewTeamToList }) => {
    const [team, setTeam] = useState({})
    const {
        isOpen,
        onOpen,
        onOpenChange
    } = useDisclosure();

    const onsubmit = async (e) => {
        e.preventDefault();
        try {
            const addTeam = await restinsert('/teams', team)
            console.log('REST INSERT', addTeam)
            addNewTeamToList(addTeam.response); // Update the list
            onOpenChange()
        } catch (error) {
            console.log(error)   
        }
    }

    const handleTeamMembersSelect = (selected) => {
        setTeam({ ...team, members: selected.map(item => item) });
    };

    const handleTeamHeadsSelect = (selected) => {
        setTeam({ ...team, heads: selected.map(item => item) });
    };

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
                <div className="flex flex-col space-y-4">
                    <Input type="text" label="Enter Team Name" onChange={e => setTeam({ ...team, name: e.target.value })} />
                    <Input type="text" label="Enter Client" onChange={e => setTeam({...team, client: e.target.value})} />
                    <MemberSelect
                        placeholder="Select Team Heads"
                        name="teamHeads"
                        handleInvitees={handleTeamHeadsSelect}
                        defaultSelectedKeys={new Set(['3', '4'])} // Example keys
                    />
                    <MemberSelect
                        placeholder="Select Team Members"
                        name="teamMembers"
                        handleInvitees={handleTeamMembersSelect}
                        defaultSelectedKeys={new Set(['1', '2'])} // Example keys
                    />
                </div>
            </ModalComponent>
        </>
    )
}

export default AddTeam;
