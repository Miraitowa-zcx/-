<template>
  <div>

    <!-- 头部区域 -->
    <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 2px; display: flex;">
      <div style="width: 300px">
        <img src="@/assets/logo.png" alt="" style="width: 40px; position: relative; top: 10px; left: 10px;">
        <span style="margin-left: 10px; font-size: 24px;">溺水检测系统</span>
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

    <!-- 侧边栏和主体 -->
    <div style="display: flex; z-index: 1">

      <!-- 侧边栏导航 -->
      <div
          style="width: 200px; min-height: calc(100vh - 62px); overflow: hidden; margin-right: 2px; background-color: white;">
        <el-menu :default-active="$route.path" router class="el-menu-demo" style="margin-bottom: 10px;">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>

          <el-submenu index="camera">
            <template slot="title">
              <i class="el-icon-video-camera"></i>
              <span>摄像头管理</span>
            </template>
            <el-menu-item index="/deviceList">设备列表</el-menu-item>
          </el-submenu>

          <el-submenu index="device">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>设备数据</span>
            </template>
            <el-menu-item index="/deviceInfo">设备信息</el-menu-item>
            <el-menu-item index="/addDeviceInfo">设备添加</el-menu-item>
          </el-submenu>

          <el-submenu index="event">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span>事件数据</span>
            </template>
            <el-menu-item index="/eventInfo">事件信息</el-menu-item>
            <el-menu-item index="/addEventInfo">事件添加</el-menu-item>
          </el-submenu>

          <el-submenu index="system">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/systemMenu">系统菜单</el-menu-item>
            <el-menu-item index="/systemDictionary">系统字典</el-menu-item>
          </el-submenu>

          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/userManage">用户管理</el-menu-item>
            <el-menu-item index="/roleManage">角色管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!-- 主体数据 -->
      <div style="flex: 1; width: 0; background-color: white; padding: 10px;">
        <router-view/>
      </div>
    </div>
    <mouseMove></mouseMove>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import mouseMove from "@/components/mouseMove.vue"

export default {
  name: 'Layout',
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {}
    }
  },
  methods: {
    logout() {
      this.$notify.success('注销成功，即将跳转至登录页')
      // 清除浏览器用户数据
      setTimeout(() => {
        Cookies.remove('admin')
        this.$router.push('/login')
      }, 1000)
    }
  },
  components: {
    mouseMove
  }
}
</script>

<style>

</style>
