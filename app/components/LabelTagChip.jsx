import { Chip, cn } from "@nextui-org/react";
const ChipTag = ({
  text,
  color,
  type = "label",
  size = "sm",
  isFilled = true,
  withBadge = false,
  badgeContent,
  ...props
}) => {
  const colorVariants = {
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

  const sizeVariants = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <Chip
      radius="sm"
      variant={type === "tag" && "dot"}
      size={isFilled ? "lg" : "sm"}
      color="primary"
      classNames={{
        base: cn(
          `${
            isFilled
              ? colorVariants[color].filled
              : colorVariants[color].unfilled
          } ${sizeVariants[size]}`,
          `${isFilled ? "py-5" : "py-1 rounded"}`,
          "capitalize px-2.5 border-0"
        ),
        content: "font-bold",
        dot: `bg-white-default`,
      }}
      {...props}
      endContent={
        withBadge && (
          <Chip
            radius="full"
            size="sm"
            variant="flat"
            classNames={{
              base: cn("bg-white-default/90"),
              content: "text-sm font-bold text-black-default/80",
            }}
          >
            {badgeContent}
          </Chip>
        )
      }
    >
      <div className="flex justify-center items-center gap-4">
        <p className="tracking-wider">{text}</p>
      </div>
    </Chip>
  );
};

export default ChipTag;
