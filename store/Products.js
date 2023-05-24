export const state = () => ({
    prod: null,
  })
  
  export const getters = {}
  
  export const mutations = {
    SET_LIST_PROD(state, payload) {
      state.prod = payload
    },
  }
  
  export const actions = {
    getProds(context, payload) {
    //   const config = {
    //     ...payload,
    //   }
  
    //   config._limit = 10
  
      return this.$axios.post(`/get-list-prod`).then((r) => {
        context.commit('SET_LIST_DATA', r.data)
      })
    },
  }