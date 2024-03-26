<template>

  <div
      :style="[{ marginTop: !isFull ? '5rem' : '0rem' }]"
      class="center-bg">

    <map-vue></map-vue>

    <zc-box
        marginTop="2rem"
        titleType="big"
        height="36rem"
        title="区域情况反应"
        v-if="!isFull"
        showButton
        buttonTitle="详情"
        @fun="clickFun">

      <zc-echarts
          id="echarts-center"
          :option="lineOption"></zc-echarts>
    </zc-box>

    <zc-table-box
        :titleData="titleData"
        :option="option"
        :listData="listData"
        ref="boxInfo"
        :percent="['value3']"></zc-table-box>
  </div>
</template>

<script>
  /* 引入组件 */
  import map from "../map/map.vue";
  /* 引入vuex */
  import {mapState} from "vuex";
  import {http} from "@/utils/http";

  export default {
    name: "layout-center",
    components: {
      "map-vue": map,
    },
    computed: {
      ...mapState(["isFull"]),
    },
    data() {
      return {
        echartData: [],
        legendItem: [],
        xAxisData: [],
        yAxisData1: [],
        yAxisData2: [],
        lineOption: {},
        option: [], //tablebox的取值列表
        listData: [], //tablebox的列表值(后端返回值)
        titleData: [], //tablebox的表头数据
      };
    },
    methods: {
      /* 设置虚假折线数据方法 */
      setFakeLineData() {
        let color = ["#229AEE", "#FE3455", "#FFC619"];
        try {
          // const response = http.get('/your-api-endpoint'); // 替换为实际的API接口地址
          // if (response.status === 200 && response.data) {
          //   const serverData = response.data; // 根据服务器返回的数据结构调整解析方式
          //   const echartData = serverData.map((item) => ({
          //     name: item.companyName, // 假设返回的数据中包含companyName字段对应name
          //     value1: item.pastCount, // 假设返回的数据中包含pastCount字段对应value1
          //     value2: item.drowningCount, // 假设返回的数据中包含drowningCount字段对应value2
          //   }));
          const echartData = [
            {
              name: "湖边",
              value1: 10,
              value2: 1,
            }
          ]
          this.legendItem = ["过往人数", "溺水人数"];
          this.xAxisData = echartData.map((v) => v.name);
          this.yAxisData1 = echartData.map((v) => v.value1);
          this.yAxisData2 = echartData.map((v) => v.value2);
          //}
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        const hexToRgba = (hex, opacity) => {
          let rgbaColor = "";
          let reg = /^#[\da-f]{6}$/i;
          if (reg.test(hex)) {
            rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
                "0x" + hex.slice(3, 5)
            )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
          }
          return rgbaColor;
        };
        this.lineOption = {
          color: color,
          legend: {
            center: true,
            top: 10,
            data: this.legendItem,
            textStyle: {
              color: "#fff",
            },
          },
          grid: {
            left: "2%",
            right: "2%",
            bottom: "0%",
            top: "25%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              let html = "";
              params.forEach((v) => {
                html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                    color[v.componentIndex]
                };"></span>
                ${v.seriesName}.${v.name}
                <span style="color:${
                    color[v.componentIndex]
                };font-weight:700;font-size: 18px">${v.value}${
                    v.componentIndex === 2 ? "%" : ""
                }</span>
                `;
              });

              return html;
            },
            extraCssText:
                "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  color: "rgba(255, 255, 255,0.5)",
                },
              },
              axisLabel: {
                inside: false,
                textStyle: {
                  color: "rgba(255, 255, 255,0.7)", // x轴颜色
                  fontWeight: "normal",
                  fontSize: "12",
                  lineHeight: 22,
                },
                rotate: 45,
                interval: 0,
                formatter: function (value) {
                  if (value.length > 4) {
                    return `${value.slice(0, 4)}...`;
                  }
                  return value;
                },
              },

              data: this.xAxisData,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "次数",
              axisLabel: {
                textStyle: {
                  color: "rgba(255, 255, 255,0.7)",
                },
              },
              nameTextStyle: {
                color: "rgba(255, 255, 255,0.7)",
                fontSize: 12,
                lineHeight: 40,
                padding: [0, 0, 0, -20],
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed",
                  color: "rgba(255, 255, 255,0.5)",
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  color: "rgba(255, 255, 255,0.5)",
                },
              },
              axisTick: {
                show: false,
              },
            }
          ],
          series: [
            {
              name: this.legendItem[0],
              type: "bar",
              smooth: false, //是否平滑
              symbolSize: 8,
              barWidth: 15,
              zlevel: 3,
              lineStyle: {
                normal: {
                  color: color[0],
                  shadowBlur: 3,
                  shadowColor: hexToRgba(color[0], 0.5),
                  shadowOffsetY: 0,
                },
              },
              data: this.yAxisData1,
            },
            {
              name: this.legendItem[1],
              type: "bar",
              smooth: false,
              symbolSize: 8,
              barWidth: 15,
              zlevel: 3,
              lineStyle: {
                normal: {
                  color: color[1],
                  shadowBlur: 0,
                  shadowColor: hexToRgba(color[1], 0.5),
                  shadowOffsetY: 0,
                },
              },
              data: this.yAxisData2,
            }
          ],
        };
      },
      /* 组件点击的回调函数 */
      clickFun() {
        http.get('/devices/page').then(() => {
          this.listData = [
            {
              name: "湖边",
              value1: 1,
              value2: "未知",
              value3: 0.6,
            }
          ]
        }, (err) => {
          console.log(err);
        });
        this.titleData = [
          "地点",
          "发生次数",
          "事故原因",
          "总区域占比",
        ];
        this.option = ["name", "value1", "value2", "value3"];
        this.$refs.boxInfo.openTable();
        this.$refs.boxInfo.title = "溺水事件统计表";
      }
    },
    mounted() {
      this.setFakeLineData();
    }
  }
</script>

<style
    lang="scss"
    scoped>
  .center-bg {
    flex: 1;
    // margin-top: 5rem;
  }
</style>
