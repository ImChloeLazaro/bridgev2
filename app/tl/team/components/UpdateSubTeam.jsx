import { useState, useEffect } from "react";
import ModalComponent from "@/app/admin/team/components/Modal/ModalComponent";
import { Input } from "@nextui-org/react";
import MemberSelect from "@/app/admin/team/components/MemberSelect";
import ClientSelect from "@/app/admin/team/components/ClientSelect";
import { useAtomValue } from "jotai";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { toast } from "sonner";
import { restupdate } from "@/app/utils/amplify-rest";
const UpdateSubTeam = ({ team, isOpen, onOpenChange, setUpdatedSubTeam }) => {
    const {sub, name, email, picture} = useAtomValue(authenticationAtom).auth;
    const [subTeam, setSubTeam] = useState({
        head: {
            sub,
            name,
            email,
            picture
        },
        name: "",
        members: [],
        client: []
    });

    useEffect(() => {
        if (team) {
            setSubTeam(team);
        }
    }, [team]);

    const onsubmit = async (e) => {
        e.preventDefault();
        console.log('SUB TEAM', subTeam);
        const updatedMembers = subTeam.members.map(member => ({
            ...member,
            position: 'not specified',
            status: 'active',
            employment_status: 'not specified'
        }));
        const subteam_entry = {
            ...subTeam,
            members: updatedMembers
        }

        try {
            const team = await restupdate('/teams/subteam/update', subteam_entry)
            console.log('RESPONSE', team);
            if(team.response.modifiedCount > 0) {
                setUpdatedSubTeam(subteam_entry);
                toast.success('Sub Team Updated Successfully');
                onOpenChange();
            }else{
                toast.info('No changes were made');
                onOpenChange();
            }
        } catch (error) {
            toast.error('An error occurred while updating the sub-team');
            console.log(error);
        }
        // Add logic to update the sub-team here
    };

    return (
        <ModalComponent
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Update ${subTeam.name || ''} Sub Team`}
            actionName={'Update'}
            action={onsubmit}
        >
            <form onSubmit={onsubmit}>
                <Input
                    type="text"
                    className="w-full"
                    size="sm"
                    value={subTeam.name || ''}
                    label="Team Name"
                    onChange={e => setSubTeam({ ...subTeam, name: e.target.value })}
                />
                <MemberSelect
                    name={`team-members`}
                    placeholder={`Select Team Members`}
                    handleInvitees={(selected) => setSubTeam({ ...subTeam, members: selected.map(item => item) })}
                />
                <ClientSelect
                    handleClientSelect={(selected) => setSubTeam({ ...subTeam, client: selected.map(item => item) })}
                />
                <button type="submit" className="hidden">Submit</button>
            </form>
        </ModalComponent>
    );
};

export default UpdateSubTeam;
