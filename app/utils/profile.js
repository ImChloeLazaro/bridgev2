import { post, put } from 'aws-amplify/api';

export const RegisterProfile = async (request) => {
    try {
        const restOperation = post({
          apiName: 'bridgeApi',
          path: '/user',
          options: {
            body: request.user
          }
        });
    
        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);
      } catch (e) {
        console.log('POST call failed: ', e);
      }
}

export const updateOnboardingStatus = async (request) => {
  try {
    const update = put({
      apiName: 'bridgeApi',
      path: `/user`,
      options :{
        queryParams : {
          sub: request.sub
        }
      }
    });
    const { body } = await update.response;
    const response = await body.json();
    return response.result
  } catch (err) {
    console.log('PUT call failed: ', err);
  }
}

// export const FetchOnboardingStatus = async (request) => {
//     try {
//         const restOperation = get({
//           apiName: 'bridgeApi',
//           path: '/user',
//           options: {
//             queryParams: {
//                 sub: 'd0229811-67cc-4fb8-915b-38d8029b85df'
//             }
//           }
//         });
    
//         const { body } = await restOperation.response;
//         const response = await body.json();
//         console.log(response);
//       } catch (e) {
//         console.log('POST call failed: ', e);
//       }
// }