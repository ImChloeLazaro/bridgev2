import { Avatar, Divider } from "@nextui-org/react";
import { addMonths, format } from "date-fns";
import { MdInfoOutline } from "react-icons/md";
import LabelTag from "../../../../components/LabelTag";
const AboutInfo = ({ data }) => {
  return (
    <>
      {/* // ### EMPLOYEE INFORMATION} */}
      <div className="mt-2 mb-12 py-2 w-full">
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
            <p className="">{data.employee_number}</p>
          </div>
          <Divider />
          {/* // ### STATUS */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <p className="font-medium text-base w-1/2 min-w-[50%]">
              {"Status"}
            </p>
            <LabelTag text={data.is_active ? "Active" : "Inactive"} color={data.is_active ? "green" : "red"} />
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
            <p className="">{format(new Date(data.hiredate), "MMMM dd yyyy")}</p>
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
                src="/Madelyn Septimus.png"
                alt="Supervisor Profile picture"
              />
              <p className="">{data.supervisor}</p>
            </div>
          </div>
        </div>
      </div>
      {/* // ### PERSONAL INFORMATION*/}
      <div className="mt-2 mb-12 py-2 w-full">
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
            <p className="">{data.address}</p>
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
            <p className="">{data.contactNumber}</p>
          </div>
          <Divider />

          {/* // ### Birthday */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2 min-w-[50%]">
              <p className="font-medium text-base ">{"Birthday"}</p>
            </div>
            <p className="">No Data</p>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default AboutInfo;
