"use client";
import React from "react";
import PlaceholderContent from "../../components/PlaceholderContent";
import { useRoles } from "@/app/utils/roles";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/store/UserStore";
const Offboarding = () => {
  const users = useAtomValue(userAtom).role; 
  const roles = useRoles(users);
  return <PlaceholderContent/>;
};

export default Offboarding;
