import React from "react";
import ShortcutItem from "./ShortcutItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      transition: {
        duration: 300, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      disabled: props.disabled,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <ShortcutItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    >
      {props.children}
    </ShortcutItem>
  );
}
