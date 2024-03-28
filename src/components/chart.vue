<template>
  <div ref="chart" :style="{ width: '500px', height: '500px' }"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'GaugeChart',
  data() {
    return {
      chartInstance: null,
      option: {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 40,
              fontSize: 20
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} %',
              color: 'inherit'
            },
            data: [
              {value: 50}
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.initChart();
    this.startDataUpdate();
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
      this.chartInstance.setOption(this.option);
    },
    startDataUpdate() {
      setInterval(() => {
        this.option.series[0].data[0].value = +(Math.random() * 100).toFixed(2);
        this.chartInstance.setOption(this.option, true);
      }, 2000);
    }
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
};
</script>
