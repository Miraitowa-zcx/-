<template>
  <div>
    <el-row style="padding-top: 20px; padding-left: 20px">
      <el-col :span="8" v-for="(o, index) in 3" :key="o" :offset="index = 0">
        <el-card shadow="hover" style="max-width: 85%; height: 150px; display: flex;" :body-style="{ padding: '0px' }">
          <div style="display: flex;">
            <el-card class="card-container-left" shadow="never">
              <img src="@/assets/images/index_msg.png" alt="图片" class="avatar">
            </el-card>
            <div class="card-container-right">
              <el-card style="height: 100%;" shadow="never">
                <div slot="header">
                  <span>名称</span>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                  {{ '列表内容 ' + o }}
                </div>
              </el-card>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-for="(o, index) in 4" :key="o" :offset="index = 0" style="padding-top: 50px">
        <el-card shadow="hover" style="max-width: 350px; height: 300px; text-align: center;"
                 :body-style="{ padding: '1' }">
          <div slot="header">
            <span>名称</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-for="(cardType, index) in cardTypes" :key="index" :offset="index === 0 ? 0 : null"
              style="padding-top: 50px">
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
              <form action="#" method="post">
                <textarea placeholder="请输入您的意见或建议..." rows="3"></textarea>
                <button type="submit">提交反馈</button>
              </form>
            </template>

            <!-- 天气 -->
            <template v-else-if="cardType === 'weather'">
              <iframe scrolling="no" :src="'https://widget.tianqiapi.com/?style=yf&skin=pitaya&'"
                      frameborder="0" width="320"
                      height="240" allowtransparency="true" style="pointer-events: none;"></iframe>
            </template>

            <!-- 日历 -->
            <template v-else-if="cardType === 'calendar'">
              <!-- 这里可以嵌入日历组件或者使用API获取并展示日期信息 -->
              <div>今日日期及事件...</div>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
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
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      homeCards: {}
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
    }
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
</style>
