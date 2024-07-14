import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import NextImage from "next/image";
import { useEffect } from "react";
import NoShortcut from "../../../../public/no-shortcuts.png";
import {
  disableDraggableAtom,
  fetchShortcutAtom,
  shortcutsAtom,
  updateIndexPositionShortcutsAtom,
} from "../../store/ShortcutsStore";
import { SortableItem } from "./SortableItem";

const Shortcuts = () => {
  const auth = useAtomValue(authenticationAtom);
  const [shortcuts, setShortcuts] = useAtom(shortcutsAtom);
  const disableDraggable = useAtomValue(disableDraggableAtom);
  const fetchShortcut = useSetAtom(fetchShortcutAtom);
  const updatedIndexShortcuts = useSetAtom(updateIndexPositionShortcutsAtom);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  useEffect(() => {
    fetchShortcut(auth.sub);
  }, [auth, fetchShortcut]);

  return (
    // sticky top-0 ml-1 mr-4 px-1
    <>
      {shortcuts?.length ? (
        <DndContext
          sensors={sensors}
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
