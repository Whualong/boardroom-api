<script setup lang="ts">
import { reactive, ref } from "vue";
import { login } from '../../api'
const loginUser = reactive({
  username : '',
  password : ''
})
async function handleLogin(){
  if(loginUser.username && loginUser.password)
  await login( loginUser)
}

</script>
<template>
  <div class="main">
    <img class="logo" src="@/assets/logo.png">
    <!-- <p class="logo-text">浅信</p> -->
    <div class="form">
      <!-- 可以使用 CellGroup 作为容器 -->
      <van-cell-group>
        <van-field :max="12" required v-model.trim="loginUser.username" label="账号" placeholder="请输入账号" />
        <van-field required v-model.trim="loginUser.password" type="password" placeholder="请输入密码"  label="密码" />
      </van-cell-group>
    </div>
     <van-button class="login-btn" size="small" type="primary" @click="handleLogin">登录</van-button>
  </div>
</template>
<style lang="less" scoped>
.main{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo{
  width: 150px;
  height: 150px;
  margin-top: 80px;
}
.logo-text{
  color:#2ab0dc;
  font-size: 20px;
  font-weight: bold;
}
.form{
  margin-bottom: 30px;
}
.login-btn{
  padding-left: 40px;
  padding-right: 40px;
}
</style>