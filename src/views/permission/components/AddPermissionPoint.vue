<template>
  <div class="addPermissionPoints">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddPermissionPoint",
  props: {
    dialogVisible: {
      type: Boolean,
    },
    isAddSonPermissionPoints: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },

    cancel() {
      this.$emit("handleClose");
    },
    determine() {
      this.$emit("handleClose");
    },
  },
  mounted() {
    if (this.isAddSonPermissionPoints == 1) {
      console.log("添加子权限");
    } else {
      console.log("添加权限");
    }
  },
};
</script>
