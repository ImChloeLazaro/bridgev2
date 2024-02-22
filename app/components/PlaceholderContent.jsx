import { Link } from "@nextui-org/react";
import { useAtom } from "jotai";
import {
  routesAdmin,
  routesHR,
  routesTeamLead,
  routesUser,
} from "../navigation/components/RoutesIconDetails";
import { selectedRoleAtom } from "../navigation/store/NavSideBarStore";

const PlaceholderContent = () => {
  const [role] = useAtom(selectedRoleAtom);
  const routes =
    role == "admin"
      ? routesAdmin
      : role == "hr"
      ? routesHR
      : role == "tl"
      ? routesTeamLead
      : routesUser;
  return (
    <>
      <div className="h-fit flex flex-col items-center justify-center bg-background">
        <div className="text-base">{role}</div>
        {routes.map((route) => (
          <Link
            key={route.key}
            href={route.link}
            color="primary"
            variant="ghost"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PlaceholderContent;
