import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  roleAtom,
  selectedRoleAtom,
  userRolesAtom,
} from "../store/NavSideBarStore";
import { routesUser } from "./RoutesIconDetails";
import RoleBadge from "./navbar/RoleBadge";
import UserDropdown from "./navbar/UserDropdown";
import NotificationsDropdown from "./notifications/NotificationsDropdown";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = routesUser.map((details) => details.label);
  const router = useRouter();

  const selectedRole = useAtomValue(selectedRoleAtom);
  const userRoles = useAtomValue(userRolesAtom);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      position='static'
      // className="md:bg-blue-default"
      classNames={{
        base: "flex justify-end m-0 p-0 bg-blue-default",
        wrapper: "xxs:max-sm:mr-2 xxs:max-sm:pr-2 mr-16 pr-16 py-2",
      }}
    >
      {/* <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent> */}

      {/* <NavbarContent justify="center">
        <NavbarItem>
          <Image
            radius="none"
            alt="Aretex Logo"
            src="/header.png"
            className="md:hidden"
          />
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-6">
          <UserDropdown />
        </NavbarItem>
        <NavbarItem className="flex items-center gap-6">
          {userRoles.includes(selectedRole) && <RoleBadge />}
        </NavbarItem>
        <NavbarItem className="flex items-center gap-6">
          <NotificationsDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"foreground"}
              className='w-full'
              size='lg'
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
