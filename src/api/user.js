import request from "@/utils/request";
// 登陆
export function apiLogin(data) {
  return request({
    url: "/sys/login",
    method: "POST",
    data: {
      mobile: data.userPhone,
      password: data.userPassword,
    },
  });
}
export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
// 获取用户资料
export function apiGetUserInfo() {
  return request({
    url: "/sys/profile",
    method: "GET",
  });
}
// 修改密码
export function apiUpdatePass(data) {
  return request({
    url: "/sys/user/updatePass",
    method: "PUT",
    data: {
      oldPassword: data.originalPassword,
      newPassword: data.confirmPassword,
    },
  });
}
