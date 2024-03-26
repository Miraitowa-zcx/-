import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* 用户引入 */
/* element-ui */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
/* echarts */
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
/* axios */
import axios from "axios";
Vue.prototype.$axios = axios;
/* api(设置全局引用方法) */
import * as http from "@/api/api.js";
Vue.prototype.$$http = http;
/* 引入字体样式 */
import "@/assets/css/font.scss";

/* 自己的组件库 */
import zcComponents from "zc-components";
Vue.use(zcComponents);

/* 公共组件注册 */
import pluginComponents from "@/components/index";
Vue.use(pluginComponents);

Vue.config.productionTip = false;

/* 设置页面title(需要在router中设置meta) */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "海盐驾驶舱";
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
