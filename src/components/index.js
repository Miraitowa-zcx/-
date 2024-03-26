import box from "./box.vue";
import echarts from "./echarts.vue";
import table from "./table.vue";
import tableBox from "./tableBox.vue";
export default {
  install(Vue) {
    Vue.component("zc-box", box);
    Vue.component("zc-echarts", echarts);
    Vue.component("zc-table", table);
    Vue.component("zc-table-box", tableBox);
  },
};
