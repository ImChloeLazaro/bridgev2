import { Chip, cn } from "@nextui-org/react";
const LabelTagChip = ({
  text,
  color = "clear",
  type = "label",
  size = "sm",
  isFilled = true,
  withBadge = false,
  badgeContent,
  className,
  classNameContent,
  ...props
}) => {
  const colorVariants = {
    red: {
      filled: "bg-red-default text-white-default",
      unfilled: "text-red-default bg-red-default/20",
    },
    orange: {
      filled: "bg-orange-default text-white-default",
      unfilled: "text-orange-default bg-orange-default/15",
    },
    yellow: {
      filled: "bg-yellow-default text-white-default text-shadow",
      unfilled: "text-yellow-default bg-yellow-default/20",
    },
    green: {
      filled: "bg-green-default text-white-default text-shadow",
      unfilled: "text-green-default bg-green-default/15",
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
      filled: "bg-grey-default text-darkgrey-default",
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
      filled: "bg-transparent text-black-default",
      unfilled: "bg-transparent text-black-default",
    },
  };

  const lightColors = ["clear", "grey", "lightgrey"];

  return (
    <Chip
      variant={type === "tag" && "dot"}
      size={isFilled ? "lg" : "sm"}
      classNames={{
        base: cn(
          `${
            isFilled
              ? colorVariants[color].filled
              : colorVariants[color].unfilled
          }`,
          `${isFilled ? "py-5 rounded-xl" : "py-2 rounded-md"}`,
          "capitalize px-2.5 border-0 ",
          className
        ),
        content: "font-bold",
        dot: `${
          lightColors.includes(color)
            ? "bg-darkgrey-default"
            : "bg-white-default"
        }`,
      }}
      endContent={
        withBadge && (
          <Chip
            radius="full"
            size="sm"
            variant="flat"
            classNames={{
              base: cn("bg-white-default/90"),
              content: `text-sm text-white-default font-bold text-black-default`,
            }}
          >
            {badgeContent}
          </Chip>
        )
      }
      {...props}
    >
      <div className="flex justify-center items-center gap-4">
        <p className={cn("tracking-wider", classNameContent)}>
          {text?.length ? text : ""}
        </p>
      </div>
    </Chip>
  );
};

export default LabelTagChip;
