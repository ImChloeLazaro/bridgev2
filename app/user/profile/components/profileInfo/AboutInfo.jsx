import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { MdInfoOutline } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import {
  employeeInfoAtom,
  personalInfoAtom,
  teamStatusAtom,
} from "../../store/ProfileStore";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const AboutInfo = ({ data }) => {
  const personalInfo = useAtomValue(personalInfoAtom);
  const employeeInfo = useAtomValue(employeeInfoAtom);
  const teamStatus = useAtomValue(teamStatusAtom);

  console.log("ABOUT PROFILE", personalInfo);

  return (
    <>
      {/* // ### EMPLOYEE INFORMATION} */}
      <div className="mt-2 mb-12 py-2 w-full ">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Employee Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4 ">
          {/* // ### ID Number */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"ID Number"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is your employee ID"}
              </p>
            </div>
            <p className="">
              {employeeInfo.employee_number ?? "No Data Available"}
            </p>
          </div>
          <Divider />
          {/* // ### STATUS */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <p className="font-medium text-base w-1/2 min-w-[50%]">
              {"Status"}
            </p>

            {employeeInfo.is_active ? (
              <LabelTagChip
                text={employeeInfo.is_active ? "Active" : "Inactive"}
                color={employeeInfo.is_active ? "green" : "red"}
              />
            ) : (
              <LabelTagChip text={"Unavailable"} color={"lightgrey"} />
            )}
          </div>
          <Divider />

          {/* // ### REGULARIZATION */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Regularization"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"6 months after your start date"}
              </p>
            </div>
            <p className="">
              {employeeInfo.hiredate != null
                ? format(new Date(employeeInfo.hiredate), "MMMM dd yyyy")
                : "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### IMMEDIATE HEAD */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <p className="font-medium text-base w-1/2 min-w-[50%]">
              {"Immediate Head"}
            </p>
            <div className="flex items-center gap-2">
              <Avatar
                radius="full"
                size="md"
                src={teamStatus.immediate_head?.picture ?? "/male-user-circle.png"}
                alt="Supervisor Profile picture"
              />
              <p className="">
                {teamStatus.immediate_head?.name ?? "No Team Record"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* // ### PERSONAL INFORMATION*/}
      <div className="mt-2 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-5">
          <p className="font-bold text-lg">{"Personal Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4">
          {/* // ### ADDRESS */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Address"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is your current address"}
              </p>
            </div>
            <p className="">
              {personalInfo.address === "N/A"
                ? "No Data Available"
                : personalInfo.address ?? "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### CONTACT NUMBER */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base">{"Contact Number"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is your current  contact number"}
              </p>
            </div>
            <p className="">
              {personalInfo.contact === "N/A"
                ? "No Data Available"
                : personalInfo.contact ?? "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### Birthday */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base ">{"Birthday"}</p>
            </div>
            <p className="">
              {personalInfo.birthday != null
                ? format(new Date(personalInfo.birthday), "MMMM dd yyyy")
                : "No Data Available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
