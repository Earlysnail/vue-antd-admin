export default {
  namespaced: true,
  state: {
    user: {},
    token: ''
  },
  mutations: {
    setuser(state, user) {
      state.user = user
      localStorage.setItem('userInfo', JSON.stringify(user))
      console.log('setuser成功', user)
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      console.log('setToken成功', token)
    },
    logout(state) {
      localStorage.clear()
      console.log('logout成功')
    }
  }
}
