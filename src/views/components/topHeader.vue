<template>
  <div
    :style="[
      { position: !isFull ? 'relative' : 'fixed' },
      { zIndex: !isFull ? '0' : '20' },
    ]"
    class="header-bg"
  >
    <span class="add-color">{{ title }}</span>
  </div>
</template>

<script>
/* 引入vuex */
import { mapState } from "vuex";
export default {
  name: "top-header",
  computed: {
    ...mapState(["isFull"]),
  },
  props: {
    /* 注意,该处样式使用了自定义字体库 */
    title: {
      type: String,
      default: () => {
        return "溺水检测数据";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.header-bg {
  background: url("~@/assets/images/header_bg.png");
  width: 100%;
  height: 10.2rem;
  text-align: center;
  font-weight: 400;
  font-size: 4.6rem;
  color: #fff;
  line-height: 8rem;
  letter-spacing: 0.25rem;
  background-size: 100% 100%;
  .add-color {
    background: linear-gradient(180deg, #ffffff 40%, #75d6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "YouShe",serif;
  }
}
</style>
