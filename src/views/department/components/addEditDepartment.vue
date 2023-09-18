<template>
  <el-dialog
    :title="type == 'add' ? '新增部门' : '编辑部门'"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :destroy-on-close="true"
    v-loading="loading"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="2-10个字符"
          v-model="ruleForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="2-10个字符"
          v-model="ruleForm.code"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select
          v-model="ruleForm.managerId"
          placeholder="请选择"
          :popper-append-to-body="false"
          allow-create
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.introduce"
          :autosize="{ minRows: 2 }"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click.native="submitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  apiGetDepartment,
  apiGetSysUserSimple,
  apiPostCompanyDepartment,
  apiGetCompanyDepartment,
  apiPutCompanyDepartment,
} from "@/api/department";

export default {
  props: {
    dialogVisible: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    dataList: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      options: [],
      ruleForm: {
        name: "",
        code: "",
        managerId: "",
        introduce: "",
        pid: 0,
        id: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { min: 2, max: 10, trigger: "change" },
          {
            validator: async (rule, value, callback) => {
              const res = await apiGetDepartment();
              if (this.type == "add") {
                // 添加
                if (res.find((item) => item.name == value)) {
                  return callback(new Error("该部门名称已经存在"));
                } else {
                  callback();
                }
              } else {
                // 编辑
                const editRes = res.filter((item) => {
                  return item.id !== this.dataList.id;
                });
                if (editRes.find((item) => item.name == value)) {
                  return callback(new Error("该部门名称已经存在"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          { min: 2, max: 10, trigger: "change" },
          {
            validator: async (rule, value, callback) => {
              const res = await apiGetDepartment();
              if (this.type == "add") {
                // 添加
                if (res.find((item) => item.code == value)) {
                  return callback(new Error("该部门编码已经存在"));
                } else {
                  callback();
                }
              } else if (this.type == "edit") {
                // 编辑
                const editRes = res.filter((item) => {
                  return item.id !== this.ruleForm.id;
                });
                if (editRes.find((item) => item.code == value)) {
                  return callback(new Error("该部门名称已经存在"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
          },
        ],
        managerId: [
          { required: true, message: "请输入部门负责人", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleClose", false);
      this.$refs.ruleForm.resetFields();
    },
    // 编辑回显
    editEcho() {
      apiGetCompanyDepartment(this.dataList.id).then((res) => {
        this.ruleForm = res;
      });
    },
    // 确定
    submitForm() {
      this.loading = true;
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.type == "add") {
            apiPostCompanyDepartment({
              ...this.ruleForm,
              pid: this.dataList.id,
            })
              .then(() => {
                this.$emit("apiGetDepartment");
                this.$message.success("添加成功");
              })
              .catch(() => {
                this.$message.error("添加失败");
              });
          } else if (this.type == "edit") {
            // 编辑
            apiPutCompanyDepartment(this.ruleForm.id, {
              ...this.ruleForm,
            })
              .then(() => {
                this.$emit("apiGetDepartment");
                this.$message.success("编辑成功");
              })
              .catch(() => {
                this.$message.error("编辑失败");
              });
          }

          this.loading = false;
          this.handleClose();
        } else {
          this.$message.error("输入不符合要求");
          this.loading = false;
        }
      });
    },
  },
  async mounted() {
    const res = await apiGetSysUserSimple();
    this.options = res;
  },
};
</script>

<style lang="scss" scoped>
:deep() {
  .el-select {
    width: 100%;
  }
}
</style>
