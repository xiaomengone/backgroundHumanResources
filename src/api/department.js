import request from "@/utils/request";

// 获取部门列表
export const apiGetDepartment = () => {
  return request({
    url: "/company/department",
    method: "GET",
  });
};
// 部门负责人
export const apiGetSysUserSimple = () => {
  return request({
    url: "/sys/user/simple",
    method: "GET",
  });
};
// 增加部门
export const apiPostCompanyDepartment = (data) => {
  return request({
    url: "/company/department",
    method: "POST",
    data,
  });
};
export const apiGetCompanyDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: "GET",
  });
};
// 编辑部门
export const apiPutCompanyDepartment = (id, data) => {
  return request({
    url: `/company/department/${id}`,
    method: "PUT",
    data,
  });
};
// 删除部门
export const apiDeleteCompanyDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: "DELETE",
  });
};
