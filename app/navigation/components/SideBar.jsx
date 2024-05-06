import { Link, cn } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import {
  activeAdminRouteAtom,
  activeHRRouteAtom,
  activeTLRouteAtom,
  activeUserRouteAtom,
  fetchRoleAtom,
  selectedRoleAtom,
  sidebarBreakpointAtom,
  sidebarToggleAtom,
} from "../store/NavSideBarStore";
import {
  routesAdmin,
  routesHR,
  routesTeamLead,
  routesUser,
} from "./RoutesIconDetails";
import Shortcuts from "./shortcuts/Shortcuts";
import SideBarHeader from "./sidebar/SideBarHeader";
import IconButton from "@/app/components/IconButton";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ShortcutsHeader from "./shortcuts/ShortcutsHeader";

const SideBar = () => {
  const fetchRole = useSetAtom(fetchRoleAtom);
  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const breakpoint = "1023";

  const [toggled, setToggled] = useAtom(sidebarToggleAtom);
  const [broken, setBroken] = useState(
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

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
    <div className="h-full flex flex-col lg:justify-start justify-center items-center ">
      <Sidebar
        width={"300px"}
        style={{ backgroundColor: "#f9f9f9" }}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        customBreakPoint={`${breakpoint}px`}
        onBreakPoint={setBroken}
        rootStyles={{
          width: "14rem",
          height: "100%",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          overflowY: "auto",
        }}
      >
        <Menu
          key="navigation"
          rootStyles={{
            [`.${menuClasses.button}`]: {
              borderRadius: "0.313rem",
              color: "#393939",
              marginBottom: "0.75rem",
              transition: "0.3s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            padding: "0.5rem",
            height: "100%",
            backgroundColor: "#f9f9f9",
          }}
        >
          {!broken ? (
            <SideBarHeader />
          ) : (
            <div className="flex items-center justify-between mt-6 pl-2 pb-4 bg-white-default">
              <p className="text-xl font-bold">{"NAVIGATION"}</p>
            </div>
          )}
          {routes &&
            routes.map((sidebarButtons) => {
              if (sidebarButtons.key === "empower") {
                return (
                  <SubMenu
                    label={sidebarButtons.label.toUpperCase()}
                    active={activeRoutes[sidebarButtons.key]}
                    key={sidebarButtons.key}
                    icon={sidebarButtons.icon}
                    rootStyles={{
                      // change sidebar Tailwind CSS here
                      ["." + menuClasses.label]: {
                        marginLeft: "0.30rem",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        fontWeight: 700,
                      },
                      ["." + menuClasses.icon]: {
                        backgroundColor: "#EF8916",
                        borderRadius: "0.313rem",
                        color: "#f9f9f9",
                      },
                      ["." + menuClasses.button]: {
                        // width: "100%",
                        backgroundColor: "#f9f9f9",
                        paddingRight: "0rem",
                        paddingLeft: "0.375rem",
                        "&:hover": {
                          backgroundColor: "#D0D0D0",
                          paddingLeft: "0.875rem",
                        },
                        "&:focus": {
                          backgroundColor: "#D0D0D0",
                        },
                        "&:active": {
                          backgroundColor: "#D0D0D0",
                          paddingLeft: "0.875rem",
                        },
                      },
                      ["." + menuClasses.subMenuContent]: {
                        backgroundColor: "#f9f9f9",
                        ["." + menuClasses.icon]: {
                          backgroundColor: "transparent",
                          borderRadius: "0.313rem",
                          color: "#393939",
                        },
                        ["." + menuClasses.button]: {
                          // width: "100%",
                          backgroundColor: "#f9f9f9",
                          paddingRight: "0rem",
                          paddingLeft: "1.875rem",
                          "&:hover": {
                            color: "#EF8916",
                            paddingLeft: "0.875rem",
                            ["." + menuClasses.icon]: {
                              color: "#EF8916",
                            },
                            backgroundColor: "#EF891620",
                          },
                          "&:focus": {
                            backgroundColor: "#EF891620",
                          },
                          "&:active": {
                            paddingLeft: "0.875rem",
                          },
                        },
                      },
                    }}
                    component={
                      <Link
                        href={sidebarButtons.link}
                        onPress={() => {
                          handleSidebarButtonsActive(sidebarButtons.key);
                        }}
                      />
                    }
                  >
                    {sidebarButtons.routes.map((subRoute) => {
                      return (
                        <MenuItem
                          key={subRoute.key}
                          active={activeRoutes[subRoute.key]}
                          icon={subRoute.icon}
                          component={
                            <Link
                              href={subRoute.link}
                              onPress={() => {
                                handleSidebarButtonsActive(subRoute.key);
                              }}
                            />
                          }
                        >
                          {subRoute.label.toUpperCase()}
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
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
                    rootStyles={{
                      ["." + menuClasses.icon]: {
                        backgroundColor: "#EF8916",
                        borderRadius: "0.313rem",
                        color: "#f9f9f9",
                      },
                      ["." + menuClasses.label]: {
                        marginLeft: "0.30rem",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        fontWeight: 700,
                      },
                      ["." + menuClasses.button]: {
                        // width: "100%",
                        backgroundColor: "#f9f9f9",
                        paddingRight: "0rem",
                        paddingLeft: "0.375rem",
                        "&:hover": {
                          backgroundColor: "#D0D0D0",
                          paddingLeft: "0.875rem",
                        },
                        "&:focus": {
                          backgroundColor: "#D0D0D0",
                        },
                        "&:active": {
                          backgroundColor: "#D0D0D0",
                          paddingLeft: "0.875rem",
                        },
                      },
                    }}
                  >
                    {sidebarButtons.label.toUpperCase()}
                  </MenuItem>
                );
              }
            })}
          <ShortcutsHeader />
          <Shortcuts />
        </Menu>
      </Sidebar>

      {broken && (
        <IconButton
          size="sm"
          className={cn(
            "fixed left-0 z-50 -ml-2",
            "h-16",
            "bg-orange-default hover:bg-orange-hover/80 text-white-default"
          )}
          onPress={() => {
            console.log("TOGGLED: ", toggled);
            setToggled(!toggled);
            console.log("TOGGLED: ", toggled);
          }}
        >
          <MdOutlineKeyboardArrowRight size={24} />
        </IconButton>
      )}
    </div>
  );
};

export default SideBar;
