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
                   @close="handleClose"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   style="margin-bottom: 10px;">
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </el-menu-item>

            <el-submenu index="camera">
              <template slot="title">
                <i class="el-icon-video-camera"></i>
                <span>摄像头管理</span>
              </template>
              <el-menu-item index="/deviceList">实时播放</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="device">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>设备数据</span>
              </template>
              <el-menu-item index="/deviceInfo">设备信息</el-menu-item>
              <el-menu-item index="/addDeviceInfo">设备添加</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="event">
              <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span>事件数据</span>
              </template>
              <el-menu-item index="/eventInfo">事件信息</el-menu-item>
              <el-menu-item index="/addEventInfo">事件添加</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="images">
              <template slot="title">
                <i class="el-icon-picture-outline"></i>
                <span>图库</span>
              </template>
              <el-menu-item index="/imagesList">图像列表</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="user">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/userManage">用户管理</el-menu-item>
              <el-menu-item index="/roleManage">角色管理</el-menu-item>
            </el-submenu>

            <el-submenu v-if="role === 'admin'" index="system">
              <template slot="title">
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
                <el-dropdown-menu slot="dropdown" style="margin-top: -10px">
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
          <div style="height: calc(100vh - 160px); background-color: white; padding: 10px;">
            <router-view/>
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
import mouseMove from "@/components/mouseMove.vue"

export default {
  name: 'LayoutPage',
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      role: Cookies.get('role') ? JSON.parse(Cookies.get('role')) : {}
    }
  },
  methods: {
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
    }
  },
  components: {
    mouseMove
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
</style>
