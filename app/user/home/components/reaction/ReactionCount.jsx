import { Link, Tooltip } from "@nextui-org/react";
import { reactionIcons } from "./ReactionIcons";

const ReactionCount = ({ data, selectedReaction }) => {
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

  let stackIndex = -1;
  return (
    <Link className="flex justify-start items-center isolate relative">
      {handleReactionCount(data) <= 0 ? (
        <div className={`${reactionStack[0]}`}>
          {reactionIcons[`${selectedReaction[0]}`].badge}
        </div>
      ) : (
        Object.keys(data).map((reaction, index) => {
          const icon = reactionIcons[reaction].label;
          const count = data[reaction];

          if (count > 0) {
            return (
              <Tooltip
                key={index}
                delay={500}
                content={
                  <div className="font-medium text-xs text-black-default">
                    {count > 0
                      ? `${count} ${plural[icon.toLowerCase()]}`
                      : `${count} ${singular[icon.toLowerCase()]}`}
                  </div>
                }
              >
                <div
                  key={index}
                  className={`${reactionStack[(stackIndex += 1)]}`}
                >
                  {reactionIcons[`${reaction}`].badge}
                </div>
              </Tooltip>
            );
          }
        })
      )}

      <p className="ml-2 font-bold text-darkgrey-default">
        {handleReactionCount(data)}
      </p>
    </Link>
  );
};

export default ReactionCount;
