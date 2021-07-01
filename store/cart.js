export const state = () => ({
  base: {
    id: '',
    lines: {
      edges: [],
    },
    estimatedCost: {
      subtotalAmount: {},
      totalAmount: {},
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
  subtotal: (state) => {
    if (state.base && state.base.estimatedCost) {
      return state.base.estimatedCost.subtotalAmount
    }
  },
  tax: (state) => {
    if (state.base && state.base.estimatedCost) {
      return state.base.estimatedCost.totalTaxAmount
        ? state.base.estimatedCost.totalTaxAmount
        : {
            amount: 0,
          }
    }
  },
  total: (state) => {
    if (state.base && state.base.estimatedCost) {
      return state.base.estimatedCost.totalAmount
    }
  },
}

export const mutations = {
  setBase(state, response) {
    state.base = response
  },
  setId(state, id) {
    state.base.id = id
  },
}

export const actions = {
  updateBase({ commit }, response) {
    window.localStorage.removeItem('shopifyNuxtCart')
    window.localStorage.setItem('shopifyNuxtCart', JSON.stringify(response))
    commit('setBase', response)
  },
  updateId({ commit }, id) {
    window.localStorage.removeItem('shopifyNuxtCartId')
    window.localStorage.setItem('shopifyNuxtCartId', id)
    commit('setId', id)
  },
}
