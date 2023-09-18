// 审批管理
import Layout from "@/layout";
export default {
  path: "/approval",
  component: Layout,
  name: "approval",
  children: [
    {
      name: "approval",
      path: "",
      //   默认二级路由
      component: () => import("@/views/approval"),
      meta: { title: "审批管理", icon: "tree" },
    },
  ],
};
