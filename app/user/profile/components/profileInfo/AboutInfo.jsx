import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import {
  personalInfoAtom,
  teamStatusAtom,
} from "../../store/ProfileStore";

import Information from "@/app/components/profile/Information";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";

const AboutInfo = () => {
  const { response } = useAtomValue(personalInfoAtom);
  const personalInfo = response?.profileData;
  const data = response?.recruitment;
  const teamStatus = useAtomValue(teamStatusAtom);
  // const { response: data } = useAtomValue(employeeInfoAtom);
  console.log("response: ", response);
  console.log("personal info: ", personalInfo);
  console.log("teamStatus info: ", teamStatus);
  console.log("data info: ", data);
  return (
    <>
      <div className="mt-2 mb-8 lg:mb-12 py-2 w-full ">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Employee Information"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col items-start gap-4 ">
          <Information
            data={data?.employee_number}
            title={"ID Number"}
            subTitle={"This is your employee ID"}
            type="text"
          />

          <Information data={data?.is_active} title={"Status"} type="chip" />

          <Information
            data={data?.hiredate}
            title={"Regularization"}
            subTitle={"6 months after your start date"}
            type="date"
          />

          <Information
            data={teamStatus?.immediate_head?.name}
            title={"Immediate Head"}
            type="avatar"
            picture={teamStatus?.immediate_head?.picture}
            divider={false}
          />
        </div>
      </div>

      <div className="mt-2 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-5">
          <p className="font-bold text-lg">{"Personal Information"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col items-start gap-4">
          <Information
            data={personalInfo.address}
            title={"Address"}
            subTitle={"This is your current address"}
            type="text"
          />

          <Information
            data={personalInfo.contact}
            title={"Contact Number"}
            subTitle={"This is your current  contact number"}
            type="text"
          />

          <Information
            data={personalInfo.birthday}
            title={"Birthday"}
            type="date"
            divider={false}
          />
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
