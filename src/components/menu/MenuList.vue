<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-top: 20px;">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" icon="el-icon-search" @click="onSubmit" >查询</el-button>
        <el-button plain icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" align="left">
          <el-button plain type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
          <el-button plain type="primary" icon="el-icon-edit" @click="onDataProcess(2)">修改</el-button>
          <el-button plain type="danger" icon="el-icon-delete" @click="onDataProcess(4)">删除</el-button>
          <el-button plain type="success" icon="el-icon-upload" @click="onDataProcess(8)">上传</el-button>
          <el-button plain type="warning" icon="el-icon-download"  @click="onDataProcess(16)">下载</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      ref="multipleTable"
      border
      style="width: 100%;margin-top: 15px"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="用户名" prop="username" width="150"></el-table-column>
      <el-table-column label="昵称" prop="nickname" width="150"></el-table-column>
      <el-table-column label="性别" prop="gender" width="100"></el-table-column>
      <el-table-column label="出生日期" prop="birthday" width="160"></el-table-column>
      <el-table-column label="证件号" prop="idno" width="200"></el-table-column>
      <el-table-column label="联系地址" prop="address" width="200"></el-table-column>
      <el-table-column label="联系电话" prop="telephone" width="160"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
      <el-table-column label="制单时间" prop="predate" width="180"></el-table-column>

    </el-table>

    <el-pagination style="padding-top: 15px;" background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageNumber"
                   :page-sizes="[10,20, 50, 100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="dataCount">
    </el-pagination>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
          username: '',
          nickname: ''
        },
        multipleSelection: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
      },
      onDataProcess(optype) {
        console.log('操作类型:' + optype);
        if (optype === 1) {

        }else if(optype === 2){

        }else if(optype === 4){
          const length =this.multipleSelection.length;
          if(length===0){
            this.$alert('请选择删除项?', '提示', {
              confirmButtonText: '确定',
            });
          }else{
            this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //取消选中
              this.$refs.multipleTable.clearSelection();
              //提示删除成功
              this.$notify.success({
                title: '提示',
                message: '选中数据删除成功',
                showClose: true,
                duration: 2500
              });
            }).catch(() => {
            });
          }
        }else if(optype === 8){

        }else if(optype === 16){

        }else {

        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style>
</style>
