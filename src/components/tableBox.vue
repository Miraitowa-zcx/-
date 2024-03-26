<template>
  <transition name="fade">
    <div v-if="show" :class="[{ 'table-box-bg-basic': showModal }]">
      <div class="table-box-bg">
        <div class="table">
          <div class="header">
            <div class="title">
              <div
                v-show="titleArr.length > 0"
                v-for="(item, itemIndex) in titleArr"
                :key="itemIndex + 'idx'"
                :class="[
                  { 'add-margin': itemIndex !== 0 },
                  { 'add-border': itemIndex === basicIndex },
                  { 'add-color': itemIndex !== basicIndex },
                ]"
                @click="clickTitle(itemIndex)"
              >
                {{ item }}
              </div>
              <div v-show="titleArr.length === 0">{{ title }}</div>
            </div>
            <div class="close"><span @click="closeTable">关闭</span></div>
          </div>
          <div class="line"></div>
          <div v-if="showSelect" class="reset-class">
            <el-select
              v-model="value"
              @change="changeTime"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <zc-table
            style="
              border-top: 1px solid #0b4580;
              border-bottom: 1px solid #0b4580;
            "
            width="150rem"
            :titleData="titleData"
            :listData="tableData"
            :option="option"
            :height="showSelect ? '61rem' : '65rem'"
            :limitMoveNum="17"
            :tableIndex="true"
            :status="1"
            :titleOption="{
              height: '4.5rem',
              background: 'rgba(3,21,54,0.5)',
            }"
            :percent="percent"
            :setWidth="['10rem', '', '', '']"
          ></zc-table>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    /* 是否开启背景模态框,默认开启 */
    showModal: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* 数据源 */
    listData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 是否显示月份搜索 */
    showSelect: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* 表格标题list */
    titleData: {
      type: Array,
      default: () => {
        return ["列一", "列二", "列三", "列四"];
      },
    },
    /* 取值项 */
    option: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 是否多组表格数据 */
    isTables: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* 百分比显示数据 */
    percent: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    listData: {
      handler(val) {
        /* 深拷贝赋值 */
        let data = JSON.parse(JSON.stringify(val));
        /* 非多数组 */
        if (!this.isTables) {
          this.tableData = data;
        } else {
          /* 多数组默认取当前高亮列表 */
          this.tableData = data[this.basicIndex].data;
        }
      },
    },
  },
  data() {
    return {
      show: false, //show the table
      title: "", //表格标题
      titleArr: [], //表格标题数组
      basicIndex: 0, //默认下标值
      /* 下拉框的选项 */
      options: [
        {
          value: "一月",
          label: "1",
        },
        {
          value: "二月",
          label: "2",
        },
        {
          value: "三月",
          label: "3",
        },
        {
          value: "四月",
          label: "4",
        },
        {
          value: "五月",
          label: "5",
        },
        {
          value: "六月",
          label: "6",
        },
        {
          value: "七月",
          label: "7",
        },
        {
          value: "八月",
          label: "8",
        },
        {
          value: "九月",
          label: "9",
        },
        {
          value: "十月",
          label: "10",
        },
        {
          value: "十一月",
          label: "11",
        },
        {
          value: "十二月",
          label: "12",
        },
        {
          value: "全年",
          label: "",
        },
      ],
      value: "", //下拉框获取的值
      tableData: [], //给表格组件的数据
    };
  },
  methods: {
    /* 打开table组件 */
    openTable() {
      /* 在渲染完成之后再走方法 */
      this.$nextTick(() => {
        const mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
        this.show = true;
      });
    },
    /* 关闭table组件 */
    closeTable() {
      const mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
      /* 清空掉默认值 */
      this.titleArr = [];
      this.title = "";
      /* 设置回默认值 */
      this.basicIndex = 0;
      this.show = false;
    },
    /* 标题的点击方法 */
    clickTitle(index) {
      let data = JSON.parse(JSON.stringify(this.listData));
      this.tableData = data[index].data;
      this.basicIndex = index;
      /* 方法,待后面具体实现 */
      this.$emit("changetitle");
    },
    /* 获取当前时间 */
    getTime() {
      const date = new Date();
      const seperator1 = "-";
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      return year + seperator1 + month;
    },
    /* 切换时间选项的回调方法 */
    changeTime(val) {
      this.$emit("changetime", val);
    },
  },
  mounted() {
    /* 设置默认当前月 */
    this.value = this.getTime().split("-")[1];
    /* 页面渲染完成设置键盘监听事件 */
    this.$nextTick(() => {
      document.addEventListener("keyup", (e) => {
        if (e.keyCode === 27) {
          this.closeTable();
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.table-box-bg-basic {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  margin: auto auto;
  background-color: rgb(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}
.table-box-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/images/bg_view_l.png");
  background-size: 100% 100%;
  width: 160rem;
  height: 85rem;
  z-index: 99999999999; //最大,防止其他popup影响
  margin: auto auto;
  .table {
    width: 150rem;
    height: 75rem;
    margin: 4rem auto 2rem;
    .header {
      display: flex;
      .title {
        flex: 1;
        color: #00d1ff;
        font-size: 2rem;
        font-weight: 500;
        display: flex;
        div {
          position: relative;
          cursor: pointer;
        }
      }
      .close {
        width: 5rem;
        text-align: right;
        span {
          color: #00d1ff;
          background: #f5f5f500;
          padding: 0.2rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #00d1ff;
          cursor: pointer;
        }
      }
    }
    .line {
      border: 1px solid #0b4580;
      margin: 3rem 0;
    }
  }
}
.add-margin {
  margin-left: 2rem;
}
.add-border::before {
  content: " ";
  width: 22rem;
  height: 0;
  border-bottom: 0.3rem #00d1ff solid;
  position: absolute;
  top: 5.5rem;
  border-radius: 0.5rem;
  transition: 0.3s;
}
.add-color {
  color: #f5f5f5 !important;
}
.reset-class {
  text-align: right;
  margin-bottom: 2rem;
  v-deep.el-input__inner {
    background: #0c3878 !important;
  }
  ::v-deep .el-select-dropdown {
    background: #0c3878 !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
