import { get as fetch } from "aws-amplify/api";
import { atom } from "jotai";
import "../../aws-auth";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  destroywithparams,
  readwithparams,
  restinsert,
  restupdate,
} from "@/app/utils/amplify-rest";

export const shortcutsAtom = atom([]);

export const shortcutTitleAtom = atom("");
export const shortcutURLAtom = atom("");
export const disableDraggableAtom = atom(false);

export const editShortcutName = atom();
export const editShortcutLink = atom();

export const addShortcutAtom = atom(null, async (get, set, update) => {
  const { sub, title, url } = update;

  let shortcutIndex = get(shortcutCountAtom);

  const newShortcut = {
    id: (shortcutIndex += 1),
    key: `sct-${shortcutIndex}`,
    sub: sub,
    title: title,
    url: url,
  };
  const shortcutsResponse = await restinsert("/shortcut", newShortcut);

  console.log("ADDED SHORTCUT", get(shortcutsAtom));
  console.log("shortcutsResponse", shortcutsResponse);

  if (shortcutsResponse.message === "POST SUCCESS") {
    set(
      shortcutsAtom,
      get(shortcutsAtom).filter((shortcut) => shortcut.sub === sub)
    );
    set(shortcutTitleAtom, "");
    set(shortcutURLAtom, "");
    return { success: true };
  } else {
    return { success: false };
  }
});

export const updateShortcutAtom = atom(null, async (get, set, update) => {
  const { _id, title, url } = update;
  const response = await restupdate("/shortcut", {
    _id: _id,
    title: title,
    url: url,
  });
  if (response.success) {
    console.log("UPDATED SUCCESSFULLY", response);
    return { success: true };
  } else {
    return { success: false };
  }
});

export const deleteShortcutAtom = atom(null, async (get, set, update) => {
  const { _id } = update;
  const response = await destroywithparams("/shortcut", {
    _id: _id,
  });
  if (response.success) {
    console.log("DELETED SUCCESSFULLY", response);
    return { success: true };
  } else {
    return { success: false };
  }
});

export const indexPositionShortcutsAtom = atom([]);

export const updateIndexPositionShortcutsAtom = atom(
  null,
  async (get, set, update) => {
    const { updatedIndex } = update;
    // const response = await restupdate("/shortcut", {
    //   _id: _id,
    //   title: title,
    //   url: url,
    // });
    // if (response.success) {
    //   console.log("UPDATED INDEX SUCCESSFULLY", response);
    //   set(indexPositionShortcutsAtom, updatedIndex);
    //   return { success: true };
    // } else {
    //   return { success: false };
    // }
    console.log("updatedIndex", updatedIndex);
  }
);

export const updateSortedShortcutsAtom = atom(null, (get, set, update) => {
  const { sort, sub } = update;

  const filteredShortcuts = get(shortcutsAtom).filter(
    (shortcut) => shortcut.sub === sub
  );

  if (sort) {
    const sortedByDateASECShortcuts = filteredShortcuts.sort(
      (a, b) => new Date(b.createdBy) - new Date(a.createdBy)
    );
    set(shortcutsAtom, sortedByDateASECShortcuts);
  } else {
    const sortedByDateDESCShortcuts = filteredShortcuts.sort(
      (a, b) => new Date(a.createdBy) - new Date(b.createdBy)
    );
    set(shortcutsAtom, sortedByDateDESCShortcuts);
  }
});

export const fetchShortcutAtom = atom(null, async (get, set, sub) => {
  const shortcuts = await readwithparams("/shortcut", {
    sub: sub,
  });

  const filteredShortcuts = shortcuts.response.filter(
    (shortcut) => shortcut.sub === sub
  );

  const convertedShortcuts = filteredShortcuts.map((item, index) => ({
    ...item,
    id: (index += 1),
    key: `sct-${index}`,
  }));

  const sortedShortcuts = convertedShortcuts.sort(
    (a, b) => new Date(b.createdBy) - new Date(a.createdBy)
  );

  const updatedIndexShortcuts = sortedShortcuts.map((item, index) => ({
    _id: item._id,
    id: (index += 1),
    key: `sct-${index}`,
  }));
  console.log("FETCHED INDEX SUCCESSFULLY", updatedIndexShortcuts);
  console.log("FETCHED SHORTCUT SUCCESSFULLY", sortedShortcuts);

  set(indexPositionShortcutsAtom, updatedIndexShortcuts);
  set(shortcutsAtom, sortedShortcuts);
});

export const selectedShortcutAtom = atom();

export const shortcutCountAtom = atom((get) => get(shortcutsAtom).length);
