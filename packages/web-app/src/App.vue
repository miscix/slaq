<template lang="pug">
  el-container#app

    el-header
      el-menu(
        mode="horizontal"
        :router="true"
      )
        el-menu-item(index="/")
          | Home

    el-main
      router-view
</template>

<style scoped lang="scss">
#app {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
