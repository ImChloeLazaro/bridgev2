import React from "react";

const LabelTag = ({ text, color }) => {
  const colorVariants = {
    red: "bg-red-default",
    orange: "bg-orange-default",
    yellow: "bg-yellow-default",
    green: "bg-green-default",
    blue: "bg-blue-default",
    black: "bg-black-default",
    clear: "bg-transparent",
  };

  return (
    <div className={`flex justify-center max-w-fit`}>
      <p
        className={`capitalize ${colorVariants[color]} text-white-default font-bold py-1 px-2.5 rounded-md`}
      >
        {text}
      </p>
    </div>
  );
};

export default LabelTag;
