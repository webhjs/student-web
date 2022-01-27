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

export const constantRouterMap = [ ];
export const asyncRouterMap = [
  {
    path: "/basepage",
    name: "basepage",
    alwaysShow: true,
    meta: { icon: "document-copy", title: "基础页面" },
    component: Layout,
    redirect: "/basepage/index",
    children: [
      {
        path: "index",
        name: "basepage-index",
        meta: { icon: "document-copy", title: "基础页面" },
        component: () => Lazy(import("@/views/simple-template/basepage"))
      }
    ]
  },
  {
    path: "/lazyscroll",
    component: Layout,
    alwaysShow: true,
    redirect: "/lazyscroll/infinite",
    meta: { icon: "s-home", title: "懒加载" },
    children: [
      {
        path: "infinite",
        name: "infinite",
        meta: { icon: "star-on", title: "文档懒加载", keepAlive: false },
        component: () => Lazy(import("@/views/simple-template/lazyscroll/infinite"))
      },
      {
        path: "imgscroll",
        name: "imgscroll",
        meta: { icon: "star-on", title: "图片懒加载", keepAlive: false },
        component: () => Lazy(import("@/views/simple-template/lazyscroll/imgscroll"))
      }
    ]
  },
  {
    path: "/map",
    component: Layout,
    name: "map",
    alwaysShow: true,
    redirect: "/map/citymap",
    meta: { icon: "el-icon-eleme", title: "地图", roles: ["Lucy"] },
    children: [
      {
        path: "citymap",
        name: "citymap",
        meta: { icon: "star-on", title: "县地图", roles: ["Lucy"] },
        component: () => Lazy(import("@/views/simple-template/map"))
      }
    ]
  },
  {
    path: "/three",
    component: Layout,
    alwaysShow: true,
    redirect: "/three/document",
    meta: { icon: "s-home", title: "第三方文档" },
    children: [
      {
        path: "document",
        name: "document",
        meta: { icon: "star-on", title: "官方文档", keepAlive: false },
        component: () => Lazy(import("@/views/simple-template/document"))
      }
    ]
  }
];
