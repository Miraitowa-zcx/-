<template>
  <div
    :style="{
      marginTop: marginTop,
      width: width,
      height: height,
    }"
    class="box-bg"
  >
    <div
      :class="[
        { 'box-title-img-bg-big': titleType === 'big' },
        { 'box-title-img-bg-small': titleType === 'small' },
      ]"
      class="box-title"
    >
      <span>{{ title }}</span>
      <div v-if="showButton" class="button">
        <span @click="backFun">
          {{ buttonTitle }}
        </span>
      </div>
    </div>
    <div
      :style="{
        '--height': allHeight - 5 + 'rem',
      }"
      class="box-body"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "feature-box",
  data() {
    return {
      /* 默认的当前表格的需要计算的高度 */
      allHeight: 0,
    };
  },
  props: {
    /* 距离上方 */
    marginTop: {
      type: String,
      default: () => {
        return "0rem";
      },
    },
    /* 整体宽度 */
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    /* 整体高度 */
    height: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    /* 标题 */
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    /* 标题大小 */
    titleType: {
      type: [String, Number],
      default: () => {
        return "small";
      },
    },
    /* 出现按钮 */
    showButton: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* button的文字说明 */
    buttonTitle: {
      type: String,
      default: () => {
        return "";
      },
    },
    /* body-height */
  },
  watch: {
    /* 实时监听获取到的设置表格的高度 */
    height: {
      handler(val) {
        if (val.split("r")[0]) {
          this.allHeight = val.split("r")[0];
        }
      },
      immediate: true,
    },
  },
  methods: {
    /* 点击按钮回调方法 */
    backFun() {
      this.$emit("fun");
    },
  },
};
</script>

<style lang="scss" scoped>
.box-bg {
  .box-title {
    width: 100%;
    height: 5rem;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    line-height: 4.6rem;
    letter-spacing: 0.2rem;
    position: relative;
    span {
      margin-left: 4rem;
    }
    .button {
      position: absolute;
      right: 2rem;
      top: 0;
      font-size: 1.5rem;
      letter-spacing: 0;
      cursor: pointer;
      span {
        background: #0c3778c9;
        padding: 0.5rem 2rem;
        border-radius: 0.5rem;
      }
    }
  }
  .box-body {
    height: var(--height);
  }
  .box-title-img-bg-big {
    background: url("~@/assets/images/big_box_title.png");
    background-size: 100% 100%;
  }
  .box-title-img-bg-small {
    background: url("~@/assets/images/box_title.png");
    background-size: 100% 100%;
  }
}
</style>
