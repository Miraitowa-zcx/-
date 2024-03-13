<template>
  <div>
    <div class="grid-container" style="width: 80%; margin-left: 150px; margin-top: 60px; margin-bottom: 30px;">
      <div v-for="item in gridItems" :key="item.id" class="grid-item">
        <el-tooltip placement="top">
          <div slot="content">
            <el-row>
              <el-col :span="30" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 0; text-align:center;">
                    <img :src="item.content" alt="图片" width="130" height="130" @error="handleImageError"/>
                    <el-descriptions :column="3" :size="size" border>
                      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                      <el-descriptions-item label="备注">
                        <el-tag size="small">学校</el-tag>
                      </el-descriptions-item>
                      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                    </el-descriptions>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <img :src="item.content" alt="图片" width="130" height="130" @error="handleImageError"/>
        </el-tooltip>
      </div>
    </div>

    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: center;">
      <el-pagination
          background
          :current-page="params.page"
          :page-size="params.pageSize"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>
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
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
        description: ''
      },
      gridItems: [
        {id: 1, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 2, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 3, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 4, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 5, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 6, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 7, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 8, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 9, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 1, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 2, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 3, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 4, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 5, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 6, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 7, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 8, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 9, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 1, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 2, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 3, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 4, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 5, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 6, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 7, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 8, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        {id: 9, content: 'https://cdn.aqdstatic.com:966/poseidon/upload/vod/2020-09/166217058260836333.jpg'},
        // 更多项目...
      ]
    }
  },
  methods: {
    handleCurrentChange(page) {
      // 点击分页按钮触发分页
      this.params.page = page
      this.load()
    },
    handleImageError() {
      // 当图片加载失败时，显示默认图片
      this.showDefaultImage = true;
      console.error('图片加载失败');
    }
  }
}
</script>
