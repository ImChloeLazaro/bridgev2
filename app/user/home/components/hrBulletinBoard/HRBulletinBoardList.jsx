import React from "react";
import ChipTag from "../../../../components/ChipTag";
import { hrBulletinBoardAtom } from "../../store/HRBulletinBoardStore";

import { Listbox, ListboxItem } from "@nextui-org/react";

import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import { enAU } from "date-fns/locale/en-AU";

import { useAtomValue, useAtom } from "jotai";

const HRBulletinBoardList = () => {
  const hrBulletinBoard = useAtomValue(hrBulletinBoardAtom);

  const handleHRBulletinDateTime = (datetime) => {
    const daysAgo = differenceInDays(new Date(), new Date(datetime));

    const hrsAgo = differenceInHours(new Date(), new Date(datetime));

    const minsAgo = differenceInMinutes(new Date(), new Date(datetime));

    const dateAgo = format(new Date(datetime), "d MMM yyyy");
    return daysAgo > 7
      ? dateAgo
      : hrsAgo > 23
      ? `${daysAgo} ${daysAgo > 1 ? "days" : "day"}`
      : minsAgo > 59
      ? `${hrsAgo} ${hrsAgo > 1 ? "hrs" : "hr"}`
      : minsAgo > 0
      ? `${minsAgo} ${minsAgo > 1 ? "mins" : "min"}`
      : "now";
  };

  return (
    <Listbox
      items={hrBulletinBoard}
      aria-label="HR Bulletin List"
      onAction={(key) => console.log(key)}
      emptyContent={
        <div className="w-full p-0 flex flex-col items-center mt-6">
          {/* // ### TODO Add No announcement illustration */}
          {/* <Image
              width={180}
              height={180}
              alt={"No Notifications"}
              src={"/NoNotifications.jpg"}
            /> */}
          <p className="font-medium text-black-default/80">
            {"No announcements right now!"}
          </p>
          <p className="font-medium text-black-default/80">
            {"Come back later!"}
          </p>
        </div>
      }
      classNames={{
        base: ["w-full h-auto p-2 m-0 mb-2 overflow-y-scroll"],
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
      {(hrBulletin) => {
        return (
          <ListboxItem textValue={hrBulletin.title} key={hrBulletin.id}>
            <div className="flex flex-col items-center justify-start px-4 py-4 my-2 gap-4">
              <div className="flex w-full justify-between px-2">
                <div className="flex flex-col">
                  <p className="font-extrabold text-lg">{hrBulletin.title}</p>
                  <ChipTag
                    text={`New ${hrBulletin.type}`}
                    color={`${hrBulletin.color}`}
                  />
                </div>
                <p className="font-normal text-sm">{`${handleHRBulletinDateTime(hrBulletin.datetime)}`}</p>
              </div>
              <div className="flex flex-col w-full px-2">
                <p className="font-medium text-md leading-tight whitespace-pre-line line-clamp-3">
                  {hrBulletin.description}
                </p>
                <div className="bg-grey-hover rounded-md mt-3 w-full h-32"></div>
              </div>
            </div>
          </ListboxItem>
        );
      }}
    </Listbox>
  );
};

export default HRBulletinBoardList;
