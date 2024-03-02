<template>
  <div>
    <div style="margin: 20px 0">
      <el-select class="input" v-model="timeRange" placeholder="请选择" @change="load">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-card>
      <div id="line" style="width: 100%; height: 400px;"></div>
    </el-card>

    <div style="margin: 20px 0">
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic
                group-separator=","
                :precision="2"
                :value="value2"
                :title="title"
            ></el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="值">
              <template slot="formatter">
                值
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic
                group-separator=","
                :precision="2"
                decimal-separator="."
                :value="value1"
                :title="title"
            >
              <template slot="prefix">
                <i class="el-icon-s-flag" style="color: red"></i>
              </template>
              <template slot="suffix">
                <i class="el-icon-s-flag" style="color: blue"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="like ? 521 : 520" title="值">
              <template slot="suffix">
              <span @click="like = !like" class="like">
                <i
                    class="el-icon-star-on"
                    style="color:red"
                    v-show="!!like"
                ></i>
                <i class="el-icon-star-off" v-show="!like"></i>
              </span>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import request from "@/utils/request";
import * as echarts from 'echarts';

const option = {
  title: {
    text: '统计'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['信息-1', '信息-2']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '信息-1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: []
    },
    {
      name: '信息-2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      data: []
    }
  ]
};

export default {
  data() {
    return {
      like: true,
      value1: 4154.564,
      value2: 1314,
      title: "值",
      return: [],
      borrow: [],
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      lineBox: null,
      timeRange: 'week',
      options: [
        {value: 'week', label: '最近一周'},
        {value: 'month', label: '最近一个月'},
        {value: 'month2', label: '最近两个月'},
        {value: 'month3', label: '最近三个月'}
      ]
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      if (!this.lineBox) {
        this.lineBox = echarts.init(document.getElementById('line'))
      }
      request.get('/charts/lineCharts/' + this.timeRange).then(res => {
        option.xAxis.data = res.data.date
        option.series[0].data = res.data.borrow
        option.series[1].data = res.data.return
        this.lineBox.setOption(option)
      })
    }
  }
}
</script>

<style>
.input {
  width: 300px;
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>
