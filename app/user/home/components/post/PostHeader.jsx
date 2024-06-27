import { Link, Tooltip, User } from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  intervalToDuration,
} from "date-fns";
import { BiDotsVerticalRounded } from "react-icons/bi";
import PostOptions from "./PostOptions";
import { enAU } from "date-fns/locale";

const handlePostDatetime = (datetime) => {
  const postDateTime =
    datetime instanceof Date
      ? datetime.slice(0, -1)
      : new Date(datetime.slice(0, -1));

  // console.log(
  //   "months weeks days hours minutes ago",
  //   intervalToDuration({
  //     start: postDateTime,
  //     end: new Date(),
  //   })
  // );

  const daysAgo = differenceInDays(new Date(), postDateTime);

  const hrsAgo = differenceInHours(new Date(), postDateTime);

  const minsAgo = differenceInMinutes(new Date(), postDateTime);

  const dateAgo = format(postDateTime, "PPpp");

  const displayedDate =
    daysAgo > 7
      ? dateAgo
      : hrsAgo > 23
      ? `${daysAgo} ${daysAgo > 1 ? "days" : "day"}`
      : minsAgo > 59
      ? `${hrsAgo} ${hrsAgo > 1 ? "hrs" : "hr"}`
      : minsAgo > 0
      ? `${minsAgo} ${minsAgo > 1 ? "mins" : "min"}`
      : "now";
  return displayedDate;
};

const PostHeader = ({ data }) => {
  const pinned = false;

  const datetime = data.datetimePublished;
  const postDateTime = datetime instanceof Date ? datetime : new Date(datetime);

  const tooltipDate = format(postDateTime, "PPpp");

  return (
    <>
      {pinned && <div>Pinned</div>}
      <div className="flex justify-between w-full px-1 md:px-4 py-2 mt-1">
        <User
          // as="button"
          name={
            <Link className="text-md lg:text-xl font-extrabold text-darkgrey-hover hover:text-darkgrey-default leading-4 cursor-pointer">
              {data.publisher}
            </Link>
          }
          description={
            <>
              <Link className="text-xs lg:text-sm font-medium text-darkgrey-hover hover:text-darkgrey-default leading-4 cursor-pointer">
                {data.team}
              </Link>
              <Tooltip
                placement={"bottom"}
                content={tooltipDate}
                classNames={{ base: "hidden lg:block" }}
              >
                <Link
                  // underline="hover"
                  className="text-xs font-medium text-darkgrey-hover hover:text-darkgrey-default leading-5 cursor-pointer"
                >{`${handlePostDatetime(datetime ?? new Date())}`}</Link>
              </Tooltip>
            </>
          }
          avatarProps={{
            src: data.publisherPicture,
            className: "w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-large",
          }}
          classNames={{
            base: ["gap-3"],
            wrapper: ["my-0 py-0"],
            name: ["text-black-default", "pl-1", "text-xl font-extrabold"],
            description: [
              "pl-1.5",
              "flex flex-col items-start font-base leading-4",
            ],
          }}
        />
        <div className="p-0">
          <PostOptions trigger={<BiDotsVerticalRounded size={26} />} />
        </div>
      </div>
    </>
  );
};
export default PostHeader;
