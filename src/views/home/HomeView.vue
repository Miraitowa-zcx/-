<template>
  <div>
    <el-row style="padding-top: 20px; padding-left: 50px">
      <el-col :span="8" v-for="(msgInfo, index) in msgInfos" :key="index" :offset="index = 0">
        <el-card shadow="hover" style="max-width: 85%; height: 150px; display: flex;" :body-style="{ padding: '0px' }">
          <div style="display: flex;">
            <el-card class="card-container-left" shadow="never">
              <img src="@/assets/images/index_msg.png" alt="图片" class="avatar">
            </el-card>
            <div class="card-container-right">
              <el-card style="height: 100%;" shadow="never">
                <div slot="header">
                  <span>{{ msgTitles[msgInfo] }}</span>
                </div>
                <div class="text item">

                  <!-- 事件信息 -->
                  <template v-if="msgInfo === '2'">
                    <p>姓名：张三</p>
                    <p>职位：产品经理</p>
                    <p>邮箱：zhangsan@example.com</p>
                  </template>

                  <!-- 个人信息 -->
                  <template v-if="msgInfo === '1'">
                    <p>姓名：张三</p>
                    <p>职位：产品经理</p>
                    <p>邮箱：zhangsan@example.com</p>
                  </template>

                  <!-- 个人信息 -->
                  <template v-if="msgInfo === 'T_Info'">
                    <p>姓名：张三</p>
                    <p>职位：产品经理</p>
                    <p>邮箱：zhangsan@example.com</p>
                  </template>
                </div>
              </el-card>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="23" style="padding-top: 30px">
        <GapDeMap></GapDeMap>
      </el-col>
      <el-col :span="6" v-for="(cardType, index) in cardTypes" :key="index" :offset="index === 0 ? 0 : null"
              style="padding-top: 30px">
        <el-card shadow="hover" style="max-width: 350px; height: 350px; text-align: center;"
                 :body-style="{ padding: '1rem' }">
          <div slot="header">
            <span>{{ cardTitles[cardType] }}</span>
          </div>
          <div class="text item">

            <!-- 个人信息 -->
            <template v-if="cardType === 'personalInfo'">
              <p>姓名：张三</p>
              <p>职位：产品经理</p>
              <p>邮箱：zhangsan@example.com</p>
            </template>

            <!-- 意见反馈 -->
            <template v-else-if="cardType === 'feedback'">
              <el-form ref="feedbackForm" :model="feedbackForm" style="margin-bottom: 20px;">
                <el-form-item prop="content">
                  <el-input type="textarea" autosize placeholder="请输入您的意见或建议..."
                            v-model="feedbackForm.content" style="height: 50px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
                </el-form-item>
              </el-form>
            </template>

            <!-- 天气 -->
            <template v-else-if="cardType === 'weather'">
              <iframe scrolling="no" :src="'https://widget.tianqiapi.com/?style=yf&skin=pitaya&'"
                      frameborder="0" width="320"
                      height="240" allowtransparency="true" style="pointer-events: none;"></iframe>
            </template>

            <!-- 日历 -->
            <template v-else-if="cardType === 'calendar'">
              <div class="content">
                <Calendar ref="Calendar" agoDayHide="1530115221"/>
              </div>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Cookies from "js-cookie";
import Calendar from "vue-calendar-component";
import GapDeMap from "@/components/map/map.vue"
// import request from "@/utils/request";
//import * as echarts from 'echarts';

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
      msgInfos: ['eventInfo', 'feedback', 'weather'],
      msgTitles: {
        eventInfo: '事件信息',
        feedback: 'xx',
        weather: 'xx',
      },
      homeCards: {},
      feedbackForm: {
        content: '',
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
    }
  },
  components: {
    Calendar,
    GapDeMap
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

.card-container-left {
  padding-right: 70px;
  width: 115px;
  height: 150px;
  display: flex;
  align-items: center;
  background-color: #333333;
}

.card-container-right {
  width: calc(500px - 115px);
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
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
</style>




