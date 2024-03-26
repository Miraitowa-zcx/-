<template>
  <div class="right-bg">
    <right-box1></right-box1>
    <right-box2></right-box2>
  </div>
</template>

<script>
/* 引入组件 */
import rightBox1 from "../rightBox1.vue";
import rightBox2 from "../rightBox2.vue";
export default {
  name: "layout-right",
  components: {
    "right-box1": rightBox1,
    "right-box2": rightBox2,
  },
};
</script>

<style lang="scss" scoped>
.right-bg {
  width: 46rem;
  height: 100%;
  padding: 0 1rem;
}
</style>
