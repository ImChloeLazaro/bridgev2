import React, { useEffect, Suspense } from "react";
import { Sidebar, Menu, menuClasses, sidebarClasses } from "react-pro-sidebar";
import ShortcutsHeader from "./ShortcutsHeader";

import { Spinner } from "@nextui-org/react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  disableDraggableAtom,
  fetchedShortcutAtom,
  shortcutsAtom,
} from "../../store/ShortcutsStore";

import {
  closestCorners,
  DndContext,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { SortableItem } from "./SortableItem";

// ### TODO Add sorting functionality to shortcut
// ### TODO Newly added shortcut should be on top of the list
// ### TODO Fix order of shortcuts does not persist after refresh or after sign in

const Shortcuts = () => {
  const [shortcutsList, setShortcutsList] = useAtom(shortcutsAtom);
  const disableDraggable = useAtomValue(disableDraggableAtom);
  const fetchedShortcut = useSetAtom(fetchedShortcutAtom);

  useEffect(() => {
    console.log("INSIDE USE EFFECT");
    fetchedShortcut();
  }, [fetchedShortcut]);

  return (
    <DndContext
      // sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[
        restrictToVerticalAxis,
        restrictToParentElement,
        restrictToWindowEdges,
      ]}
    >
      <Sidebar
        customBreakPoint="760px"
        rootStyles={{
          // change sidebar Tailwind CSS here
          width: "100%",
          overflow: "auto",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          "@media (max-width: 767px)": { display: "none", width: "0%" },
          backgroundColor: "#f9f9f9",
          [`.${sidebarClasses.container}`]: {
            overflowX: "hidden",
            overflowY: "scroll",
            ["::-webkit-scrollbar"]: { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          },
        }}
      >
        <Menu
          key="shortcuts"
          rootStyles={{
            [`.${menuClasses.icon}`]: {
              color: "#EF8916",
            },
            [`.${menuClasses.button}`]: {
              flexGrow: "1",
              borderRadius: "0.313rem",
              color: "#393939",
              marginBottom: "0.125rem",
              transition: "0.3s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            },

            zIndex: 0,
            backgroundColor: "#f9f9f9",
            display: "flex",
          }}
          menuItemStyles={{
            root: () => {
              return {
                gap: "7rem",
              };
            },
            label: () => {
              return {
                marginLeft: "0.30rem",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                fontWeight: 700,
              };
            },
            button: ({ level, active }) => {
              // only apply styles on first level elements of the tree
              if (level === 0) {
                return {
                  width: "17rem",
                  backgroundColor: active ? "#D0D0D0" : "#f9f9f9",
                  paddingRight: "0rem",
                  paddingLeft: active ? "0.875rem" : "0.375rem",
                  cursor: active ? "grabbing" : "grab",
                  ":hover": {
                    backgroundColor: "#D0D0D0",
                    paddingLeft: "0.875rem",
                  },
                  ":focus": {
                    backgroundColor: "#D0D0D0",
                  },
                  ":active": {
                    cursor: "grabbing",
                  },
                };
              }
            },
          }}
        >
          <div className="py-0 sticky top-0 z-50 ">
            <ShortcutsHeader />
          </div>
          <div>
            <SortableContext
              items={shortcutsList}
              strategy={verticalListSortingStrategy}
            >
              <Suspense
                fallback={
                  <Spinner
                    label="Loading Shortcuts"
                    color="default"
                    labelColor="foreground"
                  />
                }
              >
                {shortcutsList?.map((shortcut) => (
                  <SortableItem
                    disabled={disableDraggable}
                    id={shortcut.id} // makes sorting working
                    key={shortcut.key}
                    unique_key={shortcut.key}
                    link={shortcut.link}
                  >
                    {shortcut?.label}
                  </SortableItem>
                ))}
              </Suspense>
            </SortableContext>
          </div>
        </Menu>
      </Sidebar>
    </DndContext>
  );

  function handleDragEnd(event) {
    // changes the index of MenuItem which makes dragging possible
    const { active, over } = event;
    console.log("ACTIVE", "OVER");
    console.log(active.id, over?.id);

    if (active.id !== over?.id) {
      setShortcutsList((items) => {
        const oldIndex = items.map((obj) => obj.id).indexOf(active.id);
        const newIndex = items.map((obj) => obj.id).indexOf(over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default Shortcuts;
