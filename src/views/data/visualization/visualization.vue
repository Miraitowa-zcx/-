<template>
  <!-- 页面加载后自动跳转 -->
  <div></div>
</template>

<script>
export default {
  name: 'DataVisualization',
  mounted() {
    window.open("http://localhost:9091/");
    this.$router.push('/')
    this.$router.go(0)
  }
}
</script>

