import MiniUnderConstruction from "@/app/components/MiniUnderConstruction";
import { Image, Listbox, ListboxItem } from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useAtomValue } from "jotai";
import LabelTagChip from "../../../../components/LabelTagChip";
import { hrBulletinBoardAtom } from "../../store/HRBulletinBoardStore";
// @refresh reset
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
    <div className="h-full">
      <Listbox
        items={hrBulletinBoard}
        aria-label="HR Bulletin List"
        // onAction={(key) => console.log(key)}
        className="hidden"
        emptyContent={
          <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
            <Image
              width={180}
              height={180}
              alt={"No Announcement"}
              src={"/no-announcement.png"}
              classNames={{ img: "aspect-square lg:w-32 xl:w-44" }}
            />
            <p className="text-sm xl:text-base font-medium text-black-default/80">
              {"No announcements right now!"}
            </p>
            <p className="text-sm xl:text-base font-medium text-black-default/80">
              {"Come back later!"}
            </p>
          </div>
        }
        classNames={{
          base: ["w-full h-auto p-2 m-0 mb-2 overflow-y-auto"],
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
              <div className="flex flex-col items-center justify-start px-2 2xl:px-4 py-0 2xl:py-2 my-2 gap-4">
                <div className="flex lg:flex-col 2xl:flex-row w-full justify-between px-2">
                  <div className="flex flex-col">
                    <p className="font-extrabold text-md xl:text-lg px-1">
                      {hrBulletin.title}
                    </p>
                    <LabelTagChip
                      text={`New ${hrBulletin.type}`}
                      color={`${hrBulletin.color}`}
                      size={"xs"}
                      isFilled={false}
                      className={"hidden xl:flex h-4 lg:h-7"}
                    />
                  </div>
                  <p className="font-normal text-xs 2xl:text-sm px-1">{`${handleHRBulletinDateTime(
                    hrBulletin.datetime
                  )}`}</p>
                </div>
                <div className="flex flex-col w-full px-2">
                  <p className="font-medium text-sm xl:text-md leading-tight whitespace-pre-line line-clamp-2 xl:line-clamp-3">
                    {hrBulletin.description}
                  </p>
                  <div className="hidden lg:block bg-grey-hover rounded-md mt-3 w-full h-32"></div>
                </div>
              </div>
            </ListboxItem>
          );
        }}
      </Listbox>
      <div className="h-full">
        <MiniUnderContstruction card={false}/>
      </div>
    </div>
  );
};

export default HRBulletinBoardList;
