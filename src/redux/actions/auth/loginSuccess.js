export const loginSuccess = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
  return {
    type: 'LOGIN_SUCCESS',
    payload: user
  }
}
