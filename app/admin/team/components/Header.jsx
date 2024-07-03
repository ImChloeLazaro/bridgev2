import { Card } from "@nextui-org/react";

import ArchiveTeam from "./Button/ArchiveTeam";
import UpdateTeam from "./Button/UpdateTeam";
import AddTeam from "./Modal/AddTeam";
const TeamManagementHeader = () => {
    return (
        <Card className="flex flex-row justify-between items-center gap-2 p-2 my-2">
            <h1>Admin Team Management</h1>
            <main className="flex gap-2">
                <ArchiveTeam />
                <UpdateTeam />
                <AddTeam />
            </main>
        </Card>
    )
}
export default TeamManagementHeader;