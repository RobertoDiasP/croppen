export const state = () => ({
  cars: null,
})

export const getters = {}

export const mutations = {
  SET_LIST_CARS(state, payload) {
    state.cars = payload
  },
}

export const actions = {
  getCars(context, payload) {
    const config = {
      ...payload,
    }

    config._limit = 10

    return this.$axios.get(`listcar`, { params: config }).then((r) => {
      context.commit('SET_LIST_CARS', r.data)
    })
  },
}
