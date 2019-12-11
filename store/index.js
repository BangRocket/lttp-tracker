import { defaultItemGrid } from '../script/items.js'

export const state = () => ({
  firebaseUID: {},
  isRoomLoaded: false,
  itemRows: defaultItemGrid
})

export const mutations = () => ({
  updateRows (state, payload) {
    state.itemRows[payload.row][payload.column] = payload.value
  }
})
