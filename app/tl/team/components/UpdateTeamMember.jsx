import ModalComponent from "@/app/admin/team/components/Modal/ModalComponent";
import { useState, useEffect } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { restupdate } from "@/app/utils/amplify-rest";
import { toast } from "sonner";
const UpdateTeamMember = ({
    keyObj,
    isOpen,
    onOpenChange,
    teamMember,
    setUpdatedTeamMember
}) => {
    const [selectedPerson, setSelectedPerson] = useState({});
    const [key, setKey] = useState({});

    useEffect(() => {
        if (teamMember && key) {
            setKey(keyObj);
            setSelectedPerson(teamMember);
        }
    }, [teamMember, keyObj]);

    const statusOptions = [
        { key: "active", label: "Active" },
        { key: "inactive", label: "Inactive" }
    ];

    const employmentStatusOptions = [
        { key: "intern", label: "Intern" },
        { key: "traineeGraduate", label: "Trainee Graduate" },
        { key: "probationary", label: "Probationary" },
        { key: "regular", label: "Regular" }
    ];

    const onsubmit = async (e) => {
        e.preventDefault();
        console.log('Selected Person:', selectedPerson);
        console.log('Key:', key._id);
        try {
            const updatedPerson = await restupdate('/teams/subteam/updateMember', {
                _id: key._id,
                status: {
                  _id: selectedPerson._id,
                  employment_status: selectedPerson.employment_status,
                  position: selectedPerson.position,
                  status: selectedPerson.status
                }
              })
            console.log('Updated Person:', updatedPerson);
            if (updatedPerson.response.modifiedCount > 0) {
                setUpdatedTeamMember({
                    _id: selectedPerson._id,
                    position: selectedPerson.position,
                    status: selectedPerson.status,
                    employment_status: selectedPerson.employment_status
                });
                toast.success('Team Member Updated Successfully');
            } else {
                toast.info('No Changes Made');
            }
        } catch (error) {
            toast.error('Failed to Update Team Member');
        }

        onOpenChange();
    }

    return (
        <ModalComponent
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Update Team Member"
            actionName={"Update"}
            submitText="Update"
            action={onsubmit}
        >
            <div className="flex flex-col gap-2">
                <Input
                    type="text"
                    className="w-full"
                    size="sm"
                    defaultValue={selectedPerson.position || ''}
                    label="Position"
                    onChange={(e) => setSelectedPerson({ ...selectedPerson, position: e.target.value })}
                />
                <Select
                    placeholder="Status"
                    className="w-full"
                    selectedKey={selectedPerson.status}
                    onChange={(e) => setSelectedPerson({ ...selectedPerson, status: e.target.value })}
                >
                    {statusOptions.map((status) => (
                        <SelectItem key={status.key} value={status.key}>
                            {status.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    placeholder="Employment Status"
                    className="w-full"
                    selectedKey={selectedPerson.employment_status}
                    onChange={(e) => setSelectedPerson({ ...selectedPerson, employment_status: e.target.value })}
                >
                    {employmentStatusOptions.map((option) => (
                        <SelectItem key={option.key} value={option.key}>
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </ModalComponent>
    );
}

export default UpdateTeamMember;
