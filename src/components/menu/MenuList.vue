<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="出生日期" prop="birthday"></el-table-column>
      <el-table-column label="证件号" prop="idno"></el-table-column>
      <el-table-column label="联系地址" prop="address"></el-table-column>
      <el-table-column label="联系电话" prop="telephone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="制单时间" prop="predate"></el-table-column>

    </el-table>

    <el-pagination style="padding-top: 10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[10,20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pageNumber: 1,
        dataCount: 0,
        pageSize: 10

      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      /**
       * 加载用户数据
       */
      loadData() {
        this.axios.post('/user-list', {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }).then(response => {
          this.tableData = response.data.data;
          this.dataCount = response.data.pageInfo.dataCount;
          this.pageNumber = response.data.pageInfo.pageNumber;
          this.pageSize = response.data.pageInfo.pageSize;
        }).catch(error => {
          console.log(error);
        });
      },
      indexMethod(index) {
        return index + 1;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNumber = 1;
        this.loadData();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNumber = val;
        this.loadData();
      }
    }
  }
</script>

<style>
</style>
