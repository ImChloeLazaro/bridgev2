import { Image, Listbox, ListboxItem, cn } from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { trainingsAtom } from "../../store/TrainingStore";
import TrainingOptions from "./TrainingOptions";

//fetch imports
import axios from "axios";
//next auth imports
import MiniUnderConstruction from "@/app/components/MiniUnderConstruction";
import { useSession } from "next-auth/react";

// @refresh reset
const TrainingList = () => {
  const { data: session } = useSession();

  const _trainings = useAtomValue(trainingsAtom);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = [
    { key: "edit", label: "Edit training" },
    { key: "cancel", label: "Cancel training" },
  ];

  useEffect(() => {
    if (!session) return;
    setLoading(true); // Set loading to true when data fetching starts
    axios
      .get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
          "Content-Type": "application/json",
        },
        params: {
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime",
        },
      })
      .then((response) => {
        const trainingRegex = /\b(training|trainings)\b/i;

        const fetchedTrainings = response.data.items
          .map((event) => {
            if (trainingRegex.test(event.description)) {
              return {
                id: event.id,
                key: `train-${event.id}`,
                title: event.summary,
                datetimeStart: new Date(event.start.dateTime),
                datetimeEnd: new Date(event.end.dateTime),
                description: event.description,
                color: "blue",
                type: event.organizer.displayName,
              };
            }
            return null;
          })
          .filter(Boolean);

        setTrainings(fetchedTrainings);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data fetching is complete
      });
  }, [session]);

  return (
    <>
      {/* <GoogleOAuth isDisabled={true} /> */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-full">
          <Listbox
            items={trainings || []}
            aria-label="Training List"
            className="hidden"
            // onAction={(key) => console.log(key)}
            emptyContent={
              <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
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
                <p className="text-sm xl:text-base font-medium text-black-default/80">
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
              const smallStartTime = format(
                new Date(training.datetimeStart),
                "h b"
              ); // h:mm aa
              const smallEndTime = format(
                new Date(training.datetimeEnd),
                "h b"
              ); // h:mm aa
              const startTime = format(new Date(training.datetimeStart), "p"); // h:mm aa
              const endTime = format(new Date(training.datetimeEnd), "p"); // h:mm aa
              const postDay = format(new Date(training.datetimeEnd), "d"); // h:mm aa
              const postDate = format(new Date(training.datetimeEnd), "EEE"); // h:mm aa
              const postMonth = format(new Date(training.datetimeEnd), "MMM"); // h:mm aa
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
          <div className="h-full">
            <MiniUnderConstruction />
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingList;
