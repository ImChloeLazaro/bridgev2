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
import NextImage from "next/image";
import NoShortcut from "../../../../public/no-shortcuts.webp";

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
    // sticky top-0 ml-1 mr-4 px-1
    <>
      {/* <div className="z-50 py-0 ">
        <ShortcutsHeader />
      </div> */}
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
        </DndContext>
      ) : (
        <div className="flex flex-col items-center mt-6">
          <NextImage
            placeholder={"blur"}
            quality={50}
            width={180}
            height={180}
            priority={true}
            alt={"No Shortcuts"}
            src={NoShortcut}
          />

          <p className="text-base font-medium text-black-default/80">
            {"No Shortcuts Available!"}
          </p>
          <p className="text-base font-medium text-black-default/80">
            {"Create your new shortcut now!"}
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
