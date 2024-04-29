import { Link } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { Menu, MenuItem, Sidebar, menuClasses } from "react-pro-sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import Shortcuts from "./shortcuts/Shortcuts";
import SideBarHeader from "./sidebar/SideBarHeader";

const DrawerSideBar = () => {
  const fetchRole = useSetAtom(fetchRoleAtom);
  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

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

  const handleSidebarButtonsActive = (sidebarKey) => {
    for (let key in activeRoutes) {
      if (key === sidebarKey) {
        setActiveRoutes((prev) => {
          return { ...prev, [key]: true };
        });
      } else {
        setActiveRoutes((prev) => {
          return { ...prev, [key]: false };
        });
      }
    }
  };

  return (
    <Drawer className='hidden xs:max-md:flex' direction='left'>
      <DrawerTrigger asChild>
        <div className='hover:cursor hidden xxs:max-md:block  xxs:max-md:fixed sm:top-[70px] top-[80px] z-40 left-8'>
          <RxHamburgerMenu size={32} color='var(--aretex-orange)' />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className='md:w-96  flex flex-col max-h-screen bg-white-default '>
          {/* <Suspense fallback={<Loading />}> */}

          <div className='py-5 px-2'>
            <SideBarHeader />
          </div>

          <Sidebar
            // customBreakPoint='760px'
            rootStyles={{
              // change sidebar Tailwind CSS here
              width: "100%",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              marginBottom: "4rem",

              backgroundColor: "var(--aretex-white)",
            }}
          >
            <Menu
              key='navigation'
              rootStyles={{
                [`.${menuClasses.icon}`]: {
                  backgroundColor: "var(--aretex-orange)",
                  borderRadius: "0.313rem",
                  color: "var(--aretex-white)",
                },
                [`.${menuClasses.button}`]: {
                  borderRadius: "0.313rem",
                  color: "var(--aretex-black)",
                  marginBottom: "0.75rem",
                  transition: "0.3s",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                },
                padding: "0.5rem",
                paddingRight: "2.5rem",
                backgroundColor: "var(--aretex-white)",
              }}
              menuItemStyles={{
                root: () => {
                  return {
                    gap: "7rem",
                  };
                },
                label: () => {
                  return {
                    marginLeft: "0.30rem",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    fontWeight: 700,
                  };
                },
                button: ({ level, active }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0) {
                    return {
                      width: "16rem",
                      backgroundColor: active
                        ? "var(--aretex-grey-hover)"
                        : "var(--aretex-white)",
                      paddingLeft: active ? "0.875rem" : "0.375rem",
                      ":hover": {
                        backgroundColor: "var(--aretex-grey-hover)",
                        paddingLeft: "0.875rem",
                      },
                      ":focus": {
                        backgroundColor: "var(--aretex-grey-hover)",
                      },
                    };
                  }
                },
              }}
            >
              {routes &&
                routes.map((sidebarButtons) => (
                  <MenuItem
                    key={sidebarButtons.key}
                    active={activeRoutes[sidebarButtons.key]}
                    icon={sidebarButtons.icon}
                    component={
                      <Link
                        href={sidebarButtons.link}
                        onPress={() => {
                          handleSidebarButtonsActive(sidebarButtons.key);
                        }}
                      />
                    }
                  >
                    {sidebarButtons.label.toUpperCase()}
                  </MenuItem>
                ))}
            </Menu>
          </Sidebar>
          {/* </Suspense> */}
          {/* <Suspense fallback={<Loading />}> */}
          <div>
            <Shortcuts />
          </div>
          {/* </Suspense> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSideBar;
