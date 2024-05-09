import {
  Button,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { IoApps } from "react-icons/io5";
import { RxExternalLink } from "react-icons/rx";
import { Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { externalLinks } from "../RoutesIconDetails";

const ExternalLinks = () => {
  return (
    <Popover placement="bottom-start" showArrow={true} className="shadow-base ">
      <PopoverTrigger>
        <Button
          aria-label={"External Links"}
          isIconOnly
          className="p-6 text-orange-default bg-white-default hover:bg-grey-hover rounded-xl"
        >
          <div>
            <IoApps size={28} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 w-full flex">
          <Menu
            rootStyles={{
              [`.${menuClasses.icon}`]: {
                backgroundColor: "rgb(var(--aretex-orange))",
                borderRadius: "0.313rem",
                color: "rgb(var(--aretex-white))",
              },
              [`.${menuClasses.button}`]: {
                borderRadius: "0.313rem",
                color: "rgb(var(--aretex-foreground))",
                marginBottom: "0.75rem",
                transition: "0.3s",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              },
              paddingTop: "0.6rem",
              rowGap: "0.75rem",
              display: "flex",
              width: "100%",
            }}
            menuItemStyles={{
              label: () => {
                return {
                  marginLeft: "0.30rem",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  fontWeight: 700,
                };
              },
              button: ({ level }) => {
                // only apply styles on first level elements of the tree
                if (level === 0) {
                  return {
                    paddingLeft: "0.375rem",
                    width: "20rem",
                    ":hover": {
                      backgroundColor: "rgb(var(--aretex-grey-hover))",
                      paddingLeft: "0.875rem",
                    },
                    ":focus": {
                      backgroundColor: "rgb(var(--aretex-grey-hover))",
                    },
                  };
                }
              },
            }}
          >
            <div className="flex items-center justify-between pt-1 pr-4 pb-3 pl-3 ">
              <div className="text-xl font-bold">{"Switch To"}</div>
              <div className="text-black-default">
                <RxExternalLink size={28} />
              </div>
            </div>
            {externalLinks.map((sidebarButtons) => (
              <MenuItem
                key={sidebarButtons.key}
                icon={sidebarButtons.icon}
                component={<Link isExternal href={sidebarButtons.link} />}
              >
                {sidebarButtons.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExternalLinks;
