<template>
  <div>
    <zc-box marginTop="2rem" title="Value">
      <zc-table
        :titleData="['Value', 'Value', 'Value']"
        :option="['name', 'num', 'percent']"
        :listData="fakeData"
        height="46rem"
        :titleOption="{
          height: '4.5rem',
          background: 'rgba(3,21,54,0)',
        }"
        :colorOption="{
          title: '#AFB1B0',
          list: [],
        }"
        width="44rem"
        marginLeft="1rem"
        :percent="['percent']"
        :limitMoveNum="9"
      ></zc-table>
    </zc-box>
  </div>
</template>

<script>
export default {
  name: "right-box2",
  data() {
    return {
      /* 列表假数据 */
      fakeData: [
        { name: "Value", num: 20, percent: "0.8122" },
        { name: "Value", num: 21, percent: "0.6122" },
        { name: "Value", num: 10, percent: "0.8822" },
        { name: "Value", num: 30, percent: "0.8222" },
        { name: "Value", num: 22, percent: "0.422" },
        { name: "Value", num: 5, percent: "0.3322" },
        { name: "Value", num: 5, percent: "0.2122" },
        { name: "Value", num: 18, percent: "0.7122" },
        { name: "Value", num: 26, percent: "0.9122" },
      ],
    };
  },
};
</script>

<style></style>
