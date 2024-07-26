<template>
  <div class="container">
    <div class="app-container">
      <el-tree
        :data="list"
        :props="defaultProps"
        :default-expand-all="true"
        :expand-on-click-node="false"
        node-key="id"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span>
            <el-button type="text" size="mini">
              <!-- @click="() => append(data)" -->
              {{ data.managerName }}
            </el-button>
            <el-dropdown
              trigger="click"
              @command="departmentHandle($event, data)"
            >
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- ceshi1 -->
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </span>
      </el-tree>
    </div>
    <addEditDepartment
      ref="addEditDepartment"
      :type="type"
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
      :dataList="dataList"
      @apiGetDepartment="apiGetDepartment"
    />
  </div>
</template>

<script>
import { apiGetDepartment, apiDeleteCompanyDepartment } from "@/api/department";
import { transListToTree } from "@/utils";
import addEditDepartment from "./components/addEditDepartment";

export default {
  name: "Department",
  components: { addEditDepartment },
  data() {
    return {
      list: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogVisible: false,
      type: "",
      dataList: {},
    };
  },
  methods: {
    // 获取列表
    apiGetDepartment() {
      apiGetDepartment().then((res) => {
        this.list = transListToTree(res, 0);
      });
    },
    // 操作
    departmentHandle(type, data) {
      if (type == "add") {
        this.dataList = data;
        this.dialogVisible = true;
        this.type = "add";
      } else if (type == "edit") {
        // 编辑
        this.type = "edit";
        this.dataList = data;
        this.$nextTick(() => {
          this.$refs.addEditDepartment.editEcho();
        });
        this.dialogVisible = true;
      } else if (type === "del") {
        // 删除
        this.$confirm("确定删除吗?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await apiDeleteCompanyDepartment(data.id);
            this.apiGetDepartment();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    handleClose(val) {
      this.dialogVisible = val;
    },
  },
  mounted() {
    this.apiGetDepartment();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 50px 70px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .el-button {
    color: #606266;
  }
}
.el-dropdown-link {
  margin: 0 10px;
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
