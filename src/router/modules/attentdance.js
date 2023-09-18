// 考勤管理
import Layout from "@/layout";
export default {
  path: "/attentdance",
  component: Layout,
  name: "attendance",
  children: [
    {
      name: "attendance",
      path: "",
      component: () => import("@/views/attentdance"),
      meta: { title: "考勤", icon: "excel" },
    },
  ],
};
