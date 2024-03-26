<template>
  <div>
    <zc-draw
      :img="testImg"
      :option="['roi']"
      :dataList="test"
      :detailsOption="{
        left: 'left',
        top: 'top',
        width: 'width',
        height: 'height',
      }"
      @getFixImg="get"
    ></zc-draw>
  </div>
</template>

<script>
import draw from "./draw.vue";
export default {
  name: "test-index2",
  components: {
    "zc-draw": draw,
  },
  data() {
    return {
      testImg: require("../../assets/images/test.png"),
      test: '[{"confidence":0.359375,"label":67227678,"roi":{"height":305,"left":587,"top":389,"width":70}}]',
    };
  },
  methods: {
    get(val) {
      console.log(val);
    },
  },
};
</script>

<style></style>
