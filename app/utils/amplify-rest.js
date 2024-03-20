import "../aws-auth";
import { get, post, put, del } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";

export const insertwithparams = async (path, query, request) => {
  try {
    const insertOperation = post({
      apiName: "bridgeApi",
      path: path,
      options: {
        queryParams: query,
        body: request,
      },
    });

    const { body } = await insertOperation.response;
    return await body.json();
  } catch (error) {
    console.log(error);
  }
};

export const restinsert = async (path, request) => {
  try {
    const insertOperation = post({
      apiName: "bridgeApi",
      path: path,
      options: {
        body: request,
      },
    });

    const { body } = await insertOperation.response;
    return await body.json();
  } catch (e) {
    console.log(e);
  }
};

export const readwithparams = async (path, request) => {
  try {
    const readOperation = get({
      apiName: "bridgeApi",
      path: path,
      options: {
        queryParams: request,
      },
    });

    const { body } = await readOperation.response;
    return await body.json();
  } catch (e) {
    console.log(e);
  }
};

export const restread = async (path) => {
  try {
    const readOperation = get({
      apiName: "bridgeApi",
      path: path,
    });

    const { body } = await readOperation.response;
    return await body.json();
  } catch (e) {
    console.log(e);
  }
};

export const updatewithparams = async (path, request) => {
  try {
    const updateOperation = put({
      apiName: "bridgeApi",
      path: path,
      options: {
        queryParams: request,
      },
    });

    const { body } = await updateOperation.response;
    return await body.json();
  } catch (error) {
    console.log(error);
  }
};
export const restupdate = async (path, request) => {
  try {
    const updateOperation = put({
      apiName: "bridgeApi",
      path: path,
      options: {
        body: request,
      },
    });

    const { body } = await updateOperation.response;
    return await body.json();
  } catch (e) {
    console.log(e);
  }
};

export const destroywithparams = async (path, request) => {
  try {
    const delOperation = del({
      apiName: "bridgeApi",
      path: path,
      options: {
        queryParams: request,
      },
    });

    const { body } = await delOperation.response;
    return await body.json();
  } catch (error) {
    console.log("DELETE params call failed: ", error);
  }
};

export const restdestroy = async (path, request) => {
  try {
    const delOperation = del({
      apiName: "bridgeApi",
      path: path,
      options: {
        body: request,
      },
    });

    const { body } = await delOperation.response;
    return await body.json();
  } catch (error) {
    console.log("DELETE call failed: ", error);
  }
};

export const uploadfile = async (file) => {
  if (file) {
    const filename = `${new Date().toISOString().replace(/[^0-9]/g, "")}.${
      file.type.split("/")[1]
    }`;
    const result = uploadData({
      key: filename,
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
        },
      },
    }).result;
    return { success: true, filename: filename, result: result };
  }
};

export const getfile = (filename) => {
  return `https://bridgebucket150517-dev.s3.ap-southeast-1.amazonaws.com/public/${filename}`;
};
