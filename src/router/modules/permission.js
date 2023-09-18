// 权限管理
import Layout from "@/layout";

export default {
  path: "/permission",
  component: Layout,
  name: "permission",
  children: [
    {
      name: "permission",
      path: "",
      component: () => import("@/views/permission"),
      meta: { title: "权限", icon: "lock" },
    },
  ],
};
