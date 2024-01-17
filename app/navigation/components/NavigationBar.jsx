import React from "react";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";
import UserDropdown from "./navbar/UserDropdown";
import NotificationsDropdown from "./notifications/NotificationsDropdown";
import RoleBadge from "./navbar/RoleBadge";
import { routesUser } from "./RoutesIconDetails";
import { useRouter } from "next/navigation";

import { useHydrateAtoms } from 'jotai/utils'
import { useAtom } from "jotai";
import { roleAtom, userRolesAtom } from "../store/NavSideBarStore";
//to be clean
//Amplify config.
// import { Amplify } from "aws-amplify";
// import  config  from "../../../src/amplifyconfiguration.json";
// import { signOut } from "aws-amplify/auth";

// Amplify.configure(config)


const NavigationBar = ({roleSentFromServer}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = routesUser.map((details) => details.label);
  const router = useRouter();

  useHydrateAtoms([[roleAtom, roleSentFromServer]]) 
  const [role] = useAtom(roleAtom);
  const [userRoles] = useAtom(userRolesAtom);
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      position="static"
      className="md:bg-blue-default"
    >
      <NavbarContent>
        <NavbarMenuToggle
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
        <NavbarItem className="flex items-center gap-6">
          <UserDropdown signout={() => console.log('signout me')}/>
          {userRoles.includes(role) && (
            <RoleBadge/>
          )}
          <NotificationsDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"foreground"}
              className="w-full"
              size="lg"
              onPress={() => router.push("/")}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
