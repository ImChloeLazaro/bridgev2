import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups } from "react-icons/md";

import { selectedTaggedPeopleAtom, taggedPeopleListAtom } from "@/app/user/home/store/ManagePostStore";

const MemberSelect = ({
    placeholder,
    name,
    handleInvitees,
    defaultSelectedKeys = new Set(),
    useGlobalState = false,
    action,
}) => {
    const [selectedInvitees, setSelectedInvitees] = useGlobalState ? useAtom(selectedTaggedPeopleAtom) : useState(defaultSelectedKeys);
    const PeopleList = useAtomValue(taggedPeopleListAtom);

    // console.log("invitees" + [...selectedInvitees])

    // selectedInvitees.forEach(Invitee => {
    //     console.log(Invitee._id)
    // })

    // PeopleList.forEach(Invitee => {
    //     console.log(`People List ${Invitee.key}`)
    // })

    const selectedInviteArray = [...selectedInvitees]
    const inviteeNames = selectedInviteArray.map(invitee => invitee.email)

    const handleSelectionChange = (selectedKeys) => {
        const selectedPeople = Array.from(selectedKeys)
            .map((key) => {
                const person = PeopleList.find((item) => item.key === key);
                // Return only the required properties
                return person ? { sub: person.sub, email: person.email, name: person.name, picture: person.picture } : null;
            })
            .filter(Boolean); // Filter out any null values (in case a person is not found)

        console.log('Selected people:', selectedPeople);
        if (useGlobalState) {
            setSelectedInvitees(selectedKeys);
        } else {
            setSelectedInvitees(selectedKeys);
        }

        if (typeof handleInvitees === 'function') {
            handleInvitees(selectedPeople);
        }
    };

    return (
        <Select
            name={name}
            aria-label={placeholder}
            items={PeopleList}
            variant="bordered"
            isMultiline={true}
            selectionMode="multiple"
            placeholder={placeholder}
            labelPlacement="outside"
            defaultSelectedKeys={action === "update" ? inviteeNames : selectedInvitees}
            // selectedKeys={selectedInvitees.email}
            onSelectionChange={(selectedKeys) => handleSelectionChange(selectedKeys)}
            classNames={{
                base: "",
                trigger: "min-h-unit-12 py-2",
            }}
            renderValue={(displayItems) => {
                return (
                    <div className="flex flex-wrap gap-2">
                        {displayItems.map((displayItem) => (
                            <Chip
                                key={displayItem.key}
                                startContent={displayItem.data.picture}
                                onClose={() => {
                                    setSelectedInvitees((prev) =>
                                        new Set([...prev].filter((item) => item !== displayItem.key))
                                    );
                                }}
                            >
                                {displayItem.data.picture ? (
                                    <p className="font-sm">{displayItem.data.name}</p>
                                ) : (
                                    <p className="font-bold">{displayItem.data.name}</p>
                                )}
                            </Chip>
                        ))}
                    </div>
                );
            }}
        >
            {(person) => (
                <SelectItem key={person.key} textValue={person.name}>
                    <div className="flex gap-2 items-center">
                        <Avatar
                            alt={person.name}
                            size="sm"
                            src={person.picture}
                            showFallback
                            fallback={<MdGroups size={18} />}
                            className="flex-shrink-0 bg-blue-default text-white-default"
                        />
                        <div className="flex flex-col">
                            {person.picture ? (
                                <span className="text-small ">{person.name}</span>
                            ) : (
                                <span className="text-small font-bold">{person.name}</span>
                            )}
                            <span className="text-tiny text-default-400">{person.email}</span>
                        </div>
                    </div>
                </SelectItem>
            )}
        </Select>
    );
};

export default MemberSelect;