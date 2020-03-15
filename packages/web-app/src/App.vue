<template lang="pug">
  el-container#app
    el-header
      the-navbar(v-if="hasToken")
    el-main
      router-view(v-if='hasToken')
      auth-page(v-else)
</template>

<script>
import { mapGetters } from 'vuex'

import TheNavbar from './components/TheNavbar'
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
    TheNavbar,
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
