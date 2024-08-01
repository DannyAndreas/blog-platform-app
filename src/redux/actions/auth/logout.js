export const logout = () => {
  localStorage.removeItem('user')
  return {
    type: 'LOGOUT'
  }
}
