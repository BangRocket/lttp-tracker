export const state = () => ({
  state: {
    equipment: {
      sword: 0,
      tunic: 1,
      shield: 0,
      glove: 0,
      bow: 0,
      boomerang: 0,
      halfmagic: 0,
      bottle: 0,
      bomb: 0,
      heartcontainer: 0,
      heartpiece: 0
    },
    items: {
      hookshot: false,
      hammer: false,
      firerod: false,
      moonpearl: false,
      bombos: false,
      ether: false,
      quake: false,
      somaria: false,
      lantern: false,
      flute: false,
      book: false,
      boots: false,
      flippers: false,
      mirror: false,
      shovel: false,
      mushroom: false,
      powder: false,
      cape: false,
      icerod: false,
      byrna: false,
      net: false
    }
  },
  getters: {
    checkItem: (state, id) => {
      return state.item[id]
    },
    checkEquipment: (state, id) => {
      return state.equipment[id]
    }
  }
})
