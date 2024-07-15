import { useState } from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";

const SelectSubMember = ({ placeholder, name, getSelectedMembers }) => {
    const [selectedMember, setselectedMember] = useState(new Set([]));
    const handleOnChangeSelect = (selected) => {
        const selectedMembers = Array.from(selected).map((key) => {
            const member = members.find((item) => item.sub === key);
            return member ? {
                sub: member.sub,
                name: member.name,
                email: member.email,
                picture: member.picture,
            } : null;
        }).filter(Boolean);
        setselectedMember(selected);
        console.log('SELECTED MEMBERS', selectedMembers);
        if (typeof getSelectedMembers === 'function') {
            getSelectedMembers(selectedMembers);
        }
    }
    const members = [
        {
            "sub": "5b0f4507-1edf-487f-ab5b-e2f99129a447",
            "name": "John Axel Cortez",
            "email": "john.cortez@aretex.com.au",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocJrnrq8wb3u1UVxAQ9dbo4tbZUUKui0slL2gXKAZKR3=s96-c",
            "position": "Current Position",
            "status": "active",
            "employment_status": "Employment Status",
            "_id": {
                "$oid": "65f271e2b77b2abe952fc7fa"
            }
        },
        {
            "sub": "4eda3796-3a62-4d7a-a052-d59c0424a4b7",
            "name": "Nephi Bungubung",
            "email": "nephi.bungubung@aretex.com.au",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocK0MPA9SZBbB8B-3VvEFbESRJUnQr8Huu0VNPJ_5nyJ=s96-c",
            "position": "Current Position",
            "status": "active",
            "employment_status": "Employment Status",
            "_id": {
                "$oid": "65fa2697b5260cf092065f91"
            }
        },
        {
            "sub": "3c638e3c-970f-4864-bab4-b2d7647ce6de",
            "name": "Clint Joey Llosala",
            "email": "clint.llosala@aretex.com.au",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocLdBgl8CvLscUNJeEcaTnSZTELeDY4YyUV2hvoH151V6BBaRQ=s96-c",
            "position": "Current Position",
            "status": "active",
            "employment_status": "Employment Status",
            "_id": {
                "$oid": "6618cc6f5e92011cb7439946"
            }
        },
        {
            "sub": "acbd0f62-4ddf-43a1-b2a2-fdacbae5d3ed",
            "name": "Gerome Blanco",
            "email": "gerome.blanco@aretex.com.au",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocK-oRnfsN1iyKaShecdglBcr73YxLmy8enJquYyQiZ-caA4Qws=s96-c",
            "position": "Current Position",
            "status": "active",
            "employment_status": "Employment Status",
            "_id": {
                "$oid": "663aca918e63145854125576"
            }
        }
    ]
    return (
        <Select
            items={members}
            name={name}
            label={placeholder}
            selectionMode="multiple"
            variant="bordered"
            className="w-full"
            selectedKeys={selectedMember}
            onSelectionChange={(selected) => handleOnChangeSelect(selected)}
            renderValue={(items) => {
                return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                        <Chip
                            key={item.sub}
                            startContent={item.picture}
                            onClose={() => {
                                setselectedMember((prev) =>
                                    new Set([...prev].filter((item) => item !== item.key))
                                );
                            }}
                        >
                            <div className="flex flex-col">
                                <span>{item.name}</span>
                                <span className="text-default-500 text-tiny">{item.email}</span>
                            </div>
                        </Chip>
                    </div>
                ));
            }}
        >
            {((item) => (
                <SelectItem key={item.sub}>
                    <div className="flex gap-2 items-center">
                        <Avatar
                            alt={item.name}
                            size="sm"
                            src={item.picture}
                            showFallback
                            className="flex-shrink-0 bg-blue-default text-white-default"
                        />
                        <div className="flex flex-col">
                            {item.picture ? (
                                <span className="text-small ">{item.name}</span>
                            ) : (
                                <span className="text-small font-bold">{item.name}</span>
                            )}
                            <span className="text-tiny text-default-400">{item.email}</span>
                        </div>
                    </div>
                </SelectItem>
            ))}
        </Select>
    )
}

export default SelectSubMember;