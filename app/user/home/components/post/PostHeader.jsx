import { Link, User } from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { BiDotsVerticalRounded } from "react-icons/bi";
import PostOptions from "./PostOptions";

const handlePostDatetime = (datetime) => {
  const postDateTime = datetime instanceof Date ? datetime : new Date(datetime);

  const daysAgo = differenceInDays(new Date(), postDateTime);

  const hrsAgo = differenceInHours(new Date(), postDateTime);

  const minsAgo = differenceInMinutes(new Date(), postDateTime);

  const dateAgo = format(postDateTime, "d MMM yyyy");
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

const PostHeader = ({ data }) => {
  const pinned = false;

  const options = [
    { key: "hide", label: "Hide this post" },
    { key: "report", label: "Report this post" },
  ];

  // ### TODO
  return (
    <>
      {pinned && <div>Pinned</div>}
      <div className="flex justify-between w-full px-4 py-2 mt-1">
        <User
          // as="button"
          name={
            <Link className="text-xl font-extrabold text-darkgrey-hover hover:text-darkgrey-default leading-4 cursor-pointer">
              {data.publisher}
            </Link>
          }
          description={
            <>
              <Link className="text-sm font-medium text-darkgrey-hover hover:text-darkgrey-default leading-4 cursor-pointer">
                {"Aretex A-Team"}
              </Link>
              <Link
                // underline="hover"
                className="text-xs font-medium text-darkgrey-hover hover:text-darkgrey-default leading-5 cursor-pointer"
              >{`${handlePostDatetime(data.datetimePublished)}`}</Link>
            </>
          }
          avatarProps={{
            src: data.picture,
            // size: "lg",
            className: "w-16 h-16 text-large",
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
          <PostOptions
            trigger={<BiDotsVerticalRounded size={26} />}
            options={options}
          />
        </div>
      </div>
    </>
  );
};
export default PostHeader;
