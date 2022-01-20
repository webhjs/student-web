<!--
 * @Descripttion: 运行环境
 * @version: 
 * @Author: 金苏
 * @Date: 2021-08-09 17:38:24
 * @LastEditors: 金苏
 * @LastEditTime: 2021-08-30 11:18:20
-->
<template>
    <div class="container">
      <div class="main-content flex flex-col">
        <div class="flex-1 relative">
          <tinymce id="fill" fillBtn v-model="questiontitle" @changeNum="changeNum" />
        </div>
        <div class="flex-1 relative">
          <lines />
        </div>
      </div>
      <div align="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord"
        ></el-pagination>
      </div>
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Lines from '@/views/simple-template/basepage/Lines'
export default {
  components: {
    Tinymce,
    Lines
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 100,
      totalRecord: 0,
      questiontitle: ''
    };
  },
  mounted() {
    this.serach();
  },
  methods: {
    serach(page) {
      page && (this.currentPage = page);
      this.api("login/logout", {
        ...this.formInline,
        page: this.currentPage,
        limit: this.pageSize
      })
        .then(resp => {
          if (resp.code == 200) {
            this.tableData = resp.data;
            this.totalRecord = parseInt(resp.count);
          } else {
            this.$message.error(resp.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.serach();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.serach();
    },
    changeNum(val) {
      this.$message.warning(String(val))
    }
  }
};
</script>

<style scoped lang="stylus">
.container {
  background white
  display flex
  flex-flow column
  height 100%
  width 100%
}
.main-content {
  position relative;
  flex: 1;
}
</style>
