<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 20px;">
      <el-input style="width: 240px;" placeholder="请输入描述" v-model="params.description"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 5px;" @click="load">搜索</el-button>
      <el-button type="warning" icon="el-icon-refresh" style="margin-left: 5px;" @click="reset">重置</el-button>
    </div>

    <!-- 数据表格 -->
    <el-table :data="tableData" border stripe>
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="eventid" label="事件ID"></el-table-column>
      <el-table-column prop="eventtype" label="事件类型"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="$router.push('/editEventInfo?id=' + scope.row.id)">编辑
          </el-button>
          <el-popconfirm
              style="margin-left: 5px;"
              title="您确定要删除这行数据吗？"
              @confirm="del(scope.row.id)">
            <el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

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

<script>
import request from '@/utils/request';

export default {
  name: 'EventInfo',
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
        description: '',
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    handleCurrentChange(page) {
      // 点击分页按钮触发分页
      this.params.page = page
      this.load()
    },
    load() {
      request.get('/Event/page', {
        params: this.params
      }).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.records
          this.total = res.data.total
          console.log(this.tableData)
        }
      })
    },
    reset() {
      this.params = {
        page: 1,
        pageSize: 10,
        description: ''
      }
      this.load()
    },
    del(id) {
      request.delete("/Event/delete/" + id).then(res => {
        if (res.code === 1) {
          this.$notify.success('删除成功')
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
