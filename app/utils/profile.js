import { post } from 'aws-amplify/api';

export const RegisterProfile = async (request) => {
    try {
        const restOperation = post({
          apiName: 'bridgeApi',
          path: '/user',
          options: {
            body: request
          }
        });
    
        const { body } = await restOperation.response;
        const response = await body.json();
        console.log(response);
      } catch (e) {
        console.log('POST call failed: ', e);
      }
}
