<template lang="pug">
  div.profile-container(v-loading="isLoading")
    el-avatar(
      :size="300"
      :src="imageUrl"
    )
      img(src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png")

    div.user-details(v-if="currentUser")
      h4 Nyx
      el-link(href="mailto:xxxx") nyx@gmail.com
</template>

<script src="./main.js"></script>

<style scoped>
.profile-container {
  text-align: center;
}
</style>
