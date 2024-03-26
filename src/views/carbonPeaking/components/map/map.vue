<template>
  <div
      class="map-bg"
      :style="[
      {
        height: !isFull ? '56.6rem' : '100%',
      },
    ]"
  >
    <div
        ref="map"
        style="background: rgb(0, 25, 46); position: absolute"
        id="map"
    >
      <div id="popup" class="ol-popup">
        <a
            href="#"
            id="popup-closer"
            class="ol-popup-closer"
            @click="overlay.setPosition(undefined)"
        ></a>
        <div id="popup-content" class="popup-content"></div>
      </div>
      <map-checks v-show="buttonsIndex === 1" @setCheck="getCheck"></map-checks>
      <div class="control-buttons">
        <div
            v-for="(iconItem, iconIndex) in buttons"
            :key="iconIndex + 'buttons'"
            @click="clickButtons(iconIndex)"
        >
          <img :src="iconItem.img" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 从openlayers 引入方法 */
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import * as Control from "ol/control";
import {defaults as defaultInteractions} from "ol/interaction";
import Overlay from "ol/Overlay";
/* 引入混合文件 */
import {mapjs} from "./map";
/* 引入组件 */
import mapChecks from "../mapChecks.vue";
/* 引入vuex */
import {mapState, mapMutations} from "vuex";

export default {
  name: "map-vue",
  mixins: [mapjs],
  components: {
    "map-checks": mapChecks,
  },
  computed: {
    ...mapState(["isFull"]),
  },
  data() {
    return {
      map: null,
      defaultList: [], //需要一直展示的图层
      overlay: null, //overlay信息
      selectedFeature: null, //选中的要素
      buttons: [
        {img: require("@/assets/images/buttons2.png")},
        {img: require("@/assets/images/buttons1.png")},
      ], //control buttons icons
      buttonsIndex: -1, //control buttons index
      /* 制造假数据 */
      fakePointData2: [
        {
          lon: 116.346172,
          lat: 37.444803,
          name: "未知水域1",
          a1: "2平方千米",
          b1: "2023-12-10",
          c1: "13514892915",
          a2: "3403222104447",
          b2: "2022-07-09 10:09:39",
          c2: "张三",
          d1: "未知水域",
          img: require("@/assets/images/fake_water.png"),
        },
        {
          lon: 116.367644,
          lat: 37.441952,
          name: "未知水域2",
          a1: "2平方千米",
          b1: "2023-8-19",
          c1: "13878239402",
          a2: "340290458872",
          b2: "2022-07-20 12:49:38",
          c2: "李四",
          d1: "未知水域",
          img: require("@/assets/images/fake_water.png"),
        },
        {
          lon: 116.354469,
          lat: 37.433637,
          name: "未知水域3",
          a1: "2平方千米",
          b1: "2023-8-19",
          c1: "13878239402",
          a2: "340290458872",
          b2: "2022-07-20 12:49:38",
          c2: "李四",
          d1: "未知水域",
          img: require("@/assets/images/fake_water.png"),
        },
        {
          lon: 116.328025,
          lat: 37.424579,
          name: "未知水域4",
          a1: "2平方千米",
          b1: "2023-8-19",
          c1: "13878239402",
          a2: "340290458872",
          b2: "2022-07-20 12:49:38",
          c2: "李四",
          d1: "未知水域",
          img: require("@/assets/images/fake_water.png"),
        },
      ],
      fakePointData1: [
        {
          lon: 116.300116,
          lat: 37.448335,
          name: "监管单位1",
          a1: "xx",
          b1: "0",
          c1: "王五",
          a2: "xx",
          b2: "4台",
          c2: "13605731922",
          d1: "xx",
          img: require("@/assets/images/fake_dw.png"),
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["setFull"]),
    /* 初始化地图 */
    mapInit() {
      const topResolution = 360.0 / 512;
      const resolutions = [];
      for (let zoom = 0; zoom < 22; zoom++) {
        resolutions.push(topResolution / Math.pow(2, zoom));
      }
      let mapUrl = new TileLayer({
        source: new XYZ({
          url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        }),
      });
      this.map = new Map({
        target: "map", // 指向对象
        layers: [mapUrl],
        view: new View({
          center: [116.86, 37.20],
          padding: [100, 100, 100, 100],
          zoom: 7.8,
          projection: "EPSG:4326",
          resolutions: resolutions,
          maxZoom: 16,
          minZoom: 6,
        }),
        controls: new Control.defaults({
          attribution: false,
          zoom: false,
          rotate: false,
        }),
        interactions: defaultInteractions({
          doubleClickZoom: false, //是否需要双击缩放
        }),
      });
      let that = this;
      const popup = document.getElementById("popup");
      this.overlay = new Overlay({
        autoPan: true,
        element: popup,
      });
      this.map.addOverlay(this.overlay);
      //地图缩放触发
      this.map.getView().on("change:resolution", () => {
        let that = this;
        if (that.map.getView().getZoom() >= 10) {
          that.regionLayers.map((item) => {
            that.map.removeLayer(item);
          });
          that.addRegion();
        } else {
          that.regionLayers.map((item) => {
            that.map.removeLayer(item);
          });
          that.addModal();
        }
      });
      /* 地图单击事件 */
      this.map.on("singleclick", (evt) => {
        let content = document.getElementById("popup-content");
        content.innerHTML = "";
        that.overlay.setPosition(undefined);
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        that.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          if (
              feature &&
              !that.clickClose &&
              (feature.values_.attribute || feature.values_.features.length > 0)
          ) {
            that.selectFeature(feature);
          } else {
            that.unSelect();
          }
        });
      });
      /* 添加矢量遮罩图层 */
      this.addModal();
      /* 模拟假数据打点 */
      this.setMap(this.fakePointData1, "hyytdw");
      this.setMap(this.fakePointData2, "hycl");
    },
    /* getCheck获取右下角checkllist */
    getCheck(checkList) {
      /* 若有弹窗关闭掉 */
      this.unSelect();
      this.checkedListArr = checkList; //把获取到的数据缓存起来
      const layerNames = [];
      //不能让默认的图层被隐藏
      let allList = checkList.concat(this.defaultList);
      this.checkedList = allList;
      this.layers.map((item) => {
        if (allList.indexOf(item.getProperties().name) === -1) {
          item.setVisible(false);
        } else {
          item.setVisible(true);
        }
        layerNames.push(item.getProperties().name);
      });
    },
    /* click control buttons index */
    clickButtons(index) {
      if (this.buttonsIndex === index) {
        this.buttonsIndex = -1;
      } else {
        this.buttonsIndex = index;
      }
      if (index === 0) {
        /* 全屏与否动态重新设置层级大小 */
        if (this.isFull) {
          this.map.getView().setZoom(9.5);
        } else {
          this.map.getView().setZoom(10.8);
        }
        this.setFull(!this.isFull);
        /* 做些什么 */
        setTimeout(() => {
          this.map.updateSize();
        }, 0);
      }
    },
  },
  mounted() {
    /* 初始化地图生成方法 */
    this.mapInit();
    setTimeout(() => {
      this.map.updateSize();
    }, 0);
  },
};
</script>

<style lang="scss" scoped>
.map-bg {
  width: 100%;
  position: relative;

  #map {
    width: 100%;
    height: 100%;

    .control-buttons {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      z-index: 10;
      display: flex;
      width: 8rem;

      div {
        flex: 1;
        cursor: pointer;
      }
    }
  }
}

.ol-popup {
  position: absolute;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  // border-radius: 10px;
  border: 1px solid #036d77;
  bottom: 40px;
  left: -50px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: rgb(10, 28, 53, 0.86);
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: rgb(10, 28, 53, 0.86);
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 8px;
  right: 12px;
}

.ol-popup-closer:after {
  content: "✖";
  color: #00eaff;
}
</style>
