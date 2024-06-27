'use client'
import { useState, useMemo } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Chip, Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { userListAtom } from "@/app/store/UserStore";
import { restupdate } from "@/app/utils/amplify-rest";

const RolesAdmin = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(['text']));
    const selectedValue = useMemo(() => Array.from(selectedKeys).join(', '), [selectedKeys]);
    const [currentUser, setCurrentUser] = useState(null);

    const users = useAtomValue(userListAtom);

    const categorizeUsersByRole = (users) => {
        const roles = {
            "All": new Set(),
            "Admin": new Set(),
            "TL": new Set(),
            "HR": new Set(),
            "User": new Set()
        };

        users.forEach(user => {
            roles["All"].add(user);
            console.log('User roles:', user.role);
            user.role.forEach(role => {
                if (role.name === "ADMIN") roles["Admin"].add(user);
                if (role.name === "TL") roles["TL"].add(user);
                if (role.name === "HR") roles["HR"].add(user);
                if (role.name === "USER") roles["User"].add(user);
            });
        });

        // Convert sets to arrays
        Object.keys(roles).forEach(role => {
            roles[role] = Array.from(roles[role]);
        });

        return roles;
    };

    const roles = categorizeUsersByRole(users);

    const tabs = Object.keys(roles).map(role => ({
        id: role.toLowerCase(),
        label: role,
        content: roles[role]
    }));

    const handleEditClick = (user) => {
        setCurrentUser(user);
        const userRoles = new Set(user.role.map(role => role.name.toLowerCase()));
        console.log('User roles:', userRoles);
        setSelectedKeys(userRoles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Convert selectedKeys from Set to Array for easier processing
        const selectedValues = Array.from(selectedKeys);
        const selectedRoles = selectedValues.map(value => {
            switch (value) {
                case 'user':
                    return { name: 'USER' };
                case 'admin':
                    return { name: 'ADMIN' };
                case 'tl':
                    return { name: 'TL' };
                case 'hr':
                    return { name: 'HR' };
                default:
                    return { name: value.toUpperCase() };
            }
        });

        try {
            const updatedUser = await restupdate(`/user/update-role`, { sub: currentUser.sub, role: selectedRoles });
            console.log('Updated user:', updatedUser);
            console.log('User sub:', currentUser.sub, 'Selected roles:', selectedRoles);
        } catch (error) {
            console.error('Error while updating user roles:', error);
        }
    };

    return (
        <Card className="flex w-full h-full my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl overflow-auto">
            <div className="flex w-full flex-col">
                <Tabs aria-label="Role tabs" items={tabs}>
                    {(item) => (
                        <Tab key={item.id} title={item.label}>
                            {item.content.map(user => (
                                <Card key={user.id} className="my-2">
                                    <CardHeader className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <img src={user.picture} alt={user.name} className="rounded-full w-10 h-10 mr-2" />
                                            <div className="flex flex-col">
                                                <div>{user.name}</div>
                                                <div>{user.email}</div>
                                            </div>
                                        </div>
                                        <Popover placement="bottom" offset={20} showArrow>
                                            <PopoverTrigger>
                                                <Button color="primary" onClick={() => handleEditClick(user)}>Edit Role</Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                                                    <form onSubmit={handleSubmit}>
                                                        <Listbox
                                                            aria-label="Multiple selection example"
                                                            variant="flat"
                                                            disallowEmptySelection
                                                            selectionMode="multiple"
                                                            selectedKeys={selectedKeys}
                                                            onSelectionChange={setSelectedKeys}
                                                            disabledKeys={['user']}
                                                        >
                                                            <ListboxItem key="user">User</ListboxItem>
                                                            <ListboxItem key="admin">Admin</ListboxItem>
                                                            <ListboxItem key="tl">Team Leader</ListboxItem>
                                                            <ListboxItem key="hr">Human Resource</ListboxItem>
                                                        </Listbox>
                                                        <Button color="primary" size="sm" className="mt-2" type="submit">Save</Button>
                                                    </form>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </CardHeader>
                                    <CardBody>
                                        <p>Access: {user.role.map(role => {
                                            let color = 'default';
                                            if (role.name === 'ADMIN') color = 'warning';
                                            if (role.name === 'TL') color = 'danger';
                                            if (role.name === 'HR') color = 'info';
                                            if (role.name === 'USER') color = 'success';
                                            return <Chip key={role.name} color={color} className="mr-1">{role.name}</Chip>;
                                        })}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </Tab>
                    )}
                </Tabs>
            </div>
        </Card>
    );
}

export default RolesAdmin;
