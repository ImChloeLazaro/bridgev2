import { Link, Tooltip } from "@nextui-org/react";
import { reactionIcons } from "./ReactionIcons";

const ReactionCount = ({ data }) => {
  const handleReactionCount = (object) => {
    return Object.values(object).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  };

  const reactionStack = {
    0: "-ml-1",
    1: "-ml-2",
    2: "-ml-2.5",
    3: "-ml-3",
    4: "-ml-4",
  };

  const filteredReactions = Object.keys(data).filter(
    (reaction) => data[reaction] != 0
  );

  const plural = {
    happy: `people are happy`,
    star: `people are amazed`,
    love: `people loves this`,
    birthday: `people greeted happy birthday`,
  };

  const singular = {
    happy: `person is happy`,
    star: `person is amazed`,
    love: `person love this`,
    birthday: `person greeted happy birthday`,
  };

  return (
    <Link className="flex justify-start items-center isolate relative">
      {filteredReactions.map((reaction, index) => {
        const icon = reactionIcons[`${reaction}`].label;
        const count = data[`${reaction}`];

        return (
          <Tooltip
            key={index}
            delay={1500}
            content={
              <div className="font-medium text-xs text-black-default">
                {count > 1
                  ? `${count} ${plural[icon.toLowerCase()]}`
                  : `${count} ${singular[icon.toLowerCase()]}`}
              </div>
            }
          >
            <div className={`${reactionStack[index]}`}>
              {reactionIcons[`${reaction}`].badge}
            </div>
          </Tooltip>
        );
      })}

      <p className="ml-2 font-bold text-darkgrey-default">
        {handleReactionCount(data)}
      </p>
    </Link>
  );
};

export default ReactionCount;
