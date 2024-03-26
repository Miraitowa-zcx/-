<template>
  <div>
    <!-- 通用box盒子封装 -->
    <zc-box marginTop="2rem" title="监测数据透视">
      <div>
        <div class="content">
          <zc-table
              :titleData="['车牌号', '检测时间', '进入人数']"
              :option="['name', 'time', 'num']"
              :listData="fakeData"
              height="19rem"
              :titleOption="{
							height: '4.5rem',
							background: 'rgba(3,21,54,0)'
						}"
              :colorOption="{
							title: '#AFB1B0',
							list: []
						}"
              width="44rem"
              marginLeft="1rem"
              :num="['percent']"
              :limitMoveNum="9"
          ></zc-table>
        </div>
        <div class="little-box-title"><span>救援与救治情况</span></div>
        <div class="little-box">
          <div class="little-box-top">
            <div class="little-box-top-left"><img @click="backFunCL" src="@/assets/images/icon_little_left1.png"
                                                  class="add-cursor" alt=""/></div>
            <div class="little-box-top-right">
              <div class="little-box-top-right-top">
                <img src="@/assets/images/icon_little_left3.png" alt=""/>
                <div class="add-cursor" @click="backFunCL">救援</div>
              </div>
              <div class="little-box-top-right-bottom">
                <div class="red">
                  <div class="add-color">死亡</div>
                  <div>0</div>
                </div>
                <div class="yellow">
                  <div class="add-color">救治</div>
                  <div>0</div>
                </div>
                <div class="green">
                  <div class="add-color">防止</div>
                  <div>3</div>
                </div>
              </div>
            </div>
          </div>
          <div class="little-box-top add-margin">
            <div class="little-box-top-left"><img @click="backFunQY" class="add-cursor"
                                                  src="@/assets/images/icon_little_left2.png" alt=""/></div>
            <div class="little-box-top-right">
              <div class="little-box-top-right-top">
                <img src="@/assets/images/icon_little_left3.png" alt=""/>
                <div class="add-cursor" @click="backFunQY">监管</div>
              </div>
              <div class="little-box-top-right-bottom">
                <div class="red">
                  <div class="add-color">失败</div>
                  <div>0</div>
                </div>
                <div class="yellow">
                  <div class="add-color">未觉</div>
                  <div>0</div>
                </div>
                <div class="green">
                  <div class="add-color">警告</div>
                  <div>3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </zc-box>
    <zc-table-box :titleData="titleData" :option="option" :listData="listData" ref="boxInfo"></zc-table-box>
  </div>
</template>

<script>
export default {
  name: 'left-box1',
  data() {
    return {
      fakeData1: [
        {name: '2022/10/14 15:13:16', lc: '未知', tz: '成功'},
        {name: '2022/10/14 15:03:16', lc: '未知', tz: '成功'},
        {name: '2022/10/14 14:58:16', lc: '未知', tz: '成功'}
      ],
      fakeData2: [
        {name: 'xx', lc: '2022/10/14 15:13:18', tz: '防止'},
        {name: 'xx', lc: '2022/10/14 15:03:16', tz: '防止'},
        {name: 'xx', lc: '2022/10/14 14:58:16', tz: '防止'},
      ],
      option: [], //tablebox的取值列表
      listData: [], //tablebox的列表值(后端返回值)
      titleData: [], //tablebox的表头数据
      fakeData: [
        {name: '鲁N52005', time: '2022/10/14 15:13:16', num: '1'},
        {name: '鲁N53272', time: '2022/10/14 15:06:16', num: '3'},
        {name: '鲁N53771', time: '2022/10/14 15:03:16', num: '4'},
        {name: '鲁N55191', time: '2022/10/14 15:01:16', num: '2'},
        {name: '鲁N55235', time: '2022/10/14 14:58:16', num: '2'},
        {name: '鲁N57453', time: '2022/10/14 14:55:16', num: '4'},
        {name: '鲁N57560', time: '2022/10/14 14:52:16', num: '1'},
        {name: '鲁N59168', time: '2022/10/14 14:51:16', num: '4'},
        {name: '鲁N59199', time: '2022/10/14 14:49:16', num: '5'},
        {name: '鲁N59360', time: '2022/10/14 14:49:16', num: '1'},
        {name: '鲁N59750', time: '2022/10/14 14:47:16', num: '1'},
        {name: '鲁N60930', time: '2022/10/14 14:46:16', num: '3'},
        {name: '鲁N60988', time: '2022/10/14 14:46:16', num: '3'},
        {name: '鲁N61018', time: '2022/10/14 14:43:16', num: '3'}
      ]
    };
  },
  methods: {
    /* 车辆点击 */
    backFunCL() {
      this.titleData = ['救援时间', '救援事件', '救援情况'];
      this.option = ['name', 'lc', 'tz'];
      this.listData = this.fakeData1;
      this.$refs.boxInfo.openTable();
      this.$refs.boxInfo.title = '及时救援信息';
    },
    /* 企业点击 */
    backFunQY() {
      this.titleData = ['监管单位', '发现时间', '监管情况'];
      this.option = ['name', 'lc', 'tz'];
      this.listData = this.fakeData2;
      this.$refs.boxInfo.openTable();
      this.$refs.boxInfo.title = '监管单位监管信息';
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  .item-box {
    width: 22rem;
    background: url('~@/assets/images/little_box_bg.png');
    height: 8.4rem;
    background-size: 100% 100%;
    margin: 0.8rem 0.5rem;
    display: flex;

    .item-box-left {
      width: 7rem;
      font-size: 2.4rem;
      text-align: center;
      line-height: 8.4rem;
      background: linear-gradient(180deg, #ffffff 40%, #75d6ff 70%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
    }

    .item-box-right {
      flex: 1;
      margin-left: 1rem;

      .item-box-right-top {
        height: 4.2rem;
        color: #c9deec;
        font-size: 1.6rem;
        line-height: 5rem;
      }

      .item-box-right-bottom {
        height: 4.2rem;
        color: #d8fffe;
        font-size: 2.2rem;
      }
    }
  }
}

.little-box-title {
  background: url('~@/assets/images/little_box_title.png');
  width: 100%;
  height: 3.1rem;
  margin-top: 4rem;
  color: #f0f5f6;
  font-size: 2rem;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
  background-size: 100% 100%;

  span {
    margin-left: 3.5rem;
  }
}

.little-box {
  padding-top: 3rem;

  .little-box-top {
    display: flex;
    margin-top: 1rem;

    .little-box-top-left {
      width: 12.6rem;
      height: 9rem;
    }

    .little-box-top-right {
      width: 31rem;
      height: 9rem;
      margin-left: 0.5rem;

      .little-box-top-right-top {
        position: relative;

        div {
          position: absolute;
          font-size: 1.8rem;
          letter-spacing: 0.2rem;
          background: linear-gradient(180deg, #ffffff 40%, #75d6ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          left: 3rem;
          top: 0.2rem;
        }
      }

      .little-box-top-right-bottom {
        display: flex;
        flex-wrap: wrap;
        margin-left: 3rem;
        margin-top: 0.3rem;

        .red {
          width: 33%;
          color: #eb4a4a;
          font-size: 2rem;
          letter-spacing: 0.2em;
          font-family: 'YouShe', serif;
        }

        .yellow {
          width: 33%;
          color: #deac13;
          font-size: 2rem;
          letter-spacing: 0.2em;
          font-family: 'YouShe', serif;
        }

        .green {
          width: 33%;
          color: #00b38b;
          font-size: 2rem;
          letter-spacing: 0.2em;
          font-family: 'YouShe', serif;
        }
      }
    }
  }
}

.add-color {
  color: #c9deec;
  font-size: 1.6rem;
  margin-bottom: 0.2rem;
}

.add-margin {
  margin-top: 4rem !important;
}

.add-cursor {
  cursor: pointer;
}
</style>
