import { createStore } from 'vuex'

export default createStore({
  state: {
    total: localStorage.getItem("@APP:cart") || "[]",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
