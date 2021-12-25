/*
 * @Descripttion:
 * @version:
 * @Author: 金苏
 * @Date: 2021-03-24 11:15:16
 * @LastEditors: 金苏
 * @LastEditTime: 2021-08-30 13:18:22
 */
// 全局图标
import "@/libs/icons";
// 全局 Mock 接口
import "@/mock";

import Api from "@/api"

// 自定义的全局组件
import Notification from "@/components/Notification";
// html转pdf
import htmlToPdf from "@/libs/utils/htmlToPdf";
// random
import random from "@/libs/utils/random";
// 导航栏无法收缩
import Fragment from "vue-fragment";

// 全局权限检查
import "@/permission";
// tooltip 溢出显示指令 v-ellipsis:top="li.name"
import Ellipsis from 'vue-directive-ellipsis'
import 'vue-directive-ellipsis/dist/ellipsis.umd.css'

export function initSetup(Vue) {
  Vue.directive('ellipsis', Ellipsis)
  Vue.use(htmlToPdf);
  Vue.use(Api);
  Vue.use(random);
  Vue.use(Fragment.Plugin);
  Vue.use(Notification);
  Vue.prototype.$EventBus = new Vue(); // event bus
}
