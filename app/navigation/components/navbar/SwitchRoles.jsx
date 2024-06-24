import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";
import { selectedRoleAtom, roleAtom } from "../../store/NavSideBarStore";

const SwitchRoles = () => {
  const roles = useAtomValue(roleAtom);
  const setRoles = useSetAtom(selectedRoleAtom);

  const labelRoles = (role) => {
    if (role === "user") {
      return "User";
    }
    if (role === "admin") {
      return "Admin";
    }
    if (role === "hr") {
      return "HR";
    }
    if (role === "tl") {
      return "Team Lead";
    }
  };

  const roleList = roles.map((role) => {
    return { key: role, label: labelRoles(role), link: `/${role}` };
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
