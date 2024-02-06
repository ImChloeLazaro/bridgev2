import "../aws-auth"
import { get, post, put, del } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';

export const insertwithparams = async (path, request) => {
  try {
      const insertOperation = post({
        apiName: 'bridgeApi',
        path: path,
        options: {
          queryParams : request,
        }
      });
  
      const { body } = await insertOperation.response;
      const response = await body.json();
      return response;
  } catch (error) {
    throw new Error(error)
  }
}
export const restinsert = async (path, request) => {
    try {
        const insertOperation = post({
          apiName: 'bridgeApi',
          path: path,
          options: {
            body: request
          }
        });
    
        const { body } = await insertOperation.response;
        const response = await body.json();
        return response;
      } catch (e) {
        throw new Error(e)
      }
}

export const readwithparams = async (path, request) => {
  try {
      const readOperation = get({
        apiName: 'bridgeApi',
        path: path,
        options: {
          queryParams: request
        }
      });
  
      const { body } = await readOperation.response;
      const response = await body.json();
      return response;
    } catch (e) {
      throw new Error(e)
    }
} 

export const restread = async (path) => { 
    try {
        const readOperation = get({
          apiName: 'bridgeApi',
          path: path
        });
    
        const { body } = await readOperation.response;
        const response = await body.json();
        return response;
      } catch (e) {
        throw new Error(e)
      }
}

export const updatewithparams = async (path, request) => {
  try {
      const updateOperation = put({
        apiName: 'bridgeApi',
        path: path,
        options: {
          queryParams : request,
        }
      });
  
      const { body } = await updateOperation.response;
      const response = await body.json();
      return response;
  } catch (error) {
    throw new Error(error)
  }

}
export const restupdate = async (path, request) => {
    try {
        const updateOperation = put({
          apiName: 'bridgeApi',
          path: path,
          options: {
            body: request
          }
        });
    
        const { body } = await updateOperation.response;
        const response = await body.json();
        return response;
      } catch (e) {
        throw new Error(e)
      }
}

export const restdestroy = async (path, request) => {
    try {
        const restOperation = del({
          apiName: 'bridgeApi',
          path: path,
          options: {
            body: request
          }
        });
    
        const { body } = await restOperation.response;
        const response = await body.json();
        return response;
      } catch (e) {
        throw new Error(e)
      }
}

export const uploadfile = async (file) => {
    if(file){
        const filename = `${new Date().toISOString().replace(/[^0-9]/g,'')}.${file.type.split('/')[1]}`;
        uploadData({
            key:  filename,
            data: file,
            options: {
                onProgress: ({ transferredBytes, totalBytes }) => {
                  if (totalBytes) {
                    console.log(
                      `Upload progress ${
                        Math.round(transferredBytes / totalBytes) * 100
                      } %`
                    );
                  }
                }
            }
          });
        return {success: true, filename: filename}
        }
} 

export const getfile = async (filename) => { 
  return `https://bridgebucket150517-dev.s3.ap-southeast-1.amazonaws.com/public/${filename}`
}