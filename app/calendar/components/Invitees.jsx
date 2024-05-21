import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups } from "react-icons/md";

import { selectedTaggedPeopleAtom, taggedPeopleListAtom, peopleEmailList } from "@/app/user/home/store/ManagePostStore";
const Invitees = ({ name, handleInvitees }) => {
    const [selectedInvitees, setSelectedInvitees] = useAtom(selectedTaggedPeopleAtom);
    const PeopleList = useAtomValue(taggedPeopleListAtom);
    const handleSelectionChange = (selectedKeys) => {
        const selectedEmails = Array.from(selectedKeys)
            .map((key) => {
                // Find the corresponding person object in the taggedPeopleListAtom array
                const person = PeopleList.find((item) => item.key === key);
                // Return the email of the person
                return person ? person.email : null;
            })
            .filter(Boolean); // Filter out any null values (in case a person is not found)

        console.log('Selected emails:', selectedEmails);
        setSelectedInvitees(selectedKeys);
        handleInvitees(selectedEmails);
    };
    return (
        <>
            <Select
                name={name}
                aria-label="Tag People Selection"
                items={PeopleList}
                variant="bordered"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Tag people"
                labelPlacement="outside"
                defaultSelectedKeys={"all"}
                selectedKeys={selectedInvitees}
                onSelectionChange={(selectedInvitees) => handleSelectionChange(selectedInvitees)}
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
                                        setSelectedInvitees(() =>
                                            Array.from(selectedTaggedPeopleAtom).filter(
                                                (item) => item !== displayItem.key
                                            )
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
        </>
    )
}
export default Invitees;