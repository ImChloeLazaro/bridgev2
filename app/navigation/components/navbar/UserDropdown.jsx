"use client";

import { SwitchRoles } from "./SwitchRoles";
import React from "react";
import {
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const userProfile = {
  name: "Tatiana Philips",
  email: "tatiana.philips@aretex.com.au",
  jobTitle: "Junior Data Analyst",
  profileURL: "/Tatiana Philips.png",
};

import "../../../aws-auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../../../store/UserStore";
import { signOut } from 'aws-amplify/auth';

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

const UserDropdown = () => {
  const options = {
    // { key: "avatar", label: userProfile.name },
    switch: { key: "switch", label: "Switch Roles" },
    settings: { key: "settings", label: "Settings" },
    help: { key: "help", label: "Help & Feedback" },
    logout: { key: "logout", label: "Log out" },
  };

  const router = useRouter();
  const user = useAtomValue(userAtom);

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
          // description={userProfile.email}
          name={user.name}
          avatarProps={{
            isBordered: true,
            src: user.picture,
            base: [
              "box-border bg-orange-default ring-0 ring-red ring-offset-0 ring-offset-red ring-opacity-0",
            ],
            img: ["w-10 h-10"],
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
            description: ["max-md:hidden", "pl-1.5"],
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
          key={options.switch.key}
          className={"font-medium data-[hover=true]:bg-transparent p-0 "}
          textValue={options.switch.key}
        >
          <SwitchRoles />
        </DropdownItem>

        <DropdownItem key={options.settings.key}>
          {options.settings.label}
        </DropdownItem>
        <DropdownItem key={options.help.key}>{options.help.label}</DropdownItem>
        <DropdownItem
          key={options.logout.key}
          className="data-[hover=true]:bg-red-default"
          onPress={handleSignOut}
        >
          {options.logout.label}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default withAuthenticator(UserDropdown);
