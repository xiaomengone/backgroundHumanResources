// 社保管理
import Layout from "@/layout";
export default {
  path: "/soceal",
  component: Layout,
  name: "social",
  children: [
    {
      name: "social",
      path: "",
      //   默认二级路由
      component: () => import("@/views/soceal"),
      meta: { title: "社保", icon: "table" },
    },
  ],
};
