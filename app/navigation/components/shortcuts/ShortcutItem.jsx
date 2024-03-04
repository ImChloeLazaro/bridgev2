/* eslint-disable react/display-name */
import { Link } from "@nextui-org/react";
import { forwardRef, useMemo } from "react";
import { MdBookmark } from "react-icons/md";
import { MenuItem } from "react-pro-sidebar";
import ShortcutsOptionsModal from "./ShortcutsOptionsModal";

const shortcutSize = 28; //icon size

const ShortcutItem = forwardRef(
  ({ children, index, url, unique_key, ...props }, ref) => {
    let shortcutURL = url;

    const validateURL = (urlString) =>
      urlString.match(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
      );

    const isURLvalid = useMemo(() => {
      return validateURL(shortcutURL) ? true : false;
    }, [shortcutURL]);

    shortcutURL = isURLvalid ? shortcutURL : "";
    
    return (
      <MenuItem
        {...props}
        ref={ref}
        component="div"
        icon={<MdBookmark size={shortcutSize} />}
        suffix={<ShortcutsOptionsModal unique_key={unique_key} url={url} title={children} />}
      >
        <Link
          isExternal
          href={shortcutURL}
          className="w-full text-black-default hover:underline decoration-2 hover:underline-offset-4 "
        >
          {children}
        </Link>
      </MenuItem>
    );
  }
);

export default ShortcutItem;
