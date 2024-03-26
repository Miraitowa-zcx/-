<template>
  <div>
    <zc-box height="32rem" marginTop="4rem" title="事件状态">
      <zc-echarts id="left-echarts" :option="echartsOption"></zc-echarts>
    </zc-box>
  </div>
</template>

<script>
export default {
  name: "left-box2",
  data() {
    return {
      echartsOption: {}, //fake echarts data
    };
  },
  methods: {
    fakeEchartsData() {
      let chartData = [
        { name: "待处理", value: 0 },
        { name: "已交办", value: 3 },
        { name: "已反馈", value: 3 },
        { name: "已处置", value: 3 },
      ];
      // 字段值对齐，不足补空格
      let fixWithWhiteSpace = (maxLen, text, prefix = true) => {
        if (text && maxLen) {
          let num = maxLen - text.length;
          return prefix && num > 0
            ? Array(num + 1).join("  ") + text
            : text + Array(num + 1).join("   ");
        }
        return text;
      };
      this.echartsOption = {
        color: ["#0BABFE", "#06F3FC", "#01EF82", "#F9EC6B"],
        title: [
          {
            text: "9",
            left: "29%",
            top: "40%",
            textAlign: "center",
            textStyle: {
              fontSize: 18,
              color: "#00CBF4",
            },
            subtext: "总计", // 副标题
            subtextStyle: {
              // 副标题样式
              color: "#CCF2FF",
              fontStyle: "normal",
              fontWeight: "normal",
              fontFamily: "sans-serif",
              fontSize: 16,
              lineHeight: 16,
            },
          },
          {
            text: "事件",
            right: 85,
            top: "15%",
            textAlign: "center",
            textStyle: {
              fontSize: 12,
              color: "#AEAEAE",
            },
          },
          {
            text: "数量",
            right: 30,
            top: "15%",
            textAlign: "center",
            textStyle: {
              fontSize: 12,
              color: "#AEAEAE",
            },
          },
        ],
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "0%",
          containLabel: true,
        },
        tooltip: {
          confine: true,
        },
        legend: {
          orient: "vertical",
          icon: "circle",
          right: 50,
          top: "center",
          itemGap: 20,
          // textStyle: {
          //   fontSize: 14,
          //   color: "#A8CCDE",
          //   verticalAlign: "middle",
          // },
          itemWidth: 14,
          itemHeight: 14,
          formatter(name) {
            // 该函数用于设置图例显示后的百分比
            let data = chartData;
            // let total = 0;
            let value = 0;
            data.forEach((item) => {
              // total += item.value;
              if (item.name === name) {
                value = item.value;
              }
            });
            // let p = ((value / total) * 100).toFixed(1); // 求出百分比

            let maxNamelen = Math.max(...data.map((p) => p.name.length));
            let maxValuelen = Math.max(
              ...data.map((p) => (p.value + "").length)
            );
            // let maxPercentageLen = Math.max(
            //   ...data.map((p) => ((p.value / total) * 100).toFixed(1).length)
            // );
            //     `${fixWithWhiteSpace(maxPercentageLen, p || "0")}%` +
            // 返回出图例所显示的内容是名称+百分比(去除)
            return [
              `${fixWithWhiteSpace(maxNamelen, name, false)}` +
                "{b|" +
                `${fixWithWhiteSpace(maxValuelen, (value || 0).toString())}` +
                "}{c|" +
                "}",
            ];
          },
          textStyle: {
            color: "#A8CCDE",
            rich: {
              b: {
                padding: [0, 0, 0, 60],
                fontSize: 14,
              },
              c: {
                padding: [0, 0, 0, 0],
                fontSize: 14,
              },
            },
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "65%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderWidth: 5,
              borderColor: "#001236",
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: chartData,
          },
        ],
      };
    },
  },
  mounted() {
    /* 虚假的echarts数据 */
    this.fakeEchartsData();
  },
};
</script>

<style></style>
