/*
 * @Descripttion:
 * @version:
 * @Author: 金苏
 * @Date: 2021-03-29 17:31:42
 * @LastEditors: 金苏
 * @LastEditTime: 2021-10-09 11:32:08
 */
import Layout from "@/libs/layout/Layout";
import { nameSpace } from '@/router/common'
const baseUrl = `/${nameSpace}`

export const constantRouterMap = [
  {
    path: "/",
    // hidden: true,
    component: Layout,
    meta: { icon: "s-home", title: "首页" },
    redirect: baseUrl + "/home",
    children: [
      {
        path: baseUrl + "/home",
        name: "home",
        component: () => import("@/views/student-template/home"),
        meta: { icon: "s-home", title: "首页" }
      }
    ]
  }
];
export const asyncRouterMap = [
  {
    path: baseUrl + "/components",
    alwaysShow: true,
    name: "icon",
    meta: { icon: "brush", title: "组件", roles: ["Lucy"] },
    component: Layout,
    redirect: baseUrl + "/components/component-index",
    children: [
      {
        path: "component-index",
        name: "component-index",
        meta: { icon: "brush", title: "组件列表" },
        component: () => import("@/views/student-template/components/list")
      }
    ]
  }
];
