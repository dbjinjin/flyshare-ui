<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form>

    <!--<el-row>
      <el-button disabled>测试</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-printer">打印</el-button>
      <el-button type="primary" icon="el-icon-loading">加载</el-button>
    </el-row>-->

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

    <el-pagination style="padding-top: 10px;" background
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
        pageSize: 10,
        formInline: {
          user: '',
          region: ''
        }
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.axios.post('/user-list', {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }).then(response => {
          this.tableData = response.data.data;
          this.dataCount = response.data.pageInfo.dataCount;
          this.pageNumber = response.data.pageInfo.pageNumber;
          this.pageSize = response.data.pageInfo.pageSize;
          loading.close();
        }).catch(error => {
          console.log(error);
          loading.close();
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
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
</style>
