import { Chip } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { roleAtom } from "../../store/NavSideBarStore";

const RoleBadge = () => {
  const role = useAtomValue(roleAtom);

  return (
    <Chip
      size="lg"
      radius="sm"
      classNames={{
        base: "px-4 text-base bg-orange-default",
        content: "font-bold text-white-default",
      }}
    >
      {role.toUpperCase()}
    </Chip>
  );
};

export default RoleBadge;
