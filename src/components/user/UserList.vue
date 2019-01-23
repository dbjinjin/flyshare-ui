<template>
  <div>
    <back-header></back-header>
    <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" style="padding-top: 20px;">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formInline.username" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formInline.nickname" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" icon="el-icon-search" @click="formQuery" >查询</el-button>
        <el-button plain icon="el-icon-refresh" @click="formReset('formInline')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" align="left" >
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


    <back-footer></back-footer>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="35%" >
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="form.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="M"></el-option>
                <el-option label="女" value="F"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                size="small"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="form.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号" :label-width="formLabelWidth">
              <el-input v-model="form.idno" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.telephone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userAddConfirm">确 定</el-button>
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
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          username: '',
          password: '',
          nickname: '',
          gender: '',
          birthday: "",
          idno: "",
          telephone: '',
          address: '',
          email: ''
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
          username: this.formInline.username,
          nickname: this.formInline.nickname,
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
      /**
       * Table索引列
       */
      indexMethod(index) {
        return index + 1;
      },
      /**
       * 每页数量改变
       */
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNumber = 1;
        this.loadData();
      },
      /**
       * 跳转页
       */
      handleCurrentChange(val) {
        this.pageNumber = val;
        this.loadData();
      },
      /**
       * 界面查询表单-查询
       */
      formQuery() {
        //表单查询
        this.loadData();
      },
      /**
       * 界面查询表单-重置
       */
      formReset(formName) {
        //表单重置
        this.$refs[formName].resetFields();
        this.loadData();
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
      },
      userAddConfirm(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('/user-add',this.form).then(response => {
          this.message = response.data;
          loading.close();
        }).catch(error => {
          console.log(error);
          loading.close();
        });
      }
    }
  }
</script>

<style>
</style>
