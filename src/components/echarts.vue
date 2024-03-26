<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
let that;
export default {
  name: "echarts-box",
  data() {
    return {
      myChart: null,
    };
  },
  props: {
    id: {
      type: String,
      require: true,
    },
    option: {
      type: Object,
      require: true,
    },
  },
  watch: {
    option: {
      handler(newVal) {
        this.myecharts(this.id, newVal);
      },
    },
  },
  created() {
    this.$nextTick(() => {
      this.myecharts(this.id, this.option);
    });
  },
  mounted() {
    that = this;
    window.onresize = function () {
      that.myecharts.resize();
    };
  },
  beforeDestroy() {},
  methods: {
    myecharts(id, option) {
      that.myChart = that.$echarts.init(document.getElementById(id));
      that.myChart.setOption(option);
    },
  },
};
</script>

<style></style>
