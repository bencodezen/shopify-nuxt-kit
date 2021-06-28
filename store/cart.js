export const state = () => ({
  id: '',
})

export const mutations = {
  setCartId(state, id) {
    state.id = id
  },
}

export const actions = {
  updateCartId({ commit }, id) {
    commit('setCartId', id)
  },
}
