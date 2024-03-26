<template>
  <div class="left-bg">
    <!-- 日历组件 -->
    <!-- https://www.npmjs.com/package/zc-components -->
    <zc-date
      class="date-select"
      type="ym"
      inputFilling
      v-model="dateValue"
    ></zc-date>
    <!-- 分隔小组件形式 -->
    <left-box1 @fun="clickFun"></left-box1>
    <left-box2></left-box2>
  </div>
</template>

<script>
/* 引入组件 */
import leftBox1 from "../leftBox1.vue";
import leftBox2 from "../leftBox2.vue";

/* 引入方法 */
import { getNowTimeFull } from "@/utils/calendar";
export default {
  name: "layout-left",
  components: {
    "left-box1": leftBox1,
    "left-box2": leftBox2,
  },
  data() {
    return {
      dateValue: [
        getNowTimeFull().split(" ")[0].split("-")[0] +
          "-" +
          getNowTimeFull().split(" ")[0].split("-")[1],
        getNowTimeFull().split(" ")[0].split("-")[0] +
          "-" +
          getNowTimeFull().split(" ")[0].split("-")[1],
      ], //日历组件v-model,默认是当前年月到当前年月
    };
  },
  methods: {
    /* 出现弹窗 */
    clickFun() {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.left-bg {
  width: 46rem;
  height: 100%;
  padding: 0 1rem;
  .date-select {
    width: 46rem;
  }
}
</style>
