<template>
  <el-upload
    class="upload-demo"
    action
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :http-request="httpRequest"
    multiple
    :limit="2"
    :file-list="[]"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess"
    :show-file-list="false"
  >
    <slot />
  </el-upload>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      // const imageUrl = URL.createObjectURL(file.raw);
      this.$emit("successUpload", res);
    },
    handleError(err, file, fileList) {
      this.$message.error(err);
    },
    async httpRequest(option) {
      const formData = new FormData();
      formData.append("file", option.file);
      formData.append("targetpath", "/exam");
      const result = await this.api("menu/upload", formData);
      return result.data.filepath;
    }
  }
};
</script>