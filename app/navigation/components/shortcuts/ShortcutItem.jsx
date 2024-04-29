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
        component={"div"}
        ref={ref}
        icon={<MdBookmark size={shortcutSize} />}
        rootStyles={{
          ["." + menuClasses.icon]: {
            color: "var(--aretex-orange)",
          },
          ["." + menuClasses.label]: {
            marginLeft: "0.30rem",
            fontSize: "1rem",
            lineHeight: "1.5rem",
            fontWeight: 700,
          },
          ["." + menuClasses.button]: {
            // width: "100%",
            backgroundColor: "var(--aretex-white)",
            paddingRight: "0rem",
            paddingLeft: "0.375rem",
            cursor: "grab",
            "&:hover": {
              backgroundColor: "var(aretex-grey-hover)",
              paddingLeft: "0.875rem",
            },
            "&:focus": {
              backgroundColor: "var(aretex-grey-hover)",
            },
            "&:active": {
              cursor: "grabbing",
              backgroundColor: "var(aretex-grey-hover)",
              paddingLeft: "0.875rem",
            },
          },
        }}
      >
        <div className='flex justify-between'>
          <Link
            isExternal
            href={shortcutURL}
            className='w-full text-black-default hover:underline decoration-2 hover:underline-offset-4 '
          >
            {children}
          </Link>
          <ShortcutsOptionsModal
            unique_key={unique_key}
            url={url}
            title={children}
          />
        </div>
      </MenuItem>
    );
  }
);

export default ShortcutItem;
