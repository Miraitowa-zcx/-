<template>
  <div
    :style="[
      { marginTop: !isFull ? '-4rem' : '0rem' },
      { minHeight: !isFull ? 'calc(100vh - 6.5rem)' : '100vh' },
    ]"
    class="body-bg"
  >
    <layout-left v-if="!isFull"></layout-left>
    <layout-center></layout-center>
    <layout-right v-if="!isFull"></layout-right>
  </div>
</template>

<script>
/* 引入组件 */
import left from "./components/layout/left.vue";
import right from "./components/layout/right.vue";
import center from "./components/layout/center.vue";
/* 引入vuex */
import { mapState } from "vuex";
export default {
  name: "carbon-peaking-index",
  components: {
    "layout-left": left,
    "layout-right": right,
    "layout-center": center,
  },
  computed: {
    ...mapState(["isFull"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.body-bg {
  display: flex;
}
</style>
