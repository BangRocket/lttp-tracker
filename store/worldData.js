import { Locations } from '../script/chests.js'

export const state = () => ({
  dungeons: Locations.data.dungeons,
  chests: Locations.data.chests
})
