import Vue from "vue";
import Router from "vue-router";
import department from "./modules/department";
import role from "./modules/role";
import employee from "./modules/employee";
import permission from "./modules/permission";
import attentdance from "./modules/attentdance";
import approval from "./modules/approval";
import salary from "./modules/salary";
import soceal from "./modules/social";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
];
// 动态路由
export const asyncRoutes = [
  department,
  role,
  employee,
  permission,
  attentdance,
  approval,
  salary,
  soceal,
];

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
