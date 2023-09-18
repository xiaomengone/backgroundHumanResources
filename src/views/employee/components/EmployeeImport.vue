<template>
  <el-dialog
    title="员工导入"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="cacel"
  >
    <el-upload class="upload-demo" drag action="" :http-request="httpRequest">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text dowload" @click.stop="dowload">
        <em>下载导入模版</em>
      </div>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cacel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FileSaver from "file-saver";
import { apiGetSysImportTemplate, apiPostImport } from "@/api/employee.js";

export default {
  name: "EmployeeImport",
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
  },
  methods: {
    cacel(e) {
      this.$emit("closeDialog");
    },
    // 下载模版表格
    dowload() {
      apiGetSysImportTemplate()
        .then((res) => {
          FileSaver.saveAs(res, "模版.xlsx");
        })
        .catch(() => {
          this.$message.error("下载模版失败");
        });
    },
    // 上传表格
    httpRequest(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      apiPostImport(formData)
        .then(() => {
          this.$message.success("上传成功");
        })
        .catch(() => {
          this.$message.error("上传失败");
        })
        .finally(() => {
          this.$emit("closeDialog");
          this.$emit("apiGetSysUser");
        });
    },
    submit() {
      console.log(123);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-demo {
  display: flex;
  justify-content: center;
  .dowload {
    margin: 5px 0;
  }
}
</style>
