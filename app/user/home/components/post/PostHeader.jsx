import React, { useEffect, useMemo } from "react";
import PostOptions from "./PostOptions";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { User, Link, Image } from "@nextui-org/react";

import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import { enAU } from "date-fns/locale/en-AU";

const handlePostDatetime = (postDatetime) => {
  const daysAgo = differenceInDays(new Date(), new Date(postDatetime));

  const hrsAgo = differenceInHours(new Date(), new Date(postDatetime));

  const minsAgo = differenceInMinutes(new Date(), new Date(postDatetime));

  const dateAgo = format(new Date(postDatetime), "d MMM yyyy");
  return daysAgo > 8
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
  // const daysAgo = differenceInDays(
  //   new Date(),
  //   new Date(data.datetimePublished)
  // );

  // const hrsAgo = differenceInHours(
  //   new Date(),
  //   new Date(data.datetimePublished)
  // );

  // const minsAgo = differenceInMinutes(
  //   new Date(),
  //   new Date(data.datetimePublished)
  // );
  // console.log(daysAgo, hrsAgo, minsAgo);
  // const t =
  //   daysAgo > 8
  //     ? "date"
  //     : hrsAgo > 23
  //     ? `${daysAgo} ${daysAgo > 1 ? "days" : "day"}`
  //     : minsAgo > 59
  //     ? `${hrsAgo} ${hrsAgo > 1 ? "hrs" : "hr"}`
  //     : minsAgo > 0
  //     ? `${minsAgo} ${minsAgo > 1 ? "mins" : "min"}`
  //     : "now";

  // console.log("TESTING CALCULATING DATETIME", t, data.publisher);

  // useEffect(() => {
  //   let datetimeReceived = 0;
  //   setInterval(() => {
  //     datetimeReceived =
  //       daysAgo > 8
  //         ? "date"
  //         : hrsAgo > 23
  //         ? `${daysAgo} ${daysAgo > 1 ? "days" : "day"}`
  //         : minsAgo > 59
  //         ? `${hrsAgo} ${hrsAgo > 1 ? "hrs" : "hr"}`
  //         : minsAgo > 0
  //         ? `${minsAgo} ${minsAgo > 1 ? "mins" : "min"}`
  //         : "now";
  //   }, 60000);
  // }, [daysAgo, hrsAgo, minsAgo]);
  const pinned = false;

  const options = [
    { key: "hide", label: "Hide this post" },
    { key: "report", label: "Report this post" },
  ];

  return (
    <>
      {pinned && <div>Pinned</div>}
      <div className="flex justify-between w-full px-4 py-2 mt-1">
        <User
          // as="button"
          name={
            <Link className="text-xl font-extrabold text-darkgrey-hover hover:text-darkgrey-default leading-4">
              {data.publisher}
            </Link>
          }
          description={
            <>
              <Link className="text-sm font-medium text-darkgrey-hover hover:text-darkgrey-default leading-4">
                Aretex A-Team
              </Link>
              <Link
                // underline="hover"
                className="text-xs font-medium text-darkgrey-hover hover:text-darkgrey-default leading-5"
              >{`${handlePostDatetime(data.datetimePublished)}`}</Link>
            </>
          }
          avatarProps={{
            src: data.profileURL,
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
