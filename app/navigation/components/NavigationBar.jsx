import LabelTagChip from "@/app/components/LabelTagChip";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import {
  Image,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { signOut } from "aws-amplify/auth";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import {
  activeAdminRouteAtom,
  activeHRRouteAtom,
  activeTLRouteAtom,
  activeUserRouteAtom,
  userOptionsAtom,
  userRolesAtom,
} from "../store/NavSideBarStore";
import UserDropdown from "./navbar/UserDropdown";
import NotificationsDropdown from "./notifications/NotificationsDropdown";
import {
  externalLinks,
  routesAdmin,
  routesHR,
  routesTeamLead,
  routesUser,
} from "./RoutesIconDetails";
// @refresh reset

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userOptions = useAtomValue(userOptionsAtom);
  // const selectedRole = useAtomValue(selectedRoleAtom);
  const userRoles = useAtomValue(userRolesAtom);
  const [activeUserRoute, setActiveUserRoute] = useAtom(activeUserRouteAtom);
  const [activeAdminRoute, setActiveAdminRoute] = useAtom(activeAdminRouteAtom);
  const [activeTLRoute, setActiveTLRoute] = useAtom(activeTLRouteAtom);
  const [activeHRRoute, setActiveHRRoute] = useAtom(activeHRRouteAtom);

  const user = useAtomValue(userAtom);
  const selectedRole = useRoles(user.role);

  const role = selectedRole.currentRole.toLowerCase();

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

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      position="static"
      classNames={{
        base: "flex justify-end m-0 p-0 bg-white-default lg:bg-blue-default",
        wrapper:
          "mr-2 pr-4 my-[0.3rem] md:mr-6 md:pr-6 lg:mr-8 lg:pr-8 xl:mr-16 xl:pr-16",
        // toggleIcon: "text-white-default",
        menu: "hover:text-white-default text-black-default",
      }}
    >
      <NavbarContent justify="start">
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
          className="lg:hidden"
        />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Image
            radius="none"
            alt="Aretex Logo"
            src="/header.png"
            className="lg:hidden"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2 lg:gap-4">
        <NavbarItem className="flex items-center gap-2 lg:gap-6">
          <UserDropdown />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex items-center gap-2 lg:gap-6">
          {selectedRole?.currentRole !== "USER" ? (
            <LabelTagChip
              text={selectedRole?.currentRole}
              color="orange"
              isFilled={true}
            />
          ) : null}
        </NavbarItem>
        <NavbarItem className="flex items-center gap-2 lg:gap-6">
          <NotificationsDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {Object.values(externalLinks).map((externalLink) => {
          return (
            <NavbarMenuItem
              key={externalLink.key}
              className="hover:bg-orange-default rounded p-2"
            >
              <Link
                href={externalLink.link}
                size="md"
                className="px-2 text-base font-medium"
              >
                {externalLink.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {/* {Object.values(userOptions).map((option) => {
          if (option.key === "logout") {
            return (
              <NavbarMenuItem
                key={option.key}
                className="hover:bg-red-default rounded p-2"
              >
                <Link
                  href=""
                  size="md"
                  className="px-2 text-base font-medium hover:text-white-default text-black-default"
                  onPress={handleSignOut}
                >
                  {option.label}
                </Link>
              </NavbarMenuItem>
            );
          } else {
            return (
              <NavbarMenuItem
                key={option.key}
                className="hover:bg-orange-default rounded p-2"
              >
                <Link
                  href=""
                  size="md"
                  className="px-2 text-base font-medium hover:text-white-default text-black-default"
                >
                  {option.label}
                </Link>
              </NavbarMenuItem>
            );
          }
        })} */}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
