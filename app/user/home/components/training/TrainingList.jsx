import { Listbox, ListboxItem, Image, cn } from "@nextui-org/react";
import { format } from "date-fns";
import { enAU } from "date-fns/locale/en-AU";
import { useAtomValue } from "jotai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { trainingsAtom } from "../../store/TrainingStore";
import TrainingOptions from "./TrainingOptions";
import { Button } from "@/components/ui/button";
// @refresh reset
const TrainingList = () => {
  const trainings = useAtomValue(trainingsAtom);

  const options = [
    { key: "edit", label: "Edit training" },
    { key: "cancel", label: "Cancel training" },
  ];

  return (
    <Listbox
      items={trainings}
      aria-label='Training List'
      onAction={(key) => console.log(key)}
      emptyContent={
        <div className='w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center'>
          <Image
            width={180}
            height={180}
            alt={"No Training"}
            src={"/no-training.png"}
            classNames={{ img: "aspect-square lg:w-32 xl:w-44" }}
          />
          <p className="text-sm xl:text-base font-medium text-black-default/80">
            {"Feeling extra today?"}
          </p>

          <p className='text-sm xl:text-base font-medium text-black-default/80'>
            {"Start your training now!"}
          </p>
        </div>
      }
      classNames={{
        base: ["w-full h-auto overflow-y-auto"],
        list: "flex gap-2",
      }}
      itemClasses={{
        base: [
          "p-0",
          "data-[hover=true]:bg-grey-default bg-white-default ",
          "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
        ],
      }}
    >
      {(training) => {
        const smallStartTime = format(new Date(training.datetimeStart), "h b", {
          locale: enAU,
        }); // h:mm aa
        const smallEndTime = format(new Date(training.datetimeEnd), "h b", {
          locale: enAU,
        }); // h:mm aa
        const startTime = format(new Date(training.datetimeStart), "p", {
          locale: enAU,
        }); // h:mm aa
        const endTime = format(new Date(training.datetimeEnd), "p", {
          locale: enAU,
        }); // h:mm aa
        const postDay = format(new Date(training.datetimeEnd), "d", {
          locale: enAU,
        }); // h:mm aa
        const postDate = format(new Date(training.datetimeEnd), "EEE", {
          locale: enAU,
        }); // h:mm aa
        const postMonth = format(new Date(training.datetimeEnd), "MMM", {
          locale: enAU,
        }); // h:mm aa
        return (
          <ListboxItem textValue={training.title} key={training.id}>
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "py-1.5 rounded-l-md",
                  `bg-${training.color}-default text-white-default`,
                  `${training.color === "yellow" ? "text-shadow" : ""}`
                )}
              >
                <div className="w-[2.5rem] xl:w-[3rem] mx-2 xl:mx-3 my-2 flex flex-col items-center justify-center">
                  <p className="font-extrabold text-lg xl:text-2xl">
                    {postDay}
                  </p>
                  <p className="font-medium text-sm xl:text-base uppercase">
                    {postMonth}
                  </p>
                  <p className="font-light text-xs">{postDate}</p>
                </div>
              </div>
              <div className="ml-0 lg:ml-2.5 2xl:ml-3 flex flex-col px-2 sm:px-6 lg:px-2 w-[10rem] sm:w-full md:w-full lg:w-[10rem] 2xl:w-[20rem]">
                <p className="font-extrabold text-md xl:text-lg truncate w-full">
                  {training.title}
                </p>
                <p className="font-medium text-sm xl:text-md truncate w-full">
                  {training.description}
                </p>
                <p className="hidden xl:block font-medium text-xs">{`${startTime} - ${endTime}`}</p>
                <p className="block xl:hidden font-medium text-xs">{`${smallStartTime} - ${smallEndTime}`}</p>
              </div>
              <TrainingOptions
                trigger={<BiDotsVerticalRounded size={24} />}
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
