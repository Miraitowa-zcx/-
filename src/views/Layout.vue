<template>
  <div>
    <el-container style="height: 100vh; overflow: hidden;">
      <el-aside width="200px">
        <div>
          <img src="../assets/images/logo.png" alt="" style="width: 40px; position: relative; top: 10px; left: 10px;">
          <span style="margin-left: 15px; font-size: 20px; color: white">溺水检测系统</span>
          <el-divider></el-divider>
          <el-menu :default-active="$route.path" router
                   class="el-menu-demo"
                   @open="handleOpen"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   style="margin-bottom: 10px;">
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </el-menu-item>

            <el-submenu index="camera">
              <template v-slot:title>
                <i class="el-icon-video-camera"></i>
                <span>摄像头管理</span>
              </template>
              <el-menu-item index="/deviceList">实时播放</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="device">
              <template v-slot:title>
                <i class="el-icon-info"></i>
                <span>设备数据</span>
              </template>
              <el-menu-item index="/deviceInfo">设备信息</el-menu-item>
              <el-menu-item index="/addDeviceInfo">设备添加</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="event">
              <template v-slot:title>
                <i class="el-icon-s-claim"></i>
                <span>事件数据</span>
              </template>
              <el-menu-item index="/eventInfo">事件信息</el-menu-item>
              <el-menu-item index="/addEventInfo">事件添加</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="images">
              <template v-slot:title>
                <i class="el-icon-picture-outline"></i>
                <span>图库</span>
              </template>
              <el-menu-item index="/imagesList">图像列表</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="user">
              <template v-slot:title>
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/userManage">用户管理</el-menu-item>
              <el-menu-item index="/roleManage">角色管理</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="system">
              <template v-slot:title>
                <i class="el-icon-s-tools"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item index="/systemMenu">系统菜单</el-menu-item>
              <el-menu-item index="/systemDictionary">系统字典</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div style="height: 60px; line-height: 60px; margin-bottom: 2px; display: flex;">
            <div style="text-align: left; margin-top: 15px">
              <el-page-header @back="goBack" content="详情页面">
              </el-page-header>
            </div>
            <div style="flex: 1; text-align: right; padding-right: 20px">
              <el-dropdown size="medium">
              <span class="el-dropdown-link" style="cursor: pointer">
                {{ admin.username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slots:dropdown style="margin-top: -10px">
                  <el-dropdown-item>
                    <div style="width: 50px; text-align: center;" @click="logout">
                      退出
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>

          <div style="min-height: calc(100vh - 160px); background-color: white; padding: 10px;" ref="vantaRef">
            <el-dialog :visible.sync="dialogVisible" width="50%" @close="handleDialogClose">
              <span>提示消息</span>
              <div v-if="messages">
                <pre>{{ messages }}</pre>
              </div>
            </el-dialog>
            <el-row :style="{opacity: 0.9}">
              <router-view/>
            </el-row>
          </div>
        </el-main>
        <el-footer>
          <div style="font-family: 华文行楷,serif; font-size: large">
            <span>雨纷纷</span>
            <el-divider direction="vertical"></el-divider>
            <span>旧故里</span>
            <el-divider direction="vertical"></el-divider>
            <span>草木深</span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <mouseMove></mouseMove>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css';
import * as THREE from 'three'
import VantaClouds from "vanta/src/vanta.clouds";

export default {
  name: 'LayoutPage',
  data() {
    return {
      vantaEffect: null,
      socket: null,
      userId: '10',
      messages: null,
      dialogVisible: false,
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      role: Cookies.get('role') ? JSON.parse(Cookies.get('role')) : {}
    }
  },
  methods: {
    handleOpen() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 300)
    },
    logout() {
      this.$notify.success('注销成功，即将跳转至登录页')
      // 清除浏览器用户数据
      setTimeout(() => {
        Cookies.remove('admin')
        Cookies.remove('role')
        this.$router.push('/login')
      }, 1000)
    },
    goBack() {
      if (this.$route.path === '/') {
        this.$notify.error('已回到首页')
      } else {
        this.$router.push('/')
      }
    },
    handleDialogClose() {
      this.dialogVisible = false; // 关闭弹窗时重置状态
    },
    openSocket() {
      if (typeof WebSocket === "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");

        const socketUrl = `ws://localhost:8080/ws/${this.userId}`;
        console.log(socketUrl);

        if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
          this.socket.close();
          this.socket = null;
        }

        this.socket = new WebSocket(socketUrl);

        this.socket.onopen = () => {
          console.log("websocket已打开");
        };

        this.socket.onmessage = (msg) => {
          this.$notify.success('收到消息')
          this.messages = msg.data
          this.dialogVisible = true
        };

        this.socket.onclose = () => {
          console.log("websocket已关闭");
        };

        this.socket.onerror = () => {
          console.log("websocket发生了错误");
        };
      }
    },
    initializeVanta() {
      this.vantaEffect = VantaClouds({
        mouseControls: false,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 0.40,
        el: this.$refs.vantaRef,
        THREE: THREE,
      });
    },
    resetVanta() {
      if (this.vantaEffect) {
        this.destroyVanta();
        setTimeout(() => {
          this.$nextTick(() => {
            this.initializeVanta();
          });
        }, 100)
      }
    },
    destroyVanta() {
      if (this.vantaEffect && this.vantaEffect.destroy) {
        this.vantaEffect.destroy();
        this.vantaEffect = null;
      }
    },
  },
  beforeDestroy() {
    this.destroyVanta();
  },
  mounted() {
    this.openSocket()
    this.initializeVanta();
  },
  beforeRouteUpdate(to, from, next) {
    this.resetVanta();
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.destroyVanta();
    next();
  }
}
</script>
<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 30px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: left;
  line-height: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.item {
  margin-right: 10px;
}

.vanta-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
}
</style>
