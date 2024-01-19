import React from "react";
import { Link, Tooltip } from "@nextui-org/react";
import { reactionIcons } from "./ReactionIcons";

const ReactionCount = ({ data }) => {
  console.log(data);
  const countReactions = (object) => {
    return Object.values(object).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  };

  return (
    <Link className="flex justify-start items-center">
      <Tooltip
        delay={1500}
        content={
          <div className="font-medium text-xs text-black-default">{"Love"}</div>
        }
      >
        <div className="-translate-x-1">{reactionIcons.love.badge}</div>
      </Tooltip>
      <Tooltip
        delay={1500}
        content={
          <div className="font-medium text-xs text-black-default">{"Star"}</div>
        }
      >
        <div className="-translate-x-3">{reactionIcons.star.badge}</div>
      </Tooltip>
      <Tooltip
        delay={1500}
        content={
          <div className="font-medium text-xs text-black-default">
            {"Birthday"}
          </div>
        }
      >
        <div className="-translate-x-5">{reactionIcons.birthday.badge}</div>
      </Tooltip>
      <Tooltip
        delay={1500}
        content={
          <div className="font-medium text-xs text-black-default">
            {"Happy"}
          </div>
        }
      >
        <div className="-translate-x-7">{reactionIcons.happy.badge}</div>
      </Tooltip>
      <p className="-ml-5 font-bold text-darkgrey-default">
        {countReactions(data)}
      </p>
    </Link>
  );
};

export default ReactionCount;
