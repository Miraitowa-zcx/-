<template>
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
    <el-col :span="6" v-for="(city, index) in cities" :key="city.id" :offset="index === 0 ? 0 : null"
            style="padding-top: 50px">
      <el-card shadow="hover" style="max-width: 350px; height: 350px; text-align: center;"
               :body-style="{ padding: '1' }">
        <div slot="header">
          <span>{{ city.name }}</span>
        </div>
        <div class="text item">
          <iframe scrolling="no" :src="'https://widget.tianqiapi.com/?style=yf&skin=pitaya&city=' + city.name" frameborder="0" width="320"
                  height="320" allowtransparency="true"></iframe>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Cookies from "js-cookie";
// import request from "@/utils/request";
//import * as echarts from 'echarts';

export default {
  data() {
    return {
      cities: [
        {id: '100010', name: '北京'},
        {id: '100012', name: '上海'},
        {id: '100013', name: '广州'},
        {id: '100014', name: '深圳'},
      ],
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
