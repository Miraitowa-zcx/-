<template>
  <div class="bg">
    <top-header></top-header>
    <router-view v-if="isRouterAlive" class="center" />
  </div>
</template>

<script>
/* 头部组件 */
import topHeader from "@/views/components/topHeader.vue";
export default {
  name: "content-index",
  /* 注入方法 */
  provide() {
    return {
      reload: this.reload,
    };
  },
  /* 注册组件 */
  components: {
    "top-header": topHeader,
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },

  mounted() {
    // 1rem = 10px
    const baseSize = 10;
    //当前页面宽度 相对于1920宽的缩放比例，
    const scale = document.documentElement.clientWidth / 1920;
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  },
};
</script>

<style lang="scss" scoped>
.bg {
  min-height: 100vh;
  min-width: 100vw;
  background-size: 100% 100%;
  background: url("~@/assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
