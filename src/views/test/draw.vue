<template>
  <div>
    <div class="back-body">
      <canvas
        :style="[
          {
            background: `url(${base64})`,
          },
        ]"
        id="myCanvas"
        ref="myCanvas"
      >
      </canvas>
      <img :src="dataUrl" />
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  name: "canvas-draw",
  props: {
    // 接收的图片源
    img: {
      type: String,
      default: () => {
        return "";
      },
    },
    //数据源
    dataList: {
      type: [Array, String],
      default: () => {
        return [];
      },
    },
    // 接收的取值字段
    option: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //具体的取值字段名称
    detailsOption: {
      type: Object,
      default: () => {
        return { left: "left", top: "top", width: "width", height: "height" };
      },
    },
    //要绘制的文字字段名称
    textName: {
      type: Array,
      default: () => {
        return ["label", "confidence"];
      },
    },
    /* 是否允许打字超出绘制的线 */
    overLine: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* 压缩的base64质量 */
    imgQuality: {
      type: Number,
      default: () => {
        return 1;
      },
    },
  },
  watch: {
    /* 有数据立即执行 */
    img: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val && this.dataList) {
            console.log(val);
            this.$nextTick(() => {
              /* 两个条件都满足调用方法 */
              this.getImgInfo();
            });
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      /* canvas相关 */
      ctx: "", //dom节点
      canvas: null,
      /* 拼接完成获取的base64图片地址 */
      dataUrl: "",
      //原图的高宽
      baseImgWidth: 0,
      baseImgHeight: 0,
      base64: "", //接收的图片需要转为base64
    };
  },
  mounted() {
    /* 获取canvas元素 */
    this.canvas = this.$refs.myCanvas;
    this.ctx = this.canvas.getContext("2d");
  },
  methods: {
    drawRect(x, y, lineW, lineY, string1, string2) {
      let string = string1 + "_" + string2;
      //   开始绘制;
      this.ctx.beginPath();
      //   //设置线条颜色，必须放在绘制之前
      this.ctx.strokeStyle = "#850a1e";
      //   // 线宽设置，必须放在绘制之前
      this.ctx.lineWidth = 2;
      // strokeRect参数：（左上角x坐标，y:左上角y坐标，绘画矩形的宽度，绘画矩形的高度）

      this.ctx.strokeRect(x, y, lineW, lineY);
      /* 文字颜色 */
      /* 文字大小 */
      this.ctx.font = "13px bold";
      this.ctx.fillStyle = "#850a1e";
      /* 绘制文字 */
      if (this.overLine) {
        /* 允许超出 */
        this.ctx.fillText(string, x + 5, y + 15); // 绘制 "实心" 文字
      } else {
        /* 不允许超出 */
        this.ctx.fillText(string, x + 5, y + 15, lineW - 10); // 绘制 "实心" 文字
      }
      let that = this;
      html2canvas(document.querySelector("#myCanvas")).then((canvas) => {
        const img = new Image();
        img.src = canvas.toDataURL("png");
        img.setAttribute("crossOrigin", "anonymous");
        canvas.width = that.baseImgWidth; // 自定义图片宽度
        canvas.height = that.baseImgHeight; // 自定义图片宽度
        var context = canvas.getContext("2d");
        img.onload = function () {
          var w = img.width;
          var h = img.height;
          context.drawImage(img, 0, 0, w, h);
          that.dataUrl = canvas.toDataURL("image/png");
          that.$emit("getFixImg", that.dataUrl);
        };
      });
    },
    getImgInfo() {
      let that = this;
      let img = new Image();
      img.src = this.img;
      img.onload = function () {
        /* 获取原图像高宽并保存 */
        that.baseImgWidth = img.width;
        that.baseImgHeight = img.height;
        /* 动态设置canvas的高宽 */
        that.canvas.width = img.width;
        that.canvas.height = img.height;
        /* 调用绘制图片的方法 */
        // that.ctx.drawImage(this, 0, 0);.
        that.imageUrlToBase64(that.img);
        let data = [];
        if (typeof that.dataList == "string") {
          data = JSON.parse(that.dataList);
        } else {
          data = that.dataList;
        }
        for (let i in data) {
          setTimeout(() => {
            that.drawRect(
              data[i][that.option[0]][that.detailsOption["left"]],
              data[i][that.option[0]][that.detailsOption["top"]],
              data[i][that.option[0]][that.detailsOption["width"]],
              data[i][that.option[0]][that.detailsOption["height"]],
              data[i][that.textName[0]],
              data[i][that.textName[1]]
            );
          }, 100);
        }
      };
    },
    /* 网络图片需要转为base64 */
    //异步执行
    imageUrlToBase64(img) {
      //一定要设置为let，不然图片不显示
      let image = new Image();
      //解决跨域问题
      image.setAttribute("crossOrigin", "anonymous");
      let imageUrl = img;
      image.src = imageUrl;
      let that = this;
      //image.onload为异步加载
      image.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var quality = that.imgQuality;
        //这里的dataurl就是base64类型
        var dataURL = canvas.toDataURL("image/jpeg", quality); //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        that.base64 = dataURL;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.back-body {
  width: 1280px;
  height: 720px;
  overflow: hidden;
}
</style>
