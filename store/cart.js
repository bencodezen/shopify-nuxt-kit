export const state = () => ({
  base: {
    id: '',
    lines: {
      edges: [],
    },
  },
})

export const getters = {
  id: (state) => {
    return state.base.id
  },
  items: (state) => {
    if (state.base && state.base.lines) {
      return state.base.lines.edges
    } else {
      return []
    }
  },
}

export const mutations = {
  setBase(state, response) {
    state.base = response
  },
}

export const actions = {
  updateBase({ commit }, response) {
    commit('setBase', response)
  },
}
