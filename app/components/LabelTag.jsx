import { Badge } from "@nextui-org/react";
const LabelTag = ({ text, color }) => {
  const colorVariants = {
    red: "bg-red-default",
    orange: "bg-orange-default",
    yellow: "bg-yellow-default",
    green: "bg-green-default",
    blue: "bg-blue-default",
    black: "bg-black-default",
    grey: "bg-grey-default",
    lightgrey: "bg-lightgrey-default",
    darkgrey: "bg-darkgrey-default",
    clear: "bg-transparent",
  };

  const colorVariants1 = {
    red: {
      filled: "bg-red-default text-white-default",
      unfilled: "text-red-default bg-red-default/20",
    },
    orange: {
      filled: "bg-orange-default text-white-default",
      unfilled: "text-orange-default bg-orange-default/20",
    },
    yellow: {
      filled: "bg-yellow-default text-white-default",
      unfilled: "text-yellow-default bg-yellow-default/20",
    },
    green: {
      filled: "bg-green-default text-white-default",
      unfilled: "text-green-default bg-green-default/20",
    },
    blue: {
      filled: "bg-blue-default text-white-default",
      unfilled: "text-blue-default bg-blue-default/20",
    },
    lightblue: {
      filled: "bg-lightblue-default text-white-default",
      unfilled: "text-lightblue-default bg-lightblue-default/20",
    },
    purple: {
      filled: "bg-purple-default text-white-default",
      unfilled: "text-purple-default bg-purple-default/20",
    },
    black: {
      filled: "bg-black-default text-white-default",
      unfilled: "text-black-default bg-black-default/20",
    },
    grey: {
      filled: "bg-grey-default text-white-default",
      unfilled: "text-grey-default bg-grey-default/20",
    },
    lightgrey: {
      filled: "bg-lightgrey-default text-white-default",
      unfilled: "text-lightgrey-default bg-lightgrey-default/20",
    },
    darkgrey: {
      filled: "bg-darkgrey-default text-white-default",
      unfilled: "text-darkgrey-default bg-darkgrey-default/20",
    },
    clear: {
      filled: "bg-transparent text-white-default",
      unfilled: "bg-transparent text-white-default",
    },
  };

  return (
    <div className={`flex justify-center max-w-fit w-1/4`}>
      <p
        className={`capitalize ${colorVariants[color]} text-white-default font-bold py-1 px-3.5 rounded-md `}
      >
        {text}
      </p>
    </div>
  );
};

export default LabelTag;
