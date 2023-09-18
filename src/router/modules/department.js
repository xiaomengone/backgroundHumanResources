// 组织架构模块
import Layout from "@/layout";
export default {
  path: "/department",
  component: Layout,
  name: "department",
  children: [
    {
      name: "department",
      path: "",
      //   默认二级路由
      component: () => import("@/views/department"),
      meta: { title: "组织", icon: "tree" },
    },
  ],
};
