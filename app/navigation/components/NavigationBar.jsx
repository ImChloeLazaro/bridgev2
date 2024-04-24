import {
  Link,
  Image,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { userRolesAtom } from "../store/NavSideBarStore";
import RoleBadge from "./navbar/RoleBadge";
import UserDropdown from "./navbar/UserDropdown";
import NotificationsDropdown from "./notifications/NotificationsDropdown";
import { MdMenu } from "react-icons/md";
import {
  activeAdminRouteAtom,
  activeHRRouteAtom,
  activeTLRouteAtom,
  activeUserRouteAtom,
  fetchRoleAtom,
  selectedRoleAtom,
} from "../store/NavSideBarStore";
import {
  routesAdmin,
  routesHR,
  routesTeamLead,
  routesUser,
} from "./RoutesIconDetails";
// @refresh reset

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedRole = useAtomValue(selectedRoleAtom);
  const userRoles = useAtomValue(userRolesAtom);
  const [activeUserRoute, setActiveUserRoute] = useAtom(activeUserRouteAtom);
  const [activeAdminRoute, setActiveAdminRoute] = useAtom(activeAdminRouteAtom);
  const [activeTLRoute, setActiveTLRoute] = useAtom(activeTLRouteAtom);
  const [activeHRRoute, setActiveHRRoute] = useAtom(activeHRRouteAtom);

  const role = useAtomValue(selectedRoleAtom);

  const activeRoutes = role.includes("admin")
    ? activeAdminRoute
    : role.includes("hr")
    ? activeHRRoute
    : role.includes("tl")
    ? activeTLRoute
    : role.includes("user") && activeUserRoute;

  const setActiveRoutes = role.includes("admin")
    ? setActiveAdminRoute
    : role.includes("hr")
    ? setActiveHRRoute
    : role.includes("tl")
    ? setActiveTLRoute
    : role.includes("user") && setActiveUserRoute;

  const routes = role.includes("admin")
    ? routesAdmin
    : role.includes("hr")
    ? routesHR
    : role.includes("tl")
    ? routesTeamLead
    : role.includes("user") && routesUser;

  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      position="static"
      // className="md:bg-blue-default"
      classNames={{
        base: "flex justify-end m-0 p-0 bg-white-default md:bg-blue-default",
        wrapper:
          "mr-4 pr-4 my-[0.3rem] sm:mr-8 sm:pr-8 md:mr-12 md:pr-12 lg:mr-16 lg:pr-16",
        // toggleIcon: "text-white-default",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          icon={
            <div>
              <MdMenu
                className="text-orange-default"
                fill="currentColor"
                size={36}
              />
            </div>
          }
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Image
            radius="none"
            alt="Aretex Logo"
            src="/header.png"
            className="md:hidden"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex items-center gap-2 md:gap-6">
          <UserDropdown />
        </NavbarItem>
        <NavbarItem className="flex items-center gap-2 md:gap-6">
          {userRoles.includes(selectedRole) && <RoleBadge />}
        </NavbarItem>
        <NavbarItem className="flex items-center gap-2 md:gap-6">
          <NotificationsDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {routes.map((item, index) => (
          <NavbarMenuItem key={`${item.key}-${index}`}>
            <Link className="w-full" size="lg" href={item.link}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
