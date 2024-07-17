import LabelTagChip from "@/app/components/LabelTagChip";
import { Avatar, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Information = ({
  data,
  title,
  subTitle,
  picture,
  type = "text",
  divider = true,
}) => {
  const content = {
    text: (
      <div>
        <p>{data === "NA" && data ? data : "No Data Available"}</p>
      </div>
    ),
    date: (
      <p>
        {data != null
          ? format(new Date(data), "MMMM dd yyyy")
          : "No Data Available"}
      </p>
    ),
    chip: (
      <div>
        {data ? (
          <LabelTagChip
            text={data ? "Active" : "Inactive"}
            color={data ? "green" : "red"}
            className={"rounded-[0.4rem]"}
          />
        ) : (
          <LabelTagChip
            text={"Unavailable"}
            color={"lightgrey"}
            className={"rounded-[0.4rem]"}
          />
        )}
      </div>
    ),
    avatar: (
      <div className="flex items-center gap-2">
        <Avatar
          radius="full"
          size="md"
          src={picture ?? "/male-user-circle.png"}
          alt="Supervisor Profile picture"
        />
        <p className="w-1/2">{data ?? "No Team Record"}</p>
      </div>
    ),
  };

  return (
    <>
      <div className="flex justify-start items-center gap-16 lg:gap-10 w-full">
        <div className="flex-col w-1/2">
          <p className="font-medium text-base">{title}</p>

          <p className="font-medium text-sm text-darkgrey-default">
            {subTitle}
          </p>
        </div>
        <div className="w-1/2">{content[type]}</div>
      </div>
      <Divider className={`${divider ? "block" : "hidden"}`} />
    </>
  );
};

export default Information;
