import { userAtom } from "@/app/store/UserStore";
import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";
import { selectedRoleAtom } from "../../store/NavSideBarStore";
const SwitchRoles = () => {
  const users = useAtomValue(userAtom).role;
  const setRoles = useSetAtom(selectedRoleAtom);

  const roleList = users.map((user) => {
    const userRoleLowerCase = user.name.toLowerCase();

    const roleLabels = {
      user: "User",
      admin: "Admin",
      tl: "Team Lead",
      hr: "Human Resource",
    };
    // let userRoleUpperCase;

    // switch (user.name) {
    //   case "TL":
    //     userRoleUpperCase = "Team Leader";
    //     break;
    //   case "HR":
    //     userRoleUpperCase = "Human Resource";
    //     break;
    //   default:
    //     userRoleUpperCase =
    //       user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();
    //     break;
    // }
    return {
      key: userRoleLowerCase,
      label: roleLabels[userRoleLowerCase],
      link: `/${userRoleLowerCase}`,
    };
  });

  return (
    <Accordion isCompact className="text-base font-medium">
      <AccordionItem
        key="switch"
        aria-label="Switch Roles"
        title="Switch Roles"
        indicator={<MdChevronRight size={24} />}
      >
        <Listbox
          items={roleList}
          aria-label="Actions"
          onAction={setRoles}
          className={"p-0"}
          itemClasses={{
            base: [
              "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            title: ["text-base font-normal"],
          }}
        >
          {(role) => (
            <ListboxItem key={role.key} href={role.link} textValue={role.key}>
              {role.label}
            </ListboxItem>
          )}
        </Listbox>
      </AccordionItem>
    </Accordion>
  );
};
export default SwitchRoles;
