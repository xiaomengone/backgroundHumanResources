import request from "@/utils/request";

// 获取员工列表
export const apiGetSysUser = (params) => {
  return request({
    url: "/sys/user",
    method: "GET",
    params,
  });
};

// 浏览器excel导出
export const apiGetUserExport = () => {
  return request({
    url: "/sys/user/export",
    method: "GET",
    responseType: "blob",
  });
};
// excel模版下载
export const apiGetSysImportTemplate = () => {
  return request({
    url: "/sys/user/import/template",
    method: "GET",
    responseType: "blob",
  });
};
// 浏览器上传
export const apiPostImport = (data) => {
  return request({
    url: "/sys/user/import",
    method: "POST",
    data,
  });
};
// 删除
export const apiDeleteSysUser = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: "DELETE",
  });
};
// 新增
export const apiPostSysUser = (data) => {
  return request({
    url: "/sys/user",
    method: "POST",
    data,
  });
};
// 获取员工基本信息
export const apiGetSysUserDetaile = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: "GET",
  });
};
// 修改员工信息
export const apiPutSysUser = (id, data) => {
  return request({
    url: `/sys/user/${id}`,
    method: "PUT",
    data,
  });
};
// 修改员工的角色
export const apiPutSysUserAssignRole = (id, roleIds) => {
  return request({
    url: "/sys/user/assignRoles",
    method: "PUT",
    data: {
      id,
      roleIds,
    },
  });
};
