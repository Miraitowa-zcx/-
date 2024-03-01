<template>
  <div class="drag" ref="dragDiv">
    <div class="drag_bg"></div>
    <div class="drag_text">{{ confirmWords }}</div>
    <div
        ref="moveDiv"
        @mousedown="mouseDownFn($event)"
        :class="{ handler_ok_bg: confirmSuccess }"
        class="handler handler_bg"
        style="position: absolute; top: 0; left: 0"
    ></div>
  </div>
</template>
<script>
export default {
  name: "SilderVerify",
  data() {
    return {
      beginClientX: 0 /*距离屏幕左端距离*/,
      mouseMoveState: false /*触发拖动状态  判断*/,
      maxWidth: "" /*拖动最大宽度，依据滑块宽度算出来的*/,
      confirmWords: "向右拖动滑块验证" /*滑块文字*/,
      confirmSuccess: false /*验证成功判断*/,
    };
  },
  methods: {
    //mousedown 事件
    mouseDownFn: function (e) {
      console.log('mouseDownFn' + e.clientX)
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
        this.mouseMoveState = true;
        this.beginClientX = e.clientX;
      }
    },
    //验证成功函数
    successFunction() {
      this.confirmSuccess = true;
      this.confirmWords = "验证通过";
      if (window.addEventListener) {
        document
            .getElementsByTagName("html")[0]
            .removeEventListener("mousemove", this.mouseMoveFn);
        document
            .getElementsByTagName("html")[0]
            .removeEventListener("mouseup", this.moseUpFn);
      } else {
        document
            .getElementsByTagName("html")[0]
            .removeEventListener("mouseup", () => {
            });
      }
      document.getElementsByClassName("drag_text")[0].style.color = "#fff";
      document.getElementsByClassName("handler")[0].style.left =
          this.maxWidth + "px";
      document.getElementsByClassName("drag_bg")[0].style.width =
          this.maxWidth + "px";
    },
    //mousemove事件
    mouseMoveFn(e) {
      if (this.mouseMoveState) {
        let width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxWidth) {
          document.getElementsByClassName("handler")[0].style.left =
              width + "px";
          document.getElementsByClassName("drag_bg")[0].style.width =
              width + "px";
        } else if (width > this.maxWidth) {
          this.successFunction();
        }
      }
    },
    //mouseup事件
    moseUpFn(e) {
      console.log('moseUpFn' + e.clientX)
      this.mouseMoveState = false;
      const width = e.clientX - this.beginClientX;
      if (width < this.maxWidth) {
        document.getElementsByClassName("handler")[0].style.left = 0 + "px";
        document.getElementsByClassName("drag_bg")[0].style.width = 0 + "px";
      }
    },
  },
  mounted() {
    this.maxWidth =
        this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    document
        .getElementsByTagName("html")[0]
        .addEventListener("mousemove", this.mouseMoveFn);
    document
        .getElementsByTagName("html")[0]
        .addEventListener("mouseup", this.moseUpFn);
  },
};
</script>
