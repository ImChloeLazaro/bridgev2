import {
    Card,
    CardHeader,
    CardBody,
    Listbox,
    ListboxItem,
    Image,
    cn,
    Chip,
    useDisclosure,
    Avatar
} from "@nextui-org/react";

import TeamPopover from "./Popover/PopoverContent";
// import TeamList from "./TeamList";
import UpdateTeamMember from "./Modal/UpdateTeamMember";
import { useEffect, useState } from 'react';
const TeamCard = ({ data, updateTeamInList }) => {
    const [selectedPerson, setSelectedPerson] = useState(null); // State for selected person
    const [selectedMembers, setSelectedMembers] = useState(data.members); // State for selected member

    useEffect(() => {
        setSelectedMembers(data.members);
    }, [data.members])
    const {
        isOpen: updatePersonIsOpen,
        onOpen: updatePersonOnOpen,
        onClose: updatePersonOnClose
    } = useDisclosure();

    const openUpdateModal = (person) => {
        setSelectedPerson(person); // Update the selected person
        updatePersonOnOpen();
    }

    const updateOneMember = (updated) => {
        const updatedMembers = selectedMembers.map((member) => {
            if (member._id === updated._id) {
                return {
                    ...member,
                    ...updated
                }
            }
            return member;
        });
        console.log(updated);
        setSelectedMembers(updatedMembers);
        console.log(updatedMembers);
    }

    return (
        <Card className="m-4">
            <CardHeader className="flex justify-between">
                <div>
                    <h2>{data.name}</h2>
                </div>
                <TeamPopover data={data} updateTeamInList={updateTeamInList} />
            </CardHeader>
            <CardBody className="h-64 overflow-auto">
                <Listbox
                    items={selectedMembers || []}
                    aria-label="Training List"
                    onAction={(key) => openUpdateModal(key)}
                    emptyContent={
                        <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
                            <p className="text-sm xl:text-base font-medium text-black-default/80">
                                No team member
                            </p>
                        </div>
                    }
                    classNames={{
                        base: ["w-full h-auto overflow-y-auto"],
                        list: "flex gap-2",
                    }}
                    itemClasses={{
                        base: [
                            "p-0",
                            "data-[hover=true]:bg-grey-default bg-white-default ",
                            "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
                        ],
                    }}
                >
                    {
                        selectedMembers.map((list) => (
                            <ListboxItem textValue={list.name} key={list._id} onClick={() => openUpdateModal(list)}>
                                <div className="flex items-center">
                                    <div
                                        className={cn(
                                            "py-1.5 rounded-l-md",
                                            `bg-red-default text-white-default`,
                                            `p-2`
                                        )}
                                    >
                                        <p className="font-extrabold text-lg xl:text-2xl">
                                            {data.name}
                                        </p>
                                        <p className="font-light text-xs">{data.heads[0].name}</p>
                                    </div>
                                    <div className="flex w-full mx-4">
                                        <div className="flex gap-2 w-3/4">
                                            <Avatar src={list.picture} size="md" />
                                            <div>
                                                <p className="text-sm font-medium">{list.name}</p>
                                                <p className="text-xs font-light">{list.email}</p>
                                                <p className="text-xs font-light">{list.position}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-between w-1/4">
                                            <Chip size="sm" className="text-slate-50" color={list.employment_status === 'Employment Status' ? 'default' : 'warning'}>
                                                {list.employment_status || "Employment Status"}
                                            </Chip>
                                            <Chip size="sm" className="text-slate-50" color={list.status === 'active' ? 'success' : 'danger'}>
                                                {list.status === 'active' ? 'Active' : 'Inactive'}
                                            </Chip>
                                        </div>
                                    </div>
                                </div>
                            </ListboxItem>
                        ))
                    }
                </Listbox>
                <UpdateTeamMember
                    isOpen={updatePersonIsOpen}
                    onOpenChange={updatePersonOnClose}
                    person={selectedPerson}
                    updateOneMember={updateOneMember}
                    team={data._id}
                />
            </CardBody>
        </Card>
    );
};

export default TeamCard;
