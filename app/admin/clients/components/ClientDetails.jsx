import { Avatar } from "@nextui-org/react";
import ClientInfo from "./ClientInfo";
import CTAButtons from "@/app/components/CTAButtons";
import { MdInsertDriveFile } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import { BsPersonCheckFill } from "react-icons/bs";

const ClientDetails = ({ showClientDetails, selectedClient }) => {
  const clientInfo = selectedClient[0];
  console.log("clientInfo.documents", clientInfo);

  const checkStatusBookkeeper = (
    <div className="flex items-center gap-2 text-green-default">
      <RiCheckboxCircleFill size={24} />
      <p className="text-base font-medium text-black-default">
        {"From Another Bookkeeper"}
      </p>
    </div>
  );

  const wrongStatusBookkeeper = (
    <div className="flex items-center gap-2 text-red-default">
      <RiCloseCircleFill size={24} />
      <p className="text-base font-medium text-black-default">
        {"From Another Bookkeeper"}
      </p>
    </div>
  );

  const checkStatusAccountant = (
    <div className="flex items-center gap-2 text-green-default">
      <RiCheckboxCircleFill size={24} />
      <p className="text-base font-medium text-black-default">
        {"Accountant Firm"}
      </p>
    </div>
  );

  const wrongStatusAccountant = (
    <div className="flex items-center gap-2 text-red-default">
      <RiCloseCircleFill size={24} />
      <p className="text-base font-medium text-black-default">
        {"Accountant Firm"}
      </p>
    </div>
  );

  return (
    <div
      data-show={showClientDetails}
      className="hidden data-[show=true]:block px-6"
    >
      <div className="flex gap-16 justify-between items-center">
        <div className="w-full flex gap-5 px-1 items-center relative z-20 ">
          <div className="flex">
            <div className="relative z-20 ">
              <Avatar
                // as={Button}
                // onPress={()=>{console.log("AVATAR CHANGE PROFILE PICTURE")}}
                // radius="full"
                src={clientInfo?.company.picture}
                alt="Image Placeholder"
                classNames={{
                  base: "data-[hover=true]:bg-darkgrey-default w-[140px] h-[140px] text-large border-8 border-white-default ",
                  img: "data-[hover=true]:bg-darkgrey-default",
                }}
              />
            </div>

            {/* // CAMERA ICON FOR PROFILE */}
            <div className="relative z-30 -ml-10 mt-[5.8rem] h-fit">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#D9D9D9" />
                <mask
                  id="mask0_1905_59068"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="8"
                  y="8"
                  width="24"
                  height="24"
                >
                  <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_1905_59068)">
                  <path
                    d="M19.999 25.5C21.249 25.5 22.3115 25.0625 23.1865 24.1875C24.0615 23.3125 24.499 22.25 24.499 21C24.499 19.75 24.0615 18.6875 23.1865 17.8125C22.3115 16.9375 21.249 16.5 19.999 16.5C18.749 16.5 17.6865 16.9375 16.8115 17.8125C15.9365 18.6875 15.499 19.75 15.499 21C15.499 22.25 15.9365 23.3125 16.8115 24.1875C17.6865 25.0625 18.749 25.5 19.999 25.5ZM19.999 23.5C19.299 23.5 18.7074 23.2583 18.224 22.775C17.7407 22.2917 17.499 21.7 17.499 21C17.499 20.3 17.7407 19.7083 18.224 19.225C18.7074 18.7417 19.299 18.5 19.999 18.5C20.699 18.5 21.2907 18.7417 21.774 19.225C22.2574 19.7083 22.499 20.3 22.499 21C22.499 21.7 22.2574 22.2917 21.774 22.775C21.2907 23.2583 20.699 23.5 19.999 23.5ZM11.999 29C11.449 29 10.9782 28.8042 10.5865 28.4125C10.1949 28.0208 9.99902 27.55 9.99902 27V15C9.99902 14.45 10.1949 13.9792 10.5865 13.5875C10.9782 13.1958 11.449 13 11.999 13H15.149L16.999 11H22.999L24.849 13H27.999C28.549 13 29.0199 13.1958 29.4115 13.5875C29.8032 13.9792 29.999 14.45 29.999 15V27C29.999 27.55 29.8032 28.0208 29.4115 28.4125C29.0199 28.8042 28.549 29 27.999 29H11.999Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="flex-col">
            <p className="ml-1 text-2xl font-extrabold text-darkgrey-hover leading-4 mb-3">
              {clientInfo?.company.name}
            </p>
            <p className="ml-2 text-base font-medium text-darkgrey-hover leading-5">
              {clientInfo?.company.contact_number}
            </p>
            <p className="ml-2 text-base font-medium text-darkgrey-hover leading-5">
              {clientInfo?.company.email}
            </p>
            <div className="flex justify-center items-center gap-4 mt-2">
              {clientInfo?.another_bookkeeper === undefined
                ? "No Data Available"
                : clientInfo?.another_bookkeeper
                ? checkStatusBookkeeper
                : wrongStatusBookkeeper}
              {clientInfo?.with_accountant === undefined
                ? "No Data Available"
                : clientInfo?.with_accountant
                ? checkStatusAccountant
                : wrongStatusAccountant}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 items-start justify-between">
          {clientInfo?.documents !== undefined &&
            Object.values(clientInfo?.documents).map((document, index) => {
              return (
                <CTAButtons
                  key={index}
                  startContent={<MdInsertDriveFile size={20} />}
                  label={document}
                  color={"clear"}
                  endContent={
                    <div className="flex items-center gap-2 text-green-default">
                      <RiCheckboxCircleFill size={18} />
                    </div>
                  }
                />
              );
            })}
        </div>
      </div>
      <div className="mx-4 mt-4">
        <ClientInfo selectedClient={selectedClient} />
      </div>
    </div>
  );
};

export default ClientDetails;
