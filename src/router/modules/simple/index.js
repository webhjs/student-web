/*
 * @Descripttion:
 * @version:
 * @Author: 金苏
 * @Date: 2021-03-29 17:31:42
 * @LastEditors: 金苏
 * @LastEditTime: 2021-10-09 11:32:08
 */
import Layout from "@/libs/layout/Layout";
import { Lazy } from '@/libs/utils/custom';

export const constantRouterMap = [
  {
    path: "/",
    // hidden: true,
    component: Layout,
    meta: { icon: "s-home", title: "首页" },
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => Lazy(import("@/views/student-template/home")),
        meta: { icon: "s-home", title: "首页" }
      }
    ]
  },
  {
    path: "/table",
    name: "table",
    alwaysShow: true,
    meta: { icon: "document-copy", title: "表格样例" },
    component: Layout,
    redirect: "/table/drop-down-table",
    children: [
      {
        path: "drop-down-table",
        name: "drop-down-table",
        meta: { icon: "document-copy", title: "下拉懒加载表格" },
        component: () => Lazy(import("@/views/simple-template/table/drop-down-table"))
      },
      {
        path: "sync-fixed-table",
        name: "sync-fixed-table",
        meta: { icon: "document-copy", title: "同步固定表格" },
        component: () => Lazy(import("@/views/simple-template/table/sync-fixed-table"))
      },
      {
        path: "drag-tree-table",
        name: "drag-tree-table",
        meta: { icon: "document-copy", title: "树行table排序" },
        component: () => Lazy(import("@/views/simple-template/table/drag-tree-table")) // keepAlive: false, activeMenu: '/resource-manage/dataconversion'
      }
    ]
  },
  {
    path: "/flowsheet",
    name: "flowsheet",
    alwaysShow: true,
    meta: { icon: "document-copy", title: "流程样例" },
    component: Layout,
    redirect: "/flowsheet/process",
    children: [
      {
        path: "process",
        name: "process",
        meta: { icon: "document-copy", title: "jsplumb流程图" },
        component: () => Lazy(import("@/views/simple-template/jsplumb"))
      }
    ]
  },
  {
    path: "/waterfall",
    name: "waterfall",
    alwaysShow: true,
    meta: { icon: "document-copy", title: "瀑布流" },
    component: Layout,
    redirect: "/waterfall/index",
    children: [
      {
        path: "index",
        name: "waterfall-index",
        meta: { icon: "document-copy", title: "瀑布流" },
        component: () => Lazy(import("@/views/simple-template/waterfall"))
      }
    ]
  }
];
export const asyncRouterMap = [
  {
    path: "/components",
    alwaysShow: true,
    name: "icon",
    meta: { icon: "brush", title: "组件", roles: ["Lucy"] },
    component: Layout,
    redirect: "/components/component-index",
    children: [
      {
        path: "component-index",
        name: "component-index",
        meta: { icon: "brush", title: "组件列表" },
        component: () => Lazy(import("@/views/simple-template/components/list"))
      }
    ]
  },
  {
    path: "/icon",
    alwaysShow: true,
    name: "icon",
    meta: { icon: "brush", title: "图标库", roles: ["Lucy"] },
    component: Layout,
    redirect: "/icon/font-icon",
    children: [
      {
        path: "font-icon",
        name: "font-icon",
        meta: { icon: "brush", title: "图标分类" },
        component: () => Lazy(import("@/views/simple-template/icon"))
      }
    ]
  }
];
