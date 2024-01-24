import { atom } from "jotai";
import "../../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { authenticatedAtom } from "../../store/AuthenticationStore";
import { get } from "aws-amplify/api";

// let index = 0;

export const fetchShortcut = atom(async (getAtom) => {
  const data = await getAtom(authenticatedAtom);
  try {
    const restOperation = get({
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
    return result.response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const shortcutsAtom = atom(async (get) => {
  const response = await get(fetchShortcut);
  console.log("RESPONSE: ", response);
  console.log(typeof response);

  const mappedShortcuts = Array.isArray(response)
    ? response.map((item, index) => ({
        id: (index += 1),
        key: `sct-${index}`,
        label: item.title,
        link: item.url,
      }))
    : [];
  return mappedShortcuts;
});
// export const shortcutsAtom = atom(()=> {
//   const arr = [
//     {
//       id: (index += 1),
//       key: `sct-${index}`,
//       label: "Timesheet",
//       link: "#",
//     },
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
