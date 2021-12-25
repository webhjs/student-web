/*
 * @Descripttion: 
 * @version: 
 * @Author: 金苏
 * @Date: 2021-08-30 09:21:49
 * @LastEditors: 金苏
 * @LastEditTime: 2021-08-30 10:30:22
 */
import Vue from "vue";
import ElementUI from "element-ui";
// element全局样式
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";

import App from "@/App";
import router from "@/router";
import store from "@/store";

// 国际化
import i18n from "@/libs/lang";

import { Form } from 'vant';
import { Field } from 'vant';
import { Area } from 'vant';
import { Button } from 'vant';
import { ActionSheet } from 'vant';

Vue.use(Area);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(ActionSheet);
import 'vant/lib/form/style';
import 'vant/lib/area/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/action-sheet/style';

Vue.use(ElementUI, {
  size: "medium",
  i18n: (key, value) => i18n.t(key, value)
});

// 集成vue架包
import { initSetup } from "@/libs/setup";
initSetup(Vue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
});
