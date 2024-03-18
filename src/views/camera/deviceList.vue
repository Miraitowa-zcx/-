<template>
  <div style="width: 100%; padding-right: 10px; padding-left: 10px;">

    <!--  标题  -->
    <div style="margin-bottom: 30px;">实时播放</div>

    <!--  视频  -->
    <div style="text-align: center; background: black; padding: 1px">
      <video id="videoElement" controls autoplay style="min-width: 90%; min-height: 90%;"/>
    </div>

    <!-- 表单 -->
    <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="200px"
             style="margin-top:30px; text-align: center;">
      <el-form-item label="文件地址(rtsp地址)" prop="path">
        <el-input v-model="form.path" placeholder="请输入rtsp地址" style="width: 300px;">
          <template slot="prepend">rtsp://</template>
        </el-input>
        <el-button style="margin-left: 10px" type="primary" @click="changePath">提交</el-button>
        <el-button style="margin-left: 10px" type="warning" @click="resetVideo">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FlvJs from "flv.js";
import axios from "axios";

export default {
  name: 'deviceList',
  data() {
    return {
      isFlvPlayer: false,
      videoElement: null,
      form: {},
      rules: {
        path: [
          {required: true, message: '请输入rtsp地址', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符'}
        ]
      }
    }
  },
  mounted() {
    this.videoElement = document.getElementById('videoElement');
  },
  computed: {
    prefixedPath() {
      return this.form.path.startsWith('rtsp://') ? this.form.path : 'rtsp://' + this.form.path;
    }
  },
  methods: {
    initFlvPlayer(url) {
      const flvPlayer = FlvJs.createPlayer({
        type: 'flv',
        isLive: true,
        cors: true,
        url,
      })

      flvPlayer.attachMediaElement(this.videoElement)
      flvPlayer.load()
      // flvPlayer.play()

      return flvPlayer
    },
    resetUrl(url) {
      if (FlvJs.isSupported()) {
        this.initFlvPlayer(url)
        if (this.isFlvPlayer) {
          this.flv_start()
        }
      } else {
        this.$notify.error('不支持flv播放')
      }
    },
    flv_start() {
      const videoElement = this.videoElement
      if (videoElement.paused) {
        videoElement.play();
      }
    },
    flv_pause() {
      const videoElement = this.videoElement
      if (!videoElement.paused) {
        videoElement.pause();
      }
    },
    flv_destroy() {
      let videoElement = this.videoElement
      videoElement.pause();
      videoElement.removeAttribute('src')
      videoElement.load();
      videoElement = null
      this.isFlvPlayer = true
    },
    flv_seekto() {
      const videoElement = this.videoElement
      videoElement.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
    },
    async changePath() {
      this.$refs['ruleForm'].validate(async (valid) => {
            if (valid) {
              try {
                const res = await axios.post('http://localhost:8080/putVideo', {path: this.prefixedPath})
                if (res.data.code === 1) {
                  this.$notify.success('连接成功');
                  this.resetUrl("http://localhost:8080/getVideo?id=" + res.data.data);
                } else {
                  this.$notify.error(res.data.msg);
                }
              } catch (e) {
                this.$notify.error('连接失败');
              }
            } else {
              this.$notify.error('请完善信息');
            }
          }
      )
    },
    resetVideo() {
      this.isFlvPlayer = false
      this.form.path = ''
      this.flv_destroy()
      this.$notify.success('重置成功')
      setTimeout(() => {
            this.$router.go(0)
          }, 500
      )

    }
  }
}
</script>

<style scoped>
</style>
