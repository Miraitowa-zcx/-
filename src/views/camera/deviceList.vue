<template>
  <div>

    <div>
      <el-form>
        <el-form-item label="文件地址(rtsp地址)">
          <el-input v-model="path" placeholder="请输入rtsp地址" style="width: 300px"/>
          <el-button style="margin-left: 10px" type="primary" @click="changePath">提交</el-button>
        </el-form-item>


      </el-form>
    </div>

    <div>
      <video id="videoElement" controls autoplay width="1024" height="576"></video>
    </div>


  </div>
</template>

<script>
import FlvJs from "flv.js";
import axios from "axios";

export default {
  name: 'deviceList',
  data() {
    return {
      path: null,
    };
  },
  methods: {
    resetUrl(url) {
      if (FlvJs.isSupported()) {
        console.error("url:" + url);
        const flvPlayer = FlvJs.createPlayer({
          type: 'flv',
          isLive: true,
          cors: true,
          url,
        });
        const videoElement = document.getElementById('videoElement');
        console.log(videoElement);
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
        this.flv_start();
      } else {
        alert("不支持");
      }
    },
    flv_start() {
      const videoElement = document.getElementById('videoElement');
      videoElement.play();
    },
    flv_pause() {
      const videoElement = document.getElementById('videoElement');
      videoElement.pause();
    },
    flv_destroy() {
      let videoElement = document.getElementById('videoElement');
      videoElement.pause();
      videoElement.unload();
      videoElement.detachMediaElement();
      videoElement.destroy();
      videoElement = null;
    },
    flv_seekto() {
      const videoElement = document.getElementById('videoElement');
      videoElement.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
    },
    changePath() {
      if (this.path === null || this.path === "") {
        alert("请输入地址");
        return;
      }
      console.log(this.path);
      axios.post(
          "http://localhost:8080/putVideo",
          {path: this.path}
      ).then((result) => {
        console.log(result.data);
        if (result.data.code === 1) {
          this.resetUrl("http://localhost:8080/getVideo?id=" + result.data.data);
        } else {
          alert("请求出错");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
