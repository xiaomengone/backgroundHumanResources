<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="upload"
    :on-success="handleAvatarSuccess"
    :on-preview="handlePictureCardPreview"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import COS from "cos-js-sdk-v5";

export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      console.log("file", file);
      this.dialogImageUrl = file.url;
    },
    handleAvatarSuccess(response, file, fileList) {
      console.log("123", response, file, fileList);
    },
    upload(val) {
      const cos = new COS({
        SecretId: "AKIDHVbXM5e6FHD3UowviHfueFguyslV9h5A",
        SecretKey: "DxeHvdHqY9cxAJMKMAtcJw20shVEtSvb",
      });
      cos.putObject(
        {
          Bucket: "xiaomeng-1320932032",
          Region: "ap-shangha",
          Key: val.file.name,
          StorageClass: "STANDARD",
          Body: val.file,
        },
        (err, data) => {
          console.log("头像", err, data);
          //err是错误信息，data返回数据
        }
      );
    },
    beforeAvatarUpload(file) {
      console.log("1", file);
      const isJPG = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
      ].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 image/jpeg/png/gif/bmp 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
