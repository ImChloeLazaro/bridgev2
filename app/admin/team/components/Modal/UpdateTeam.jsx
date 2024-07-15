import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import ModalComponent from "./ModalComponent";
import MemberSelect from "../MemberSelect";
import DepartmentSelect from "../DepartmentSelect";
import ClientSelect from "../ClientSelect";
import { restupdate } from "@/app/utils/amplify-rest";

const UpdateTeam = ({ onOpenChange, isOpen, teamData, updateTeamInList }) => {
    const [team, setTeam] = useState(teamData || { name: '', client: '', heads: [], members: [] });
    useEffect(() => {
        if (teamData) {
            setTeam(teamData);
            console.log('TEAM DATA FOR UPDATE', teamData.client);
        }
    }, [teamData]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await restupdate('/teams/team', team);
            if (response.modifiedCount != 0) {
                updateTeamInList(team); // Update the team in the list
            }
            onOpenChange(false); // Close the modal after submitting
        } catch (error) {
            console.log(error);
        }
    };

    const handleTeamMembersSelect = (selected) => {
        setTeam({ ...team, members: selected });
    };

    const handleTeamHeadsSelect = (selected) => {
        setTeam({ ...team, heads: selected });
    };

    return (
        <ModalComponent
            isOpen={isOpen}
            onOpenChange={onOpenChange} // Ensure onOpenChange is correctly passed
            title={'Update Team'}
            action={onSubmit}
            actionName={'Update'}
        >
            {team && (
                <div className="flex flex-col space-y-4">
                    <Input
                        type="text"
                        label="Enter Team Name"
                        defaultValue={team.name}
                        onChange={e => setTeam({ ...team, name: e.target.value })}
                    />
                    {/* <Input 
                        type="text" 
                        label="Enter Client" 
                        defaultValue={team.client} 
                        onChange={e => setTeam({ ...team, client: e.target.value })} 
                    /> */}
                    <ClientSelect
                        placeholder="Select Client"
                        name="client"
                        handleClientSelect={(selected) => setTeam({ ...team, client: selected })}
                        // defaultClient={defaultClient}
                        // defaultSelectedKeys={} // Pass object directly
                    />
                    <DepartmentSelect
                        placeholder="Select Department"
                        name="department"
                        handleInvitees={(selected) => setTeam({ ...team, department: selected })}
                        defaultSelectedKeys={team.department} // Pass object directly
                    />
                    <MemberSelect
                        placeholder="Select Team Heads"
                        name="teamHeads"
                        handleInvitees={handleTeamHeadsSelect}
                        defaultSelectedKeys={new Set(team.heads)} // Pass objects directly
                    />
                    <MemberSelect
                        placeholder="Select Team Members"
                        name="teamMembers"
                        handleInvitees={handleTeamMembersSelect}
                        defaultSelectedKeys={new Set(team.members)} // Pass objects directly
                    />
                </div>
            )}
        </ModalComponent>
    );
};

export default UpdateTeam;
