import { mapActions } from 'vuex'

import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'

const methods = mapActions([
  'loginUser',
  'signupUser'
])

export default {
  name: 'AuthPage',
  components: {
    LoginForm,
    SignupForm
  },
  methods
}
