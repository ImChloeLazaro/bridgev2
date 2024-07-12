import { Listbox, ListboxItem, Image } from "@nextui-org/react";
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
import MiniUnderContstruction from "@/app/components/MiniUnderContstruction";

// @refresh reset
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
    <div className="h-full">
      <Listbox
        items={recognitions}
        aria-label="Recognition List"
        className="hidden"
        onAction={(key) => console.log(key)}
        emptyContent={
          <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
            <Image
              width={280}
              height={280}
              alt={"No Recognition"}
              src={"/no-recognition.png"}
            />
            <p className="text-sm xl:text-base font-medium text-black-default/80">
              {"You don't have recognitions lately"}
            </p>
            <p className="text-sm xl:text-base font-medium text-black-default/80">
              {"Don't worry! You got this!"}
            </p>
          </div>
        }
        classNames={{
          base: ["w-full h-auto overflow-y-auto"],
          list: "flex gap-4",
        }}
        itemClasses={{
          base: [
            // "my-2",
            "data-[hover=true]:bg-grey-default bg-white-default ",
            "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
          ],
        }}
      >
        {(recognition) => {
          return (
            <ListboxItem textValue={recognition.title} key={recognition.id}>
              <div className="my-2 flex items-start justify-between">
                <div className="pl-2 xl:pl-4 pr-1 xl:pr-2 my-2 mr-1 xl:mr-2.5 flex items-center justify-center">
                  {recognition.icon}
                </div>
                <div className="flex flex-col px-0 md:px-6 lg:px-2 w-[12rem] sm:w-full md:w-full lg:w-[10rem] 2xl:w-[20rem]">
                  <p className="font-extrabold text-md xl:text-lg truncate w-full lg:w-20 xl:w-full">
                    {recognition.title}
                  </p>
                  <p className="font-medium text-sm xl:text-md truncate w-full lg:w-20 xl:w-52">
                    {recognition.description}
                  </p>
                  <p className="font-medium text-xs">{`${handleRecognitionDateTime(
                    recognition.datetime
                  )}`}</p>
                </div>
                <RecognitionOptions
                  trigger={<BiDotsVerticalRounded size={24} />}
                  options={options}
                />
              </div>
            </ListboxItem>
          );
        }}
      </Listbox>
      <div className="h-full">
        <MiniUnderContstruction />
      </div>
    </div>
  );
};

export default RecognitionList;
