<template>
  <div id="font_header" style="height: 80px;padding-top: 10px;">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">&nbsp;</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">前台公共头部</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button type="text"><span style="font-size: 15px;" @click="toLoginPgae()">登录</span></el-button>
          <el-button type="text"><span style="font-size: 15px;" @click="toRegisterPgae()">注册</span></el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'FontHeader',
    methods: {
      toLoginPgae() {
        this.$router.push('/login');
      },
      toRegisterPgae() {
        this.$router.push('/register');
      }
    }
  }
</script>

<style>

