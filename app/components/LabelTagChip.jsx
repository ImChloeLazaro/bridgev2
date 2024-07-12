import { Chip, cn } from "@nextui-org/react";
const LabelTagChip = ({
  text,
  color = "clear",
  type = "label",
  size = "sm",
  isFilled = true,
  withBadge = false,
  chipCount,
  classNameLabel,
  ...props
}) => {
  const colorVariants = {
    red: {
      filled: "bg-red-default text-white-default",
      unfilled: "text-red-default bg-red-default/30",
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
      unfilled: "text-black-default bg-lightgrey-default/20",
    },
    darkgrey: {
      filled: "bg-darkgrey-default/60 text-white-default",
      unfilled: "text-white-default bg-darkgrey-default/40",
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
          `${isFilled ? "py-4 rounded-lg" : "py-2 rounded-md"}`,
          "px-2.5 border-0 h-6 lg:h-8"
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
              base: cn(
                "bg-white-default/90",
                `${chipCount >= 10 ? "" : "min-h-2 min-w-2 lg:min-h-6 lg:min-w-6"}`
              ),
              content: cn(
                `${chipCount === 1 ? "pr-1.5 " : ""}`,
                "mt-0.5 text-xxs lg:text-sm text-white-default font-bold text-black-default"
              ),
            }}
          >
            {chipCount > 999 ? "999+" : chipCount}
          </Chip>
        )
      }
      {...props}
    >
      <p className={cn(classNameLabel, "mt-0.5 tracking-wider text-xs lg:text-sm")}>
        {text?.length ? text : ""}
      </p>
    </Chip>
  );
};

export default LabelTagChip;
