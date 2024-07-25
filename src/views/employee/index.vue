<template>
  <div class="container">
    <div class="app-container employeeLeft">
      <div class="search">
        <el-input
          placeholder="请输入员工姓名"
          v-model="params.keyword"
          @input="treeSearch"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <el-tree
        ref="tree"
        node-key="id"
        :data="lists"
        :props="defaultProps"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :default-expand-all="true"
        :highlight-current="true"
      ></el-tree>
    </div>
    <div class="app-container employeeRight">
      <el-row class="employeeRightTop">
        <el-button
          type="primary"
          size="small"
          @click="addEmployee"
          v-addPerson="'addPerson'"
          >添加员工</el-button
        >
        <el-button size="small" @click="excelImport">excel导入</el-button>
        <el-button size="small" @click="excelExport">excel导出</el-button>
      </el-row>
      <el-table :data="datas" style="width: 100%">
        <el-table-column prop="date" label="头像" width="180">
          <template slot-scope="{ row }">
            <el-avatar
              v-if="row.staffPhoto"
              shape="square"
              :size="50"
              :src="row.staffPhoto"
            ></el-avatar>
            <el-avatar v-else="row.staffPhoto" shape="square" :size="50">
              <template #default>{{ row.username.slice(2, 3) }}</template>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="workNumber" label="工号"> </el-table-column>
        <el-table-column prop="formOfEmployment" label="聘用形式">
          <template slot-scope="{ row }">
            {{ row.formOfEmployment === 1 ? "正式" : "非正式" }}
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门"> </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button @click="tableLook(row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="employeeRole(row.id)"
              >角色</el-button
            >
            <el-popconfirm title="确定删除吗？" @onConfirm="adelete(row)">
              <el-button
                type="text"
                slot="reference"
                size="small"
                class="delete"
                >删除</el-button
              >
            </el-popconfirm>
          </template></el-table-column
        >
      </el-table>
      <!-- cishi1 -->
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="params.page"
          :page-size="params.pagesize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <EmployeeImport
        :dialogVisible="dialogVisible"
        @closeDialog="closeDialog"
        @apiGetSysUser="apiGetSysUser"
      ></EmployeeImport>
      <!-- 分配角色 -->
      <el-dialog
        title="分配角色"
        :visible.sync="roleDialogVisible"
        width="60%"
        :before-close="roleHandleClose"
      >
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in roleList"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleCancle">取 消</el-button>
          <el-button type="primary" @click="roleDetermine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { apiGetDepartment } from "@/api/department";

import {
  apiGetSysUser,
  apiGetUserExport,
  apiDeleteSysUser,
  apiGetSysUserDetaile,
  apiPutSysUserAssignRole,
} from "@/api/employee";
import { apiGetSysRoleList } from "@/api/role";
import { transListToTree } from "@/utils";
import FileSaver from "file-saver";
import EmployeeImport from "./components/EmployeeImport";

export default {
  name: "Department",
  components: { EmployeeImport },
  data() {
    return {
      datas: [], //table数据
      total: null,
      lists: [], //树
      defaultProps: {
        children: "children",
        label: "name",
      },
      params: {
        page: 1,
        pagesize: 10,
        keyword: "",
        departmentId: null,
      },
      dialogVisible: false,
      roleDialogVisible: false,
      checkList: [],
      roleList: [], // 已启用的角色列表;
      employeeId: "",
    };
  },
  methods: {
    // 树上面的搜索框
    treeSearch() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.params.page = 1;
        this.apiGetSysUser(this.params);
      }, 300);
    },
    // 在树中，选择了节点
    handleNodeClick(data) {
      this.params.page = 1;
      this.params.departmentId = data.id;
      this.apiGetSysUser(this.params);
    },
    // 获取表格列表
    apiGetSysUser(params) {
      this.$nextTick(() => {
        apiGetSysUser(params)
          .then((res) => {
            this.datas = res.rows;
            this.total = res.total;
          })
          .catch(() => {
            this.$message.error("获取失败");
          });
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.params.page = val;
      this.apiGetSysUser(this.params);
    },
    // 查看按钮
    tableLook(val) {
      this.$router.push(`/employee/employeeDetails?id=${val.id}`);
    },
    addEmployee() {
      this.$router.push(`/employee/employeeDetails`);
    },
    // 浏览器excel导出
    excelExport() {
      apiGetUserExport()
        .then((res) => {
          //blob对象，文件名称。res是个Blob对象
          FileSaver.saveAs(res, "员工信息表.xlsx");
        })
        .catch(() => {
          console.log("失败");
        });
    },
    // 浏览器导入
    excelImport() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    adelete(val) {
      apiDeleteSysUser(val.id)
        .then(() => {
          this.apiGetSysUser(this.params);
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    // 员工分配角色
    employeeRole(id) {
      this.employeeId = id;
      // 获取员工基本信息
      apiGetSysUserDetaile(id).then((res) => {
        console.log("res", res);
        this.checkList = res.roleIds;
      }),
        apiGetSysRoleList().then((res) => {
          this.roleList = res;
        });

      this.roleDialogVisible = true;
    },
    roleHandleClose() {
      this.roleDialogVisible = false;
    },
    // 取消按钮
    roleCancle() {
      this.roleDialogVisible = false;
    },
    roleDetermine() {
      apiPutSysUserAssignRole(this.employeeId, this.checkList)
        .then(() => {
          this.$message.success("角色设置成功");
        })
        .catch(() => {
          this.$message.error("角色设置失败");
        });
      this.roleDialogVisible = false;
    },
  },
  mounted() {
    apiGetDepartment()
      .then((res) => {
        this.lists = transListToTree(res, 0);
      })
      .catch(() => {
        this.$message.error("获取失败");
      });
    this.apiGetSysUser(this.params);
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .employeeLeft {
    width: 20%;
    padding: 20px 0 0 10px;
    margin-right: 5px;
    .search {
      margin: 0 auto;
      margin-bottom: 10px;
      width: 240px;
    }
  }
  .employeeRight {
    padding: 30px;
    width: 80%;
    .delete {
      margin-left: 13px;
    }
    .employeeRightTop {
      display: flex;
      margin-bottom: 20px;
      justify-content: flex-end;
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
