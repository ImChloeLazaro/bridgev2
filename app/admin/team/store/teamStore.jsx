import { atom } from 'jotai';
import { authenticationAtom } from '@/app/store/AuthenticationStore';
import { restread, readwithparams } from '@/app/utils/amplify-rest';

export const departmentAtom = atom(async () => {
  const data = await restread('/teams/department');
  return data.response;
});

export const clientsAtom = atom(async () => {
  const data = await restread('/cms/client/find');
  return data.response;
})

export const filteredClientAtom = atom(async (get) => {
  try {
    const sub = (await get(authenticationAtom)).auth.sub;
    const data = await readwithparams('/teams/team/filterClient', { sub });

    if (data.success) {
      const clients = data.response.map(client => ({
        key: client._id,
        _id: client._id,
        company: {
          name: client.name,
          email: client.email
        }
      }));
      return clients;
    } else {
      return [];
    }

  } catch (error) {
    console.log(error);
  }
})