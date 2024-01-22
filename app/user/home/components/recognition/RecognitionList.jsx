import React from "react";
import RecognitionOptions from "./RecognitionOptions";
import { recognitionsAtom } from "../../store/RecognitionsStore";

import { Listbox, ListboxItem } from "@nextui-org/react";

import { BiDotsVerticalRounded } from "react-icons/bi";

import { format, differenceInMinutes } from "date-fns";
import { enAU } from "date-fns/locale/en-AU";

import { useAtomValue, useAtom } from "jotai";

const RecognitionList = () => {
  const recognitions = useAtomValue(recognitionsAtom);

  const options = [
    { key: "pin", label: "Pin this recognition" },
    { key: "archive", label: "Archive recognition" },
  ];

  return (
    <Listbox
      items={recognitions}
      aria-label="Recognition List"
      onAction={(key) => console.log(key)} // ### TODO Add Functionality to view recognition
      emptyContent={
        <div className="w-full p-0 flex flex-col items-center mt-6">
          {/* <Image
              width={180}
              height={180}
              alt={"No Notifications"}
              src={"/NoNotifications.jpg"}
            /> */}
          <p className="font-medium text-black-default/80">
            {"No Recognitions right now!"}
          </p>
          <p className="font-medium text-black-default/80">
            {"Come back later!"}
          </p>
        </div>
      }
      classNames={{
        base: ["w-full h-auto p-2 m-0 overflow-y-scroll"],
        list: "w-full pl-0 mx-0 ",
      }}
      itemClasses={{
        base: [
          "mx-0 my-2 p-2 w-full flex",
          "data-[hover=true]:bg-grey-default bg-white-default ",
          "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
        ],
        wrapper: "w-full",
      }}
    >
      {(recognition) => {
        const result = differenceInMinutes(
          new Date(),
          new Date(recognition.datetime)
        );
        const datetimeReceived = format(result, "m", {
          locale: enAU,
        });

        return (
          <ListboxItem textValue={recognition.title} key={recognition.id}>
            <div className="flex items-start justify-center gap-4">
              <div className="p-2 w-18 h-18 flex justify-center">
                {recognition.icon}
              </div>
              <div className="w-full">
                <p className="font-extrabold text-lg truncate w-56">
                  {recognition.title}
                </p>
                <p className="font-medium text-md truncate w-56">
                  {recognition.description}
                </p>
                <p className="font-normal text-sm">{`${datetimeReceived} mins ago`}</p>
              </div>
              <RecognitionOptions
                trigger={<BiDotsVerticalRounded size={28} />}
                options={options}
              />
            </div>
          </ListboxItem>
        );
      }}
    </Listbox>
  );
};

export default RecognitionList;
