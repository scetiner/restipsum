import axios from "axios";
import { URLS } from "./statics";

const AXIOS = axios.create({
  baseURL: URLS.BASE,
  headers: {
    "Access-Control-Allow-Origin": "*",
    // Authorization: URLS.AUTH
  }
});
let callCount = 0;
// Add a request interceptor
AXIOS.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    callCount++;
    return config;
  },
  function(error) {
    // Do something with request error
    checkLoaderState();
    console.error(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
AXIOS.interceptors.response.use(
  function(response) {
    // Do something with response data
    checkLoaderState();
    return response;
  },
  function(error) {
    checkLoaderState();
    // Do something with response error
    console.error(error);
    return Promise.reject(error);
  }
);

function checkLoaderState() {
  callCount--;
  if (callCount < 1) {
    callCount = 0;
    CallState.setState(false);
  } else {
    CallState.setState(true);
  }
}
var callback = null;
export const CallState = {
  onChanged: cb => {
    callback = cb;
  },
  setState: callState => {
    if (callback != null) {
      callback(callState);
    }
  }
};

export const HTTP = {
  get: async (path, options) => {
    let response = await AXIOS.get(path, options);
    if (response) {
      let data = response.data;
      if (data && response.status === 200) {
        return data;
      }
      if (data && data.message) {
        return new Error(data.message);
      }
      return new Error("Something went wrong during service call");
    } else {
      return new Error(err.message);
    }
  },
  post: async (path, options) => {
    let response = await AXIOS.post(path, options);
    if (response) {
      let data = response.data;
      if (data && response.status === 200) {
        return data;
      }
      if (data && data.message) {
        return new Error(data.message);
      }
      return new Error("Something went wrong during service call");
    } else {
      return new Error(err.message);
    }
  },
  download: async (path, options) => {
    options.method = "GET";
    options.responseType = "blob";

    let response = await AXIOS.get(path, options);
    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export." + Date.now() + ".csv");
      document.body.appendChild(link);
      link.click();
    } else {
      return new Error(err.message);
    }
  }
};
