const data = () => ({
  form: {
    name: '',
    email: '',
    password: ''
  },
  rules: {
    name: [
      { required: true, trigger: 'blur' }
    ],
    email: [
      { required: true, type: 'email', trigger: 'blur' }
    ],
    password: [
      { required: true, trigger: 'blur' },
      { min: 6, trigger: 'change' }
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
  name: 'Signup',
  data,
  methods
}
