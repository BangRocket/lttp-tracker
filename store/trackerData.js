import {
  itemsInit,
  dungeonchestsInit,
  bigkeyInit,
  smallkeyInit,
  dungeonbeatenInit,
  prizesInit,
  medallionsInit,
  chestsopenedInit
} from '../script/items.js'

export const state = () => ({
  items: itemsInit,
  dungeonchests: dungeonchestsInit,
  bigkeys: bigkeyInit,
  smallkeys: smallkeyInit,
  dungeonbeaten: dungeonbeatenInit,
  prizes: prizesInit,
  medallions: medallionsInit,
  chestsopened: chestsopenedInit
})
