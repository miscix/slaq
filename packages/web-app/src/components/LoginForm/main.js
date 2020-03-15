const data = () => ({
  form: {
    email: 'nyx@gmail.com',
    password: 'passw0rd'
  },
  rules: {
    email: [
      { required: true, type: 'email', trigger: 'blur' }
    ],
    password: [
      { required: true, trigger: 'blur' }
    ]
  }
})

const methods = {
  submitForm () {
    const submitIfOk = isOk => {
      isOk && this.$emit('submit', this.form)
    }

    this.$refs.form.validate(submitIfOk)
  }
}

export default {
  name: 'LoginForm',
  data,
  methods
}
