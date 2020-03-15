import { mapGetters, mapActions } from 'vuex'

const data = () => ({
  isLoading: false
})

const computed = {
  ...mapGetters([
    'currentUser'
  ]),
  imageUrl () {
    const { imageUrl } = this.currentUser || {}
    return imageUrl
  }
}

const methods = {
  ...mapActions([
    'fetchCurrentUser'
  ]),
  initiateLoading () {
    this.isLoading = true

    const completeLoading = () => {
      this.isLoading = false
    }

    return this
      .fetchCurrentUser()
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
