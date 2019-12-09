/*
 0 -- glitchless
 1 -- minor
 2 -- major
 3 -- inverted
*/
import { Enum } from 'enumify'

class mode extends Enum {}
mode.initEnum(['GLITCHLESS', 'MINOR', 'MAJOR', 'INVERTED'])

export const chests = [{
  id: 1,
  name: 'King\'s Tomb',
  x: '30.8%',
  y: '29.6%',
  isAvailable: () => {
    return false
  }
}]
