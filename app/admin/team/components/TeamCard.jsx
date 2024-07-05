import {
    Card,
    CardHeader,
    CardBody,
    Tabs,
    Tab,
} from "@nextui-org/react";
const TeamCard = ({ children }) => {
    return (
        <Card>
            <CardHeader>
                <h2>Team Card</h2>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
}

export default TeamCard;