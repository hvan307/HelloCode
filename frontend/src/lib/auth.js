function setToken(token) {
  localStorage.setItem('token', token)
}

function isLoggedIn() {
  return !!localStorage.getItem('token')
}

function getToken() {
  return localStorage.getItem('token')
}

function logOut() {
  localStorage.removeItem('token')
}

function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

export default {
  setToken,
  isLoggedIn, 
  getToken,
  logOut,
  getUserId
}