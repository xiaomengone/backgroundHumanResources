import request from "@/utils/request";

// 获取数字数据
export const apiGetHomeData = () => {
  return request({
    url: "/home/data",
    method: "GET",
  });
};

// 获取通知消息
export const apiGetHomeNotice = () => {
  return request({
    url: "/home/notice",
    method: "GET",
  });
};
