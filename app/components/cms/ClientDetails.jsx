import CTAButtons from "@/app/components/CTAButtons";
import { Avatar } from "@nextui-org/react";
import { MdInsertDriveFile } from "react-icons/md";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import ClientInfo from "./ClientInfo";
import { MdCameraAlt } from "react-icons/md";
import IconButton from "../IconButton";

const ClientDetails = ({ showClientDetails, selectedClient }) => {
  const clientInfo = selectedClient[0];

  const checkStatusBookkeeper = (
    <div className="min-w-fit flex items-center gap-2 text-green-default">
      <RiCheckboxCircleFill size={18} />
      <p className="text-xs lg:text-base font-medium text-black-default">
        {"From Another Bookkeeper"}
      </p>
    </div>
  );

  const wrongStatusBookkeeper = (
    <div className="min-w-fit flex items-center gap-2 text-red-default">
      <RiCloseCircleFill size={18} />
      <p className="text-xs lg:text-base font-medium text-black-default">
        {"From Another Bookkeeper"}
      </p>
    </div>
  );

  const checkStatusAccountant = (
    <div className="min-w-fit flex items-center gap-2 text-green-default">
      <RiCheckboxCircleFill size={18} />
      <p className="text-xs lg:text-base font-medium text-black-default">
        {"Accountant Firm"}
      </p>
    </div>
  );

  const wrongStatusAccountant = (
    <div className="min-w-fit flex items-center gap-2 text-red-default">
      <RiCloseCircleFill size={18} />
      <p className="text-xs lg:text-base font-medium text-black-default">
        {"Accountant Firm"}
      </p>
    </div>
  );

  return (
    <div
      data-show={showClientDetails}
      className="hidden data-[show=true]:block px-0 md:px-6"
    >
      <div className="flex gap-2 justify-between items-center">
        <div className="w-full flex gap-6 px-1 items-center relative z-20 ">
          <div className="flex -mr-6">
            <div className="relative z-20 ">
              <Avatar
                // as={Button}
                // onPress={()=>{console.log("AVATAR CHANGE PROFILE PICTURE")}}
                // radius="full"
                src={clientInfo?.company.picture}
                classNames={{
                  base: "data-[hover=true]:bg-darkgrey-default w-[6rem] h-[6rem] lg:w-[8rem] lg:h-[8rem] text-large border-8 border-white-default ",
                  img: "data-[hover=true]:bg-darkgrey-default",
                }}
              />
            </div>

            <div className="flex relative mt-6 lg:mt-8 right-[35%] translate-x-1/2 translate-y-1/2 z-30">
              <IconButton
                className="bg-grey-hover hover:bg-darkgrey-default"
                radius="full"
              >
                <MdCameraAlt size={16} />
              </IconButton>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start">
            <p className="min-w-fit ml-0 lg:ml-1 text-xl lg:text-2xl font-extrabold text-darkgrey-hover leading-4 mb-3">
              {clientInfo?.company.name}
            </p>
            <p className="min-w-fit ml-0 lg:ml-2 text-sm lg:text-base font-medium text-darkgrey-hover leading-5">
              {clientInfo?.company.contact_number}
            </p>
            <p className="min-w-fit ml-0 lg:ml-2 text-sm lg:text-base font-medium text-darkgrey-hover leading-5">
              {clientInfo?.company.email}
            </p>
            {/* <div className="flex gap-2 flex-row md:flex-col">
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
            </div> */}
          </div>
        </div>

        <div className="hidden md:flex w-full flex-col gap-4 items-start justify-between">
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
                  className={"text-xs md:text-sm lg:text-base"}
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
