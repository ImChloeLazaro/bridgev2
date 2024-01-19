import React from "react";
import TrainingOptions from "./TrainingOptions";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { format } from "date-fns";
import { enAU } from "date-fns/locale/en-AU";

import { trainingsAtom } from "../../store/TrainingStore";
import { useAtomValue, useAtom } from "jotai";

const TrainingList = () => {
  const trainings = useAtomValue(trainingsAtom);

  const options = [
    { key: "edit", label: "Edit training" },
    { key: "cancel", label: "Cancel training" },
  ];

  return (
    <Listbox
      items={trainings}
      aria-label="Training List"
      onAction={(key) => console.log(key)}
      emptyContent={
        <div className="w-full p-0 flex flex-col items-center mt-6">
          {/* <Image
              width={180}
              height={180}
              alt={"No Notifications"}
              src={"/NoNotifications.jpg"}
            /> */}
          <p className="font-medium text-black-default/80">
            No Trainings right now!
          </p>
          <p className="font-medium text-black-default/80">Come back later!</p>
        </div>
      }
      classNames={{
        base: ["w-full h-72 p-2 m-0 overflow-y-scroll no-scrollbar"],
        list: "w-full pl-0 ml-0 ",
      }}
      itemClasses={{
        base: [
          "ml-0 my-2 mr-2 p-0 w-full flex",
          "data-[hover=true]:bg-grey-default bg-white-default ",
          "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
        ],
        wrapper: "w-full",
      }}
    >
      {(training) => {
        const startTime = format(new Date(training.datetimeStart), "p", {
          locale: enAU,
        }); // h:mm aa
        const endTime = format(new Date(training.datetimeEnd), "p", {
          locale: enAU,
        }); // h:mm aa
        return (
          <ListboxItem textValue={training.title} key={training.id}>
            <div className="flex items-center justify-center gap-4">
              <div
                className={`py-4 m-0 basis-1/5 bg-${training.color}-default text-white-default rounded-l-md`}
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="font-extrabold text-2xl">4</p>
                  <p className="font-medium text-base uppercase">OCT</p>
                  <p className="font-light text-xs">Tue</p>
                </div>
              </div>
              <div className="basis-4/5">
                <p className="font-extrabold text-lg truncate w-56">
                  {training.title}
                </p>
                <p className="font-medium text-md truncate w-56">
                  {training.description}
                </p>
                <p className="font-normal text-sm">{`${startTime} - ${endTime}`}</p>
              </div>
              <TrainingOptions
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

export default TrainingList;
