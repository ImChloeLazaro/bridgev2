import { atom } from "jotai";
import "../../aws-auth";
import { get as fetch } from "aws-amplify/api";
import { userAtom } from "../../store/UserStore";

export const shortcutsAtom = atom([]);

export const addShortcutAtom = atom(null, (get, set, update) => {
  set(shortcutsAtom, update);
  console.log("ADDED", get(shortcutsAtom));
});

export const fetchedShortcutAtom = atom(null, async (get, set) => {
  const user = await get(userAtom);

  if (user.sub === null || user.sub === undefined) {
    return;
  }

  try {
    console.log("SUB", user);
    const fetchShortcut = fetch({
      apiName: "bridgeApi",
      path: "/shortcut",
      options: {
        queryParams: {
          sub: user.sub,
        },
      },
    });
    const { body } = await fetchShortcut.response;
    const result = await body.json();
    const response = result.response;
    console.log('SHORTCUT PROVIDER:',response)
    const mappedShortcuts = Array.isArray(response)
      ? response.map((item, index) => ({
          _id: item._id,
          id: (index += 1),
          key: `sct-${index}`,
          label: item.title,
          link: item.url,
        }))
      : [];

    set(shortcutsAtom, mappedShortcuts);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const shortcutCountAtom = atom((get) => get(shortcutsAtom).length);

export const addShortcutNameAtom = atom("");
export const addShortcutLinkAtom = atom("");
export const disableDraggableAtom = atom(false);
