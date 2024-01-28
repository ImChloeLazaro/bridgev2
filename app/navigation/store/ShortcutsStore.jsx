import { atom } from "jotai";
import "../../aws-auth";
import { authenticationAtom } from "../../store/AuthenticationStore";
import { get as fetch } from "aws-amplify/api";

// let index = 0;

// export const shortcutsAtom = atom(async (get) => {
//   const response = await get(fetchShortcut);
//   console.log("RESPONSE: ", response);
//   console.log(typeof response);

// const mappedShortcuts = Array.isArray(response)
//   ? response.map((item, index) => ({
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: item.title,
//       link: item.url,
//     }))
//   : [];
//   return mappedShortcuts;
// });

export const shortcutsAtom = atom([]);

// export const displayShortcutAtom = atom((get) => get(shortcutsAtom));

export const addShortcutAtom = atom(null, (get, set, update) => {
  console.log("PREV", get(shortcutsAtom));
  console.log("UPDATE", update);
  set(shortcutsAtom, update);
  console.log("AFTER", get(shortcutsAtom));
});

// export const initializeShortcutAtom = atom(null, async (get, set, update) => {
//   set(shortcutsAtom, update);
// });

export const fetchedShortcutAtom = atom(null, async (get, set,) => {
  const data = await get(authenticationAtom);
  try {
    console.log("SUB", data);
    const restOperation = fetch({
      apiName: "bridgeApi",
      path: "/shortcut",
      options: {
        queryParams: {
          sub: data.sub,
        },
      },
    });
    const { body } = await restOperation.response;
    const result = await body.json();
    console.log("RESULT", result);
    const response = result.response;
    console.log("RESPONSE", response);

    const mappedShortcuts = Array.isArray(response)
      ? response.map((item, index) => ({
          id: (index += 1),
          key: `sct-${index}`,
          label: item.title,
          link: item.url,
        }))
      : [];
    console.log("mappedShortcuts", mappedShortcuts);
    set(shortcutsAtom, mappedShortcuts);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// export const shortcutsAtom = atom(()=> {
//   const arr = [
// {
//   id: (index += 1),
//   key: `sct-${index}`,
//   label: "Timesheet",
//   link: "#",
// },
//     {
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: "Timecharges",
//       link: "#",
//     },
//     {
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: "OT File",
//       link: "#",
//     },
//   ]
//   return arr
// });

export const shortcutCountAtom = atom((get) => get(shortcutsAtom).length);

export const addShortcutNameAtom = atom("");
export const addShortcutLinkAtom = atom("");
// export const editShortcutNameAtom = atom("");
// export const editShortcutLinkAtom = atom("");
export const disableDraggableAtom = atom(false);
