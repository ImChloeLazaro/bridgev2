/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import ShortcutsOptionsModal from "./ShortcutsOptionsModal";

import { Link } from "@nextui-org/react";
import { MdBookmark, MdDragIndicator } from "react-icons/md";
import { MenuItem } from "react-pro-sidebar";

const shortcutSize = 28; //icon size

const ShortcutItem = forwardRef(
  ({ children, id, link, unique_key, ...props }, ref) => {
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
        <Link isExternal href={link} className="w-full text-black-default hover:underline decoration-2 hover:underline-offset-4 ">
          {children}
        </Link>
      </MenuItem>
    );
  }
);

export default ShortcutItem;
