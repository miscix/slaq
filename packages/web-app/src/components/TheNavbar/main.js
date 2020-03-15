import { mapActions } from 'vuex'

const methods = {
  ...mapActions([
    'logout'
  ]),
  handleLogout () {
    return this.logout()
  }
}

export default {
  name: 'TheNavbar',
  methods
}
