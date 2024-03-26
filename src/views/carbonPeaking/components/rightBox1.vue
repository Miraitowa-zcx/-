<template>
  <div>
    <zc-box title="Value">
      <div class="little_title">Value</div>
      <div class="item-flex">
        <div class="icon-img">
          <img src="@/assets/images/icon1.png"  alt=""/>
        </div>
        <div class="icon-bg-right-little">
          <div class="name">Value</div>
          <div class="unit"><span class="num">5</span>Value</div>
        </div>
      </div>
      <div class="item-flex">
        <div class="icon-img">
          <img src="@/assets/images/icon2.png"  alt=""/>
        </div>
        <div class="icon-bg-right-little">
          <div class="name">Value</div>
          <div class="unit"><span class="num">3</span>Value</div>
        </div>
      </div>
      <div class="little_title">Value</div>
      <div class="item-flex">
        <div class="icon-img">
          <img src="@/assets/images/icon3.png"  alt=""/>
        </div>
        <div class="icon-bg-right-little">
          <div class="name">Value</div>
          <div class="unit"><span class="num">2</span>Value</div>
        </div>
      </div>
      <div class="item-flex">
        <div class="icon-img">
          <img src="@/assets/images/icon4.png"  alt=""/>
        </div>
        <div class="icon-bg-right-little">
          <div class="name">Value</div>
          <div class="unit"><span class="num">67</span>Value</div>
        </div>
      </div>
    </zc-box>
  </div>
</template>

<script>
export default {
  name: "right-box1",
};
</script>

<style lang="scss" scoped>
.little_title {
  background: url("~@/assets/images/icon_little_right1.png");
  width: 100%;
  height: 3.7rem;
  margin-top: 3rem;
  color: #00cbf4;
  font-size: 1.8rem;
  line-height: 3.7rem;
  text-align: center;
  background-size: 100% 100%;
}
.item-flex {
  display: flex;
  margin: 1rem 2rem;
  .icon-img {
    width: 6rem;
    height: 6rem;
  }
  .icon-bg-right-little {
    background: url("~@/assets/images/icon5.png");
    width: 34rem;
    height: 4.4rem;
    margin-left: 1rem;
    margin-top: 0.6rem;
    display: flex;
    line-height: 4.4rem;
    background-size: 100% 100%;
    .name {
      flex: 1;
      margin-left: 3rem;
      color: #f2fbfb;
      font-size: 1.6rem;
    }
    .unit {
      flex: 1;
      text-align: right;
      margin-right: 3rem;
      color: #afb1b0;
      font-size: 1.4rem;
      .num {
        color: #d8fffe;
        font-size: 2.4rem;
        margin-right: 1rem;
      }
    }
  }
}
</style>
