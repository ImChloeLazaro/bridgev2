import { Card, CardHeader, CardBody } from "@nextui-org/react";
import TeamPopover from "./Popover/PopoverContent";
import TeamList from "./TeamList";
const TeamCard = ({ data, updateTeamInList }) => {
    console.log('UPDATED LIST',data, updateTeamInList);
    return (
        <Card className="m-4">
            <CardHeader className="flex justify-between">
                <h2>{data.name}</h2>
                <TeamPopover data={data} updateTeamInList={updateTeamInList} />
            </CardHeader>
            <CardBody className="h-64 overflow-auto">
                <TeamList
                    team={data.name}
                    head={data.heads[0].name}
                    members={data.members}
                />
            </CardBody>
        </Card>
    );
};

export default TeamCard;
