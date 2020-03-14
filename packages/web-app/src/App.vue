<template lang="pug">
  el-container#app
    el-header(v-if='hasToken')
      el-menu(
        mode="horizontal"
        :router="true"
      )
        el-menu-item(index="/")
          | Home

    el-main
      router-view(v-if='hasToken')
      auth-page(v-else)
</template>

<script>
import { mapGetters } from 'vuex'

import AuthPage from './views/Auth'

const computed = {
  ...mapGetters([
    'hasToken'
  ])
}

export default {
  name: 'App',
  computed,
  components: {
    AuthPage
  }
}

</script>

<style scoped lang="scss">
#app {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
