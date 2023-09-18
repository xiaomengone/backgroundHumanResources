// 角色管理
import Layout from "@/layout";

export default {
  path: "/role",
  component: Layout,
  name: "role",
  children: [
    {
      name: "role",
      path: "",
      component: () => import("@/views/role"),
      meta: { title: "角色", icon: "setting" },
    },
  ],
};
