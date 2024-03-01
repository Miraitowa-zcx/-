<template>
  <div style="width: 80%">

    <!--  标题  -->
    <div style="margin-bottom: 30px">新增事件信息</div>

    <!-- 表单 -->
    <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="200px">
      <el-form-item label="设备名称" prop="devicename">
        <el-input v-model="form.devicename" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="devicetype">
        <el-input v-model="form.devicetype" placeholder="请输入设备类型"></el-input>
      </el-form-item>
      <el-form-item label="位置" prop="location">
        <el-input v-model="form.location" placeholder="请输入位置"></el-input>
      </el-form-item>
      <el-form-item label="Rtsp地址" prop="rtspurl">
        <el-input v-model="form.rtspurl" placeholder="请输入Rtsp地址"></el-input>
      </el-form-item>
      <el-form-item label="设备用户名" prop="deviceusername">
        <el-input v-model="form.deviceusername" placeholder="请输入设备用户名"></el-input>
      </el-form-item>
      <el-form-item label="设备密码" prop="devicepassword">
        <el-input v-model="form.devicepassword" placeholder="请输入设备密码"></el-input>
      </el-form-item>
    </el-form>

    <!-- 提交按钮 -->
    <div style="text-align: center; margin-top: 30px">
      <el-button type="primary" @click="save" size="medium">提交</el-button>
    </div>

  </div>
</template>
<script>
import request from '@/utils/request';

export default {
  name: 'AddDeviceInfo',
  data() {
    return {
      form: {},
      rules: {
        devicename: [
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        devicetype: [
          {required: true, message: '请输入设备类型', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        location: [
          {required: true, message: '请输入位置', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        rtspurl: [
          {required: true, message: '请输入Rtsp地址', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        deviceusername: [
          {required: true, message: '请输入设备用户名', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        devicepassword: [
          {required: true, message: '请输入设备密码', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          request.post('/Devices/save', this.form).then(res => {
            if (res.code === 1) {
              this.$notify.success('新增成功')
              this.form = {}
            } else {
              this.$notify.error(res.msg)
            }
          })
        } else {
          this.$notify.error('请完善信息')
        }
      })
    }
  }
}
</script>
