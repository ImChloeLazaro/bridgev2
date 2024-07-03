'use client'
import { Card } from "@nextui-org/react";
import TeamManagementHeader from "./Header";
import TeamCard from "./TeamCard";
const AdminTeamManagement = () => {
    return (
        <Card className="flex w-full h-full my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl overflow-auto">
            <TeamManagementHeader />
            <TeamCard />
        </Card>
        
    )
}
export default AdminTeamManagement;