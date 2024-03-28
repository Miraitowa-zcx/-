<template>
  <!-- 高德地图组件 -->
  <div class="map">
    <div class="map-search">
<!--      <div class="map-search__area">-->
<!--        <span class="search-title">地区：</span>-->
<!--        <el-cascader-->
<!--            v-model="areaValue"-->
<!--            :options="areaOptions"-->
<!--            :props="areaProps"-->
<!--            :teleported="false"-->
<!--            separator="-"-->
<!--            placeholder="请选择"-->
<!--            popper-class="dropDownPanel"-->
<!--            @change="handleAreaChange"-->
<!--        />-->
<!--      </div>-->
    </div>
    <div
        v-loading="loading"
        element-loading-text="数据更新中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(25,81,135,0.7)"
        id="qyContainer">
    </div>

    <!-- 视频弹窗 -->
    <el-dialog title="实时视频" :visible.sync="dialogFormVisible" width="50%">
      <video id="videoElement" controls autoplay style="min-width: 100%; min-height: 100%;" src="http://localhost:8080/putVideo"/>
    </el-dialog>

  </div>
</template>

<script>
// 引入地图插件
import AMapLoader from '@amap/amap-jsapi-loader'
// 引入 地址级联选择器和code码转换
import {regionDataPlus} from 'element-china-area-data'

export default {
  name: "GapDeMap",
  data() {
    return {
      dialogFormVisible: false,
      areaProps: { // 选择地区的属性
        value: 'value',
        label: 'label',
        children: 'children'
      },
      areaOptions: regionDataPlus, // 地区选择的所有的数据
      areaValue: ['370000', '371401', '371482'], // 地区选择参数，['省区域码', '市区域码']
      loading: false, // 地图是否处于加载中

      map: null, // 当前显示的地图区域对象
      AMap: null, // 拿到的所有的地图的对象

      colorMap: ['rgb(255, 0, 13)', 'rgb(255, 126, 36)', 'rgb(194, 187, 0)', 'rgb(26, 255, 0)', 'rgb(0, 84, 194)'], // 颜色
      markers: [], // 标记
      mapData: [], // 地图上的标记点
      backList: [] // 后端给的所有的数据
    }
  },
  mounted() {
    // 设置安全密钥
    window._AMapSecurityConfig = {
      // 必须配合秘钥使用，密钥需要生成，成为开发者之后创建应用即可。
      securityJsCode: 'ed18d066ab8fe5549271db1b3219a02c'
      // 应用密钥概览：https://console.amap.com/dev/key/app
    }

    this.backList = [
      {
        id: 1,
        name: '地址1', // 地址名称
        color: 0, // 点的颜色
        lat: 37.221236, // 经度
        lng: 116.234912 // 纬度
      },
      {
        id: 2,
        name: '地址2',
        color: 1,
        lat: 37.194911,
        lng: 116.592917
      },
      {
        id: 3,
        name: '地址3',
        color: 2,
        lat: 37.150751,
        lng: 116.593329,
      },
      {
        id: 4,
        name: '地址4',
        color: 3,
        lat: 37.221245,
        lng: 116.265387
      },
      {
        id: 5,
        name: '地址5',
        color: 4,
        lat: 37.207206,
        lng: 116.285281
      }
    ] // 假数据，初始化是空数组
    this.mapData = []
    this.markers = [] // 标记
    this.init()
    this.handleMarker()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        AMapLoader.load({
          key: "86653c4ae217a03c1bbe7f279cec5a19", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.LngLat', 'AMap.Marker'], // 需要使用的的插件列表
          AMapUI: {
            version: '1.1',
            plugins: ['overlay/SimpleMarker']
          }
        }).then((AMap) => {
          this.AMap = AMap
          // 初始化地图
          this.map = new AMap.Map("qyContainer", { // 设置地图容器id
            viewMode: "2D", // 是否为3D地图模式
            zoom: 8, // 初始化地图级别
            mapStyle: "amap://styles/darkblue",  // 地图样式，可以自定义
            center: [116.307428, 37.453968] // 初始化地图中心点位置 德州市
          })

          // 添加toolbar--放大缩小
          const toolbar = new AMap.ToolBar()
          this.map.addControl(toolbar)
        }).catch(e => {
          console.log(e)
        })
      })
    },
    // 更改地图的地区
    // handleAreaChange() {
    //   // ...
    // },
    // 处理绘制的点
    handleMarker() {
      this.mapData = this.backList.slice(0, 10)
      setTimeout(() => {
        this.mapData = this.backList
        // 删除之前的markers
        this.map && this.map.remove(this.markers)
        // 添加markers
        this.addMarkers()
      }, 1500)
      // 删除之前的markers
      // this.map && this.map.remove(this.markers)
      // 添加markers
      this.addMarkers()
    },
    // 添加标记点
    addMarkers() {
      const AMap = this.AMap
      if (AMap) {
        this.mapData.forEach(item => {
          const {color} = item
          if (item.lat && item.lng) {
            const obj = {
              position: new AMap.LngLat(item.lng, item.lat),
              zIndex: 99,
              content: `<span class="circleMark" style='background:${this.colorMap[color]}'></span>`
            }
            const marker = new AMap.Marker(obj)
            const marker2 = new AMap.Marker({
              position: new AMap.LngLat(item.lng, item.lat),
              content: `<span class="circleMark" style='background:${this.colorMap[color]}'></span>`,
              zIndex: 99,
              offset: ['50%', '50%'],
              extData: {
                hasEffect: color === 0 // 是否需要涟漪效果
              }
            })
            // 绑定事件
            marker.on('click', this.clickMarkerHandler.bind(this, item))
            // 将创建的点标记添加到已有的地图实例：
            this.map.add([marker2, marker])
            if (marker2._opts.extData.hasEffect) {
              marker2.dom.classList.add('rippleEffect') // 添加涟漪样式
            }
            this.markers.push(marker2, marker)
          }
        })
      }
    },
    // 点击marker触发事件
    clickMarkerHandler(item) {
      // console.log('点击标记点', item, event)
      if (item.id) {
        this.$message.success('点击了标记点')
        this.dialogFormVisible = true
      }
    }
  }
}
</script>
<style>
#qyContainer {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 500px;
}

.circleMark {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.rippleEffect {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: amapTransition 2s linear infinite;
}

@keyframes amapTransition {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1
  }
  100% {
    -webkit-transform: scale(3);
    -moz-transform: scale(3);
    -o-transform: scale(3);
    transform: scale(3);
    opacity: 0.5
  }
}
</style>
