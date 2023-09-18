<template>
  <div class="container">
    <div class="app-container permission">
      <el-row
        ><el-button type="primary" @click="add('primary')"
          >添加权限</el-button
        ></el-row
      >
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作" class="option">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              @click="add('second', row)"
              v-if="row.type == 1"
              >添加</el-button
            >
            <el-button type="text" @click="add('edit', row)">编辑</el-button>
            <el-button type="text" @click="deletes(row.id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出框 -->
      <el-dialog
        title="新增权限点"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="ruleForm.enVisible"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 删除的dialog -->
      <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%"
        :before-close="deleteHandleClose"
      >
        <span>确定要删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteHandleClose">取 消</el-button>
          <el-button type="primary" @click="deleteDetermine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  apiGetSysPermission,
  apiPostSysPermission,
  apiDeleteSysPermission,
  apiGetSysPermissionDetail,
  apiPutSysPermission,
} from "@/api/permissioin";
import { transListToTree } from "@/utils";
// import AddPermissionPoint from "./components/AddPermissionPoint";

export default {
  name: "Department",
  // components: { AddPermissionPoint },
  data() {
    return {
      type: "",
      // isAddSonPermissionPoints: 0,
      tableData: [],
      dialogVisible: false,
      deleteDialogVisible: false,
      id: "",
      ruleForm: {
        name: "",
        code: "",
        description: "",
        type: null,
        pid: null,
        enVisible: null,
      },
      rules: {
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
        code: [{ required: true, message: "请填写标识", trigger: "blur" }],
        description: [
          { required: true, message: "请填写描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取列表
    apiGetSysPermission() {
      apiGetSysPermission()
        .then((res) => {
          this.tableData = transListToTree(res, 0);
        })
        .catch(() => {
          this.message.error("获取失败");
        });
    },
    add(type, row) {
      if (type == "primary") {
        // 添加权限
        this.type = "primary";
        this.ruleForm.type = 1;
      } else if (type == "second") {
        // 添加子权限
        this.type = "second";
        this.ruleForm.type = 2;
        this.ruleForm.pid = row.id;
      } else if (type == "edit") {
        // 编辑
        this.type = "edit";
        this.id = row.id + "";
        this.ruleForm.pid = row.pid;
        apiGetSysPermissionDetail(row.id).then((res) => {
          this.ruleForm = { ...res, enVisible: +res.enVisible };
        });
      }
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    deleteHandleClose() {
      this.deleteDialogVisible = false;
    },
    determine() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.type == "primary") {
            apiPostSysPermission({ ...this.ruleForm, pid: 0 })
              .then((res) => {
                this.$message.success("添加成功");
                this.apiGetSysPermission();
                this.ruleForm.enVisible = 0;
              })
              .catch(() => {
                this.$message.error("添加失败");
              })
              .finally(() => {
                this.handleClose();
              });
          } else if (this.type == "second") {
            apiPostSysPermission({ ...this.ruleForm })
              .then((res) => {
                this.$message.success("添加成功");
                this.apiGetSysPermission();
              })
              .catch(() => {
                this.$message.error("添加失败");
              })
              .finally(() => {
                this.handleClose();
              });
          } else if (this.type == "edit") {
            // 编辑
            const idStr = this.id + "";
            apiPutSysPermission(idStr, { ...this.ruleForm })
              .then((res) => {
                this.$message.success("修改成功");
              })
              .catch(function () {
                this.$message.error("修改失败");
              })
              .finally(() => {
                this.handleClose();
                this.apiGetSysPermission();
              });
          }
        } else {
          this.$message.error("输入不规范，请重新输入");
        }
      });
    },
    deleteDetermine() {
      const idStr = this.id + "";
      apiDeleteSysPermission(idStr)
        .then(() => {
          this.apiGetSysPermission();
          this.deleteHandleClose();
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message.error("删除失败");
          this.deleteHandleClose();
        });
    },
    deletes(id) {
      this.deleteDialogVisible = true;
      this.id = id;
    },
  },
  mounted() {
    this.apiGetSysPermission();
  },
};
</script>

<style lang="scss" scoped>
.permission {
  padding: 30px;
  .el-row {
    .el-button {
      margin: 10px 0;
    }
  }
}
</style>
