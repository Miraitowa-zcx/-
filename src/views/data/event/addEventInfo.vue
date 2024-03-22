<template>
  <div style="width: 80%">

    <!--  标题  -->
    <div style="margin-bottom: 30px">新增事件信息</div>

    <!-- 表单 -->
    <div style="text-align: center">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="200px">
        <el-form-item label="事件ID" prop="eventid">
          <el-select v-model="form.eventid" placeholder="请输入事件ID"></el-select>
        </el-form-item>
        <el-form-item label="事件类型" prop="eventtype">
          <el-input v-model="form.eventtype" placeholder="请输入事件类型"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input id="input-textarea" show-word-limit autosize type="textarea" :rows="2" v-model="form.description"
                    placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 提交按钮 -->
    <div style="text-align: center; margin-top: 30px">
      <el-button type="primary" @click="save" size="medium">提交</el-button>
    </div>

  </div>
</template>
<script>
import request from '@/utils/request';

export default {
  name: 'AddEvent',
  data() {
    const checkNums = (rule, value, callback) => {
      value = parseInt(value)
      if (value === null || value === undefined) {
        return callback(new Error('请输入事件ID'));
      }
      if (!Number.isInteger(value) || value < 0 || value >= 1000) {
        callback(new Error('请输入大于0小于等于1000的数字值'));
      }
      callback();
    };

    return {
      form: {},
      rules: {
        eventid: [
          {required: true, validator: checkNums, trigger: 'blur'}
        ],
        eventtype: [
          {required: true, message: '请输入事件类型', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        description: [
          {trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          request.post('/event/save', this.form).then(res => {
            if (res.code === '200') {
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

<style>
#input-textarea {
  width: 610px;
}
</style>
