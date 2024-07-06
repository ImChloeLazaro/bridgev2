"use client";
import { userAtom } from "@/app/store/UserStore";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import PlaceholderContent from "../components/PlaceholderContent";
const HumanResource = () => {
  const users = useAtomValue(userAtom).role;
  const roles = useRoles(users);
  return <PlaceholderContent />;
};

export default HumanResource;
