// 员工管理
import Layout from "@/layout";

export default {
  path: "/employee",
  component: Layout,
  name: "employee",
  children: [
    {
      name: "employee",
      path: "",
      component: () => import("@/views/employee"),
      meta: { title: "员工", icon: "people" },
    },
    {
      path: "/employee/employeeDetails",
      name: "EmployeeDetails",
      component: () => import("@/views/employee/EmployeeDetails.vue"),
      hidden: true,
      meta: { title: "员工详情" },
    },
  ],
};
