/* eslint-disable react/display-name */
import { Link } from "@nextui-org/react";
import { forwardRef, useMemo } from "react";
import { MdBookmark } from "react-icons/md";
import { MenuItem, menuClasses } from "react-pro-sidebar";
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
        suffix={
          <ShortcutsOptionsModal
            unique_key={unique_key}
            url={url}
            title={children}
          />
        }
        // return {
        //   width: "16rem",
        //   backgroundColor: active ? "#D0D0D0" : "#f9f9f9",
        //   paddingRight: "0rem",
        //   paddingLeft: active ? "0.875rem" : "0.375rem",
        //   cursor: active ? "grabbing" : "grab",
        //   ":hover": {
        //     backgroundColor: "#D0D0D0",
        //     paddingLeft: "0.875rem",
        //   },
        //   ":focus": {
        //     backgroundColor: "#D0D0D0",
        //   },
        //   ":active": {
        //     cursor: "grabbing",
        //   },
        // };
        rootStyles={{
          ["." + menuClasses.button]: {
            width: "100%",
            backgroundColor: "#f9f9f9",
            paddingRight: "0rem",
            paddingLeft: "0.375rem",
            cursor: "grab",
            "&:hover": {
              backgroundColor: "#D0D0D0",
              paddingLeft: "0.875rem",
            },
            "&:focus": {
              backgroundColor: "#D0D0D0",
            },
            "&:active": {
              cursor: "grabbing",
              backgroundColor: "#D0D0D0",
              paddingLeft: "0.875rem",
              cursor: "grabbing",
            },
          },
        }}
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
