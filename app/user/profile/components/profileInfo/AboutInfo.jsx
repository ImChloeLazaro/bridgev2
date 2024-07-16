import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import {
  employeeInfoAtom,
  personalInfoAtom,
  teamStatusAtom,
} from "../../store/ProfileStore";

const AboutInfo = () => {
  const personalInfo = useAtomValue(personalInfoAtom);
  const teamStatus = useAtomValue(teamStatusAtom);

  const { response: data } = useAtomValue(employeeInfoAtom);
  return (
    <>
      {/* // ### EMPLOYEE INFORMATION} */}
      <div className='mt-2 mb-8 lg:mb-12 py-2 w-full '>
        <div className='flex justify-start items-center gap-2 mb-8'>
          <p className='font-bold text-lg'>{"Employee Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className='flex flex-col items-start gap-4 '>
          {/* // ### ID Number */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <div className='flex-col w-1/2'>
              <p className='font-medium text-base'>{"ID Number"}</p>
              <p className='font-medium text-sm text-darkgrey-default'>
                {"This is your employee ID"}
              </p>
            </div>
            <p className='w-1/2'>
              {data?.employee_number ?? "No Data Available"}
            </p>
          </div>
          <Divider />
          {/* // ### STATUS */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <p className='font-medium text-base w-1/2'>{"Status"}</p>
            <div className='w-1/2'>
              {data?.is_active ? (
                <LabelTagChip
                  text={data?.is_active ? "Active" : "Inactive"}
                  color={data?.is_active ? "green" : "red"}
                  className={"rounded-[0.4rem]"}
                />
              ) : (
                <LabelTagChip
                  text={"Unavailable"}
                  color={"lightgrey"}
                  className={"rounded-[0.4rem]"}
                />
              )}
            </div>
          </div>
          <Divider />

          {/* // ### REGULARIZATION */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <div className='flex-col w-1/2'>
              <p className='font-medium text-base'>{"Regularization"}</p>
              <p className='font-medium text-sm text-darkgrey-default'>
                {"6 months after your start date"}
              </p>
            </div>
            <p className='w-1/2'>
              {data?.hiredate != null
                ? format(new Date(data?.hiredate), "MMMM dd yyyy")
                : "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### IMMEDIATE HEAD */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <p className='font-medium text-base w-1/2'>{"Immediate Head"}</p>
            <div className='flex items-center gap-2 w-1/2'>
              <Avatar
                radius='full'
                size='md'
                src={
                  teamStatus?.immediate_head?.picture ?? "/male-user-circle.png"
                }
                alt='Supervisor Profile picture'
              />
              <p className='w-1/2'>
                {teamStatus?.immediate_head?.name ?? "No Team Record"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* // ### PERSONAL INFORMATION*/}
      <div className='mt-2 py-2 w-full'>
        <div className='flex justify-start items-center gap-2 mb-5'>
          <p className='font-bold text-lg'>{"Personal Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className='flex flex-col items-start gap-4'>
          {/* // ### ADDRESS */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <div className='flex-col w-1/2'>
              <p className='font-medium text-base'>{"Address"}</p>
              <p className='font-medium text-sm text-darkgrey-default'>
                {"This is your current address"}
              </p>
            </div>
            <p className='w-1/2'>
              {personalInfo.address ?? "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### CONTACT NUMBER */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <div className='flex-col w-1/2'>
              <p className='font-medium text-base'>{"Contact Number"}</p>
              <p className='font-medium text-sm text-darkgrey-default'>
                {"This is your current  contact number"}
              </p>
            </div>
            <p className='w-1/2'>
              {personalInfo.contact ?? "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### Birthday */}
          <div className='flex justify-start items-center gap-16 lg:gap-10 w-full'>
            <div className='flex-col w-1/2'>
              <p className='font-medium text-base '>{"Birthday"}</p>
            </div>
            <p className='w-1/2'>
              {personalInfo.birthday === null ||
              personalInfo.birthday === undefined ||
              personalInfo.birthday === ""
                ? "No Data Available"
                : format(new Date(personalInfo.birthday), "MMMM dd yyyy")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
