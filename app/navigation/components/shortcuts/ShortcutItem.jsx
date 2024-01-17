/* eslint-disable react/display-name */

import React, { forwardRef } from "react";
import ShortcutsOptionsModal from "./ShortcutsOptionsModal";
import { MenuItem } from "react-pro-sidebar";
import { MdBookmark } from "react-icons/md";
import { Link } from "@nextui-org/react";

const shortcutSize = 28; //icon size
const Item = forwardRef(({ children, id, link, unique_key, ...props }, ref) => {
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
      <Link isExternal href={link} className="text-black-default"></Link>
      {children}
    </MenuItem>
  );
});

export default Item;
