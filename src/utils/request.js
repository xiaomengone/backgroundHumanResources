import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";
import router from "@/router";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) return response.data; //返回了Blob对象
    const { success, code, data, message } = response.data;
    if (success) {
      return data;
    } else {
      Message({
        message: message,
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(message || "Error"));
    }
  },
  async (error) => {
    if (error.response.status == 401) {
      await store.commit("user/clearToken");
      router.push("/login");
      Message({
        message: "用户信息过期",
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(error);
    }
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
