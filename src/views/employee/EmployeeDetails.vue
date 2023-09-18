<template>
  <div class="container">
    <div class="app-container employeeDetails">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            type="text"
            v-model="ruleForm.workNumber"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            type="text"
            v-model="ruleForm.mobile"
            autocomplete="off"
            :disabled="!!isEdit"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <selectDepartment v-model="ruleForm.departmentId"></selectDepartment>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="Number(item.value)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="ruleForm.timeOfEntry"
            type="date"
            placeholder="请选择入职日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="ruleForm.correctionTime"
            type="date"
            placeholder="请选择转正日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="员工头像" prop="staffPhoto">
          <!-- <el-input
            type="text"
            v-model="ruleForm.staffPhoto"
            autocomplete="off"
          ></el-input> -->
          <HeadPictureUploads></HeadPictureUploads>
        </el-form-item>

        <el-form-item v-if="!isEdit">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="saveUpdates(isEdit, ruleForm)"
            >保存更新</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import selectDepartment from "./components/selectDepartment.vue";
import HeadPictureUploads from "./components/HeadPictureUploads.vue";
import {
  apiPostSysUser,
  apiGetSysUserDetaile,
  apiPutSysUser,
} from "@/api/employee";

export default {
  name: "EmployeeDetails",
  components: { selectDepartment, HeadPictureUploads },
  data() {
    // validatePass = () => {};
    return {
      departmentValue: [],
      ruleForm: {
        username: "",
        workNumber: "",
        mobile: "",
        departmentId: 0,
        formOfEmployment: null,
        timeOfEntry: "",
        correctionTime: "",
        staffPhoto: "",
      },
      isEdit: "",
      rules: {
        username: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          { min: 1, max: 10, message: "姓名在1~10个字符之间", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号不规范",
            trigger: "blur",
          },
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        formOfEmployment: [
          { required: true, message: "请聘用形式", trigger: "blur" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
        correctionTime: [
          { required: true, message: "转正时间", trigger: "blur" },
          //   { validator: validatePass, trigger: "blur" },
        ],
      },
      options: [
        {
          value: "1",
          label: "正式",
        },
        {
          value: "2",
          label: "非正式",
        },
      ],
    };
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          apiPostSysUser(this.ruleForm)
            .then((res) => {
              this.$message.success("新增成功");
              this.$router.go(-1);
            })
            .catch(() => {
              this.$message.error("新增失败");
            });
        } else {
          console.log("效验失败");
        }
      });
    },
    saveUpdates(id, data) {
      apiPutSysUser(id, data)
        .then((res) => {
          this.$router.go(-1);
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.isEdit = this.$route.query.id;
      apiGetSysUserDetaile(this.$route.query.id)
        .then((res) => {
          this.ruleForm = res;
          console.log("rees", res);
        })
        .catch(() => {
          return;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.employeeDetails {
  padding: 60px 0 50px 160px;
}
:deep() {
  .el-form {
    width: 500px;
    .el-cascader {
      width: 400px;
    }
    .el-form-item:last-child {
      float: right;
    }
    .el-input--suffix {
      width: 400px;
    }
  }
}
</style>
