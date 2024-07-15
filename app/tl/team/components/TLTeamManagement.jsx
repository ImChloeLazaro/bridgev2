import { useState, useCallback, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Tabs,
    Tab,
    Listbox,
    ListboxItem,
    Chip,
    Avatar,
    useDisclosure,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
import AddSubTeamModal from "./AddSubTeamModal";
import UpdateTeamMember from "./UpdateTeamMember";
import { readwithparams, restupdate } from "@/app/utils/amplify-rest";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { useAtomValue } from "jotai";
import { FaHamburger } from "react-icons/fa";
import { toast } from "sonner";
const TLTeamManagement = () => {
    const [list, setList] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const { sub } = useAtomValue(authenticationAtom).auth;

    const fetchTeams = useCallback(async () => {
        try {
            const teamList = await readwithparams('/teams/sub-team/mySubTeam', { sub });
            if (teamList.success) setList(teamList.response);
        } catch (error) {
            console.log(error);
        }
    }, [sub]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const addSubTeam = (newTeam) => {
        setList(prevList => [...prevList, newTeam]);
        console.log('NEW TEAMS', newTeam);
    };

    const {
        isOpen: updatePersonIsOpen,
        onOpen: updatePersonOnOpen,
        onClose: updatePersonOnClose
    } = useDisclosure();

    const updateOne = useCallback((person) => {
        console.log(person);
        setSelectedPerson(person); // Update the selected person
        updatePersonOnOpen();
    })

    const keyHandler = async (key, item) => {
        if (key === "update") {
            console.log('UPDATE', item);
        }

        if (key === "delete") {
            try {
                const status = item.status === "active" ? "archive" : "active";
                const response = await restupdate(`/teams/sub-team/activeOrArchive`, {
                    status,
                    _id: item._id,
                });

                if (response.modifiedCount != 0) {
                    toast.success("Status Changed Successfully!")
                    setList((prevList) =>
                        prevList.map((team) =>
                            team._id === item._id ? { ...team, status } : team
                        )
                    );
                }
            } catch (error) {
                console.log("Archive team error", error);
            }
        }
    }

    const activeTeams = list.filter((team) => team.status === "active");
    const archiveTeams = list.filter((team) => team.status === "archive");

    return (
        <>
            <Card className="flex w-full h-full my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl overflow-auto">
                <header className="w-full">
                    <Card className="flex flex-row justify-between items-center gap-2 p-4 my-2 min-h-[3.5rem]">
                        <h1 className="text-xl font-semibold">Admin Team Management</h1>
                        <div className="flex gap-2">
                            <AddSubTeamModal
                                addSubTeam={addSubTeam}
                            />
                        </div>
                    </Card>
                </header>
                <Tabs aria-label="Options">
                    <Tab key="active" title="My Team">
                    </Tab>
                    <Tab key="sub" title="Sub Team">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeTeams.map((item) => (
                                <Card key={item._id || item.key} className="flex flex-col p-4 gap-2">
                                    <CardHeader className="flex justify-between">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <Popover placement="bottom" showArrow={true}>
                                            <PopoverTrigger>
                                                <Button size="sm" color="primary">
                                                    <FaHamburger />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                    <Listbox aria-label="Actions" onAction={(key) => {
                                                        keyHandler(key, item)
                                                    }}>
                                                        <ListboxItem key="update">Update</ListboxItem>
                                                        <ListboxItem
                                                            key="delete"
                                                            className={`text-${item.status === "active" ? "danger" : "success"}`}
                                                        >
                                                            {item.status === "active" ? "Set as Archive" : "Set as Active"}
                                                        </ListboxItem>
                                                    </Listbox>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </CardHeader>
                                    <CardBody>
                                        <Listbox
                                            items={item.members || []}
                                            aria-label="Member List"
                                            onAction={(key) => console.log('THIS IS THE KEY', key)}
                                            emptyContent={
                                                <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
                                                    No Content!
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
                                            {(member) => (
                                                <ListboxItem textValue={member.name} key={member.sub}>
                                                    <div className="flex items-center">
                                                        <div className="flex w-full p-1">
                                                            <div className="flex gap-2 w-3/4 items-center">
                                                                <Avatar src={member.picture} size="md" />
                                                                <div>
                                                                    <p className="text-sm font-medium">{member.name}</p>
                                                                    <p className="text-xs font-light">{member.email}</p>
                                                                    <p className="text-xs font-light">{member.position}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end justify-between w-1/4">
                                                                <Chip size="sm" className="text-slate-50" color={member.employment_status === 'Employment Status' ? 'default' : 'warning'}>
                                                                    {member.employment_status}
                                                                </Chip>
                                                                <Chip size="sm" className="text-slate-50" color={member.status === 'active' ? 'success' : 'danger'}>
                                                                    {member.status === 'active' ? 'Active' : 'Inactive'}
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </ListboxItem>
                                            )}
                                        </Listbox>
                                        <UpdateTeamMember
                                            isOpen={updatePersonIsOpen}
                                            onOpenChange={updatePersonOnClose}
                                            person={selectedPerson}
                                            updateOneMember={updateOne}
                                            team={item.key}
                                        />
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                    <Tab key="archive" title="Archive Sub Team">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {archiveTeams.map((item) => (
                                <Card key={item._id || item.key} className="flex flex-col p-4 gap-2">
                                    <CardHeader className="flex justify-between">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <Popover placement="bottom" showArrow={true}>
                                            <PopoverTrigger>
                                                <Button size="sm" color="primary">
                                                    <FaHamburger />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                    <Listbox aria-label="Actions" onAction={(key) => {
                                                        keyHandler(key, item)
                                                    }}>
                                                        <ListboxItem key="update">Update</ListboxItem>
                                                        <ListboxItem
                                                            key="delete"
                                                            className={`text-${item.status === "active" ? "danger" : "success"}`}
                                                        >
                                                            {item.status === "active" ? "Set as Archive" : "Set as Active"}
                                                        </ListboxItem>
                                                    </Listbox>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </CardHeader>
                                    <CardBody>
                                        <Listbox
                                            items={item.members || []}
                                            aria-label="Member List"
                                            onAction={(key) => console.log('THIS IS THE KEY', key)}
                                            emptyContent={
                                                <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
                                                    No Content!
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
                                            {(member) => (
                                                <ListboxItem textValue={member.name} key={member.sub}>
                                                    <div className="flex items-center">
                                                        <div className="flex w-full p-1">
                                                            <div className="flex gap-2 w-3/4 items-center">
                                                                <Avatar src={member.picture} size="md" />
                                                                <div>
                                                                    <p className="text-sm font-medium">{member.name}</p>
                                                                    <p className="text-xs font-light">{member.email}</p>
                                                                    <p className="text-xs font-light">{member.position}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end justify-between w-1/4">
                                                                <Chip size="sm" className="text-slate-50" color={member.employment_status === 'Employment Status' ? 'default' : 'warning'}>
                                                                    {member.employment_status}
                                                                </Chip>
                                                                <Chip size="sm" className="text-slate-50" color={member.status === 'active' ? 'success' : 'danger'}>
                                                                    {member.status === 'active' ? 'Active' : 'Inactive'}
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </ListboxItem>
                                            )}
                                        </Listbox>
                                        <UpdateTeamMember
                                            isOpen={updatePersonIsOpen}
                                            onOpenChange={updatePersonOnClose}
                                            person={selectedPerson}
                                            updateOneMember={updateOne}
                                            team={item.key}
                                        />
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                </Tabs>
            </Card>

        </>
    )
}

export default TLTeamManagement;
