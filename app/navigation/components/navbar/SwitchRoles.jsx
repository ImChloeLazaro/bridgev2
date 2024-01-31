import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";
import { roleAtom } from "../../store/NavSideBarStore";

export function SwitchRoles() {
  const setRole = useSetAtom(roleAtom);

  return (
    <Accordion isCompact className="text-base font-medium">
      <AccordionItem
        key="switch"
        aria-label="Switch Roles"
        title="Switch Roles"
        indicator={<MdChevronRight size={24} />}
      >
        <Listbox
          aria-label="Actions"
          onAction={setRole}
          itemClasses={{
            base: [
              "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            title: ["text-base font-normal"],
          }}
        >
          <ListboxItem key="admin" href="/admin">
            {"Admin"}
          </ListboxItem>
          <ListboxItem key="tl" href="/tl">
            {"Team Lead"}
          </ListboxItem>
          <ListboxItem key="hr" href="/hr">
            {"HR"}
          </ListboxItem>
          <ListboxItem key="user" href="/user">
            {"User"}
          </ListboxItem>
        </Listbox>
      </AccordionItem>
    </Accordion>
  );
}
