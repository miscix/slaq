import jwt from 'jsonwebtoken'

// aliases

const { location, localStorage } = window

// helpers

export const saveLocalToken = token =>
  localStorage.setItem('token', token)

export const readLocalToken = () =>
  localStorage.getItem('token')

export const dropLocalToken = () =>
  localStorage.removeItem('token')

export const decodeToken = token =>
  jwt.decode(token)

//

export const reloadPage = () =>
  location.reload()
