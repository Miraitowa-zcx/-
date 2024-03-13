<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 20px;">
      <el-input style="width: 240px;" placeholder="请输入名称" v-model="params.name"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 5px;" @click="load">搜索</el-button>
      <el-button type="warning" icon="el-icon-refresh" style="margin-left: 5px;" @click="reset">重置</el-button>
    </div>

    <!-- 数据表格 -->
    <div style="min-height: calc(100vh - 300px); text-align: center">
      <el-table :data="tableData" border stripe>
        <el-table-column align="center" prop="id" label="编号" width="80"></el-table-column>
        <el-table-column align="center" prop="devicename" label="设备名称"></el-table-column>
        <el-table-column align="center" prop="devicetype" label="设备类型"></el-table-column>
        <el-table-column align="center" prop="location" label="位置"></el-table-column>
        <el-table-column align="center" prop="rtspurl" label="Rtsp地址"></el-table-column>
        <el-table-column align="center" prop="deviceusername" label="设备用户名"></el-table-column>
        <el-table-column align="center" prop="devicepassword" label="设备密码"></el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="$router.push('/editDeviceInfo?id=' + scope.row.id)">编辑
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

<script>
import request from "@/utils/request";

export default {
  name: 'DeviceInfo',
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
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
      request.get('/Devices/page', {
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
        name: ''
      }
      this.load()
    },
    del(id) {
      request.delete("/Devices/delete/" + id).then(res => {
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
