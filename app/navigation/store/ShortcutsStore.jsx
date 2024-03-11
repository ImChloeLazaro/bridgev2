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

export const fetchedShortcutAtom = atom(null, async (get, set, sub) => {
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
  set(shortcutsAtom, convertedShortcuts);
});

export const selectedShortcutAtom = atom();

export const shortcutCountAtom = atom((get) => get(shortcutsAtom).length);
