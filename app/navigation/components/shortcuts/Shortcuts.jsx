import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Spinner } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { Menu, Sidebar, menuClasses, sidebarClasses } from "react-pro-sidebar";
import {
  disableDraggableAtom,
  fetchShortcutAtom,
  indexPositionShortcutsAtom,
  shortcutsAtom,
  updateIndexPositionShortcutsAtom,
} from "../../store/ShortcutsStore";
import ShortcutsHeader from "./ShortcutsHeader";
import { SortableItem } from "./SortableItem";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { Image } from "@nextui-org/react";

const Shortcuts = () => {
  const auth = useAtomValue(authenticationAtom);
  const [shortcuts, setShortcuts] = useAtom(shortcutsAtom);
  const disableDraggable = useAtomValue(disableDraggableAtom);
  const fetchShortcut = useSetAtom(fetchShortcutAtom);
  const updatedIndexShortcuts = useSetAtom(updateIndexPositionShortcutsAtom);

  useEffect(() => {
    fetchShortcut(auth.sub);
  }, [auth, fetchShortcut]);

  return (
    <>
      <div className="sticky top-0 z-50 py-0 px-1 ml-1 mr-4">
        <ShortcutsHeader />
      </div>
      {shortcuts?.length ? (
        <DndContext
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
              <SortableContext
                items={shortcuts}
                strategy={verticalListSortingStrategy}
              >
                {shortcuts?.map((shortcut) => (
                  <SortableItem
                    disabled={disableDraggable}
                    id={shortcut.id} // makes dragging and sorting working
                    key={shortcut.key}
                    unique_key={shortcut._id}
                    url={shortcut.url ?? ""}
                  >
                    {shortcut.title}
                  </SortableItem>
                ))}
              </SortableContext>
            </Menu>
          </Sidebar>
        </DndContext>
      ) : (
        <div className="flex flex-col items-center mt-6">
          <Image
            width={180}
            height={180}
            alt={"No Shortcuts"}
            src={"/No-Shortcuts.webp"}
          />
          <p className="font-medium text-black-default/80">
            {"No Shortcuts Availale!"}
          </p>
          <p className="font-medium text-black-default/80">
            {"Create new shortcut now!"}
          </p>
        </div>
      )}
    </>
  );

  function handleDragEnd(event) {
    // changes the index of MenuItem which makes dragging possible
    const { active, over } = event;

    if (active.id !== over?.id) {
      setShortcuts((items) => {
        const oldIndex = items.map((obj) => obj.id).indexOf(active.id);
        const newIndex = items.map((obj) => obj.id).indexOf(over?.id);

        const updatedIndex = arrayMove(items, oldIndex, newIndex);

        updatedIndexShortcuts({ updatedIndex: updatedIndex });
        return updatedIndex;
      });
    }
  }
};

export default Shortcuts;
