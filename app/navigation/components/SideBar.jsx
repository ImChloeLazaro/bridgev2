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
  cmsPathsAtom,
  fetchRoleAtom,
  selectedRoleAtom,
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
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ShortcutsHeader from "./shortcuts/ShortcutsHeader";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const fetchRole = useSetAtom(fetchRoleAtom);
  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const pathname = usePathname();

  const cmsPaths = useAtomValue(cmsPathsAtom);
  const collapseSidebar = cmsPaths.includes(pathname ?? "/");

  const customBreakPoint = "1023";

  const [toggled, setToggled] = useAtom(sidebarToggleAtom);
  const [broken, setBroken] = useState(
    window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
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
    <div className="h-full relative z-50 flex lg:justify-start justify-center items-center ">
      <Sidebar
        width={"300px"}
        backgroundColor="rgb(var(--aretex-white))"
        collapsed={collapseSidebar && !toggled}
        collapsedWidth={broken ? "300px" : "0px"}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        customBreakPoint={`${customBreakPoint}px`}
        onBreakPoint={setBroken}
        transitionDuration={800}
        rootStyles={{
          width: "14rem",
          height: "100%",
          borderRightWidth: "0px",
          borderRightStyle: "none",
          borderColor: "transparent",
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
              color: "rgb(var(--aretex-black))",
              marginBottom: "0.75rem",
              transition: "0.3s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "rgb(var(--aretex-grey-hover))",
                paddingLeft: "0.875rem",
              },
              "&:focus": {
                backgroundColor: "rgb(var(--aretex-grey-hover))",
              },
              "&:active": {
                backgroundColor: "rgb(var(--aretex-grey-hover))",
                paddingLeft: "0.875rem",
              },
            },
            padding: "0.5rem",
            height: "100%",
          }}
        >
          {!broken ? (
            <SideBarHeader />
          ) : (
            <div className="flex items-center justify-between mt-6 pl-2 pb-4">
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
                    component={"div"}
                    rootStyles={{
                      // change sidebar Tailwind CSS here
                      // display: !toggled ? "none" : "block",
                      transition: "0.3s",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      ["." + menuClasses.label]: {
                        marginLeft: "0.30rem",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        fontWeight: 700,
                      },
                      ["." + menuClasses.icon]: {
                        backgroundColor: "rgb(var(--aretex-orange))",
                        borderRadius: "0.313rem",
                        color: "rgb(var(--aretex-white))",
                      },
                      ["." + menuClasses.button]: {
                        paddingRight: "0rem",
                        paddingLeft: "0.375rem",
                      },
                      ["." + menuClasses.subMenuContent]: {
                        backgroundColor: "rgb(var(--aretex-white))",
                        ["." + menuClasses.icon]: {
                          backgroundColor: "transparent",
                          borderRadius: "0.313rem",
                          color: "rgb(var(--aretex-black))",
                        },
                        ["." + menuClasses.button]: {
                          backgroundColor: "rgb(var(--aretex-white))",
                          paddingRight: "0rem",
                          paddingLeft: "1.875rem",
                          "&:hover": {
                            color: "rgb(var(--aretex-orange))",
                            paddingLeft: "0.875rem",
                            ["." + menuClasses.icon]: {
                              color: "rgb(var(--aretex-orange))",
                            },
                            backgroundColor: "rgb(var(--aretex-orange) / 0.13)",
                          },
                          "&:focus": {
                            backgroundColor: "rgb(var(--aretex-orange) / 0.13)",
                          },
                          "&:active": {
                            paddingLeft: "0.875rem",
                          },
                        },
                      },
                    }}
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
                        backgroundColor: "rgb(var(--aretex-orange))",
                        borderRadius: "0.313rem",
                        color: "rgb(var(--aretex-white))",
                      },
                      ["." + menuClasses.label]: {
                        marginLeft: "0.30rem",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        fontWeight: 700,
                      },
                      ["." + menuClasses.button]: {
                        paddingRight: "0rem",
                        paddingLeft: "0.375rem",
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

      {(broken || collapseSidebar) && (
        <>
          <div
            className={cn(
              `${
                !collapseSidebar
                  ? "-ml-2"
                  : broken
                  ? "-ml-2"
                  : "lg:-ml-4 lg:relative"
              }`,
              "fixed left-0 z-50 flex h-full justify-center items-center"
            )}
          >
            <IconButton
              aria-label={"SideBarToggleButton"}
              size="sm"
              className={cn(
                `${toggled ? "" : "pl-2"}`,
                "h-16 w-10",
                "bg-orange-default hover:bg-orange-hover/90 text-white-default"
              )}
              onPress={() => {
                setToggled(!toggled);
              }}
            >
              <div className="">
                {toggled ? (
                  <MdKeyboardArrowLeft size={24} />
                ) : (
                  <MdKeyboardArrowRight size={24} />
                )}
              </div>
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
