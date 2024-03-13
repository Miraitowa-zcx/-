<template>
  <div style="height: 100vh; overflow: hidden; position: relative;" class="background">
    <el-card class="cover" v-if="isClick">
      <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="150"
                    placement="top"
                    slider-text="向右滑动"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh">
      </slide-verify>
      <div>{{ msg }}</div>
    </el-card>
    <el-row :style="{opacity: 0.8}">
      <div style="width: 500px; height: 500px; background-color: white; border-radius: 10px;
            margin: 250px auto; padding: 50px;">
        <div style="margin: 30px; text-align: center; font-size: 30px; font-weight: bold; color: dodgerblue;">
          注 册
        </div>
        <el-form :model="account" :rules="rules" ref="registerForm" label-width="80px">
          <el-form-item prop="phone" label="手机号">
            <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" size="medium"
                      v-model="account.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock" size="medium"
                      v-model="account.password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="repeatPassword" label="确认密码">
            <el-input placeholder="请输入确认密码" show-password prefix-icon="el-icon-lock" size="medium"
                      v-model="account.repeatPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-row type="flex" justify="center" align="middle">
              <el-col style="width: 100vh; margin-right: 10px">
                <el-input placeholder="请输入验证码" prefix-icon="el-icon-lock" size="medium"
                          v-model="account.verifyCode" type="verifyCode"></el-input>
              </el-col>
              <el-col>
                <el-button :disabled="isCountingDown" @click="handleCaptchaClick" style="width: 90px">
                  <template v-if="isCountingDown">{{ countdown }} 秒</template>
                  <template v-else>获取验证码</template>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-top: 30px">
            <el-button style="width: 100%; " size="medium" type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-link :underline="false" href="/login" target="_self">已有账号，去登录</el-link>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'RegisterPage',
  data() {

    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }
        callback();
      }, 1000);
    };
    const checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'));
      } else {
        callback();
      }
    };
    const repeatPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'));
      } else {
        if (value !== this.account.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    }
    return {
      registerAdmin: {},
      isClick: 0,
      checkPass: {},
      account: {},
      rules: {
        phone: [
          {validator: checkPhone, required: true, trigger: 'blur'}
        ],
        password: [
          {validator: checkPass, required: true, trigger: 'blur'}
        ],
        repeatPassword: [
          {validator: repeatPass, required: true, trigger: 'blur'}
        ],
        verifyCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 4, max: 6, message: '请输入6为数字', trigger: 'blur'}
        ]
      },
      isCountingDown: false,
      countdown: 60,
      timer: null
    }
  },
  methods: {
    register() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          request.get('/Diners/checkPhone?phone=' + this.account.phone).then(res => {
            if (res.code === 1) {
              this.$notify.error(res.msg)
            } else {
              request.post('/Diners/register', this.account).then(res => {
                if (res.code === 200) {
                  this.registerAdmin = res.data
                } else {
                  this.$notify.error(res.msg)
                }
              })
            }
          })
        } else {
          if (this.account.password !== this.account.repeatPassword && this.account.repeatPassword !== '' && this.account.password !== '' && this.account.phone !== '') {
            this.$notify.error('密码不一致')
          } else {
            if (this.account.verifyCode === '') {
              this.$notify.error("请输入验证码")
            } else {
              this.$notify.error('请输入账号或密码')
            }
          }
        }
      })
    },
    onSuccess() {
      this.getCaptcha();
      this.startCountdown();
      this.isClick = 0;
    },
    onFail() {
      this.$notify.error("验证失败")
    },
    onRefresh() {
      this.$notify.success("刷新成功")
    },
    handleCaptchaClick() {
      // 检查手机号是否填写
      if (!this.isCountingDown && this.account.phone) {
        this.isClick = 1;
      } else {
        this.$notify.error("请先填写手机号")
      }
    },
    getCaptcha() {
      request.get('/VerifyCode/send?phone=' + this.account.phone).then(res => {
        if (res.code === 1) {
          setTimeout(() => {
                this.$notify.success("发送成功")
              }, 500
          )
        } else {
          setTimeout(() => {
                this.$notify.error(res.msg)
              }, 500
          )
        }
      })
    },
    startCountdown() {
      this.isCountingDown = true;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.isCountingDown = false;
          this.countdown = 60;
        }
      }, 1000);
    }
  }
}
</script>

<style scoped>
.cover {
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
