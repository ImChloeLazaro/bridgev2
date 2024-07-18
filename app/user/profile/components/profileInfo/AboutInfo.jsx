import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { format, isValid } from "date-fns";
import { useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import { personalInfoAtom, teamStatusAtom } from "../../store/ProfileStore";

import Information from "@/app/components/profile/Information";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";

const AboutInfo = () => {
  const { profileData, recruitment } = useAtomValue(personalInfoAtom);
  // const personalInfo = response?.profileData;
  // const data = response?.recruitment;
  const teamEmployee = useAtomValue(teamStatusAtom);

  return (
    <>
      <div className="mt-2 mb-8 lg:mb-12 py-2 w-full ">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Employee Information"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col items-start gap-4 ">
          <Information
            data={recruitment?.employee_number}
            title={"ID Number"}
            subTitle={"This is your employee ID"}
            type="number"
          />

          <Information
            data={recruitment?.is_active}
            title={"Status"}
            type="chip"
          />

          <Information
            data={recruitment?.hiredate}
            title={"Regularization"}
            subTitle={"6 months after your start date"}
            type="date"
          />

          <Information
            data={teamEmployee?.immediate_head?.name}
            title={"Immediate Head"}
            type="avatar"
            picture={teamEmployee?.immediate_head?.picture}
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
            data={profileData.address}
            title={"Address"}
            subTitle={"This is your current address"}
            type="text"
          />

          <Information
            data={profileData.contact}
            title={"Contact Number"}
            subTitle={"This is your current  contact number"}
            type="text"
          />

          <Information
            data={profileData.birthdate}
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
