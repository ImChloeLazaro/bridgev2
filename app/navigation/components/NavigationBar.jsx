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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { routesUser } from "./RoutesIconDetails";
import RoleBadge from "./navbar/RoleBadge";
import UserDropdown from "./navbar/UserDropdown";
import NotificationsDropdown from "./notifications/NotificationsDropdown";

import { useEffect } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { roleAtom, userRolesAtom } from "../store/NavSideBarStore";
//to be clean
//Amplify config.
// import { Amplify } from "aws-amplify";
// import  config  from "../../../src/amplifyconfiguration.json";
// import { signOut } from "aws-amplify/auth";

// Amplify.configure(config)

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = routesUser.map((details) => details.label);
  const router = useRouter();

  const role = useAtomValue(roleAtom);
  const [userRoles] = useAtom(userRolesAtom);

  const pathname = usePathname();
  const setRole = useSetAtom(roleAtom);

  const checkRoleFromURL = pathname
    .split("/") // split the pathname
    .filter((e) => e.length != 0)[0] // removes the empty strings and only the first element is selected
    .toLowerCase();

  // ### TODO Badge and Sidebar still persists when switching to user role
  
  useEffect(() => {
    if (userRoles.includes(checkRoleFromURL)) {
      setRole(checkRoleFromURL);
    }
  });

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
          <UserDropdown signout={() => console.log("signout me")} />
          {userRoles.includes(role) && <RoleBadge />}
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
