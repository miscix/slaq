import { mapActions } from 'vuex'

import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'

const methods = {
  ...mapActions([
    'loginUser',
    'signupUser'
  ]),
  handleLogin (formData) {
    const handleError = err => this.reportError(err)

    return this
      .loginUser(formData)
      .catch(handleError)
  },
  handleSignup (formData) {
    const handleError = err => this.reportError(err)

    const handleLogin = () => {
      return this.handleLogin(formData)
    }

    return this
      .signupUser(formData)
      .then(handleLogin) // acquire token here
      .catch(handleError)
  },
  reportError (err) {
    const message = `Error: ${err.message}`
    const type = 'error'

    this.$message({ message, type })
  }
}

export default {
  name: 'AuthPage',
  components: {
    LoginForm,
    SignupForm
  },
  methods
}
