import {
    useState,
    useCallback,
    useEffect
} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Checkbox,
    Chip,
    Avatar,
    AvatarGroup
} from "@nextui-org/react";
import { readwithparams, restread } from "@/app/utils/amplify-rest";
const TeamTable = ({sub}) => {
    
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            const userList = await readwithparams('/teams/team/myTeam', { sub });
            // console.log('USER LIST', userList);
            if (userList.success) setUsers(userList.response);
        } catch (error) {
            console.log(error);
        }
    })

    useEffect(() => {
        fetchUsers();
    }, [])

    const statusColorMap = {
        active: "success",
        archive: "danger",
    };

    const columns = [
        { name: "NAME", uid: "name" },
        { name: "CLIENT", uid: "client" },
        { name: "HEADS", uid: "heads" },
        { name: "STATUS", uid: "status" },
        { name: "MEMBERS", uid: "members" },
    ];
 
    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex gap-2">
                        {/* <Checkbox onValueChange={e => {console.log('hello world')}}/> */}
                        <div>
                            <p className="text-bold text-sm capitalize">{cellValue}</p>
                                <small className="text-default-400">
                                    <Tooltip
                                        showArrow={true}
                                        placement="bottom"
                                        content={user.department.map(dep => dep.name).join("\n")}
                                        style={{ whiteSpace: 'pre-line' }}>
                                        {user.department.length > 2
                                            ? `${user.department.map(dep => dep.name).slice(0, 2).join(", ")} and ${user.department.length - 2} more`
                                            : user.department.map(dep => dep.name).join(", ")}
                                    </Tooltip>
                                </small>
                        </div>
                    </div>
                );
            case "client":
                return (
                    <div className="flex gap-2">
                        <p className="text-bold text-sm capitalize">
                            <Tooltip
                                showArrow={true}
                                placement="bottom"
                                content={user.client.map(client => client.name).join("\n")}
                                style={{ whiteSpace: 'pre-line' }}>
                                {
                                    user.client.length > 3
                                        ? `${user.client.map(client => client.name).slice(0, 2).join(", ")} and ${user.client.length - 2} more...`
                                        : user.client.map(client => client.name).join(", ")
                                }
                            </Tooltip>
                        </p>
                    </div>
                );
            case "heads":
                return (
                    <div className="flex gap-2">
                        <AvatarGroup max={5} total={user.heads.length} size="sm">
                            {user.heads.map((member, index) => (
                                <Tooltip key={index} content={member.email}>
                                    <Avatar src={member.picture} />
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                    </div>
                );
            case "members":
                return (
                    <div className="flex gap-2">
                        <AvatarGroup max={5} total={user.members.length} size="sm">
                            {user.members.map((member, index) => (
                                <Tooltip key={index} content={member.email}>
                                    <Avatar src={member.picture} />
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader className="text-center" columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TeamTable;
