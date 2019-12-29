export const state = () => ({
  bg: null,
  poi: null,
  overlay: null,
  text: null
})

export const mutations = {
  setContext (state, payload) {
    // console.log('STATE: ', state, payload)
    state[payload.layer] = payload.context
  }
}

export const getters = {
  getBackgroundContext () { return state.bg },
  getPOIContext () { return state.poi },
  getOverlayContext () { return state.overlay },
  getTextContext () { return state.text }
}
