<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div>{{headSculpture}}</div>
          <span>{{stateUserInfo.username}}</span> 
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
             首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/xiao-meng-2">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a>
            <el-dropdown-item @click.native.stop="dialogVisible=true">修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item  @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码弹出框 -->
    <el-dialog
  title="修改密码"
  :visible.sync="dialogVisible"
  width="27%"
  append-to-body
:close-on-click-modal="false"
@close="resetForm('ruleForm')"
  >
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="旧密码" prop="originalPassword">
    <el-input show-password type="password" v-model="ruleForm.originalPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="confirmPassword">
    <el-input show-password type="password" v-model="ruleForm.confirmPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="重复密码" prop="duplicatePassword">
    <el-input show-password v-model="ruleForm.duplicatePassword"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="ruleFormCancle">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {apiUpdatePass} from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
    let testAndVerifyDuplicatePassword= (rule, value, callback) => {
      if(value!==this.ruleForm.confirmPassword)
         callback(new Error('与新密码不一致'));
      else
      callback();
    }
    return {
      dialogVisible:false,
      ruleForm: {
        originalPassword: '',
        confirmPassword: '',
        duplicatePassword: ''
        },
        rules: {
          originalPassword: [
             { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            {required: true, message: '旧密码不能为空', trigger: 'blur'}
          ],
          confirmPassword: [
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            {required: true, message: '新密码不能为空', trigger: 'blur'}
          ],
          duplicatePassword: [
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            {validator: testAndVerifyDuplicatePassword, trigger: 'blur'}
          ]
        }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    ...mapState('user',['stateUserInfo']),
    headSculpture(){
      return  this.stateUserInfo.username?.slice(0,1)
    }
  },
  methods: {
    ...mapMutations('user',['clearToken']),
    // 修改密码提交
     submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
          await  apiUpdatePass(this.ruleForm)
            this.ruleFormCancle()
            this.clearToken()
            this.$router.push('/login')

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ruleFormCancle(){
        this.resetForm('ruleForm')
        this.dialogVisible=false
      },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/userLogout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        margin-top: 5px;
        >img {
          max-width: 45px;
          max-height: 45px;
        }
        >span {
          margin: 0 10px;
        }
        >div {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color:#04c9be;
          border-radius: 50%;
          width: 45px;
          height: 45px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
