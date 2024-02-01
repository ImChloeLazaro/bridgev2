import "../aws-auth"
import { get, post, put, del } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';

export const create = async (path, request) => {
    try {
        const restOperation = post({
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

export const read = async (path, request) => { 
    try {
        const restOperation = get({
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

export const update = async (path, request) => {
    try {
        const restOperation = put({
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

export const destroy = async (path, request) => {
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