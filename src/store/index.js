import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scale:window.sessionStorage.getItem('scale') || 1,
    tabName:window.sessionStorage.getItem('tabName') ||'',
    tabAct:window.sessionStorage.getItem('tabIndex')|| 0,
  },
  getters: {
  },
  mutations: {
    setScale(state, data){
      state.scale = data
      window.sessionStorage.setItem('scale',data)
    },
    setTabname(state,data){
      state.tabName = data
      // console.log(state.tabName)
    },
    setTabact(state,data){
      state.tabAct = data
    },
  },
  actions: {
  },
  modules: {
  }
})
