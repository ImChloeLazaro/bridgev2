import { Listbox, ListboxItem } from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useAtomValue } from "jotai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { recognitionsAtom } from "../../store/RecognitionsStore";
import RecognitionOptions from "./RecognitionOptions";

const RecognitionList = () => {
  const recognitions = useAtomValue(recognitionsAtom);

  const options = [
    { key: "pin", label: "Pin this recognition" },
    { key: "archive", label: "Archive recognition" },
  ];

  const handleRecognitionDateTime = (datetime) => {
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
                <p className="font-normal text-sm">{`${handleRecognitionDateTime(recognition.datetime)}`}</p>
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
