import { mapGetters, mapActions } from 'vuex'
import * as R from 'ramda'

const data = () => ({
  isLoading: false
})

const computed = {
  ...mapGetters({
    userId: 'currentUserId',
    getUser: 'userById'
  }),
  currentUser () {
    return this.getUser(this.userId)
  },
  imageUrl () {
    return R.prop('imageUrl', this.currentUser)
  }
}

const methods = {
  ...mapActions([
    'fetchUserById'
  ]),
  initiateLoading () {
    const completeLoading = () => {
      this.isLoading = false
    }

    this.isLoading = true

    return this
      .fetchUserById(this.userId)
      .then(completeLoading)
  }
}

function mounted () {
  if (!this.currentUser) {
    return this.initiateLoading()
  }
}

export default {
  name: 'ProfilePage',
  data,
  computed,
  methods,
  mounted
}
