import { post, get } from 'aws-amplify/api';

export const RegisterProfile = async (request) => {
    try {
        const insertuser = post({
          apiName: 'bridgeApi',
          path: '/user',
          options: {
            body: request.user
          }
        });
    
        const { body } = await insertuser.response;
        const response = await body.json();
        console.log(response);
      } catch (e) {
        console.log('POST call failed: ', e);
      }
}

export const FetchOnboardingStatus = async (request) => {
    try {
        const restOperation = get({
          apiName: 'bridgeApi',
          path: '/user',
          options: {
            queryParams: {
                sub: 'd0229811-67cc-4fb8-915b-38d8029b85df'
            }
          }
        });
    
        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);
      } catch (e) {
        console.log('POST call failed: ', e);
      }
}