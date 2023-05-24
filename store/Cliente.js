export const state = () => ({
    cli: null,
  })
  
  export const getters = {}
  
  export const mutations = {
    SET_LIST_CLIS(state, payload) {
      state.cli = payload
    },
  }
  
  export const actions = {
    getClis(context, payload) {
      const config = {
        ...payload,
      }
  
      config._limit = 10
  
      return this.$axios.get(`clientes`, { params: config }).then((r) => {
        context.commit('SET_LIST_CLIS', r.data)
      })
    },
  }
  