<template>
  <div id="back_header" style="padding-top: 10px;">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">&nbsp;</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">后台公共头部</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span style="font-size: 15px;color: #13ce66">{{loginUser}}</span>
          <el-button type="text"><span style="font-size: 15px;" @click="toLogoutPage()">【退出】</span></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'BackHeader',
    data() {
      return {
        loginUser: "XXX"
      }
    },
    mounted() {
      //加载登录用户
      this.loadUserInfo();
    },
    methods: {
      toLogoutPage() {
        this.$confirm('是否确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem("LOGIN_USER");
          this.$router.push('/');
        });
      },
      loadUserInfo() {
        const  user = window.localStorage.getItem("LOGIN_USER");
        const  json = JSON.parse(user);
        console.log(json.nickname);
        this.loginUser = json.nickname;
      }
    }
  }
</script>

<style>

