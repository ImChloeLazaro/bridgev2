import { get as fetch } from "aws-amplify/api";
import { atom } from "jotai";
import "../../aws-auth";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { readwithparams } from "@/app/utils/amplify-rest";

export const shortcutsAtom = atom([]);

export const addShortcutNameAtom = atom("");
export const addShortcutLinkAtom = atom("");
export const disableDraggableAtom = atom(false);

export const addShortcutAtom = atom(null, (get, set, update) => {
  set(shortcutsAtom, update);
  console.log("ADDED SHORTCUT", get(shortcutsAtom));
});

export const fetchedShortcutAtom = atom(null, async (get, set) => {
  const auth = await get(authenticationAtom);

  if (auth.sub === null || auth.sub === undefined) {
    return;
  }
  const shortcuts = await readwithparams("/shortcut", {
    sub: auth.sub,
  });

  const mappedShortcuts = Array.isArray(shortcuts.response)
    ? shortcuts.response.map((item, index) => ({
        _id: item._id,
        id: (index += 1),
        key: `sct-${index}`,
        label: item.title,
        link: item.url,
      }))
    : [];

  set(shortcutsAtom, mappedShortcuts);
});

export const shortcutCountAtom = atom((get) => get(shortcutsAtom).length);
