import { mapState, mapActions } from 'vuex'

import TheGreeting from '@/components/TheGreeting'

const computed = mapState([
  'greeting'
])

const methods = mapActions([
  // 'fetchGreeting'
])

function mounted () {
  // return this.fetchGreeting()
}

export default {
  name: 'HomePage',
  components: {
    TheGreeting
  },
  computed,
  methods,
  mounted
}
