<!--基本html代码区域-->
<template>
  <div class="firstdemo">
    <el-form ref="form" :model="form" label-width="100px" style="padding-top: 10%" :rules="rules" status-icon>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label-width="70px">
            <span style="color: pink; font-size: 22px; ">系统登录</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="form.password" size="small" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="3">
          <el-form-item label="验证码：" prop="verifycode">
            <el-input v-model="form.verifycode" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <img v-bind:src="verifycode" alt="验证码"/>
        </el-col>
        <el-col :span="1">
          <el-button type="text" @click="loadVerifyCode()">换一张</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button @click="resetForm('form')" icon="el-icon-refresh">重置</el-button>
            <el-button type="primary" @click="submitForm('form')" icon="el-icon-upload">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>


<!--数据存贮交互，事件控制地区-->
<script>
  export default {
    name: 'firstdemo',
    data() {

      return {
        verifycode: require('@/assets/verifycode.png'),
        form: {
          username: '',
          password: '',
          verifycode: '',
        },
        rules: {
          username: [
            {required: true, message: "请输入用户名", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          verifycode: [
            {required: true, message: "请输入验证码", trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      //加载验证码
      this.loadVerifyCode();
    },
    methods: {
      loadVerifyCode() {

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.axios
          .get('/verify/loadCode', {
            params: {
              width: 80,
              height: 32
            },
            responseType: 'arraybuffer'
          })
          .then(response => {
            return 'data:image/png;base64,' + btoa(
              new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
          }).then(data => {
            this.verifycode = data;
            loading.close();
          }).catch(error => {
            console.log(error);
            loading.close();
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //校验通过
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });

            this.axios.post('/login-check', this.form).then(response => {
              const  reponseData = response.data;
              const  result = reponseData.result;
              const  message = reponseData.message;
              console.log(result);
              if(result==="success"){
                this.$router.push('/menu')
              }else{
                this.$message.error(message);
                this.loadVerifyCode();
              }
              loading.close();
            }).catch(error => {
              console.log(error);
              loading.close();
            });

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>
