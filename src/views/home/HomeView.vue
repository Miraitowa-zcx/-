<template>
  <div>
    <el-row style="padding-top: 20px; padding-left: 50px">
      <el-col :span="24" style="padding-top: 10px">
        <el-row>
          <el-col :span="11">
            <el-carousel :interval="5000" arrow="never" style="height: 500px">
              <el-carousel-item v-for="(msgInfo, index) in msgInfos" :key="index" style="height: 500px">
                <el-card class="card" shadow="hover" style="height: 500px">
                  <div class="card__header" slot="header" style="text-align: center">
                    <span>{{ msgTitles[msgInfo] }}</span>
                  </div>
                  <div class="text item">

                    <!-- 公告 -->
                    <template v-if="msgInfo === 'announcement'">
                      <el-card :body-style="{padding: '0px'}" style="text-align: center;">
                        <div style="height: 100%; background-color: white">
                          <p>今日无事发生</p>
                          <p>今日无事发生</p>
                          <p>今日无事发生</p>
                        </div>
                      </el-card>
                    </template>

                    <!-- 今日事件 -->
                    <template v-else-if="msgInfo === 'events'">
                      <el-timeline>
                        <el-timeline-item timestamp="2019-09-01" placement="top">
                          <el-card :body-style="{padding: '0px'}">
                            <div slot="header" class="clearfix" style="text-align: center">
                              <span>事件一</span>
                            </div>
                            <div
                                style="background-color: white; text-align: center; min-height: 50px; padding-top: 5px">
                              <p>事件内容</p>
                            </div>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </template>

                    <!-- 统计图表 -->
                    <template v-else-if="msgInfo === 'chart'">
                      <!--                      <el-card :body-style="{padding: '0px'}" style="text-align: center;">-->
                      <div
                          style="max-height: 410px; text-align: center; padding-left: 120px; padding-bottom: 100px">
                        <Chart></Chart>
                      </div>
                      <!--                      </el-card>-->
                    </template>

                    <!-- 当前时间 -->
                    <template v-else-if="msgInfo === 'clock'">
                      <div style="max-height: 410px; padding-left: 150px;">
                        <Clock></Clock>
                      </div>
                    </template>
                  </div>
                </el-card>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-card class="card" shadow="hover" style="max-width: 99%;height: 500px;" :body-style="{ padding: '0' }">
              <GapDeMap></GapDeMap>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" v-for="(cardType, index) in cardTypes" :key="index" :offset="index === 0 ? 0 : null"
              style="padding-top: 30px">
        <el-card class="card" shadow="hover" style="max-width: 350px; height: 360px; text-align: center;"
                 :body-style="{ padding: '0' }">
          <div slot="header">
            <span>{{ cardTitles[cardType] }}</span>
          </div>
          <div class="text item">

            <!-- 个人信息 -->
            <template v-if="cardType === 'personalInfo'">
              <div style="padding-top: 10px">
                <span>姓名：张三</span>
                <p>职位：xx</p>
                <p>邮箱：zhangsan@example.com</p>
              </div>
            </template>

            <!-- 意见反馈 -->
            <template v-else-if="cardType === 'feedback'">
              <el-form ref="ruleForm" :rules="rules" :model="form"
                       style="margin-bottom: 20px; padding-left: 10px; padding-top: 15px">
                <el-form-item prop="content">
                  <el-input type="textarea" autosize placeholder="请输入您的意见或建议..."
                            v-model="form.content" style="height: 50px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFeedback()">提交反馈</el-button>
                </el-form-item>
              </el-form>
            </template>

            <!-- 天气 -->
            <template v-else-if="cardType === 'weather'">
              <iframe scrolling="no" :src="'https://widget.tianqiapi.com/?style=yf&skin=pitaya&'"
                      frameborder="0" width="350"
                      height="320" allowtransparency="true" style="pointer-events: none; text-align: center"></iframe>
            </template>

            <!-- 日历 -->
            <template v-else-if="cardType === 'calendar'">
              <div class="content">
                <Calendar ref="Calendar" agoDayHide="1530115221" style="width: 350px"/>
              </div>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";
import GapDeMap from "@/components/map.vue"
import Chart from "@/components/chart.vue";
import Clock from "@/components/clock.vue";
// import request from "@/utils/request";
// import Cookies from "js-cookie";

export default {
  name: "HomeView",
  data() {
    return {
      cardTypes: ['personalInfo', 'feedback', 'weather', 'calendar'],
      cardTitles: {
        personalInfo: '平台联系方式',
        feedback: '意见反馈',
        weather: '实时天气',
        calendar: '日历',
      },
      msgInfos: ['announcement', 'events', 'chart', 'clock'],
      msgTitles: {
        announcement: '公告',
        events: '今日事件',
        chart: '5分钟负载',
        clock: '当前时间',
      },
      homeCards: {},
      form: {},
      rules: {
        content: [
          {required: true, message: '请输入意见或建议', trigger: 'blur'},
          {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
    },
    submitFeedback() {
        if (this.form.content) {
          this.$notify.success('提交成功')
        } else {
          this.$notify.error('请输入完整信息')
        }
    }
  },
  components: {
    Calendar,
    GapDeMap,
    Chart,
    Clock
  }
}
</script>

<style scoped>

div {
  user-select: none;
  pointer-events: auto; /* 保持其他鼠标事件可用 */
}

img {
  pointer-events: none; /* 禁止图片上的鼠标事件，但此处并不影响拖动 */
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

/deep/ .wh_content_item {
  color: black;
}

/deep/ .wh_top_changge li {
  color: black;
}

/deep/ .wh_jiantou1 {
  border-top: 2px solid #030303;
  border-left: 2px solid #030303;
}

/deep/ .wh_jiantou2 {
  border-top: 2px solid #030303;
  border-right: 2px solid #030303;
}

/deep/ .wh_jiantou1 {
  background-color: white;
}

/deep/ .wh_content_all {
  background-color: #ffffff
}

/deep/ .wh_content_item .wh_isToday {
  background-color: #2b85e4
}

/deep/ .wh_content_item .wh_chose_day {
  background-color: #9acafc;
}

h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}

.choseMonth-style {
  width: 220px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin: 20px auto auto;
}

.wh_container >>> .mark1 {
  background-color: orange;
}

.wh_container >>> .mark2 {
  background-color: blue;
}

.wh_content_item > .wh_isMark {
  background: orange;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 500px;
  margin: auto;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-card >>> .el-card__body {
  background-image: url('@/assets/images/index_bg_1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

.el-card >>> .el-card__header {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>




