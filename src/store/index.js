import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import account from './modules/account'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    setting
  },
  getters
})
