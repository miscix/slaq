const props = {
  message: String
}

const computed = {
  hasMessage () {
    return !!this.message
  }
}

export default {
  name: 'TheGreeting',
  props,
  computed
}
