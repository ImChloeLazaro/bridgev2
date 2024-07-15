'use client'
import { useState } from "react";
import {
    useDisclosure,
    Input
} from "@nextui-org/react";

import AddTeamButton from "../Button/AddTeamButton";
import ModalComponent from "./ModalComponent";
import MemberSelect from "../MemberSelect";
import ClientSelect from "../ClientSelect";
import DepartmentSelect from "../DepartmentSelect";
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

        console.log('TEAM', team)   
        try {
            const addTeam = await restinsert('/teams/team', team)
            console.log('REST INSERT', addTeam)
            addNewTeamToList(addTeam.response); // Update the list
            onOpenChange()
        } catch (error) {
            console.log(error)   
        }
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
                <div className="flex flex-col space-y-4">
                    <Input type="text" label="Team Name" onChange={e => setTeam({ ...team, name: e.target.value })} />
                    <DepartmentSelect handleDepartment={(selected) => setTeam({ ...team, department: selected })} />
                    <ClientSelect handleClientSelect={(selected) =>  setTeam({ ...team, client: selected.map(item => item)})} />
                    <MemberSelect
                        placeholder="Select Team Heads"
                        name="teamHeads"
                        handleInvitees={(selected) => setTeam({ ...team, heads: selected.map(item => item) })}
                        defaultSelectedKeys={new Set(['3', '4'])} // Example keys
                    />
                    <MemberSelect
                        placeholder="Select Team Members"
                        name="teamMembers"
                        handleInvitees={(selected) => setTeam({ ...team, members: selected.map(item => item) })}
                        defaultSelectedKeys={new Set(['1', '2'])} // Example keys
                    />
                </div>
            </ModalComponent>
        </>
    )
}

export default AddTeam;
