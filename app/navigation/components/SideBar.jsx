import { Link } from "@nextui-org/react";
import { Menu, MenuItem, Sidebar, menuClasses } from "react-pro-sidebar";
import {
  routesAdmin,
  routesHR,
  routesTeamLead,
  routesUser,
} from "./RoutesIconDetails";

import Shortcuts from "./shortcuts/Shortcuts";
import SideBarHeader from "./sidebar/SideBarHeader";

import { useAtom, useAtomValue } from "jotai";

import { activeRouteAtom, roleAtom } from "../store/NavSideBarStore";

const SideBar = () => {
  // ### TODO Fix active state of navigation when clicked

  const [isActive, setIsActive] = useAtom(activeRouteAtom);
  const role = useAtomValue(roleAtom);

  console.log("ROLE IN SIDEBAR: ", role);

  const handleSidebarButtonsActive = (sidebarKey) => {
    console.log("Before Active");
    console.log(isActive);

    for (let key in isActive) {
      if (key === sidebarKey) {
        setIsActive((prev) => ({ ...prev, [key]: true }));
      } else {
        setIsActive((prev) => ({ ...prev, [key]: false }));
      }
    }
    console.log("After Active");
    console.log(isActive);
  };
  const routes =
    role == "admin"
      ? routesAdmin
      : role == "hr"
      ? routesHR
      : role == "tl"
      ? routesTeamLead
      : role == "user" && routesUser;

  return (
    <div className="sm:max-md:w-0 md:w-96 flex flex-col max-h-screen gap-12 bg-white-default ">
      <Sidebar
        customBreakPoint="760px"
        rootStyles={{
          // change sidebar Tailwind CSS here
          width: "100%",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          "@media (max-width: 767px)": { display: "none", width: "0%" },
          backgroundColor: "#f9f9f9",
        }}
      >
        <Menu
          key="navigation"
          rootStyles={{
            [`.${menuClasses.icon}`]: {
              backgroundColor: "#EF8916",
              borderRadius: "0.313rem",
              color: "#f9f9f9",
            },
            [`.${menuClasses.button}`]: {
              borderRadius: "0.313rem",
              color: "#393939",
              marginBottom: "0.75rem",
              transition: "0.3s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            padding: "0.5rem",
            paddingRight: "2.5rem",
            backgroundColor: "#f9f9f9",
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
                  backgroundColor: active ? "#D0D0D0" : "#f9f9f9",
                  paddingLeft: active ? "0.875rem" : "0.375rem",
                  ":hover": {
                    backgroundColor: "#D0D0D0",
                    paddingLeft: "0.875rem",
                  },
                  ":focus": {
                    backgroundColor: "#D0D0D0",
                  },
                };
              }
            },
          }}
        >
          <div className="py-5">
            <SideBarHeader />
          </div>

          {routes &&
            routes.map((sidebarButtons) => (
              <MenuItem
                key={sidebarButtons.key}
                active={isActive[sidebarButtons.key]}
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
      <Shortcuts />
    </div>
  );
};

export default SideBar;
