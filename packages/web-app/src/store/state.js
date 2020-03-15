import { readLocalToken } from './helpers'

// prepare

const token = readLocalToken()

const users = []

// expose product

export default {
  token,
  users
}
