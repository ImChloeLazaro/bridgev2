import { atom } from "jotai";
import "../../aws-auth"
import { fetchUserAttributes } from "aws-amplify/auth";
import { AuthenticationStore } from "./AuthenticationStrore";
import { get } from "aws-amplify/api";

let index = 0;

export const getShortcut = atom(async (getAtom) => {
  const data = await getAtom(AuthenticationStore)
  try {
      const restOperation = get({ 
        apiName: 'bridgeApi',
        path: '/shortcut',
        options: {
          queryParams : {
            sub: data.user.sub
          }
        }
      });
      const { body } = await restOperation.response;
      const response = await body.json()
      return response.response
    } catch (error) {
      throw error
    }
})
export const shortcutsAtom = atom(async (get) => {
  const response = await get(getShortcut);
  const mappedShortcuts = Array.isArray(response)
    ? response.map((item, index) => ({
        id: index + 1,
        key: item.sub,
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