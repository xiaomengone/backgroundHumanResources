import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";
import { asyncRoutes } from "@/router";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/404"]; // 白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();
  if (hasToken) {
    // 有token
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      // 这里不加NProgress，是因为会走后置守卫
      if (!store.getters.userId) {
        const { roles } = await store.dispatch("user/storGetUserInfo");
        console.log("menus", roles);
        console.log("asyncRoutes", asyncRoutes);
        const filterAsyncRoutes = asyncRoutes.filter((item) => {
          return roles.menus.includes(item.name);
        });
        router.addRoutes([
          ...filterAsyncRoutes,
          { path: "*", redirect: "/404", hidden: true },
        ]);
        next(to.path);
        store.commit("user/setRouters", filterAsyncRoutes);
        console.log("filterAsyncRoutes", filterAsyncRoutes);
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
