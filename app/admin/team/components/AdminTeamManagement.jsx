'use client'
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TeamManagementHeader from "./Header";
import TeamCard from "./TeamCard";
import TeamList from "./TeamList";
const AdminTeamManagement = () => {
    return (
        <Card className="flex w-full h-full my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl overflow-auto">
            <TeamManagementHeader />
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options">
                    <Tab key="active" title="Active Teams">
                        <TeamCard>
                            <TeamList />
                        </TeamCard>
                        <TeamCard>
                            <TeamList />
                        </TeamCard>
                    </Tab>
                    <Tab key="archive" title="Archive Team">
                        <Card>
                            <CardBody>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </Card>

    )
}
export default AdminTeamManagement;