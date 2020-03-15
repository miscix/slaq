<template lang="pug">
  el-menu(
    mode="horizontal"
    :router="true"
  )
    el-submenu(index="profile")
      template(slot="title") Profile
      el-menu-item(@click="handleLogout") Logout

    el-menu-item.float-right(index="workspace") Workspace

</template>

<script src="./main.js"></script>

<style scoped>
.float-right {
  float: right
}
</style>
