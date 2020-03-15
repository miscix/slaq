import { mapState, mapActions } from 'vuex'

const data = () => ({
  isLoading: false
})

const computed = {
  ...mapState([
    'currentUser'
  ]),
  imageUrl () {
    return this.currentUser && this.currentUser.imageUrl
  }
}

const methods = {
  ...mapActions([
    'acquireCurrentUser'
  ]),
  initiateLoading () {
    this.isLoading = true

    const completeLoading = () => {
      this.isLoading = false
    }

    return this
      .acquireCurrentUser()
      .then(completeLoading)
      .catch(console.error)
  }
}

function mounted () {
  if (!this.currentUser) {
    return this.initiateLoading()
  }
}

export default {
  name: 'ProfiePage',
  data,
  computed,
  methods,
  mounted
}
