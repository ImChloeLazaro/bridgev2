import React from "react";
import { Chip } from "@nextui-org/react";
import { useAtom } from "jotai";
import { roleAtom } from "../store/NavSideBarStore";

const RoleBadge = () => {
  const [role] = useAtom(roleAtom);

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
