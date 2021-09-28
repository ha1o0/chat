const common = {
  namespaced: true,
  state: {
    count: 0
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
}

export default common