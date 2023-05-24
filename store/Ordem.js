export const state = () => ({
    ord: null,
  })
  
  export const getters = {}
  
  export const mutations = {
    SET_LIST_ORDS(state, payload) {
      state.ord = payload
    },
  }
  
  export const actions = {
    getOrd(context, payload) {
      const config = {
        ...payload,
      }
  
      config._limit = 10
  
      return this.$axios.get(`ordemvenda`, { params: config }).then((r) => {
        context.commit('SET_LIST_ORDS', r.data)
      })
    },
  }
  