import request from "@/utils/request";

// 获取列表
export const apiGetSysPermission = () => {
  return request({
    url: "/sys/permission",
    method: "GET",
  });
};
// 新增权限
export const apiPostSysPermission = (data) => {
  return request({
    url: "/sys/permission",
    method: "POST",
    data,
  });
};
// 删除权限点
export const apiDeleteSysPermission = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: "DELETE",
  });
};
// 权限点详情
export const apiGetSysPermissionDetail = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: "GET",
  });
};
// 修改接口
export const apiPutSysPermission = (id, data) => {
  return request({
    url: `/sys/permission/${id}`,
    method: "PUT",
    data,
  });
};
