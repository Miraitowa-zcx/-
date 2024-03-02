<template>>
  <div class="grid-container">
    <div v-for="item in gridItems" :key="item.id" class="grid-item">
      {{ item.content }}
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 根据需要调整列宽 */
  grid-template-rows: 150px;
  grid-gap: 50px; /* 网格间距 */
  padding: 10px;
  grid-auto-rows: 150px;
}

.grid-item {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}
</style>

<script>
export default {
  name: 'ImagesList',
  data() {
    return {
      gridItems: [
        {id: 1, content: 'Item 1'},
        {id: 2, content: 'Item 2'},
        {id: 3, content: 'Item 3'},
        {id: 4, content: 'Item 4'},
        {id: 5, content: 'Item 5'},
        {id: 6, content: 'Item 6'},
        {id: 7, content: 'Item 7'},
        {id: 8, content: 'Item 8'},
        {id: 9, content: 'Item 9'},
        {id: 1, content: 'Item 1'},
        {id: 2, content: 'Item 2'},
        {id: 3, content: 'Item 3'},
        {id: 4, content: 'Item 4'},
        {id: 5, content: 'Item 5'},
        {id: 6, content: 'Item 6'},
        {id: 7, content: 'Item 7'},
        {id: 8, content: 'Item 8'},
        {id: 9, content: 'Item 9'},
        {id: 1, content: 'Item 1'},
        {id: 2, content: 'Item 2'},
        {id: 3, content: 'Item 3'},
        {id: 4, content: 'Item 4'},
        {id: 5, content: 'Item 5'},
        {id: 6, content: 'Item 6'},
        {id: 7, content: 'Item 7'},
        {id: 8, content: 'Item 8'},
        {id: 9, content: 'Item 9'},

        // 更多项目...
      ]
    }
  }
}
</script>
