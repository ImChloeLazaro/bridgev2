import React from "react";
import {
  useCheckbox,
  Chip,
  Button,
  VisuallyHidden,
  tv,
  cn,
} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "h-full w-full border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const ManagePostCheckbox = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        // classNames={{
        //   base: styles.base(),
        //   content: styles.content(),
        // }}
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
