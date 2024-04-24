import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut } from "aws-amplify/auth";
import { useAtomValue } from "jotai";
import "../../../aws-auth";
import { userAtom } from "../../../store/UserStore";
import { isVisibleJobTitleAtom } from "../../../user/profile/store/ProfileStore";
import SwitchRoles from "./SwitchRoles";
import { userOptionsAtom } from "../../store/NavSideBarStore";

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const UserDropdown = () => {
  // const userOptions = {
  //   switch: { key: "switch", label: "Switch Roles" },
  //   settings: { key: "settings", label: "Settings" },
  //   help: { key: "help", label: "Help & Feedback" },
  //   logout: { key: "logout", label: "Log out" },
  // };

  const userOptions = useAtomValue(userOptionsAtom);

  const user = useAtomValue(userAtom);
  const isVisibleJobTitle = useAtomValue(isVisibleJobTitleAtom);

  return (
    <Dropdown
      placement="bottom-end"
      type="listbox"
      shouldCloseOnBlur={true}
      closeOnSelect={false}
      shouldFlip={true}
      isKeyboardDismissDisabled={true}
    >
      <DropdownTrigger>
        <User
          as="button"
          description={isVisibleJobTitle && user.position}
          name={user.name}
          avatarProps={{
            showFallback: true,
            fallback: (
              <div className="text-lg font-medium ">{user?.name[0]}</div>
            ),
            src: user.picture,
            isBordered: true,
            alt: "User Profile Picture",
          }}
          className="transition-transform mr-3"
          classNames={{
            base: ["gap-3 "],
            name: [
              "md:text-white-default",
              "max-md:hidden",
              "pl-1",
              "text-lg font-bold",
            ],
            description: ["max-md:hidden", "pl-0.5"],
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Account Options"
        // onAction={(key) => console.log(key)}
        itemClasses={{
          base: [
            "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
          ],
          title: ["text-base font-medium"],
        }}
      >
        <DropdownItem
          key={userOptions.switch.key}
          className={"font-medium data-[hover=true]:bg-transparent p-0 "}
          textValue={userOptions.switch.key}
        >
          <SwitchRoles />
        </DropdownItem>

        <DropdownItem key={userOptions.settings.key}>
          {userOptions.settings.label}
        </DropdownItem>
        <DropdownItem key={userOptions.help.key}>
          {userOptions.help.label}
        </DropdownItem>
        <DropdownItem
          key={userOptions.logout.key}
          className="data-[hover=true]:bg-red-default"
          onPress={handleSignOut}
        >
          {userOptions.logout.label}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default withAuthenticator(UserDropdown);
