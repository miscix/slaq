<template lang="pug">
  el-row(:gutter="20")
    el-col(:span="10" :offset="1")
      el-card(shadow="hover")
        div(slot="header")
          h4 Login
        login-form(@submit="handleLogin")

    el-col(:span="10" :offset="2")
      el-card(shadow="hover")
        div(slot="header")
          h4 Sign Up
        signup-form(@submit="handleSignup")
</template>

<script src="./main.js"></script>

<style scoped>
h4 {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
