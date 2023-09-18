// 工资管理
import Layout from "@/layout";
export default {
  path: "/salary",
  component: Layout,
  name: "salary",
  children: [
    {
      name: "salary",
      path: "",
      //   默认二级路由
      component: () => import("@/views/salary"),
      name: "Department",
      meta: { title: "工资", icon: "money" },
    },
  ],
};
