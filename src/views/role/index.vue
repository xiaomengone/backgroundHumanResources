<template>
  <div class="container">
    <div class="app-container">
      <div class="role">
        <el-row>
          <el-button
            type="primary"
            class="addRole"
            @click="dialogVisible = true"
            >添加角色</el-button
          >
        </el-row>
        <el-table :data="lists" border style="width: 100%">
          <!-- <el-table-column prop="sort" label="序号" width="50" align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 + (params.page - 1) * params.pageSize }}
            </template>
          </el-table-column> -->
          <el-table-column prop="name" label="角色" width="200" align="center">
            <template slot-scope="{ row }">
              <input
                type="text"
                v-model="row.editorRow.name"
                v-show="row.iseditor"
              />
              <span v-show="!row.iseditor">{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="启用" width="250" align="center">
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.editorRow.state"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-show="row.iseditor"
              >
              </el-switch>
              <span v-show="!row.iseditor">
                {{
                  row.state == 1 ? "已启用" : row.state == 0 ? "未启用" : "无"
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="350"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-input
                type="textarea"
                :rows="1"
                placeholder="请输入内容"
                v-model="row.editorRow.description"
                v-show="row.iseditor"
              >
              </el-input>

              <span v-show="!row.iseditor"> {{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <template v-if="!scope.row.iseditor">
                <el-button @click="handleClick(scope.row)" type="text"
                  >分配权限</el-button
                >
                <el-button type="text" size="small" @click="edit(scope)"
                  >编辑</el-button
                >
                <el-button type="text" size="small">
                  <el-popconfirm
                    title="确定删除吗？"
                    @onConfirm="deleteRole(scope)"
                  >
                    <span slot="reference">删除</span>
                  </el-popconfirm>
                </el-button>
              </template>
              <template v-if="scope.row.iseditor">
                <el-button type="text" @click="editDetermine(scope)"
                  >确定</el-button
                >
                <el-button type="text" @click="scope.row.iseditor = false"
                  >取消</el-button
                >
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page="params.page"
            :page-size="params.pagesize"
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
          >
          </el-pagination>
        </div>
        <!-- 新增角色 -->
        <el-dialog
          title="新增角色"
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
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="启用" prop="state">
              <el-switch
                v-model="ruleForm.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="ruleForm.description"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="dialogDetermine">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 分配权限 -->
      <el-dialog
        title="分配权限"
        :visible.sync="limitsAuthorityDialogVisible"
        width="60%"
        :before-close="limitsAuthorityHandleClose"
      >
        <el-tree
          ref="tree"
          :data="treeData"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="defaultCheckedKeys"
          @node-click="limitsAuthorityHandleNodeClick"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="limitsAuthorityCancle">取 消</el-button>
          <el-button type="primary" @click="limitsAuthorityDetermine"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  apiGetRoleList,
  apiPostSysRole,
  apiPutSysRole,
  apiDeleteSysRole,
  apiGetSysRoleDetail,
  apiPutSysRoleAssignPrem,
} from "@/api/role";
import { transListToTree } from "@/utils";
import { apiGetSysPermission } from "@/api/permissioin";

export default {
  name: "Department",
  data() {
    return {
      dialogVisible: false,
      limitsAuthorityDialogVisible: false,
      params: {
        page: 1,
        pagesize: 5,
      },
      total: 0,
      lists: [],
      ruleForm: {
        name: "",
        state: 0,
        description: "",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
      visible: false,
      assignPermissionsId: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      treeData: [],
      defaultCheckedKeys: [],
    };
  },
  methods: {
    // 获取table列表
    apiGetRoleList(params) {
      apiGetRoleList(params)
        .then((res) => {
          const { total, rows } = res;
          this.total = total;
          this.lists = rows;
          this.lists.forEach((item) => {
            // 三个值，目标对象，属性值，默认值
            this.$set(item, "iseditor", false);
            this.$set(item, "editorRow", {
              description: item.description,
              id: item.id,
              iseditor: item.iseditor,
              name: item.name,
              state: item.state,
            });
          });
        })
        .catch(() => {
          this.$message.error("请求失败");
        });
    },
    handleClick(data) {
      this.assignPermissionsId = data.id;
      apiGetSysRoleDetail(this.assignPermissionsId).then((res) => {
        this.defaultCheckedKeys = res.permIds;
      });
      apiGetSysPermission().then((res) => {
        this.treeData = transListToTree(res, 0);
      });
      this.limitsAuthorityDialogVisible = true;
    },
    // 分页功能
    currentChange(val) {
      this.params.page = val;
      this.apiGetRoleList(this.params);
    },
    // 编辑
    edit(scope) {
      scope.row.editorRow.id = scope.row.id;
      scope.row.editorRow.description = scope.row.description;
      scope.row.editorRow.name = scope.row.name;
      scope.row.editorRow.state = scope.row.state;
      scope.row.editorRow.description = scope.row.description;
      scope.row.iseditor = true;
    },
    editDetermine({ row }) {
      apiPutSysRole(row.editorRow)
        .then(() => {
          this.apiGetRoleList(this.params);
          row.iseditor = false;
          this.$message.success("编辑成功");
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    deleteRole({ row }) {
      apiDeleteSysRole(row.id)
        .then(() => {
          if (this.lists.length == 1)
            this.apiGetRoleList({ ...this.params, page: this.params.page - 1 });
          else this.apiGetRoleList(this.params);
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    // 关闭弹窗
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
    },
    // 新增角色确认按钮
    dialogDetermine() {
      apiPostSysRole(this.ruleForm)
        .then((res) => {
          this.$message.success("新增成功");
          (this.params = {
            page: 1,
            pagesize: 5,
          }),
            this.apiGetRoleList(this.params);
          this.resetForm();
        })
        .catch(() => {
          this.$message.error("新增失败");
        });
      this.dialogVisible = false;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 分配权限
    limitsAuthorityHandleClose() {
      this.limitsAuthorityDialogVisible = false;
    },
    limitsAuthorityCancle() {
      this.limitsAuthorityDialogVisible = false;
    },
    limitsAuthorityHandleNodeClick(data) {},
    // 确认
    limitsAuthorityDetermine() {
      apiPutSysRoleAssignPrem(
        this.assignPermissionsId,
        this.$refs.tree.getCheckedKeys()
      )
        .then(() => {
          this.$message.success("修改权限成功");
        })
        .catch(() => {
          this.$message.error("修改权限失败");
        });
      this.limitsAuthorityDialogVisible = false;
    },
  },
  mounted() {
    this.apiGetRoleList(this.params);
  },
};
</script>

<style lang="scss" scoped>
.role {
  padding: 20px;
  .addRole {
    margin: 10px;
  }
  .pagination {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
