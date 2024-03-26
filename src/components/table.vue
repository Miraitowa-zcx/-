<template>
  <div
      :style="[
      {
        width: width,
        height: height,
        marginLeft: marginLeft,
      },
    ]"
      class="bg"
  >
    <div v-show="showTitle" class="title">
      <div
          :style="[
          { color: colorOption.title ? colorOption.title : '#fff' },
          { height: titleOption.height ? titleOption.height : '3,5rem' },
          { lineHeight: titleOption.height ? titleOption.height : '3,5rem' },
          { background: titleOption.background ? titleOption.background : '' },
        ]"
          v-show="tableIndex"
          class="tableNum"
          style="width: 10rem !important"
      >
        <span v-show="!status">排名</span>
        <span v-show="status === 1">序号</span>
      </div>
      <div
          :style="[
          { flex: titleFlex.length > 0 ? titleFlex[index + 1] : '1' },
          { color: colorOption.title ? colorOption.title : '#fff' },
          { height: titleOption.height ? titleOption.height : '3,5rem' },
          { lineHeight: titleOption.height ? titleOption.height : '3,5rem' },
          { background: titleOption.background ? titleOption.background : '' },
          { '--width': setWidth.length > 0 ? setWidth[index] : 'auto' },
        ]"
          :title="titleItem"
          v-for="(titleItem, index) in titleData"
          :key="titleItem.d"
          :class="[{ 'add-important': setWidth[index] }]"
      >
        {{ titleItem }}
      </div>
    </div>
    <!-- 自滚动table -->
    <div
        class="content"
        ref="scroll"
        v-show="chargeData.length > 0 && scrollAuto"
        @click="onModel($event)"
    >
      <vue-seamless-scroll :data="chargeData" :class-option="defaultOption">
        <div
            v-for="(dataItem, dataIndex) in chargeData"
            :key="dataItem.c"
            :class="[
            { bg: dataIndex % 2 === 0 && showType === 'bigscreen' },
            {
              'basic-bg':
                dataIndex % 2 !== 0 && stripe && showType === 'bigscreen',
            },
            { bg: dataIndex % 2 !== 0 && !stripe && showType === 'bigscreen' },
            { 'bg-pc': dataIndex % 2 === 0 && showType === 'pc' },
            { 'basic-bg-pc': dataIndex % 2 !== 0 && stripe && showType === 'pc' },
            { 'bg-pc': dataIndex % 2 !== 0 && !stripe && showType === 'pc' },
            { 'add-bg': basicIndex === dataIndex },
            { 'click-bg': clickedIndex === dataIndex },
          ]"
            class="content-list pointer TEST"
            v-show="basic"
            @click="clickRow(dataItem, dataIndex)"
            @mouseenter="enter(dataIndex)"
            @mouseleave="leave(dataIndex)"
            :data="JSON.stringify(dataItem)"
        >
          <div
              v-show="tableIndex"
              :style="[
              {
                color:
                  colorOption.list.length > 0 ? colorOption.list[0] : '#fff',
              },
            ]"
              class="text-center tableNum"
              :class="[
              { tableText: showType === 'bigscreen' },
              { 'tableText-pc': showType === 'pc' },
            ]"
          >
            {{ dataIndex + 1 }}
          </div>
          <div
              v-for="(optionItem, optionIndex) in option"
              :key="optionItem.b"
              :title="numberToFixed(dataItem[option[optionIndex]], optionItem)"
              class="basic-div"
              :style="[
              { flex: titleFlex.length > 0 ? titleFlex[optionIndex + 1] : '1' },
              {
                color:
                  colorOption.list.length > 0
                    ? colorOption.list[optionIndex + 1]
                    : '#fff',
              },
              {
                cursor:
                  cursor.length > 0 && cursor.indexOf(optionItem) > -1
                    ? 'pointer'
                    : '',
              },
            ]"
          >
            <div
                :class="[
                { tableText: showType === 'bigscreen' },
                { 'tableText-pc': showType === 'pc' },
              ]"
            >
              {{ numberToFixed(dataItem[option[optionIndex]], optionItem) }}
            </div>
          </div>
        </div>
        <!-- 另一种样式(这个基本可以不管) -->
        <div
            v-for="(dataItem, dataIndex) in chargeData"
            :key="dataItem.a"
            class="content-list"
            v-show="!basic"
        >
          <slot :item="dataItem" :index="dataIndex"></slot>
        </div>
        <div
            v-for="(dataItem, dataIndex) in chargeData"
            :key="dataItem.c1"
            v-show="
            dataIndex === chargeData.length - 1 &&
            chargeData.length >= limitMoveNum
          "
            :class="[
            {
              'bottom-content':
                dataIndex === chargeData.length - 1 && showType === 'bigscreen',
            },
            {
              'bottom-content-pc':
                dataIndex === chargeData.length - 1 && showType === 'pc',
            },
          ]"
        ></div>
      </vue-seamless-scroll>
    </div>
    <!-- 手动滚动累加数据的table -->
    <div
        class="content-scroll"
        ref="scroll"
        v-show="chargeData.length > 0 && !scrollAuto"
        v-infinite-scroll="load"
        infinite-scroll-delay="500"
        infinite-scroll-distance="30"
        @click="onModel($event)"
    >
      <vue-seamless-scroll
          v-if="!isLoading"
          :data="chargeData"
          :class-option="defaultOption"
      >
        <div
            v-for="(dataItem, dataIndex) in chargeData"
            :key="dataItem.c"
            :class="[
            { bg: dataIndex % 2 === 0 && showType === 'bigscreen' },
            {
              'basic-bg':
                dataIndex % 2 !== 0 && stripe && showType === 'bigscreen',
            },
            { bg: dataIndex % 2 !== 0 && !stripe && showType === 'bigscreen' },
            { 'bg-pc': dataIndex % 2 === 0 && showType === 'pc' },
            { 'basic-bg-pc': dataIndex % 2 !== 0 && stripe && showType === 'pc' },
            { 'bg-pc': dataIndex % 2 !== 0 && !stripe && showType === 'pc' },
            { 'add-bg': basicIndex === dataIndex },
            { 'click-bg': clickedIndex === dataIndex },
          ]"
            class="content-list pointer TEST"
            v-show="basic"
            @click="clickRow(dataItem, dataIndex)"
            @mouseenter="enter(dataIndex)"
            @mouseleave="leave(dataIndex)"
            :data="JSON.stringify(dataItem)"
        >
          <div
              v-show="tableIndex"
              :style="[
              {
                color:
                  colorOption.list.length > 0 ? colorOption.list[0] : '#fff',
              },
            ]"
              class="text-center tableNum"
              :class="[
              { tableText: showType === 'bigscreen' },
              { 'tableText-pc': showType === 'pc' },
            ]"
          >
            {{ dataIndex + 1 }}
          </div>
          <div
              v-for="(optionItem, optionIndex) in option"
              :key="optionItem.b"
              :title="numberToFixed(dataItem[option[optionIndex]], optionItem)"
              class="basic-div"
              :style="[
              { flex: titleFlex.length > 0 ? titleFlex[optionIndex + 1] : '1' },
              {
                color:
                  colorOption.list.length > 0
                    ? colorOption.list[optionIndex + 1]
                    : '#fff',
              },
              {
                cursor:
                  cursor.length > 0 && cursor.indexOf(optionItem) > -1
                    ? 'pointer'
                    : '',
              },
            ]"
          >
            <div
                :class="[
                { tableText: showType === 'bigscreen' },
                { 'tableText-pc': showType === 'pc' },
              ]"
            >
              {{ numberToFixed(dataItem[option[optionIndex]], optionItem) }}
            </div>
          </div>
        </div>
        <!-- 另一种样式(这个基本可以不管) -->
        <div
            v-for="(dataItem, dataIndex) in chargeData"
            :key="dataItem.a"
            class="content-list"
            v-show="!basic"
        >
          <slot :item="dataItem" :index="dataIndex"></slot>
        </div>
        <div
            v-for="(dataItem, dataIndex) in chargeData"
            :key="dataItem.c1"
            v-show="
            dataIndex === chargeData.length - 1 &&
            chargeData.length >= limitMoveNum
          "
            :class="[
            {
              'bottom-content':
                dataIndex === chargeData.length - 1 && showType === 'bigscreen',
            },
            {
              'bottom-content-pc':
                dataIndex === chargeData.length - 1 && showType === 'pc',
            },
          ]"
        ></div>
      </vue-seamless-scroll>
      <div class="content-nor" v-if="isLoading">加载中...</div>
    </div>
    <div
        class="content-nor"
        v-show="chargeData.length === 0 && !isLoading && !scrollAuto"
    >
      暂无数据
    </div>
    <div class="content-nor" v-show="chargeData.length === 0 && scrollAuto">
      暂无数据
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';

export default {
  name: "component-table",
  data() {
    return {
      chargeData: [],
      basicIndex: -1,
      clickedIndex: -1,
      isLoading: true,
    };
  },
  props: {
    /* 是否需要滚动 */
    scrollAuto: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    status: {
      type: Number,
    },
    /* 要排序的字段,只支持一个字段 */
    sort: {
      type: String,
      default: () => {
        return "";
      },
    },
    /* 宽度 */
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    /* 高度 */
    height: {
      type: String,
      default: () => {
        return "55rem";
      },
    },
    /* 左侧的距离,默认1rem,使用需要传0rem */
    marginLeft: {
      type: String,
      default: () => {
        return "0rem";
      },
    },
    /* 上方的距离 */
    marginTop: {
      type: String,
      default: () => {
        return "0rem";
      },
    },
    /* title标题 */
    titleData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 是否显示标题 */
    showTitle: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* 传过来的数据(重要) */
    listData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 传过来的数据要展示的字段 */
    option: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 可以忽视,表格的展现方式 */
    basic: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* 特殊情况:otherOption="['a', 'b']"输出为a/b */
    otherOption: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 开始滚动的数量 */
    limitMoveNum: {
      type: [Number, String],
      default: () => {
        return 10;
      },
    },
    /* 是否显示排序index(1,2,3) */
    tableIndex: {
      type: Boolean,
      default: false,
    },
    /* 暂时只支持flex布局设置宽度(flex) */
    titleFlex: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* title颜色和对应的每一组数据的颜色(有排序index从排序index开始计算),一样需要数据传完整*/
    colorOption: {
      type: Object,
      default: () => {
        return {
          title: "",
          list: [],
        };
      },
    },
    /* 某些表格不单纯是展示数据(可以点击) */
    cursor: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 是否需要开启表格点击滑入滑出等操作(颜色暂时没有想到好方法,简易写样式自己判断,暂无向父组件传值的需求,可以加,在点击事件中) */
    clickMove: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* 数据需要用百分比显示,传要显示的字段数组(默认两个小数) */
    percent: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 针对title的样式覆盖 */
    titleOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /* filterData 对结果数据做些什么 */
    filterData: {
      type: Object,
      default: () => {
        return {
          option: "",
          arrList: [],
        };
      },
    },
    /* 手动规定每一列(标题和内容)的宽度,例如有2列,则需要传['2rem','2rem'或者''],两组数据则必须传2个值,传空则默认为flex:1 */
    setWidth: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 是否启用斑马纹 */
    stripe: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* showType基础白和大屏蓝,其选值有pc和bigscreen */
    showType: {
      type: String,
      default: () => {
        return "bigscreen";
      },
    },
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: this.limitMoveNum, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  components: {
    vueSeamlessScroll,
  },
  watch: {
    listData: {
      handler(val) {
        if (this.filterData.option) {
          let data = JSON.parse(JSON.stringify(val));
          this.chargeData = data.filter(
              (item) =>
                  !this.filterData.arrList.includes(item[this.filterData.option])
          );
        } else {
          this.chargeData = JSON.parse(JSON.stringify(val));
        }
        this.sortData();
      },
      immediate: true,
      deep: true,
    },
    otherOption: {
      handler(val) {
        if (val.length > 1) {
          for (let i in this.chargeData) {
            this.chargeData[i][val[1]] =
                this.chargeData[i][val[0]] + "/" + this.chargeData[i][val[1]];
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  /* 因为表格数据在计算,这里无法使用,使用props传值向css(scss)中传递参数 */
  // computed:{
  //   cssVars(){
  //     return {
  //       "--color": this.clickMove,
  //     }
  //   }
  // },
  methods: {
    onModel(e) {
      const path = e.path || (e.composedPath && e.composedPath());
      let target = path.filter((r) => /TEST/.test(r.className));
      if (target.length) target = target[0];
      else return;
      const data = JSON.parse(target.getAttribute("data"));
      if (data.id) {
        this.$emit("chooseList", data.id);
      }
      this.$emit("chooseListAll", data);
    },

    /* 排序方法 */
    sortData() {
      if (this.sort) {
        this.chargeData.sort((a, b) => {
          return b[this.sort] - a[this.sort];
        });
      }
    },
    /* 表格的点击方法 */
    clickRow(item, index) {
      // this.$emit("chooseList", item.id);
      if (this.clickMove) {
        this.clickedIndex = index;
      }
    },
    /* 鼠标滑入方法 */
    enter(index) {
      if (this.clickMove) {
        this.basicIndex = index;
      }
    },
    /* 鼠标移出方法 */
    leave() {
      if (this.clickMove) {
        this.basicIndex = -1;
      }
    },
    /* 数字转变百分比方法 */
    numberToFixed(val, name) {
      if (this.percent.length > 0) {
        if (this.percent.indexOf(name) > -1) {
          return (val * 100).toFixed(1) + '%';
        } else {
          return val;
        }
      } else {
        return val;
      }
    },
    /* 设置滚动距离的方法(局限性) */
    scrollFun() {
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTop = (this.chargeData.length ? this.chargeData.length : 20 - 20) * 20;
      }
    },
    /* 返回方法,通知调用 */
    load() {
      // console.log("我在table组件是否执行了");
      if (this.$refs.scroll.scrollHeight > this.$refs.scroll.clientHeight) {
        this.isLoading = true;
      }
      this.scrollFun();
      this.$emit('beLoad');
    },
    /* 方法,用来返回scrolltop */
    setScroll() {
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTop = 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  overflow: hidden;

  .title {
    display: flex;

    div {
      // flex: 1;
      font-size: 1.3rem;
      color: #fff;
      // margin: 0.1rem 0.1rem;
      height: 3rem;
      line-height: 3rem;
      // padding: 0 0.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-align: center;
    }
  }

  .content {
    height: calc(100% - 3rem);
    overflow: hidden;

    .content-list {
      display: flex;

      .tableNum {
        height: 3.5rem;
        line-height: 3.5rem;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        width: 10rem !important;
        // border: 1px solid green;
      }

      .basic-div {
        flex: 1;
        height: 3.5rem;
        line-height: 3.5rem;
        color: #fff;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: center;
      }
    }

    .bg {
      // background: #163355;
      background: #0c3878;
      border-radius: 0.2rem;
    }

    .basic-bg {
      background: #071945;
      border-radius: 0.2rem;
    }

    .bg-pc {
      // background: #163355;
      background: #ffffff;
      border-radius: 0.2rem;
    }

    .basic-bg-pc {
      background: #f5f5f5;
      border-radius: 0.2rem;
    }

    .add-bg {
      background: #1fa2d28f;
    }

    .add-important {
      width: var(--width) !important;
    }

    .click-bg {
      background: #1fa2d28f;
    }

    .bottom-content {
      margin: 2rem 0;
      border: 1px dashed #1fa2d29d;
    }

    .bottom-content-pc {
      margin: 2rem 0;
      border: 1px dashed #eeeeee;
    }
  }

  .content-scroll {
    height: calc(100% - 3rem);
    overflow: auto;

    .content-list {
      display: flex;

      .tableNum {
        height: 3.5rem;
        line-height: 3.5rem;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        width: 10rem !important;
        // border: 1px solid green;
      }

      .basic-div {
        flex: 1;
        height: 3.5rem;
        line-height: 3.5rem;
        color: #fff;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: center;
      }
    }

    .bg {
      // background: #163355;
      background: #0c3878;
      border-radius: 0.2rem;
    }

    .basic-bg {
      background: #071945;
      border-radius: 0.2rem;
    }

    .add-bg {
      background: #1fa2d28f;
    }

    .click-bg {
      background: #1fa2d28f;
    }

    .bottom-content {
      margin: 2rem 0;
      border: 1px dashed #1fa2d29d;
    }

    .bottom-content-pc {
      margin: 2rem 0;
      border: 1px dashed #eeeeee;
    }
  }

  .content-nor {
    height: calc(100% - 3rem);
    text-align: center;
    color: rgb(197, 197, 197);
    line-height: 5rem;
  }

  .tableText {
    letter-spacing: 0.2rem;
    color: #d4e7f0;
  }

  .tableText-pc {
    letter-spacing: 0.2rem;
    color: #000;
  }
}
</style>
