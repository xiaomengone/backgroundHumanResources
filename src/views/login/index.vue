<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card>
        <el-form 
        :model="ruleForm" 
        status-icon
         :rules="rules"
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm"
          :hide-required-asterisk="true"
          >
  <el-form-item label="手机号" prop="userPhone">
    <el-input placeholder="请输入手机号"  v-model="ruleForm.userPhone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码"  prop="userPassword">
    <el-input placeholder="密码" show-password type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-checkbox v-model="checked">用户平台使用协议</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm()">重置</el-button>
  </el-form-item>
</el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {mapActions } from 'vuex'
import axios from 'axios'
import request from '@/utils/request'

export default {
  name: "Login",
  data(){
    return {
      checked:true,
      ruleForm: {
          userPhone: '13800000002',
          userPassword: 'hm#qd@23!'
        },
        rules: {
          userPhone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/,message: "请填写正确的手机号码", trigger: "blur"},
          ],
          userPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {min:6,max:16,message: "密码的长度在6-16位之间", trigger: "blur"},
          ]
        }
      };
    },
    methods:{
      ...mapActions('user',['userLogin']),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if(this.checked){
              await this.userLogin(this.ruleForm)
              this.$router.push("/");
            }else {
              this.$message.error('请勾选用户协议');
            }
          }
        });
      },
      resetForm(formName) {
        this.ruleForm.userPhone=''
        this.ruleForm.userPassword=''
        this.checked=false
      },
      text(){
        request({
          url:'/sys/login',
          method:'POST',
          data:{
          mobile:'13912345678',
          password:'1234567'
          }
        }).then((res)=>{
          console.log('res',res);
        })
      }
    },
    beforeDestroy(){
      this.resetForm('ruleForm')
    },
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url("~@/assets/common/login_back.png")
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url("~@/assets/common/logo.png") no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
