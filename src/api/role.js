import request from "@/utils/request";

// 获取列表
export const apiGetRoleList = (params) => {
  return request({
    url: "/sys/role",
    method: "GET",
    params,
  });
};
// 新增角色
export const apiPostSysRole = (data) => {
  return request({
    url: "/sys/role",
    method: "POST",
    data,
  });
};

// 修改
export const apiPutSysRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: "PUT",
    data,
  });
};
// 删除
export const apiDeleteSysRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: "DELETE",
  });
};
// 获取已启用的角色列表;
export const apiGetSysRoleList = () => {
  return request({
    url: "/sys/role/list/enabled",
    method: "GET",
  });
};
// 获取角色详情
export const apiGetSysRoleDetail = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: "GET",
  });
};

// 分配权限
export const apiPutSysRoleAssignPrem = (id, permIds) => {
  return request({
    url: "/sys/role/assignPrem",
    method: "PUT",
    data: {
      id,
      permIds,
    },
  });
};
