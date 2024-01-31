/* eslint-disable react/display-name */
import { Link } from "@nextui-org/react";
import { forwardRef } from "react";
import { MdBookmark } from "react-icons/md";
import { MenuItem } from "react-pro-sidebar";
import ShortcutsOptionsModal from "./ShortcutsOptionsModal";

const shortcutSize = 28; //icon size

const ShortcutItem = forwardRef(
  ({ children, id, link, unique_key, ...props }, ref) => {
    let shortcutLink = link;
    if (!link.includes("https") || !link.includes("http")) {
      shortcutLink = `https://${link}`;
    }

    return (
      <MenuItem
        {...props}
        ref={ref}
        component="div"
        icon={<MdBookmark size={shortcutSize} />}
        suffix={
          <ShortcutsOptionsModal
            title={"Edit Shortcut"}
            unique_key={unique_key}
          />
        }
      >
        <Link
          isExternal
          href={shortcutLink}
          className="w-full text-black-default hover:underline decoration-2 hover:underline-offset-4 "
        >
          {children}
        </Link>
      </MenuItem>
    );
  }
);

export default ShortcutItem;
