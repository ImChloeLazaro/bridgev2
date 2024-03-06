import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { MdInfoOutline } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { profileAboutAtom } from "../../store/ProfileStore";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const AboutInfo = ({ data }) => {
  const auth = useAtomValue(authenticationAtom);
  const aboutProfile = useAtomValue(profileAboutAtom);
  console.log("ABOUT PROFILE", aboutProfile);

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
              {aboutProfile.employee_number ?? "No Data Available"}
            </p>
          </div>
          <Divider />
          {/* // ### STATUS */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <p className="font-medium text-base w-1/2 min-w-[50%]">
              {"Status"}
            </p>

            {aboutProfile.status ? (
              <LabelTagChip
                text={aboutProfile.status ? "Active" : "Inactive"}
                color={aboutProfile.status ? "green" : "red"}
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
              {aboutProfile.hiredate != null
                ? format(new Date(aboutProfile.hiredate), "MMMM dd yyyy")
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
              {/* <Avatar
                radius="full"
                size="md"
                src={aboutProfile.supervisor.picture ?? "/defaulthead.png"}
                alt="Supervisor Profile picture"
              /> */}
              <div className="text-black-default">
                <IoPersonCircle size={36} />
              </div>
              <p className="">{data.supervisor.name ?? "No Team Record"}</p>
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
              {data.address === "N/A"
                ? "No Data Available"
                : data.address ?? "No Data Available"}
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
              {data.contactNumber === "N/A"
                ? "No Data Available"
                : data.contactNumber ?? "No Data Available"}
            </p>
          </div>
          <Divider />

          {/* // ### Birthday */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base ">{"Birthday"}</p>
            </div>
            <p className="">
              {data.birthday != null
                ? format(new Date(data.birthday), "MMMM dd yyyy")
                : "No Data Available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
