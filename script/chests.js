import { mapState } from 'vuex'
import { Availability, Logic } from './logic.js'

export const Locations = {
  data () {
    return {
      chests: [
        {
          name:
            "King's Tomb <img src='/images/boots.png' class='mini'> + <img src='/images/glove2.png' class='mini'>/<img src='/images/mirror.png' class='mini'>",
          x: '30.8%',
          y: '29.6%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.boots && Logic.canLiftDarkRocks()) {
              availability.glitchless = 'available'
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              }
            } else if (this.trackerData.items.boots && this.trackerData.items.mirror) {
              if (this.trackerData.items.moonpearl) {
                if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
                  availability.glitchless = 'available'
                } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
                  availability.glitchless = 'agahnim'
                } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
                  availability.glitchless = 'glitchagahnim'
                } else {
                  availability.owGlitches = 'available'
                }
              } else if (Logic.glitchedLinkInDarkWorld()) {
                availability.majorGlitches = 'available'
              }
            }
            return availability
          }
        },
        {
          name: 'Light World Swamp (2)',
          x: '23.4%',
          y: '93.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else if (this.trackerData.items.mirror) {
                availability.inverted = 'glitchavailable'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (
              Logic.canEnterLightWorld('inverted', true, true) &&
              (this.trackerData.items.moonpearl || this.trackerData.items.mirror)
            ) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Link's House",
          x: '27.4%',
          y: '67.9%',
          isOpened: true,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: 'Spiral Cave',
          x: '39.9%',
          y: '9.3%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterEastDeathMountain('glitchless', false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterEastDeathMountain('glitchless', true)) {
              availability.glitchless = 'glitchavailable'
            }
            if (Logic.canEnterEastDeathMountain('owGlitches', false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterEastDeathMountain('owGlitches', true)) {
              availability.owGlitches = 'glitchavailable'
            }
            if (Logic.canEnterEastDeathMountain('majorGlitches', false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterEastDeathMountain('majorGlitches', true)) {
              availability.majorGlitches = 'glitchavailable'
            }
            if (Logic.canEnterEastDeathMountain('inverted', false) && this.trackerData.items.moonpearl) {
              availability.inverted = 'available'
            } else if (Logic.canEnterEastDeathMountain('inverted', true)) {
              availability.inverted = 'glitchavailable'
            }
            return availability
          }
        },
        {
          name:
            "Mimic Cave (<img src='/images/mirror.png' class='mini'> outside of Turtle Rock)(Yellow = <img src='/images/medallion0.png' class='mini'> unknown OR possible w/out <img src='/images/firerod.png' class='mini'>)",
          x: '42.6%',
          y: '9.3%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (
              Logic.canEnterEastDeathMountain('glitchless', false) &&
              this.trackerData.items.mirror &&
              this.this.dungeons[9].mayEnter('glitchless', false)
            ) {
              if (this.trackerData.items.firerod && this.this.dungeons[9].canEnter('glitchless', false)) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (
              Logic.canEnterEastDeathMountain('glitchless', true) &&
              this.trackerData.items.mirror &&
              this.this.dungeons[9].mayEnter('glitchless', true)
            ) {
              if (this.trackerData.items.firerod && this.this.dungeons[9].canEnter('glitchless', true)) {
                availability.glitchless = 'glitchavailable'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            }
            if (this.trackerData.items.hammer && this.trackerData.items.mirror) {
              if (
                Logic.canEnterEastDeathMountain('owGlitches', false) &&
                Logic.canEnterDarkWorldDeathMountain('owGlitches', false)
              ) {
                availability.owGlitches = 'available'
              } else if (
                Logic.canEnterEastDeathMountain('owGlitches', true) &&
                Logic.canEnterDarkWorldDeathMountain('owGlitches', true)
              ) {
                availability.owGlitches = 'glitchavailable'
              }
              if (
                Logic.canEnterEastDeathMountain('majorGlitches', false) &&
                Logic.canEnterDarkWorldDeathMountain('majorGlitches', false)
              ) {
                availability.majorGlitches = 'available'
              } else if (
                Logic.canEnterEastDeathMountain('majorGlitches', true) &&
                Logic.canEnterDarkWorldDeathMountain('majorGlitches', true)
              ) {
                availability.majorGlitches = 'glitchavailable'
              }
            }
            if (this.trackerData.items.moonpearl && this.trackerData.items.hammer) {
              if (Logic.canEnterEastDeathMountain('inverted', false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterEastDeathMountain('inverted', true)) {
                availability.inverted = 'glitchavailable'
              }
            }
            return availability
          }
        },
        {
          name: 'Tavern',
          x: '8.1%',
          y: '57.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'glitchavailable'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Chicken House <img src='/images/bomb.png' class='mini'>",
          x: '4.4%',
          y: '54.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: "Bombable Hut <img src='/images/bomb.png' class='mini'>",
          x: '55.4%',
          y: '57.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (Logic.glitchedLinkInDarkWorld()) {
              if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: 'C House',
          x: '60.8%',
          y: '47.9%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: "Aginah's Cave <img src='/images/bomb.png' class='mini'>",
          x: '10.0%',
          y: '82.6%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'West of Mire (2)',
          x: '51.7%',
          y: '79.5%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterMireArea('glitchless', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.glitchless = 'available'
              } else if (this.trackerData.items.mirror) {
                availability.glitchless = 'glitchavailable'
              }
            }
            if (this.trackerData.items.moonpearl || this.trackerData.items.mirror) {
              if (Logic.canEnterMireArea('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterMireArea('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterMireArea('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (Logic.canEnterMireArea('majorGlitches', false, false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterMireArea('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (Logic.canEnterMireArea('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (Logic.canEnterMireArea('inverted', false, false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterMireArea('inverted', false, true)) {
              availability.inverted = 'glitchavailable'
            } else if (Logic.canEnterMireArea('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterMireArea('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "DW Death Mountain (2) : Don't need <img src='/images/moonpearl.png' class='mini'>",
          x: '92.8%',
          y: '14.7%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterDarkWorldDeathMountain('glitchless', true)) {
              if (
                Logic.canEnterDarkWorldDeathMountain('glitchless', false) &&
                this.trackerData.items.moonpearl
              ) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'glitchavailable'
              }
            }
            if (Logic.canEnterDarkWorldDeathMountain('owGlitches', false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterDarkWorldDeathMountain('owGlitches', true)) {
              availability.owGlitches = 'glitchavailable'
            }
            if (Logic.canEnterDarkWorldDeathMountain('majorGlitches', false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterDarkWorldDeathMountain('majorGlitches', true)) {
              availability.majorGlitches = 'glitchavailable'
            }
            if (Logic.canEnterDarkWorldDeathMountain('inverted', false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterDarkWorldDeathMountain('inverted', true)) {
              availability.inverted = 'glitchavailable'
            }
            return availability
          }
        },
        {
          name:
            "Sahasrahla's Hut (3) <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
          x: '40.7%',
          y: '41.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else if (this.trackerData.items.boots) {
                availability.inverted = 'glitchavailable'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (
              Logic.canEnterLightWorld('inverted', true, true) &&
              (this.trackerData.items.moonpearl || this.trackerData.items.boots)
            ) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: 'Byrna Spike Cave',
          x: '78.6%',
          y: '14.9%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canLiftRocks() && this.trackerData.items.hammer) {
              if (
                Logic.canEnterWestDeathMountain('glitchless', true) &&
                this.trackerData.items.moonpearl
              ) {
                if (
                  Logic.canExtendMagic() &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna)
                ) {
                  if (Logic.canEnterWestDeathMountain('glitchless', false)) {
                    availability.glitchless = 'available'
                  } else {
                    availability.glitchless = 'glitchavailable'
                  }
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              }
              if (
                Logic.canEnterWestDeathMountain('owGlitches', true) &&
                this.trackerData.items.moonpearl
              ) {
                if (
                  Logic.canExtendMagic() &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna)
                ) {
                  if (Logic.canEnterWestDeathMountain('owGlitches', false)) {
                    availability.owGlitches = 'available'
                  } else {
                    availability.owGlitches = 'glitchavailable'
                  }
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (
                Logic.canEnterWestDeathMountain('majorGlitches', true) &&
                (this.trackerData.items.moonpearl ||
                  (this.trackerData.items.bottle >= 1 && this.trackerData.items.boots))
              ) {
                if (
                  Logic.canExtendMagic() &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna)
                ) {
                  if (Logic.canEnterWestDeathMountain('majorGlitches', false)) {
                    availability.majorGlitches = 'available'
                  } else {
                    availability.majorGlitches = 'glitchavailable'
                  }
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              }
              if (Logic.canEnterWestDeathMountain('inverted', true)) {
                if (
                  Logic.canExtendMagic() &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna)
                ) {
                  if (Logic.canEnterWestDeathMountain('inverted', false)) {
                    availability.inverted = 'available'
                  } else {
                    availability.inverted = 'glitchavailable'
                  }
                } else {
                  availability.inverted = 'glitchpossible'
                }
              }
            }
            return availability
          }
        },
        {
          name: "Kakariko Well (4 + <img src='/images/bomb.png' class='mini'>)",
          x: '1.7%',
          y: '41.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Thieves' Hut (4 + <img src='/images/bomb.png' class='mini'>)",
          x: '6.4%',
          y: '41.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else if (this.trackerData.items.mirror) {
                availability.inverted = 'glitchpossible'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (
              Logic.canEnterLightWorld('inverted', true, true) &&
              (this.trackerData.items.moonpearl || this.trackerData.items.mirror)
            ) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name:
            "Hype Cave! <img src='/images/bomb.png' class='mini'> (NPC + 4 <img src='/images/bomb.png' class='mini'>)",
          x: '80.0%',
          y: '77.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterSouthDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (Logic.glitchedLinkInDarkWorld()) {
              if (Logic.canEnterSouthDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: "Death Mountain East (5 + 2 <img src='/images/bomb.png' class='mini'>)",
          x: '41.4%',
          y: '17.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterEastDeathMountain('glitchless', false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterEastDeathMountain('glitchless', true)) {
              availability.glitchless = 'glitchavailable'
            }
            if (Logic.canEnterEastDeathMountain('owGlitches', false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterEastDeathMountain('owGlitches', true)) {
              availability.owGlitches = 'glitchavailable'
            }
            if (Logic.canEnterEastDeathMountain('majorGlitches', false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterEastDeathMountain('majorGlitches', true)) {
              availability.majorGlitches = 'glitchavailable'
            }
            if (Logic.canEnterEastDeathMountain('inverted', false) && this.trackerData.items.moonpearl) {
              availability.inverted = 'available'
            } else if (
              Logic.canEnterEastDeathMountain('inverted', true) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'glitchavailable'
            } else if (
              Logic.canEnterEastDeathMountain('inverted', true) &&
              this.trackerData.items.sword >= 2
            ) {
              availability.inverted = 'glitchpossible'
            }
            return availability
          }
        },
        {
          name: "West of Sanctuary <img src='/images/boots.png' class='mini'>",
          x: '19.5%',
          y: '29.3%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.boots) {
              availability.glitchless = 'available'
              if (this.trackerData.items.moonpearl) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          }
        },
        {
          name: "Minimoldorm Cave (NPC + 4) <img src='/images/bomb.png' class='mini'>",
          x: '32.6%',
          y: '93.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: "Ice Rod Cave <img src='/images/bomb.png' class='mini'>",
          x: '44.7%',
          y: '76.9%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name:
            "Cave Under Rock (bottom chest) <img src='/images/hookshot.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
          x: '91.6%',
          y: '8.6%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (
              this.trackerData.items.moonpearl &&
              (this.trackerData.items.hookshot || this.trackerData.items.boots)
            ) {
              if (Logic.canEnterDarkWorldDeathMountain('glitchless', false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterDarkWorldDeathMountain('glitchless', true)) {
                availability.glitchless = 'glitchavailable'
              }
              if (Logic.canLiftRocks()) {
                if (Logic.canEnterDarkWorldDeathMountain('owGlitches', false)) {
                  availability.owGlitches = 'available'
                } else if (Logic.canEnterDarkWorldDeathMountain('owGlitches', true)) {
                  availability.owGlitches = 'glitchavailable'
                }
                if (Logic.canEnterDarkWorldDeathMountain('majorGlitches', false)) {
                  availability.majorGlitches = 'available'
                } else if (Logic.canEnterDarkWorldDeathMountain('majorGlitches', true)) {
                  availability.majorGlitches = 'glitchavailable'
                }
              }
            }
            if (
              Logic.canLiftRocks() &&
              (this.trackerData.items.hookshot || this.trackerData.items.boots)
            ) {
              if (Logic.canEnterDarkWorldDeathMountain('inverted', false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterDarkWorldDeathMountain('inverted', true)) {
                availability.inverted = 'glitchavailable'
              }
            }
            return availability
          }
        },
        {
          name: "Cave Under Rock (3 top chests) <img src='/images/hookshot.png' class='mini'>",
          x: '91.6%',
          y: '3.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.moonpearl && this.trackerData.items.hookshot) {
              if (Logic.canEnterDarkWorldDeathMountain('glitchless', false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterDarkWorldDeathMountain('glitchless', true)) {
                availability.glitchless = 'glitchavailable'
              }
              if (Logic.canLiftRocks()) {
                if (Logic.canEnterDarkWorldDeathMountain('owGlitches', false)) {
                  availability.owGlitches = 'available'
                } else if (Logic.canEnterDarkWorldDeathMountain('owGlitches', true)) {
                  availability.owGlitches = 'glitchavailable'
                }
                if (Logic.canEnterDarkWorldDeathMountain('majorGlitches', false)) {
                  availability.majorGlitches = 'available'
                } else if (Logic.canEnterDarkWorldDeathMountain('majorGlitches', true)) {
                  availability.majorGlitches = 'glitchavailable'
                }
              }
            }
            if (Logic.canLiftRocks() && this.trackerData.items.hookshot) {
              if (Logic.canEnterDarkWorldDeathMountain('inverted', false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterDarkWorldDeathMountain('inverted', true)) {
                availability.inverted = 'glitchavailable'
              }
            }
            return availability
          }
        },
        {
          name: 'Treasure Chest Minigame: Pay 30 rupees',
          x: '52.1%',
          y: '46.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: 'Bottle Vendor: Pay 100 rupees',
          x: '4.5%',
          y: '46.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterLightWorld('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Sahasrahla <img src='/images/pendant0.png' class='mini'>",
          x: '40.7%',
          y: '46.7%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            for (let k = 0; k < 10; k++) {
              if (this.trackerData.prizes[k] === 1 && this.trackerData.items['boss' + k] === 2) {
                availability.glitchless = 'available'
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
                break
              }
            }
            return availability
          }
        },
        {
          name: 'Stump Kid',
          x: '65.5%',
          y: '68.6%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterSouthDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (Logic.glitchedLinkInDarkWorld()) {
              if (Logic.canEnterSouthDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: "Bug Kid <img src='/images/bottle0.png' class='mini'>",
          x: '7.8%',
          y: '52.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.bottle >= 1) {
              availability.glitchless = 'available'
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Show the Purple Chest to Gary',
          x: '65.2%',
          y: '52.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canLiftDarkRocks()) {
              if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.moonpearl) {
              if (
                Logic.canEnterNorthWestDarkWorld('owGlitches', false, false) &&
                this.chests[60].isAvailable().owGlitches === 'available' &&
                (Logic.canLiftDarkRocks() ||
                  (this.trackerData.items.boots &&
                    Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)))
              ) {
                availability.owGlitches = 'available'
              } else if (
                Logic.canEnterNorthWestDarkWorld('owGlitches', true, false) &&
                (this.chests[60].isAvailable().owGlitches === 'available' ||
                  this.chests[60].isAvailable().owGlitches === 'agahnim') &&
                (Logic.canLiftDarkRocks() ||
                  (this.trackerData.items.boots &&
                    Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)))
              ) {
                availability.owGlitches = 'agahnim'
              } else if (
                Logic.canEnterNorthWestDarkWorld('owGlitches', true, true) &&
                (this.chests[60].isAvailable().owGlitches === 'available' ||
                  this.chests[60].isAvailable().owGlitches === 'agahnim' ||
                  this.chests[60].isAvailable().owGlitches === 'glitchagahnim') &&
                (Logic.canLiftDarkRocks() ||
                  (this.trackerData.items.boots &&
                    Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)))
              ) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (
              Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false) &&
              this.chests[60].isAvailable().majorGlitches === 'available' &&
              (this.trackerData.items.mirror ||
                (Logic.glitchedLinkInDarkWorld() && Logic.canLiftDarkRocks()) ||
                (this.trackerData.items.boots &&
                  Logic.glitchedLinkInDarkWorld() &&
                  Logic.canEnterNorthEastDarkWorld('majorGlitches', false, false)))
            ) {
              availability.majorGlitches = 'available'
            } else if (
              Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false) &&
              (this.chests[60].isAvailable().majorGlitches === 'available' ||
                this.chests[60].isAvailable().majorGlitches === 'agahnim') &&
              (this.trackerData.items.mirror ||
                (Logic.glitchedLinkInDarkWorld() && Logic.canLiftDarkRocks()) ||
                (this.trackerData.items.boots &&
                  Logic.glitchedLinkInDarkWorld() &&
                  Logic.canEnterNorthEastDarkWorld('majorGlitches', true, false)))
            ) {
              availability.majorGlitches = 'agahnim'
            } else if (
              Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true) &&
              (this.chests[60].isAvailable().majorGlitches === 'available' ||
                this.chests[60].isAvailable().majorGlitches === 'agahnim' ||
                this.chests[60].isAvailable().majorGlitches === 'glitchagahnim') &&
              (this.trackerData.items.mirror ||
                (Logic.glitchedLinkInDarkWorld() && Logic.canLiftDarkRocks()) ||
                (this.trackerData.items.boots &&
                  Logic.glitchedLinkInDarkWorld() &&
                  Logic.canEnterNorthEastDarkWorld('majorGlitches', true, true)))
            ) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (Logic.canLiftDarkRocks() || this.trackerData.items.mirror) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: "Fugitive under the bridge <img src='/images/flippers.png' class='mini'>",
          x: '35.4%',
          y: '69.7%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.flippers) {
              availability.glitchless = 'available'
            } else {
              availability.glitchless = 'glitchavailable'
              availability.owGlitches = 'available'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.flippers) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'glitchavailable'
                }
              } else if (
                Logic.canEnterLightWorld('inverted', true, false) &&
                this.trackerData.items.flippers
              ) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name:
            "Ether Tablet <img src='/images/sword2.png' class='mini'><img src='/images/book.png' class='mini'>",
          x: '21.0%',
          y: '3.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (
              this.trackerData.items.book &&
              (this.trackerData.items.mirror ||
                (this.trackerData.items.hammer && this.trackerData.items.hookshot))
            ) {
              if (Logic.canEnterWestDeathMountain('glitchless', false)) {
                if (this.trackerData.items.sword >= 2) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (Logic.canEnterWestDeathMountain('glitchless', true)) {
                if (this.trackerData.items.sword >= 2) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              }
            }
            if (this.trackerData.items.book) {
              if (
                Logic.canEnterWestDeathMountain('owGlitches', false) &&
                this.dungeons[2].canEnter('owGlitches', false, false)
              ) {
                if (this.trackerData.items.sword >= 2) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else if (
                Logic.canEnterWestDeathMountain('owGlitches', true) &&
                this.dungeons[2].canEnter('owGlitches', false, true)
              ) {
                if (this.trackerData.items.sword >= 2) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              }
            }
            if (this.trackerData.items.book) {
              if (
                Logic.canEnterWestDeathMountain('majorGlitches', false) &&
                this.dungeons[2].canEnter('majorGlitches', false, false)
              ) {
                if (this.trackerData.items.sword >= 2) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (
                Logic.canEnterWestDeathMountain('majorGlitches', false) &&
                this.dungeons[2].mayEnter('majorGlitches', false, false)
              ) {
                availability.majorGlitches = 'possible'
              } else if (
                Logic.canEnterWestDeathMountain('majorGlitches', true) &&
                this.dungeons[2].canEnter('majorGlitches', false, true)
              ) {
                if (this.trackerData.items.sword >= 2) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (
                Logic.canEnterWestDeathMountain('majorGlitches', true) &&
                this.dungeons[2].mayEnter('majorGlitches', false, true)
              ) {
                availability.majorGlitches = 'glitchpossible'
              } else if (
                Logic.canEnterWestDeathMountain('majorGlitches', false) &&
                this.dungeons[2].mayEnter('majorGlitches', true, false) &&
                this.trackerData.items.sword >= 2
              ) {
                availability.majorGlitches = 'agahnim'
              } else if (
                Logic.canEnterWestDeathMountain('majorGlitches', true) &&
                this.dungeons[2].mayEnter('majorGlitches', true, true) &&
                this.trackerData.items.sword >= 2
              ) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (
              this.trackerData.items.book &&
              this.trackerData.items.hammer &&
              this.trackerData.items.moonpearl
            ) {
              if (Logic.canEnterEastDeathMountain('inverted', false)) {
                if (this.trackerData.items.sword >= 2) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (Logic.canEnterEastDeathMountain('inverted', true)) {
                if (this.trackerData.items.sword >= 2) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              }
            }
            return availability
          }
        },
        {
          name:
            "Bombos Tablet <img src='/images/mirror.png' class='mini'><img src='/images/sword2.png' class='mini'><img src='/images/book.png' class='mini'>",
          x: '11.0%',
          y: '92.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (
              this.trackerData.items.book &&
              this.trackerData.items.mirror &&
              Logic.canEnterSouthDarkWorld('glitchless', false, false)
            ) {
              if (this.trackerData.items.sword >= 2) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (
              this.trackerData.items.book &&
              this.trackerData.items.mirror &&
              this.trackerData.items.sword >= 2
            ) {
              if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (
              this.trackerData.items.book &&
              (this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  Logic.canEnterSouthDarkWorld('owGlitches', false, false)))
            ) {
              if (this.trackerData.items.sword >= 2) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (
              this.trackerData.items.book &&
              this.trackerData.items.mirror &&
              this.trackerData.items.sword >= 2
            ) {
              if (Logic.canEnterSouthDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (
              this.trackerData.items.book &&
              (this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  Logic.canEnterSouthDarkWorld('majorGlitches', false, false)))
            ) {
              if (this.trackerData.items.sword >= 2) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (
              this.trackerData.items.book &&
              this.trackerData.items.mirror &&
              this.trackerData.items.sword >= 2
            ) {
              if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.book) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.sword >= 2) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Catfish',
          x: '96.0%',
          y: '17.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.moonpearl && Logic.canLiftRocks()) {
              if (Logic.canEnterNorthEastDarkWorld('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterNorthEastDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterNorthEastDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (
              this.trackerData.items.moonpearl &&
              (Logic.canLiftRocks() || this.trackerData.items.boots)
            ) {
              if (Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (
              Logic.glitchedLinkInDarkWorld() &&
              (Logic.canLiftRocks() || this.trackerData.items.boots)
            ) {
              if (Logic.canEnterNorthEastDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterNorthEastDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterNorthEastDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (Logic.canLiftRocks()) {
              if (Logic.canEnterNorthEastDarkWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterNorthEastDarkWorld('inverted', false, true)) {
                availability.inverted = 'glitchavailable'
              } else if (Logic.canEnterNorthEastDarkWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterNorthEastDarkWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'King Zora: Pay 500 rupees',
          x: '47.5%',
          y: '12.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.flippers || Logic.canLiftRocks()) {
              availability.glitchless = 'available'
            } else {
              availability.glitchless = 'glitchavailable'
              availability.owGlitches = 'available'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.flippers || Logic.canLiftRocks()) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'glitchavailable'
                }
              } else if (
                Logic.canEnterLightWorld('inverted', true, false) &&
                (this.trackerData.items.flippers || Logic.canLiftRocks())
              ) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Lost Old Man',
          x: '20.8%',
          y: '20.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterWestDeathMountain('glitchless', true)) {
              if (this.trackerData.items.lantern) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'glitchavailable'
              }
            } else if (Logic.canEnterWestDeathMountain('owGlitches', true)) {
              if (this.trackerData.items.lantern) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'glitchavailable'
              }
            } else if (Logic.canEnterWestDeathMountain('majorGlitches', true)) {
              if (this.trackerData.items.lantern) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'glitchavailable'
              }
            }
            if (Logic.canEnterDarkWorldDeathMountain('inverted', false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterDarkWorldDeathMountain('inverted', true)) {
              availability.inverted = 'glitchavailable'
            }
            return availability
          }
        },
        {
          name: "Witch: Give her <img src='/images/mushroom.png' class='mini'>",
          x: '40.8%',
          y: '32.5%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.mushroom) {
              availability.glitchless = 'available'
              if (this.trackerData.items.moonpearl) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          }
        },
        {
          name: 'Forest Hideout',
          x: '9.4%',
          y: '13.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'possible'
              }
            } else if (Logic.canEnterLightWorld('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name:
            "Lumberjack Tree <img src='/images/agahnim1.png' class='mini'><img src='/images/boots.png' class='mini'>",
          x: '15.1%',
          y: '7.6%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'possible'
            if (this.trackerData.items.boots) {
              if (this.trackerData.items.agahnim) {
                availability.glitchless = 'available'
              } else if (Logic.canGoBeatAgahnim1(false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canGoBeatAgahnim1(true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              availability.inverted = 'possible'
              if (this.trackerData.items.boots && this.trackerData.items.moonpearl) {
                if (this.trackerData.items.agahnim) {
                  availability.inverted = 'available'
                } else if (Logic.canGoBeatAgahnim1(false, 'inverted')) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canGoBeatAgahnim1(true, 'inverted')) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            } else if (Logic.canEnterLightWorld('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: 'Spectacle Rock Cave',
          x: '24.3%',
          y: '14.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterWestDeathMountain('glitchless', false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterWestDeathMountain('glitchless', true)) {
              availability.glitchless = 'glitchavailable'
            }
            if (Logic.canEnterWestDeathMountain('owGlitches', false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterWestDeathMountain('owGlitches', true)) {
              availability.owGlitches = 'glitchavailable'
            }
            if (Logic.canEnterWestDeathMountain('majorGlitches', false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterWestDeathMountain('majorGlitches', true)) {
              availability.majorGlitches = 'glitchavailable'
            }
            if (Logic.canEnterWestDeathMountain('inverted', false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterWestDeathMountain('inverted', true)) {
              availability.inverted = 'glitchavailable'
            }
            return availability
          }
        },
        {
          name: "South of Grove <img src='/images/mirror.png' class='mini'>",
          x: '14.1%',
          y: '84.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.mirror) {
              if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.boots) {
              availability.owGlitches = 'available'
            } else if (this.trackerData.items.mirror) {
              if (Logic.canEnterSouthDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (Logic.canEnterSouthDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'glitchavailable'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Graveyard Cliff Cave <img src='/images/mirror.png' class='mini'>",
          x: '28.1%',
          y: '27.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.mirror && this.trackerData.items.moonpearl) {
              if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.boots) {
              availability.owGlitches = 'available'
            } else {
              if (this.trackerData.items.mirror && this.trackerData.items.moonpearl) {
                if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
                  availability.owGlitches = 'available'
                } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
                  availability.owGlitches = 'agahnim'
                } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
                  availability.owGlitches = 'glitchagahnim'
                }
              }
              if (this.trackerData.items.mirror && Logic.glitchedLinkInDarkWorld()) {
                availability.majorGlitches = 'available'
              }
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: "Checkerboard Cave <img src='/images/mirror.png' class='mini'>",
          x: '8.8%',
          y: '77.3%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canFly() && Logic.canLiftDarkRocks() && this.trackerData.items.mirror) {
              availability.glitchless = 'available'
            }
            if (Logic.canLiftRocks()) {
              if (this.trackerData.items.boots) {
                availability.owGlitches = 'available'
              } else if (this.trackerData.items.mirror) {
                if (Logic.canEnterMireArea('owGlitches', false, false)) {
                  availability.owGlitches = 'available'
                } else if (Logic.canEnterMireArea('owGlitches', true, false)) {
                  availability.owGlitches = 'agahnim'
                } else if (Logic.canEnterMireArea('owGlitches', true, true)) {
                  availability.owGlitches = 'glitchagahnim'
                }
                if (Logic.canEnterMireArea('majorGlitches', false, false)) {
                  availability.majorGlitches = 'available'
                } else if (Logic.canEnterMireArea('majorGlitches', true, false)) {
                  availability.majorGlitches = 'agahnim'
                } else if (Logic.canEnterMireArea('majorGlitches', true, true)) {
                  availability.majorGlitches = 'glitchagahnim'
                }
              }
              if (this.trackerData.items.moonpearl) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          }
        },
        {
          name:
            "<img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'>!!!!!!!!",
          x: '65.8%',
          y: '60.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canLiftDarkRocks() && this.trackerData.items.hammer) {
              if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.hammer && this.trackerData.items.moonpearl) {
              if (
                Logic.canEnterNorthWestDarkWorld('owGlitches', false, false) &&
                (Logic.canLiftDarkRocks() ||
                  (this.trackerData.items.boots &&
                    Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)))
              ) {
                availability.owGlitches = 'available'
              } else if (
                Logic.canEnterNorthWestDarkWorld('owGlitches', true, false) &&
                (Logic.canLiftDarkRocks() ||
                  (this.trackerData.items.boots &&
                    Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)))
              ) {
                availability.owGlitches = 'agahnim'
              } else if (
                Logic.canEnterNorthWestDarkWorld('owGlitches', true, true) &&
                (Logic.canLiftDarkRocks() ||
                  (this.trackerData.items.boots &&
                    Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)))
              ) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) {
              if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.hammer) {
              if (Logic.canLiftDarkRocks()) {
                availability.inverted = 'available'
              } else if (this.trackerData.items.mirror) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          }
        },
        {
          name: "Library <img src='/images/boots.png' class='mini'>",
          x: '7.7%',
          y: '65.9%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.boots) {
              availability.glitchless = 'available'
            } else {
              availability.glitchless = 'possible'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.boots) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Mushroom',
          x: '6.2%',
          y: '8.6%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'possible'
              }
            } else if (Logic.canEnterLightWorld('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Spectacle Rock <img src='/images/mirror.png' class='mini'>",
          x: '25.4%',
          y: '8.5%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterWestDeathMountain('glitchless', false)) {
              if (this.trackerData.items.mirror) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (Logic.canEnterWestDeathMountain('glitchless', true)) {
              if (this.trackerData.items.mirror) {
                availability.glitchless = 'glitchavailable'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            }
            if (Logic.canEnterWestDeathMountain('owGlitches', false)) {
              if (this.trackerData.items.boots || this.trackerData.items.mirror) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (Logic.canEnterWestDeathMountain('owGlitches', true)) {
              if (this.trackerData.items.boots || this.trackerData.items.mirror) {
                availability.owGlitches = 'glitchavailable'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            }
            if (Logic.canEnterWestDeathMountain('majorGlitches', false)) {
              if (this.trackerData.items.boots || this.trackerData.items.mirror) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (Logic.canEnterWestDeathMountain('majorGlitches', true)) {
              if (this.trackerData.items.boots || this.trackerData.items.mirror) {
                availability.majorGlitches = 'glitchavailable'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            }
            if (
              Logic.canEnterEastDeathMountain('inverted', false) &&
              this.trackerData.items.hammer &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'available'
            } else if (
              Logic.canEnterEastDeathMountain('inverted', true) &&
              this.trackerData.items.hammer &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'glitchavailable'
            } else if (Logic.canEnterWestDeathMountain('inverted', false)) {
              availability.inverted = 'possible'
            } else if (Logic.canEnterWestDeathMountain('inverted', true)) {
              availability.inverted = 'glitchpossible'
            }
            return availability
          }
        },
        {
          name: "Floating Island <img src='/images/mirror.png' class='mini'>",
          x: '40.2%',
          y: '3.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterEastDeathMountain('glitchless', false)) {
              if (
                this.trackerData.items.mirror &&
                this.trackerData.items.moonpearl &&
                Logic.canLiftDarkRocks()
              ) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (Logic.canEnterEastDeathMountain('glitchless', true)) {
              if (
                this.trackerData.items.mirror &&
                this.trackerData.items.moonpearl &&
                Logic.canLiftDarkRocks()
              ) {
                availability.glitchless = 'glitchavailable'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            }
            if (Logic.canEnterEastDeathMountain('owGlitches', false)) {
              if (
                this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  this.trackerData.items.moonpearl &&
                  Logic.canLiftRocks() &&
                  Logic.canEnterDarkWorldDeathMountain('owGlitches', false))
              ) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (Logic.canEnterEastDeathMountain('owGlitches', true)) {
              if (
                this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  this.trackerData.items.moonpearl &&
                  Logic.canLiftRocks() &&
                  Logic.canEnterDarkWorldDeathMountain('owGlitches', true))
              ) {
                availability.owGlitches = 'glitchavailable'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            }
            if (Logic.canEnterEastDeathMountain('majorGlitches', false)) {
              if (
                this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  Logic.glitchedLinkInDarkWorld() &&
                  Logic.canLiftRocks() &&
                  Logic.canEnterDarkWorldDeathMountain('majorGlitches', false))
              ) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (Logic.canEnterEastDeathMountain('majorGlitches', true)) {
              if (
                this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  Logic.glitchedLinkInDarkWorld() &&
                  Logic.canLiftRocks() &&
                  Logic.canEnterDarkWorldDeathMountain('majorGlitches', true))
              ) {
                availability.majorGlitches = 'glitchavailable'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            }
            if (Logic.canEnterEastDeathMountain('inverted', false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterEastDeathMountain('inverted', true)) {
              availability.inverted = 'glitchavailable'
            }
            return availability
          }
        },
        {
          name:
            "Race Minigame <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
          x: '1.8%',
          y: '69.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name:
            "Desert West Ledge <img src='/images/book.png' class='mini'>/<img src='/images/mirror.png' class='mini'>",
          x: '1.5%',
          y: '91.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'possible'
            if (this.dungeons[1].canEnter('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else {
              if (this.dungeons[1].canEnter('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (this.dungeons[1].canEnter('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (this.dungeons[1].canEnter('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (this.dungeons[1].canEnter('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (this.dungeons[1].canEnter('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (this.dungeons[1].canEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              availability.inverted = 'possible'
              if (this.dungeons[1].canEnter('inverted', false, false)) {
                if (this.trackerData.items.moonpearl) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'glitchavailable'
                }
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: "Lake Hylia Island <img src='/images/mirror.png' class='mini'>",
          x: '36.1%',
          y: '82.9%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'possible'
            if (
              this.trackerData.items.flippers &&
              this.trackerData.items.moonpearl &&
              this.trackerData.items.mirror
            ) {
              if (
                Logic.canEnterSouthDarkWorld('glitchless', false, false) ||
                Logic.canEnterNorthEastDarkWorld('glitchless', false, false)
              ) {
                availability.glitchless = 'available'
              } else if (
                Logic.canEnterSouthDarkWorld('glitchless', true, false) ||
                Logic.canEnterNorthEastDarkWorld('glitchless', true, false)
              ) {
                availability.glitchless = 'agahnim'
              } else if (
                Logic.canEnterSouthDarkWorld('glitchless', true, true) ||
                Logic.canEnterNorthEastDarkWorld('glitchless', true, true)
              ) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.boots) {
              availability.owGlitches = 'available'
            } else if (this.trackerData.items.flippers && this.trackerData.items.mirror) {
              if (
                (this.trackerData.items.moonpearl &&
                    Logic.canEnterSouthDarkWorld('owGlitches', false, false)) ||
                  Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)
              ) {
                availability.owGlitches = 'available'
              } else if (
                (this.trackerData.items.moonpearl &&
                    Logic.canEnterSouthDarkWorld('owGlitches', true, false)) ||
                  Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)
              ) {
                availability.owGlitches = 'agahnim'
              } else if (
                (this.trackerData.items.moonpearl &&
                    Logic.canEnterSouthDarkWorld('owGlitches', true, true)) ||
                  Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)
              ) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (
                Logic.glitchedLinkInDarkWorld() ||
                  Logic.canEnterNorthEastDarkWorld('majorGlitches', false, false)
              ) {
                availability.majorGlitches = 'available'
              } else if (
                Logic.glitchedLinkInDarkWorld() ||
                  Logic.canEnterNorthEastDarkWorld('majorGlitches', true, false)
              ) {
                availability.majorGlitches = 'agahnim'
              } else if (
                Logic.glitchedLinkInDarkWorld() ||
                  Logic.canEnterNorthEastDarkWorld('majorGlitches', true, true)
              ) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.flippers) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'glitchavailable'
                }
              } else if (
                Logic.canEnterLightWorld('inverted', true, false) &&
                this.trackerData.items.flippers
              ) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: "Bumper Cave <img src='/images/cape.png' class='mini'>",
          x: '67.1%',
          y: '15.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
              if (Logic.canLiftRocks() && this.trackerData.items.cape) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (
              Logic.canEnterNorthWestDarkWorld('glitchless', true, false) &&
              Logic.canLiftRocks() &&
              this.trackerData.items.cape
            ) {
              availability.glitchless = 'agahnim'
            } else if (
              Logic.canEnterNorthWestDarkWorld('glitchless', true, true) &&
              Logic.canLiftRocks() &&
              this.trackerData.items.cape
            ) {
              availability.glitchless = 'glitchagahnim'
            }
            if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
              if (
                this.trackerData.items.moonpearl &&
                (this.trackerData.items.boots ||
                  (Logic.canLiftRocks() && this.trackerData.items.cape))
              ) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (
              this.trackerData.items.moonpearl &&
              (this.trackerData.items.boots || (Logic.canLiftRocks() && this.trackerData.items.cape))
            ) {
              if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
              if (
                Logic.glitchedLinkInDarkWorld() &&
                (this.trackerData.items.boots ||
                  (Logic.canLiftRocks() && this.trackerData.items.cape))
              ) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (
              Logic.glitchedLinkInDarkWorld() &&
              (this.trackerData.items.boots || (Logic.canLiftRocks() && this.trackerData.items.cape))
            ) {
              if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            availability.inverted = 'possible'
            if (
              this.trackerData.items.moonpearl &&
              Logic.canLiftRocks() &&
              this.trackerData.items.cape &&
              this.trackerData.items.mirror
            ) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Pyramid',
          x: '79.0%',
          y: '43.5%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterNorthEastDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterNorthEastDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterNorthEastDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)) {
              availability.owGlitches = 'available'
            } else if (Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (Logic.canEnterNorthEastDarkWorld('majorGlitches', false, false)) {
              availability.majorGlitches = 'available'
            } else if (Logic.canEnterNorthEastDarkWorld('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (Logic.canEnterNorthEastDarkWorld('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (Logic.canEnterNorthEastDarkWorld('inverted', false, false)) {
              availability.inverted = 'available'
            } else if (Logic.canEnterNorthEastDarkWorld('inverted', false, true)) {
              availability.inverted = 'glitchavailable'
            } else if (Logic.canEnterNorthEastDarkWorld('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterNorthEastDarkWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: 'Dig Game: Pay 80 rupees',
          x: '52.9%',
          y: '69.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterSouthDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (Logic.glitchedLinkInDarkWorld()) {
              if (Logic.canEnterSouthDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            availability.inverted = 'available'
            return availability
          }
        },
        {
          name: "Zora River Ledge <img src='/images/flippers.png' class='mini'>",
          x: '47.5%',
          y: '17.3%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.flippers) {
              availability.glitchless = 'available'
            } else if (Logic.canLiftRocks()) {
              availability.glitchless = 'possible'
            } else {
              availability.glitchless = 'glitchpossible'
            }
            if (this.trackerData.items.boots && this.trackerData.items.moonpearl) {
              availability.owGlitches = 'available'
            } else {
              availability.owGlitches = 'possible'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.flippers) {
                  availability.inverted = 'available'
                } else if (Logic.canLiftRocks()) {
                  availability.inverted = 'possible'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (
                Logic.canEnterLightWorld('inverted', true, false) &&
                (this.trackerData.items.flippers || Logic.canLiftRocks())
              ) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: "Buried Item <img src='/images/shovel.png' class='mini'>",
          x: '14.4%',
          y: '66.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.shovel) {
              availability.glitchless = 'available'
              if (this.trackerData.items.moonpearl) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          }
        },
        {
          name:
            "Escape Sewer (4) <img src='/images/glove1.png' class='mini'> + <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
          x: '26.8%',
          y: '32.4%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canLiftRocks()) {
              availability.glitchless = 'available'
            } else if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: 'Castle Secret Entrance (2)',
          x: '29.8%',
          y: '41.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Hyrule Castle (3)',
          x: '24.9%',
          y: '44.1%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'glitchavailable'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: 'Sanctuary',
          x: '23.0%',
          y: '28.0%',
          isOpened: true,
          isAvailable () {
            const availability = new Availability()
            availability.glitchless = 'available'
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (this.trackerData.items.moonpearl) {
                availability.inverted = 'available'
              } else if (this.trackerData.items.mirror) {
                availability.inverted = 'glitchavailable'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (
              Logic.canEnterLightWorld('inverted', true, false) &&
              this.trackerData.items.moonpearl
            ) {
              availability.inverted = 'agahnim'
            } else if (Logic.canEnterLightWorld('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name:
            "Mad Batter <img src='/images/hammer.png' class='mini'>/<img src='/images/mirror.png' class='mini'> + <img src='/images/powder.png' class='mini'>",
          x: '16.0%',
          y: '58.0%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (
              this.trackerData.items.hammer ||
              (this.trackerData.items.moonpearl &&
                this.trackerData.items.mirror &&
                Logic.canLiftDarkRocks())
            ) {
              if (this.trackerData.items.powder) {
                availability.glitchless = 'available'
              } else if (this.trackerData.items.somaria && this.trackerData.items.mushroom) {
                availability.glitchless = 'glitchavailable'
              }
            }
            if (this.trackerData.items.powder && this.trackerData.items.boots) {
              availability.owGlitches = 'available'
            } else if (this.trackerData.items.powder && this.trackerData.items.mirror) {
              availability.majorGlitches = 'available'
            }
            if (this.trackerData.items.moonpearl && this.trackerData.items.hammer) {
              if (this.trackerData.items.powder) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'available'
                } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                  availability.inverted = 'agahnim'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              } else if (this.trackerData.items.somaria && this.trackerData.items.mushroom) {
                if (Logic.canEnterLightWorld('inverted', false, false)) {
                  availability.inverted = 'glitchavailable'
                } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          }
        },
        {
          name: "Take the frog home (<img src='/images/mirror.png' class='mini'> or save and quit)",
          x: '15.2%',
          y: '51.8%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (Logic.canLiftDarkRocks()) {
              if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (
              this.trackerData.items.moonpearl &&
              (Logic.canLiftDarkRocks() ||
                (this.trackerData.items.boots && this.trackerData.items.mirror))
            ) {
              if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
            }
            if (
              Logic.glitchedLinkInDarkWorld() &&
              (Logic.canLiftDarkRocks() ||
                (this.trackerData.items.boots && this.trackerData.items.mirror))
            ) {
              if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (Logic.canLiftDarkRocks() || this.trackerData.items.mirror) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name:
            "Fat Fairy: Buy OJ bomb from Dark Link's House after <img src='/images/crystal0.png' class='mini'>5 <img src='/images/crystal0.png' class='mini'>6 (2 items)",
          x: '73.5%',
          y: '48.5%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            // Crystal check
            let crystalCount = 0
            for (let k = 0; k < 10; k++) {
              if (this.trackerData.prizes[k] === 4 && this.trackerData.items['boss' + k] === 2) {
                crystalCount++
                if (crystalCount === 2) {
                  break
                }
              }
            }
            if (crystalCount === 2 && this.trackerData.items.moonpearl) {
              if (
                Logic.canEnterSouthDarkWorld('glitchless', false, false) &&
                (this.trackerData.items.hammer ||
                  (this.trackerData.items.mirror && this.trackerData.items.agahnim))
              ) {
                availability.glitchless = 'available'
              } else if (
                Logic.canEnterSouthDarkWorld('glitchless', true, false) &&
                (this.trackerData.items.hammer ||
                  (this.trackerData.items.mirror && Logic.canGoBeatAgahnim1(false)))
              ) {
                availability.glitchless = 'agahnim'
              } else if (
                Logic.canEnterSouthDarkWorld('glitchless', true, true) &&
                (this.trackerData.items.hammer ||
                  (this.trackerData.items.mirror && Logic.canGoBeatAgahnim1(true)))
              ) {
                availability.glitchless = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.mirror && Logic.canSpinSpeed()) {
              availability.owGlitches = 'available'
            } else if (crystalCount === 2) {
              if (
                Logic.canEnterSouthDarkWorld('owGlitches', false, false) &&
                ((this.trackerData.items.hammer && this.trackerData.items.moonpearl) ||
                  (this.trackerData.items.mirror && this.trackerData.items.agahnim))
              ) {
                availability.owGlitches = 'available'
              } else if (
                Logic.canEnterSouthDarkWorld('owGlitches', true, false) &&
                ((this.trackerData.items.hammer && this.trackerData.items.moonpearl) ||
                  (this.trackerData.items.mirror && Logic.canGoBeatAgahnim1(false)))
              ) {
                availability.owGlitches = 'agahnim'
              } else if (
                Logic.canEnterSouthDarkWorld('owGlitches', true, true) &&
                ((this.trackerData.items.hammer && this.trackerData.items.moonpearl) ||
                  (this.trackerData.items.mirror && Logic.canGoBeatAgahnim1(true)))
              ) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (
                Logic.canEnterSouthDarkWorld('majorGlitches', false, false) &&
                ((this.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) ||
                  (this.trackerData.items.mirror && this.trackerData.items.agahnim))
              ) {
                availability.majorGlitches = 'available'
              } else if (
                Logic.canEnterSouthDarkWorld('majorGlitches', true, false) &&
                ((this.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) ||
                  (this.trackerData.items.mirror && Logic.canGoBeatAgahnim1(false)))
              ) {
                availability.majorGlitches = 'agahnim'
              } else if (
                Logic.canEnterSouthDarkWorld('majorGlitches', true, true) &&
                ((this.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) ||
                  (this.trackerData.items.mirror && Logic.canGoBeatAgahnim1(true)))
              ) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (crystalCount === 2 && this.trackerData.items.mirror) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name:
            "Master Sword Pedestal <img src='/images/pendant0.png' class='mini'><img src='/images/pendant1.png' class='mini'><img src='/images/pendant2.png' class='mini'> (can check with <img src='/images/book.png' class='mini'>)",
          x: '2.5%',
          y: '3.2%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            let pendantCount = 0
            for (let k = 0; k < 10; k++) {
              if (
                (this.trackerData.prizes[k] === 1 || this.trackerData.prizes[k] === 2) &&
                this.trackerData.items['boss' + k] === 2
              ) {
                pendantCount++
                if (pendantCount === 3) {
                  break
                }
              }
            }
            if (pendantCount === 3) {
              availability.glitchless = 'available'
            } else if (this.trackerData.items.book) {
              availability.glitchless = 'possible'
            }
            if (Logic.canEnterLightWorld('inverted', false, false)) {
              if (pendantCount === 3) {
                availability.inverted = 'available'
              } else if (this.trackerData.items.book) {
                availability.inverted = 'possible'
              }
            } else if (pendantCount === 3 || this.trackerData.items.book) {
              if (Logic.canEnterLightWorld('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }

            return availability
          }
        },
        {
          name: "Waterfall of the Wishing (2)  <img src='/images/flippers.png' class='mini'>",
          x: '44.9%',
          y: '14.7%',
          isOpened: false,
          isAvailable () {
            const availability = new Availability()
            if (this.trackerData.items.flippers) {
              availability.glitchless = 'available'
            } else if (this.trackerData.items.moonpearl) {
              availability.glitchless = 'glitchavailable'
              availability.owGlitches = 'available'
            } else if (this.trackerData.items.boots) {
              availability.glitchless = 'glitchavailable'
            }
            if (this.trackerData.items.moonpearl) {
              if (Logic.canEnterLightWorld('inverted', false, false)) {
                if (this.trackerData.items.flippers) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'glitchavailable'
                }
              } else if (
                Logic.canEnterLightWorld('inverted', true, false) &&
                this.trackerData.items.flippers
              ) {
                availability.inverted = 'agahnim'
              } else if (Logic.canEnterLightWorld('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        }
      ],
      dungeons: [
        {
          name: 'Eastern Palace',
          label: 'EP',
          x: '46.8%',
          y: '38.8%',
          image: 'boss02.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            return (
              logic !== 'inverted' ||
              Logic.canEnterLightWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
            )
          },
          isBeatable () {
            const availability = new Availability()
            if (this.trackerData.items.bow) {
              if (this.trackerData.items.lantern) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'glitchavailable'
              }
              if (this.canEnter('inverted', false, true)) {
                if (
                  this.trackerData.items.moonpearl &&
                  this.canEnter('inverted', false, false) &&
                  this.trackerData.items.lantern
                ) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'glitchavailable'
                }
              } else if (this.canEnter('inverted', true, true)) {
                if (
                  this.trackerData.items.moonpearl &&
                  this.canEnter('inverted', true, false) &&
                  this.trackerData.items.lantern
                ) {
                  availability.inverted = 'agahnim'
                } else {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.trackerData.items.lantern) {
              if (this.trackerData.items.bow) {
                availability.glitchless = 'available'
              } else if (this.trackerData.dungeonthis.chests[0] >= 2) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (this.trackerData.dungeonthis.chests[0] === 3) {
              availability.glitchless = 'available'
            } else {
              availability.glitchless = 'possible'
            }
            if (this.canEnter('inverted', false, true)) {
              if (
                this.trackerData.items.moonpearl &&
                this.canEnter('inverted', false, false) &&
                this.trackerData.items.lantern
              ) {
                if (this.trackerData.items.bow || this.trackerData.dungeonthis.chests[0] >= 2) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (this.trackerData.items.bow || this.trackerData.dungeonthis.chests[0] >= 2) {
                availability.inverted = 'glitchavailable'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.canEnter('inverted', true, true)) {
              if (
                this.trackerData.items.moonpearl &&
                this.canEnter('inverted', true, false) &&
                this.trackerData.items.lantern
              ) {
                availability.inverted = 'agahnim'
              } else {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Desert Palace',
          label: 'DP',
          x: '3.8%',
          y: '78.4%',
          image: 'boss12.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.trackerData.items.book ||
                this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  Logic.canEnterMireArea('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
              )
            } else if (logic === 'owGlitches') {
              return (
                this.trackerData.items.book ||
                this.trackerData.items.boots ||
                (this.trackerData.items.mirror &&
                  Logic.canEnterMireArea('owGlitches', agahnimCheck, allowOutOfLogicGlitches))
              )
            } else if (logic === 'glitchless') {
              return (
                this.trackerData.items.book ||
                (this.trackerData.items.mirror && Logic.canLiftDarkRocks() && Logic.canFly())
              )
            } else if (logic === 'inverted') {
              return (
                this.trackerData.items.book &&
                Logic.canEnterLightWorld('inverted', agahnimCheck, allowOutOfLogicGlitches)
              )
            }
          },
          canHurtBoss () {
            return (
              this.trackerData.items.sword ||
              this.trackerData.items.hammer ||
              this.trackerData.items.bow ||
              this.trackerData.items.firerod ||
              this.trackerData.items.icerod ||
              this.trackerData.items.byrna ||
              this.trackerData.items.somaria
            )
          },
          isBeatable () {
            const availability = new Availability()
            if (Logic.canLiftRocks() && Logic.canLightTorches()) {
              if (this.canEnter('glitchless', false, false)) {
                if (this.trackerData.items.boots) {
                  if (this.canHurtBoss()) {
                    availability.glitchless = 'available'
                  } else {
                    availability.glitchless = 'glitchavailable'
                  }
                } else if (this.canHurtBoss()) {
                  availability.glitchless = 'possible'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              }
              if (this.canEnter('owGlitches', false, false)) {
                if (this.trackerData.items.boots) {
                  if (this.canHurtBoss()) {
                    availability.owGlitches = 'available'
                  } else {
                    availability.owGlitches = 'glitchavailable'
                  }
                } else if (this.canHurtBoss()) {
                  availability.owGlitches = 'possible'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (this.canEnter('owGlitches', true, false)) {
                if (this.canHurtBoss()) {
                  availability.owGlitches = 'agahnim'
                } else {
                  availability.owGlitches = 'glitchagahnim'
                }
              } else if (this.canEnter('owGlitches', true, false)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (this.canEnter('majorGlitches', false, false)) {
                if (this.trackerData.items.boots) {
                  if (this.canHurtBoss()) {
                    availability.majorGlitches = 'available'
                  } else {
                    availability.majorGlitches = 'glitchavailable'
                  }
                } else if (this.canHurtBoss()) {
                  availability.majorGlitches = 'possible'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (this.canEnter('majorGlitches', true, false)) {
                if (this.canHurtBoss()) {
                  availability.majorGlitches = 'agahnim'
                } else {
                  availability.majorGlitches = 'glitchagahnim'
                }
              } else if (this.canEnter('majorGlitches', true, false)) {
                availability.majorGlitches = 'glitchagahnim'
              }
              if (this.canEnter('inverted', false, true) && this.trackerData.items.moonpearl) {
                if (this.canEnter('inverted', false, false) && this.canHurtBoss()) {
                  if (this.trackerData.items.boots) {
                    availability.inverted = 'available'
                  } else {
                    availability.inverted = 'possible'
                  }
                } else if (this.trackerData.items.boots) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (this.canEnter('inverted', true, true) && this.trackerData.items.moonpearl) {
                if (this.canEnter('inverted', true, false) && this.canHurtBoss()) {
                  availability.inverted = 'agahnim'
                } else {
                  availability.inverted = 'glitchagahnim'
                }
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (
                this.trackerData.items.boots &&
                (this.trackerData.dungeonthis.chests[1] === 2 ||
                  (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))
              ) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (
                this.trackerData.items.boots &&
                (this.trackerData.dungeonthis.chests[1] === 2 ||
                  (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))
              ) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (this.canEnter('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (this.canEnter('owGlitches', true, true)) {
              availability.owGlitches = 'glitchedagahnim'
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (
                this.trackerData.items.boots &&
                (this.trackerData.dungeonthis.chests[1] === 2 ||
                  (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))
              ) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.canEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchedagahnim'
            }
            if (this.canEnter('inverted', false, true)) {
              if (this.trackerData.items.moonpearl && this.canEnter('inverted', false, false)) {
                if (
                  this.trackerData.items.boots &&
                  (this.trackerData.dungeonthis.chests[1] === 2 ||
                    (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))
                ) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (
                this.trackerData.items.boots &&
                  (this.trackerData.dungeonthis.chests[1] === 2 ||
                    (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))
              ) {
                availability.inverted = 'glitchavailable'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.canEnter('inverted', true, true)) {
              if (this.trackerData.items.moonpearl && this.canEnter('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          }
        },
        {
          name: 'Tower of Hera',
          label: 'ToH',
          x: '31.0%',
          y: '5.5%',
          image: 'boss22.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.trackerData.items.boots ||
                (Logic.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) &&
                  (this.trackerData.items.mirror ||
                    (this.trackerData.items.hookshot && this.trackerData.items.hammer))) ||
                // Enter from Misery Mire.
                this.dungeons[8].canEnter('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.trackerData.items.boots ||
                (Logic.canEnterWestDeathMountain('owGlitches', allowOutOfLogicGlitches) &&
                  (this.trackerData.items.mirror ||
                    (this.trackerData.items.hookshot && this.trackerData.items.hammer)))
              )
            } else if (logic === 'glitchless') {
              return (
                Logic.canEnterWestDeathMountain('glitchless', allowOutOfLogicGlitches) &&
                (this.trackerData.items.mirror ||
                  (this.trackerData.items.hookshot && this.trackerData.items.hammer))
              )
            } else if (logic === 'inverted') {
              return (
                Logic.canEnterEastDeathMountain('inverted', allowOutOfLogicGlitches) &&
                this.trackerData.items.hammer &&
                this.trackerData.items.moonpearl
              )
            }
          },
          mayEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            return (
              (logic === 'majorGlitches' &&
                this.dungeons[8].mayEnter('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)) ||
              this.canEnter(logic)
            )
          },
          isBeatable () {
            const availability = new Availability()
            if (this.trackerData.items.sword >= 1 || this.trackerData.items.hammer) {
              if (this.canEnter('glitchless', false, false)) {
                if (Logic.canLightTorches()) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (this.canEnter('glitchless', false, true)) {
                if (Logic.canLightTorches()) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              }
              if (this.canEnter('owGlitches', false, false)) {
                if (Logic.canLightTorches()) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else if (this.canEnter('owGlitches', false, true)) {
                if (Logic.canLightTorches()) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              }
              if (this.canEnter('majorGlitches', false, false)) {
                if (Logic.canLightTorches() || this.dungeons[8].canEnter('majorGlitches', false, false)) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (this.canEnter('majorGlitches', false, true)) {
                if (Logic.canLightTorches() || this.dungeons[8].canEnter('majorGlitches', false, true)) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (this.mayEnter('majorGlitches', false, false)) {
                availability.majorGlitches = 'possible'
              } else if (this.mayEnter('majorGlitches', false, true)) {
                availability.majorGlitches = 'glitchpossible'
              } else if (this.mayEnter('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (this.mayEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
              if (this.canEnter('inverted', false, false)) {
                if (Logic.canLightTorches()) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (this.canEnter('inverted', false, true)) {
                if (Logic.canLightTorches()) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (
                Logic.canLightTorches() &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (this.canEnter('glitchless', false, true)) {
              if (
                Logic.canLightTorches() &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.glitchless = 'glitchavailable'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (
                Logic.canLightTorches() &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (this.canEnter('owGlitches', false, true)) {
              if (
                Logic.canLightTorches() &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.owGlitches = 'glitchavailable'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (
                (Logic.canLightTorches() || this.dungeons[8].canEnter('majorGlitches', false, false)) &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (
                (Logic.canLightTorches() || this.dungeons[8].canEnter('majorGlitches', false, false)) &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.majorGlitches = 'glitchavailable'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('majorGlitches', false, false)) {
              availability.majorGlitches = 'possible'
            } else if (this.mayEnter('majorGlitches', false, true)) {
              availability.majorGlitches = 'glitchpossible'
            } else if (this.mayEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.mayEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (this.canEnter('inverted', false, false)) {
              if (
                Logic.canLightTorches() &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'possible'
              }
            } else if (this.canEnter('inverted', false, true)) {
              if (
                Logic.canLightTorches() &&
                (this.trackerData.dungeonthis.chests[2] === 2 ||
                  this.trackerData.items.sword >= 1 ||
                  this.trackerData.items.hammer)
              ) {
                availability.inverted = 'glitchavailable'
              } else {
                availability.inverted = 'glitchpossible'
              }
            }
            return availability
          }
        },
        {
          name: "Palace of Darkness <img src='/images/lantern.png' class='mini'>",
          label: 'PoD',
          x: '97.0%',
          y: '40.0%',
          image: 'boss32.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                (Logic.glitchedLinkInDarkWorld() &&
                  Logic.canEnterNorthEastDarkWorld(
                    'majorGlitches',
                    agahnimCheck,
                    allowOutOfLogicGlitches
                  )) ||
                Logic.canEnterWestDeathMountain('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'glitchless' || logic === 'owGlitches') {
              return (
                Logic.canEnterNorthEastDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches) &&
                this.trackerData.items.moonpearl
              )
            } else if (logic === 'inverted') {
              return Logic.canEnterNorthEastDarkWorld('inverted', agahnimCheck, allowOutOfLogicGlitches)
            }
          },
          isBeatable () {
            const availability = new Availability()
            if (this.trackerData.items.hammer && this.trackerData.items.bow) {
              if (this.canEnter('glitchless', false, false) && this.trackerData.items.lantern) {
                availability.glitchless = 'available'
              } else if (this.canEnter('glitchless', false, true)) {
                availability.glitchless = 'glitchavailable'
              } else if (this.canEnter('glitchless', true, false) && this.trackerData.items.lantern) {
                availability.glitchless = 'agahnim'
              } else if (this.canEnter('glitchless', true, true)) {
                availability.glitchless = 'glitchedagahnim'
              }
              if (this.canEnter('owGlitches', false, false) && this.trackerData.items.lantern) {
                availability.owGlitches = 'available'
              } else if (this.canEnter('owGlitches', false, true)) {
                availability.owGlitches = 'glitchavailable'
              } else if (this.canEnter('owGlitches', true, false) && this.trackerData.items.lantern) {
                availability.owGlitches = 'agahnim'
              } else if (this.canEnter('owGlitches', true, true)) {
                availability.owGlitches = 'glitchedagahnim'
              }
              if (this.canEnter('majorGlitches', false, false) && this.trackerData.items.lantern) {
                availability.majorGlitches = 'available'
              } else if (this.canEnter('majorGlitches', false, true)) {
                availability.majorGlitches = 'glitchavailable'
              } else if (this.canEnter('majorGlitches', true, false) && this.trackerData.items.lantern) {
                availability.majorGlitches = 'agahnim'
              } else if (this.canEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchedagahnim'
              }
              if (this.canEnter('inverted', false, false) && this.trackerData.items.lantern) {
                availability.inverted = 'available'
              } else if (this.canEnter('inverted', false, true)) {
                availability.inverted = 'glitchavailable'
              } else if (this.canEnter('inverted', true, false) && this.trackerData.items.lantern) {
                availability.inverted = 'agahnim'
              } else if (this.canEnter('inverted', true, true)) {
                availability.inverted = 'glitchedagahnim'
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                if (this.trackerData.items.lantern) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (this.trackerData.items.lantern) {
                availability.glitchless = 'possible'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            } else if (this.canEnter('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (this.canEnter('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                if (this.trackerData.items.lantern) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else if (this.trackerData.items.lantern) {
                availability.owGlitches = 'possible'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('owGlitches', false, true)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                availability.owGlitches = 'glitchavailable'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (this.canEnter('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                if (this.trackerData.items.lantern) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (this.trackerData.items.lantern) {
                availability.majorGlitches = 'possible'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                availability.majorGlitches = 'glitchavailable'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.canEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (this.canEnter('inverted', false, false)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                if (this.trackerData.items.lantern) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (this.trackerData.items.lantern) {
                availability.inverted = 'possible'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.canEnter('inverted', false, true)) {
              if (
                this.trackerData.items.bow &&
                (this.trackerData.dungeonthis.chests[3] >= 2 || this.trackerData.items.hammer)
              ) {
                availability.inverted = 'glitchavailable'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.canEnter('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (this.canEnter('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }

            return availability
          }
        },
        {
          name: "Swamp Palace <img src='/images/mirror.png' class='mini'>",
          label: 'SP',
          x: '73.5%',
          y: '91.0%',
          image: 'boss42.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.dungeons[8].canEnter('majorGlitches', agahnimCheck, allowOutOfLogicGlitches) ||
                (this.trackerData.items.moonpearl &&
                  this.trackerData.items.mirror &&
                  this.trackerData.items.flippers &&
                  Logic.canEnterSouthDarkWorld(
                    'majorGlitches',
                    agahnimCheck,
                    allowOutOfLogicGlitches
                  ))
              )
            } else if (logic === 'glitchless' || logic === 'owGlitches') {
              return (
                this.trackerData.items.moonpearl &&
                this.trackerData.items.mirror &&
                this.trackerData.items.flippers &&
                Logic.canEnterSouthDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return (
                this.trackerData.items.mirror &&
                this.trackerData.items.flippers &&
                Logic.canEnterLightWorld('inverted', agahnimCheck, allowOutOfLogicGlitches) &&
                (this.trackerData.items.moonpearl || allowOutOfLogicGlitches)
              )
            }
          },
          isBeatable () {
            const availability = new Availability()
            if (this.trackerData.items.hammer && this.trackerData.items.hookshot) {
              if (this.canEnter('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (this.canEnter('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (this.canEnter('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
              if (this.canEnter('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (this.canEnter('owGlitches', false, true)) {
                availability.owGlitches = 'glitchavailable'
              } else if (this.canEnter('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (this.canEnter('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (this.canEnter('inverted', false, false)) {
                availability.inverted = 'available'
              } else if (this.canEnter('inverted', false, true)) {
                availability.inverted = 'glitchavailable'
              } else if (this.canEnter('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (this.canEnter('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            if (
              this.trackerData.items.hookshot &&
              this.trackerData.items.flippers &&
              (this.trackerData.items.sword >= 1 ||
                this.trackerData.items.hammer ||
                ((this.trackerData.items.bow || Logic.canExtendMagic()) &&
                  (this.trackerData.items.firerod || this.trackerData.items.icerod)))
            ) {
              if (
                this.canEnter('majorGlitches', false, false) &&
                (this.trackerData.items.hammer || this.dungeons[8].canEnter('majorGlitches', false, false))
              ) {
                availability.majorGlitches = 'available'
              } else if (
                this.canEnter('majorGlitches', false, true) &&
                (this.trackerData.items.hammer || this.dungeons[8].canEnter('majorGlitches', false, true))
              ) {
                availability.majorGlitches = 'glitchavailable'
              } else if (
                this.canEnter('majorGlitches', true, false) &&
                (this.trackerData.items.hammer || this.dungeons[8].canEnter('majorGlitches', true, false))
              ) {
                availability.majorGlitches = 'agahnim'
              } else if (
                this.canEnter('majorGlitches', true, true) &&
                (this.trackerData.items.hammer || this.dungeons[8].canEnter('majorGlitches', true, true))
              ) {
                availability.majorGlitches = 'glitchedagahnim'
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot || this.trackerData.dungeonthis.chests[4] >= 5) {
                  availability.glitchless = 'available'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.glitchless = 'possible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] === 6) {
                availability.glitchless = 'possible'
              }
            } else if (this.canEnter('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (this.canEnter('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot || this.trackerData.dungeonthis.chests[4] >= 5) {
                  availability.owGlitches = 'available'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.owGlitches = 'possible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] === 6) {
                availability.owGlitches = 'possible'
              }
            } else if (this.canEnter('owGlitches', false, true)) {
              if (this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot || this.trackerData.dungeonthis.chests[4] >= 5) {
                  availability.owGlitches = 'glitchavailable'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] === 6) {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (this.canEnter('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (
                this.trackerData.items.flippers &&
                (this.trackerData.items.hammer || this.dungeons[8].canEnter('majorGlitches', false, false))
              ) {
                if (this.trackerData.items.hookshot) {
                  availability.majorGlitches = 'available'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.majorGlitches = 'possible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] >= 5) {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (
                this.trackerData.items.flippers &&
                (this.trackerData.items.hammer || this.dungeons[8].canEnter('majorGlitches', false, false))
              ) {
                if (this.trackerData.items.hookshot) {
                  availability.majorGlitches = 'glitchavailable'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] >= 5) {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.canEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (this.canEnter('inverted', false, false)) {
              if (this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot || this.trackerData.dungeonthis.chests[4] >= 5) {
                  availability.inverted = 'available'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.inverted = 'possible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] === 6) {
                availability.inverted = 'possible'
              }
            } else if (this.canEnter('inverted', false, true)) {
              if (this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot || this.trackerData.dungeonthis.chests[4] >= 5) {
                  availability.inverted = 'glitchavailable'
                } else if (this.trackerData.dungeonthis.chests[4] >= 3) {
                  availability.inverted = 'glitchpossible'
                }
              } else if (this.trackerData.dungeonthis.chests[4] === 6) {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.canEnter('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (this.canEnter('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name: 'Skull Woods',
          label: 'SW',
          x: '53.3%',
          y: '5.4%',
          image: 'boss52.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches' || logic === 'owGlitches') {
              return Logic.canEnterNorthWestDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
            } else if (logic === 'glitchless') {
              return (
                this.trackerData.items.moonpearl &&
                Logic.canEnterNorthWestDarkWorld('glitchless', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return true
            }
          },
          isBeatable () {
            const availability = new Availability()
            if (
              this.trackerData.items.moonpearl &&
              this.trackerData.items.firerod &&
              this.trackerData.items.sword >= 1
            ) {
              if (this.canEnter('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (this.canEnter('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (this.canEnter('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
              if (this.canEnter('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (this.canEnter('owGlitches', false, true)) {
                availability.owGlitches = 'glitchavailable'
              } else if (this.canEnter('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (this.canEnter('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (this.canEnter('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (this.canEnter('majorGlitches', false, true)) {
                availability.majorGlitches = 'glitchavailable'
              } else if (this.canEnter('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (this.canEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
            }
            if (this.trackerData.items.firerod && this.trackerData.items.sword >= 1) {
              availability.inverted = 'available'
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (
                this.trackerData.items.moonpearl &&
                this.trackerData.items.firerod &&
                (this.trackerData.items.sword >= 1 || this.trackerData.dungeonthis.chests[5] === 2)
              ) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (this.canEnter('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (this.canEnter('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (
                this.trackerData.items.moonpearl &&
                this.trackerData.items.firerod &&
                (this.trackerData.items.sword >= 1 || this.trackerData.dungeonthis.chests[5] === 2)
              ) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (this.canEnter('owGlitches', false, true)) {
              if (
                this.trackerData.items.moonpearl &&
                this.trackerData.items.firerod &&
                (this.trackerData.items.sword >= 1 || this.trackerData.dungeonthis.chests[5] === 2)
              ) {
                availability.owGlitches = 'glitchavailable'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (this.canEnter('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (
                this.trackerData.items.moonpearl &&
                this.trackerData.items.firerod &&
                (this.trackerData.items.sword >= 1 || this.trackerData.dungeonthis.chests[5] === 2)
              ) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (
                this.trackerData.items.moonpearl &&
                this.trackerData.items.firerod &&
                (this.trackerData.items.sword >= 1 || this.trackerData.dungeonthis.chests[5] === 2)
              ) {
                availability.majorGlitches = 'glitchavailable'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.canEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (
              this.trackerData.items.firerod &&
              (this.trackerData.items.sword >= 1 || this.trackerData.dungeonthis.chests[5] === 2)
            ) {
              availability.inverted = 'available'
            } else {
              availability.inverted = 'possible'
            }

            return availability
          }
        },
        {
          name: "Thieves' Town",
          label: 'TT',
          x: '56.4%',
          y: '47.9%',
          image: 'boss62.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                Logic.glitchedLinkInDarkWorld() &&
                Logic.canEnterNorthWestDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches' || logic === 'glitchless') {
              return (
                this.trackerData.items.moonpearl &&
                Logic.canEnterNorthWestDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return true
            }
          },
          canHurtBoss () {
            return (
              this.trackerData.items.sword >= 1 ||
              this.trackerData.items.hammer ||
              this.trackerData.items.somaria ||
              this.trackerData.items.byrna
            )
          },
          isBeatable () {
            const availability = new Availability()
            if (this.canHurtBoss()) {
              if (this.canEnter('glitchless', false, false)) {
                availability.glitchless = 'available'
              } else if (this.canEnter('glitchless', true, false)) {
                availability.glitchless = 'agahnim'
              } else if (this.canEnter('glitchless', true, true)) {
                availability.glitchless = 'glitchagahnim'
              }
              if (this.canEnter('owGlitches', false, false)) {
                availability.owGlitches = 'available'
              } else if (this.canEnter('owGlitches', false, true)) {
                availability.owGlitches = 'glitchavailable'
              } else if (this.canEnter('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (this.canEnter('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (this.canEnter('majorGlitches', false, false)) {
                availability.majorGlitches = 'available'
              } else if (this.canEnter('majorGlitches', false, true)) {
                availability.majorGlitches = 'glitchavailable'
              } else if (this.canEnter('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (this.canEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
              availability.inverted = 'available'
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (
                this.trackerData.items.hammer ||
                this.trackerData.dungeonthis.chests[6] >= 3 ||
                (this.canHurtBoss() && this.trackerData.dungeonthis.chests[6] >= 2)
              ) {
                availability.glitchless = 'available'
              } else {
                availability.glitchless = 'possible'
              }
            } else if (this.canEnter('glitchless', true, false)) {
              availability.glitchless = 'agahnim'
            } else if (this.canEnter('glitchless', true, true)) {
              availability.glitchless = 'glitchagahnim'
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (
                this.trackerData.items.hammer ||
                this.trackerData.dungeonthis.chests[6] >= 3 ||
                (this.canHurtBoss() && this.trackerData.dungeonthis.chests[6] >= 2)
              ) {
                availability.owGlitches = 'available'
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (this.canEnter('owGlitches', false, true)) {
              if (
                this.trackerData.items.hammer ||
                this.trackerData.dungeonthis.chests[6] >= 3 ||
                (this.canHurtBoss() && this.trackerData.dungeonthis.chests[6] >= 2)
              ) {
                availability.owGlitches = 'glitchavailable'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (this.canEnter('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (
                this.trackerData.items.hammer ||
                this.trackerData.dungeonthis.chests[6] >= 3 ||
                (this.canHurtBoss() && this.trackerData.dungeonthis.chests[6] >= 2)
              ) {
                availability.majorGlitches = 'available'
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (
                this.trackerData.items.hammer ||
                this.trackerData.dungeonthis.chests[6] >= 3 ||
                (this.canHurtBoss() && this.trackerData.dungeonthis.chests[6] >= 2)
              ) {
                availability.majorGlitches = 'glitchavailable'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.canEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (
              this.trackerData.items.hammer ||
              this.trackerData.dungeonthis.chests[6] >= 3 ||
              (this.canHurtBoss() && this.trackerData.dungeonthis.chests[6] >= 2)
            ) {
              availability.inverted = 'available'
            } else {
              availability.inverted = 'possible'
            }
            return availability
          }
        },
        {
          name: 'Ice Palace',
          label: 'IP',
          x: '89.8%',
          y: '85.8%',
          image: 'boss72.png',
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                Logic.canLiftDarkRocks() ||
                (this.trackerData.items.mirror &&
                  Logic.glitchedLinkInDarkWorld() &&
                  Logic.canEnterSouthDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches))
              )
            } else if (logic === 'owGlitches') {
              return Logic.canLiftDarkRocks() && Logic.canMeltThings()
            } else if (logic === 'glitchless') {
              return (
                Logic.canLiftDarkRocks() &&
                Logic.canMeltThings() &&
                (allowOutOfLogicGlitches ||
                  (this.trackerData.items.moonpearl && this.trackerData.items.flippers))
              )
            } else if (logic === 'inverted') {
              return (
                Logic.canMeltThings() &&
                (this.trackerData.items.flippers ||
                  (allowOutOfLogicGlitches &&
                    Logic.canEnterNorthEastDarkWorld(
                      'inverted',
                      agahnimCheck,
                      allowOutOfLogicGlitches
                    )) ||
                  (allowOutOfLogicGlitches && this.trackerData.items.boots) ||
                  (allowOutOfLogicGlitches && Logic.canFly('inverted')))
              )
            }
          },
          isBeatable () {
            const availability = new Availability()
            if (Logic.canMeltThings() && Logic.canLiftRocks()) {
              if (this.canEnter('glitchless', false, false) && this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot && this.trackerData.items.somaria) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (this.canEnter('glitchless', false, true) && this.trackerData.items.hammer) {
                availability.glitchless = 'glitchavailable'
              }
              if (this.canEnter('owGlitches', false, false) && this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot && this.trackerData.items.somaria) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else if (this.canEnter('owGlitches', false, true)) {
                availability.owGlitches = 'glitchavailable'
              }
              if (this.canEnter('majorGlitches', false, false) && this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot && this.trackerData.items.somaria) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (this.canEnter('majorGlitches', false, true)) {
                availability.majorGlitches = 'glitchavailable'
              } else if (this.canEnter('majorGlitches', true, false) && this.trackerData.items.hammer) {
                availability.majorGlitches = 'agahnim'
              } else if (this.canEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
              if (this.canEnter('inverted', false, false) && this.trackerData.items.hammer) {
                if (this.trackerData.items.hookshot && this.trackerData.items.somaria) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (this.canEnter('inverted', false, true) && this.trackerData.items.hammer) {
                availability.inverted = 'glitchavailable'
              }
            }

            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (this.trackerData.items.hammer && Logic.canLiftRocks()) {
                if (this.trackerData.items.hookshot) {
                  availability.glitchless = 'available'
                } else if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                  if (this.trackerData.dungeonthis.chests[7] >= 2) {
                    availability.glitchless = 'available'
                  } else {
                    availability.glitchless = 'possible'
                  }
                } else {
                  availability.glitchless = 'possible'
                }
              } else {
                availability.glitchless = 'possible'
              }
            } else if (this.canEnter('glitchless', false, true)) {
              if (this.trackerData.items.hammer && Logic.canLiftRocks()) {
                if (this.trackerData.items.hookshot) {
                  availability.glitchless = 'glitchavailable'
                } else if (this.trackerData.dungeonthis.chests[7] >= 2) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              } else {
                availability.glitchless = 'glitchpossible'
              }
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (this.trackerData.items.hammer && Logic.canLiftRocks()) {
                if (this.trackerData.items.hookshot) {
                  availability.owGlitches = 'available'
                } else if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                  if (this.trackerData.dungeonthis.chests[7] >= 2) {
                    availability.owGlitches = 'available'
                  } else {
                    availability.owGlitches = 'possible'
                  }
                } else {
                  availability.owGlitches = 'possible'
                }
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (this.canEnter('owGlitches', false, true)) {
              if (this.trackerData.items.hammer && Logic.canLiftRocks()) {
                if (this.trackerData.items.hookshot) {
                  availability.owGlitches = 'glitchavailable'
                } else if (this.trackerData.dungeonthis.chests[7] >= 2) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (this.trackerData.items.hammer && Logic.canLiftRocks()) {
                if (this.trackerData.items.hookshot) {
                  availability.majorGlitches = 'available'
                } else if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                  if (this.trackerData.dungeonthis.chests[7] >= 2) {
                    availability.majorGlitches = 'available'
                  } else {
                    availability.majorGlitches = 'possible'
                  }
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (this.trackerData.items.hammer && Logic.canLiftRocks()) {
                if (this.trackerData.items.hookshot) {
                  availability.majorGlitches = 'glitchavailable'
                } else if (this.trackerData.dungeonthis.chests[7] >= 2) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            }
            if (this.canEnter('inverted', false, false)) {
              if (
                this.trackerData.items.hammer &&
                Logic.canLiftRocks() &&
                (this.trackerData.items.hookshot ||
                  ((this.trackerData.items.byrna || this.trackerData.items.cape) &&
                    this.trackerData.dungeonthis.chests[7] >= 2))
              ) {
                availability.inverted = 'available'
              } else {
                availability.inverted = 'possible'
              }
            } else if (this.canEnter('inverted', false, true)) {
              if (
                this.trackerData.items.hammer &&
                Logic.canLiftRocks() &&
                this.trackerData.items.hookshot
              ) {
                availability.inverted = 'glitchavailable'
              } else {
                availability.inverted = 'glitchpossible'
              }
            }
            return availability
          }
        },
        {
          name:
            "Misery Mire <img src='/images/medallion0.png' class='mini'><img src='/images/lantern.png' class='mini'>",
          label: 'MM',
          x: '55.8%',
          y: '82.9%',
          image: 'boss82.png',
          hasMedallion () {
            return (
              (this.trackerData.medallions[8] === 1 && this.trackerData.items.bombos) ||
              (this.trackerData.medallions[8] === 2 && this.trackerData.items.ether) ||
              (this.trackerData.medallions[8] === 3 && this.trackerData.items.quake) ||
              (this.trackerData.items.bombos &&
                this.trackerData.items.ether &&
                this.trackerData.items.quake)
            )
          },
          mayHaveMedallion () {
            return !(
              (this.trackerData.medallions[8] === 1 && !this.trackerData.items.bombos) ||
              (this.trackerData.medallions[8] === 2 && !this.trackerData.items.ether) ||
              (this.trackerData.medallions[8] === 3 && !this.trackerData.items.quake) ||
              (!this.trackerData.items.bombos &&
                !this.trackerData.items.ether &&
                !this.trackerData.items.quake)
            )
          },
          canEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'glitchless') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('glitchless', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('owGlitches', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'majorGlitches') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                (this.trackerData.items.moonpearl ||
                  (this.trackerData.items.bottle >= 1 && this.trackerData.items.boots)) &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('inverted', agahnimCheck, allowOutOfLogicGlitches)
              )
            }
          },
          mayEnter (logic, agahnimCheck, allowOutOfLogicGlitches) {
            if (logic === 'glitchless') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('glitchless', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('owGlitches', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'majorGlitches') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                (this.trackerData.items.moonpearl ||
                  (this.trackerData.items.bottle >= 1 && this.trackerData.items.boots)) &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                (this.trackerData.items.boots || this.trackerData.items.hookshot) &&
                Logic.canEnterMireArea('inverted', agahnimCheck, allowOutOfLogicGlitches)
              )
            }
          },
          canHurtBoss () {
            return (
              this.trackerData.items.sword >= 1 ||
              this.trackerData.items.hammer ||
              this.trackerData.items.bow
            )
          },
          isBeatable () {
            const availability = new Availability()
            if (this.trackerData.items.somaria && this.canHurtBoss()) {
              if (this.canEnter('glitchless', false, false) && this.trackerData.items.lantern) {
                if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (this.mayEnter('glitchless', false, false) && this.trackerData.items.lantern) {
                availability.glitchless = 'possible'
              } else if (this.canEnter('glitchless', false, true)) {
                if (
                  Logic.canLightTorches() &&
                  (this.trackerData.items.byrna || this.trackerData.items.cape)
                ) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              } else if (this.mayEnter('glitchless', false, true)) {
                availability.glitchless = 'glitchpossible'
              }
              if (this.canEnter('owGlitches', false, false) && this.trackerData.items.lantern) {
                if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else if (this.mayEnter('owGlitches', false, false) && this.trackerData.items.lantern) {
                availability.owGlitches = 'possible'
              } else if (this.canEnter('owGlitches', false, true)) {
                if (
                  Logic.canLightTorches() &&
                  (this.trackerData.items.byrna || this.trackerData.items.cape)
                ) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (this.mayEnter('owGlitches', false, true)) {
                availability.owGlitches = 'glitchpossible'
              } else if (this.mayEnter('owGlitches', true, false)) {
                availability.owGlitches = 'agahnim'
              } else if (this.mayEnter('owGlitches', true, true)) {
                availability.owGlitches = 'glitchagahnim'
              }
              if (this.canEnter('majorGlitches', false, false) && this.trackerData.items.lantern) {
                if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (
                this.mayEnter('majorGlitches', false, false) &&
                this.trackerData.items.lantern
              ) {
                availability.majorGlitches = 'possible'
              } else if (this.canEnter('majorGlitches', false, true)) {
                if (
                  Logic.canLightTorches() &&
                  (this.trackerData.items.byrna || this.trackerData.items.cape)
                ) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (this.mayEnter('majorGlitches', false, true)) {
                availability.majorGlitches = 'glitchpossible'
              } else if (this.mayEnter('majorGlitches', true, false)) {
                availability.majorGlitches = 'agahnim'
              } else if (this.mayEnter('majorGlitches', true, true)) {
                availability.majorGlitches = 'glitchagahnim'
              }
              if (this.canEnter('inverted', false, true)) {
                if (this.canEnter('inverted', false, false) && this.trackerData.items.lantern) {
                  if (this.trackerData.items.byrna || this.trackerData.items.cape) {
                    availability.inverted = 'available'
                  } else {
                    availability.inverted = 'possible'
                  }
                } else if (
                  Logic.canLightTorches() &&
                    (this.trackerData.items.byrna || this.trackerData.items.cape)
                ) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (this.mayEnter('inverted', false, true)) {
                if (this.mayEnter('inverted', false, false) && this.trackerData.items.lantern) {
                  availability.inverted = 'possible'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (this.mayEnter('inverted', true, false)) {
                availability.inverted = 'agahnim'
              } else if (this.mayEnter('inverted', true, true)) {
                availability.inverted = 'glitchagahnim'
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false, false)) {
              if (Logic.canLightTorches()) {
                if (
                  this.trackerData.dungeonthis.chests[8] === 2 &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    (this.trackerData.items.somaria && this.canHurtBoss()))
                ) {
                  availability.glitchless = 'available'
                } else if (
                  this.trackerData.dungeonthis.chests[8] === 1 &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna) &&
                  this.trackerData.items.somaria &&
                  this.canHurtBoss()
                ) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else {
                availability.glitchless = 'possible'
              }
            } else if (this.mayEnter('glitchless', false, false)) {
              availability.glitchless = 'possible'
            }
            if (this.canEnter('owGlitches', false, false)) {
              if (Logic.canLightTorches()) {
                if (
                  this.trackerData.dungeonthis.chests[8] === 2 &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    (this.trackerData.items.somaria &&
                      this.canHurtBoss() &&
                      this.trackerData.items.lantern))
                ) {
                  availability.owGlitches = 'available'
                } else if (
                  this.trackerData.dungeonthis.chests[8] === 1 &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna) &&
                  this.trackerData.items.somaria &&
                  this.canHurtBoss() &&
                  this.trackerData.items.lantern
                ) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else {
                availability.owGlitches = 'possible'
              }
            } else if (this.mayEnter('owGlitches', false, false)) {
              availability.owGlitches = 'possible'
            } else if (this.canEnter('owGlitches', false, true)) {
              if (Logic.canLightTorches()) {
                if (
                  this.trackerData.dungeonthis.chests[8] === 2 &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    (this.trackerData.items.somaria &&
                      this.canHurtBoss() &&
                      this.trackerData.items.lantern))
                ) {
                  availability.owGlitches = 'glitchavailable'
                } else if (
                  this.trackerData.dungeonthis.chests[8] === 1 &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna) &&
                  this.trackerData.items.somaria &&
                  this.canHurtBoss() &&
                  this.trackerData.items.lantern
                ) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('owGlitches', false, true)) {
              availability.owGlitches = 'glitchpossible'
            } else if (this.mayEnter('owGlitches', true, false)) {
              availability.owGlitches = 'agahnim'
            } else if (this.mayEnter('owGlitches', true, true)) {
              availability.owGlitches = 'glitchagahnim'
            }
            if (this.canEnter('majorGlitches', false, false)) {
              if (Logic.canLightTorches()) {
                if (
                  this.trackerData.dungeonthis.chests[8] === 2 &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    (this.trackerData.items.somaria &&
                      this.canHurtBoss() &&
                      this.trackerData.items.lantern))
                ) {
                  availability.majorGlitches = 'available'
                } else if (
                  this.trackerData.dungeonthis.chests[8] === 1 &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna) &&
                  this.trackerData.items.somaria &&
                  this.canHurtBoss() &&
                  this.trackerData.items.lantern
                ) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else {
                availability.majorGlitches = 'possible'
              }
            } else if (this.mayEnter('majorGlitches', false, false)) {
              availability.majorGlitches = 'possible'
            } else if (this.canEnter('majorGlitches', false, true)) {
              if (Logic.canLightTorches()) {
                if (
                  this.trackerData.dungeonthis.chests[8] === 2 &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    (this.trackerData.items.somaria &&
                      this.canHurtBoss() &&
                      this.trackerData.items.lantern))
                ) {
                  availability.majorGlitches = 'glitchavailable'
                } else if (
                  this.trackerData.dungeonthis.chests[8] === 1 &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna) &&
                  this.trackerData.items.somaria &&
                  this.canHurtBoss() &&
                  this.trackerData.items.lantern
                ) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('majorGlitches', false, true)) {
              availability.majorGlitches = 'glitchpossible'
            } else if (this.mayEnter('majorGlitches', true, false)) {
              availability.majorGlitches = 'agahnim'
            } else if (this.mayEnter('majorGlitches', true, true)) {
              availability.majorGlitches = 'glitchagahnim'
            }
            if (this.canEnter('inverted', false, false)) {
              if (Logic.canLightTorches()) {
                if (
                  this.trackerData.dungeonthis.chests[8] === 2 &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    (this.trackerData.items.somaria && this.canHurtBoss()))
                ) {
                  availability.inverted = 'available'
                } else if (
                  this.trackerData.dungeonthis.chests[8] === 1 &&
                  (this.trackerData.items.cape || this.trackerData.items.byrna) &&
                  this.trackerData.items.somaria &&
                  this.canHurtBoss()
                ) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else {
                availability.inverted = 'possible'
              }
            } else if (this.mayEnter('inverted', false, false)) {
              availability.inverted = 'possible'
            } else if (this.mayEnter('inverted', true, false)) {
              availability.inverted = 'agahnim'
            } else if (this.mayEnter('inverted', true, true)) {
              availability.inverted = 'glitchagahnim'
            }
            return availability
          }
        },
        {
          name:
            "Turtle Rock <img src='/images/medallion0.png' class='mini'><img src='/images/lantern.png' class='mini'>",
          label: 'TR',
          x: '96.9%',
          y: '7.0%',
          image: 'boss92.png',
          hasMedallion () {
            return (
              (this.trackerData.medallions[9] === 1 && this.trackerData.items.bombos) ||
              (this.trackerData.medallions[9] === 2 && this.trackerData.items.ether) ||
              (this.trackerData.medallions[9] === 3 && this.trackerData.items.quake) ||
              (this.trackerData.items.bombos &&
                this.trackerData.items.ether &&
                this.trackerData.items.quake)
            )
          },
          mayHaveMedallion () {
            return !(
              (this.trackerData.medallions[9] === 1 && !this.trackerData.items.bombos) ||
              (this.trackerData.medallions[9] === 2 && !this.trackerData.items.ether) ||
              (this.trackerData.medallions[9] === 3 && !this.trackerData.items.quake) ||
              (!this.trackerData.items.bombos &&
                !this.trackerData.items.ether &&
                !this.trackerData.items.quake)
            )
          },
          lower (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                logic === Logic.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) &&
                (this.trackerData.items.moonpearl ||
                  (this.trackerData.items.bottle >= 1 && this.trackerData.items.boots)) &&
                this.trackerData.items.mirror
              )
            } else if (logic === 'inverted') {
              return (
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches) &&
                this.trackerData.items.mirror
              )
            }
          },
          middle (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                (this.trackerData.items.mirror ||
                  (Logic.glitchedLinkInDarkWorld() && Logic.canSpinSpeed())) &&
                (this.trackerData.items.boots ||
                  this.trackerData.items.somaria ||
                  this.trackerData.items.hookshot) &&
                Logic.canEnterDarkWorldDeathMountain('majorGlitches', allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                (this.trackerData.items.mirror ||
                  (this.trackerData.items.moonpearl && Logic.canSpinSpeed())) &&
                (this.trackerData.items.boots ||
                  this.trackerData.items.somaria ||
                  this.trackerData.items.hookshot) &&
                Logic.canEnterDarkWorldDeathMountain('owGlitches', allowOutOfLogicGlitches)
              )
            } else if (logic === 'glitchless') {
              return false
            } else if (logic === 'inverted') {
              return (
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches) &&
                this.trackerData.items.mirror
              )
            }
          },
          upperCan (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                (this.trackerData.items.moonpearl ||
                  (this.trackerData.items.bottle >= 1 && this.trackerData.items.boots)) &&
                this.trackerData.items.somaria &&
                this.trackerData.items.hammer &&
                (Logic.canLiftDarkRocks() || this.trackerData.items.boots) &&
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                this.trackerData.items.somaria &&
                this.trackerData.items.hammer &&
                (Logic.canLiftDarkRocks() || this.trackerData.items.boots) &&
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'glitchless') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                this.trackerData.items.somaria &&
                this.trackerData.items.hammer &&
                Logic.canLiftDarkRocks() &&
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return (
                this.hasMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.somaria &&
                Logic.canEnterDarkWorldDeathMountain(logic, allowOutOfLogicGlitches)
              )
            }
          },
          upperMay (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                (this.trackerData.items.moonpearl ||
                  (this.trackerData.items.bottle >= 1 && this.trackerData.items.boots)) &&
                this.trackerData.items.somaria &&
                this.trackerData.items.hammer &&
                (Logic.canLiftDarkRocks() || this.trackerData.items.boots) &&
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                this.trackerData.items.somaria &&
                this.trackerData.items.hammer &&
                (Logic.canLiftDarkRocks() || this.trackerData.items.boots) &&
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'glitchless') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.moonpearl &&
                this.trackerData.items.somaria &&
                this.trackerData.items.hammer &&
                Logic.canLiftDarkRocks() &&
                Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              return (
                this.mayHaveMedallion() &&
                this.trackerData.items.sword >= 1 &&
                this.trackerData.items.somaria &&
                Logic.canEnterDarkWorldDeathMountain(logic, allowOutOfLogicGlitches)
              )
            }
          },
          canEnter (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.lower('majorGlitches', allowOutOfLogicGlitches) ||
                this.middle('majorGlitches', allowOutOfLogicGlitches) ||
                this.upperCan('majorGlitches', allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.middle('owGlitches', allowOutOfLogicGlitches) ||
                this.upperCan('owGlitches', allowOutOfLogicGlitches)
              )
            } else if (logic === 'glitchless') {
              return this.upperCan('glitchless', allowOutOfLogicGlitches)
            } else if (logic === 'inverted') {
              return (
                this.lower('inverted', allowOutOfLogicGlitches) ||
                this.middle('inverted', allowOutOfLogicGlitches) ||
                this.upperCan('inverted', allowOutOfLogicGlitches)
              )
            }
          },
          mayEnter (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return (
                this.lower('majorGlitches', allowOutOfLogicGlitches) ||
                this.middle('majorGlitches', allowOutOfLogicGlitches) ||
                this.upperMay('majorGlitches', allowOutOfLogicGlitches)
              )
            } else if (logic === 'owGlitches') {
              return (
                this.middle('owGlitches', allowOutOfLogicGlitches) ||
                this.upperMay('owGlitches', allowOutOfLogicGlitches)
              )
            } else if (logic === 'glitchless') {
              return this.upperMay('glitchless', allowOutOfLogicGlitches)
            } else if (logic === 'inverted') {
              return (
                this.lower('inverted', allowOutOfLogicGlitches) ||
                this.middle('inverted', allowOutOfLogicGlitches) ||
                this.upperMay('inverted', allowOutOfLogicGlitches)
              )
            }
          },
          isBeatable () {
            const availability = new Availability()
            if (
              this.trackerData.items.firerod &&
              this.trackerData.items.icerod &&
              this.trackerData.items.somaria
            ) {
              if (
                this.canEnter('glitchless', false) &&
                this.trackerData.items.lantern &&
                (this.trackerData.items.hammer || this.trackerData.items.sword >= 2)
              ) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (this.mayEnter('glitchless', false)) {
                availability.glitchless = 'possible'
              } else if (this.canEnter('glitchless', true)) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              } else if (this.mayEnter('glitchless', true)) {
                availability.glitchless = 'glitchpossible'
              }
              if (
                this.canEnter('owGlitches', false) &&
                this.trackerData.items.lantern &&
                (this.trackerData.items.hammer || this.trackerData.items.sword >= 2)
              ) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              } else if (this.mayEnter('owGlitches', false)) {
                availability.owGlitches = 'possible'
              } else if (this.canEnter('owGlitches', true)) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (this.mayEnter('owGlitches', true)) {
                availability.owGlitches = 'glitchpossible'
              }
              if (
                this.canEnter('majorGlitches', false) &&
                this.trackerData.items.lantern &&
                (this.trackerData.items.hammer || this.trackerData.items.sword >= 2)
              ) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (this.mayEnter('majorGlitches', false)) {
                availability.majorGlitches = 'possible'
              } else if (this.canEnter('majorGlitches', true)) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (this.mayEnter('majorGlitches', true)) {
                availability.majorGlitches = 'glitchpossible'
              }
              if (
                this.canEnter('inverted', false) &&
                this.trackerData.items.lantern &&
                (this.trackerData.items.hammer || this.trackerData.items.sword >= 2)
              ) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (this.mayEnter('inverted', false)) {
                availability.inverted = 'possible'
              } else if (this.canEnter('inverted', true)) {
                if (
                  this.trackerData.items.cape ||
                  this.trackerData.items.byrna ||
                  Logic.canBlockLasers()
                ) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (this.mayEnter('inverted', true)) {
                availability.inverted = 'glitchpossible'
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            if (this.canEnter('glitchless', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  if (
                    this.trackerData.dungeonthis.chests[9] >= 2 ||
                    this.isBeatable().glitchless === 'available'
                  ) {
                    availability.glitchless = 'available'
                  } else {
                    availability.glitchless = 'possible'
                  }
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.glitchless = 'possible'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.glitchless = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.glitchless = 'possible'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            } else if (this.mayEnter('glitchless', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  availability.glitchless = 'possible'
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.glitchless = 'possible'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.glitchless = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.glitchless = 'possible'
              } else {
                availability.glitchless = 'glitchpossible'
              }
            } else if (this.canEnter('glitchless', true)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.dungeonthis.chests[9] >= 2 ||
                  this.isBeatable().glitchless === 'available' ||
                  this.isBeatable().glitchless === 'glitchavailable'
                ) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              } else {
                availability.glitchless = 'glitchpossible'
              }
            } else if (this.mayEnter('glitchless', true)) {
              availability.glitchless = 'glitchpossible'
            }
            // TODO: Account for lower/middle entrances for owGlitches and majorGlitches chest counts.
            if (this.canEnter('owGlitches', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  if (
                    this.trackerData.dungeonthis.chests[9] >= 2 ||
                    this.isBeatable().glitchless === 'available'
                  ) {
                    availability.owGlitches = 'available'
                  } else {
                    availability.owGlitches = 'possible'
                  }
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.owGlitches = 'possible'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.owGlitches = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.owGlitches = 'possible'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('owGlitches', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  availability.owGlitches = 'possible'
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.owGlitches = 'possible'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.owGlitches = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.owGlitches = 'possible'
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('owGlitches', true)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.dungeonthis.chests[9] >= 2 ||
                  this.isBeatable().glitchless === 'available' ||
                  this.isBeatable().glitchless === 'glitchavailable'
                ) {
                  availability.owGlitches = 'glitchavailable'
                } else {
                  availability.owGlitches = 'glitchpossible'
                }
              } else {
                availability.owGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('owGlitches', true)) {
              availability.owGlitches = 'glitchpossible'
            }
            if (this.canEnter('majorGlitches', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  if (
                    this.trackerData.dungeonthis.chests[9] >= 2 ||
                    this.isBeatable().glitchless === 'available'
                  ) {
                    availability.majorGlitches = 'available'
                  } else {
                    availability.majorGlitches = 'possible'
                  }
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.majorGlitches = 'possible'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.majorGlitches = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.majorGlitches = 'possible'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('majorGlitches', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  availability.majorGlitches = 'possible'
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.majorGlitches = 'possible'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.majorGlitches = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.majorGlitches = 'possible'
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.canEnter('majorGlitches', true)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.dungeonthis.chests[9] >= 2 ||
                  this.isBeatable().glitchless === 'available' ||
                  this.isBeatable().glitchless === 'glitchavailable'
                ) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              } else {
                availability.majorGlitches = 'glitchpossible'
              }
            } else if (this.mayEnter('majorGlitches', true)) {
              availability.majorGlitches = 'glitchpossible'
            }
            if (this.canEnter('inverted', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  if (
                    this.trackerData.dungeonthis.chests[9] >= 2 ||
                    this.isBeatable().glitchless === 'available'
                  ) {
                    availability.inverted = 'available'
                  } else {
                    availability.inverted = 'possible'
                  }
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.inverted = 'possible'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.inverted = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.inverted = 'possible'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.mayEnter('inverted', false)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
                ) {
                  availability.inverted = 'possible'
                } else if (this.trackerData.dungeonthis.chests[9] >= 2) {
                  availability.inverted = 'possible'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else if (
                this.trackerData.items.lantern &&
                  (this.trackerData.items.cape ||
                    this.trackerData.items.byrna ||
                    Logic.canBlockLasers())
              ) {
                availability.inverted = 'possible'
              } else if (this.trackerData.dungeonthis.chests[9] >= 4) {
                availability.inverted = 'possible'
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.canEnter('inverted', true)) {
              if (this.trackerData.items.firerod) {
                if (
                  this.trackerData.dungeonthis.chests[9] >= 2 ||
                  this.isBeatable().glitchless === 'available' ||
                  this.isBeatable().glitchless === 'glitchavailable'
                ) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              } else {
                availability.inverted = 'glitchpossible'
              }
            } else if (this.mayEnter('inverted', true)) {
              availability.inverted = 'glitchpossible'
            }
            return availability
          }
        },
        {
          name: "Ganon's Tower",
          label: 'GT',
          x: '77.0%',
          y: '5.5%',
          image: 'boss102.png',
          canEnter (logic, allowOutOfLogicGlitches) {
            if (logic === 'majorGlitches') {
              return Logic.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches)
            } else if (logic === 'owGlitches') {
              return this.trackerData.items.boots && this.trackerData.items.moonpearl
            } else if (logic === 'glitchless') {
              let crystalCount = 0
              for (let k = 0; k < 10; k++) {
                if (
                  (this.trackerData.prizes[k] === 4 || this.trackerData.prizes[k] === 3) &&
                  this.trackerData.items['boss' + k] === 2
                ) {
                  crystalCount++
                  if (crystalCount === 7) {
                    break
                  }
                }
              }
              return (
                crystalCount === 7 &&
                this.trackerData.items.moonpearl &&
                Logic.canEnterDarkWorldDeathMountain(logic, allowOutOfLogicGlitches)
              )
            } else if (logic === 'inverted') {
              let crystalCount = 0
              for (let k = 0; k < 10; k++) {
                if (
                  (this.trackerData.prizes[k] === 4 || this.trackerData.prizes[k] === 3) &&
                  this.trackerData.items['boss' + k] === 2
                ) {
                  crystalCount++
                  if (crystalCount === 7) {
                    break
                  }
                }
              }
              return (
                crystalCount === 7 &&
                Logic.canEnterLightWorld('inverted', false, allowOutOfLogicGlitches)
              )
            }
          },
          isBeatable () {
            const availability = new Availability()
            if (
              this.trackerData.items.hookshot &&
              this.trackerData.items.bow &&
              Logic.canLightTorches() &&
              (this.trackerData.items.hammer || this.trackerData.items.sword >= 1)
            ) {
              if (this.canEnter('glitchless', false)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.glitchless = 'available'
                } else {
                  availability.glitchless = 'possible'
                }
              } else if (this.canEnter('glitchless', true)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.glitchless = 'glitchavailable'
                } else {
                  availability.glitchless = 'glitchpossible'
                }
              }
              if (this.canEnter('owGlitches', false)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.owGlitches = 'available'
                } else {
                  availability.owGlitches = 'possible'
                }
              }
              if (this.canEnter('majorGlitches', false)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.majorGlitches = 'available'
                } else {
                  availability.majorGlitches = 'possible'
                }
              } else if (this.canEnter('majorGlitches', true)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.majorGlitches = 'glitchavailable'
                } else {
                  availability.majorGlitches = 'glitchpossible'
                }
              }
              if (this.canEnter('inverted', false)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.inverted = 'available'
                } else {
                  availability.inverted = 'possible'
                }
              } else if (this.canEnter('inverted', true)) {
                if (
                  this.trackerData.items.boots &&
                  this.trackerData.items.hammer &&
                  this.trackerData.items.firerod &&
                  this.trackerData.items.somaria
                ) {
                  availability.inverted = 'glitchavailable'
                } else {
                  availability.inverted = 'glitchpossible'
                }
              }
            }
            return availability
          },
          canGetChest () {
            const availability = new Availability()
            let smallKeysNeeded = 0
            let bigKeyNeeded = 0
            let bigKeyGuaranteed = false
            // Hope Room x2
            let minAvailableChests = 2
            let maxAvailableChests = 2
            // Bob's Torch
            if (this.trackerData.items.boots) {
              minAvailableChests++
              maxAvailableChests++
            }
            // DMs Room x4 + Randomizer Room x4 + Firesnake Room
            if (this.trackerData.items.hammer && this.trackerData.items.hookshot) {
              minAvailableChests += 9
              maxAvailableChests += 9
              smallKeysNeeded = 4
            }
            // Map Chest
            if (
              this.trackerData.items.hammer &&
              (this.trackerData.items.boots || this.trackerData.items.hookshot)
            ) {
              minAvailableChests++
              maxAvailableChests++
            }
            // Bob's Chest + Big Key Room x3
            if (
              (this.trackerData.items.hammer && this.trackerData.items.hookshot) ||
              (this.trackerData.items.firerod && this.trackerData.items.somaria)
            ) {
              minAvailableChests += 4
              maxAvailableChests += 4
              smallKeysNeeded = Math.max(3, smallKeysNeeded)
            }
            // Tile Room
            if (this.trackerData.items.somaria) {
              minAvailableChests++
              maxAvailableChests++
            }
            // Compass Room x4
            if (this.trackerData.items.firerod && this.trackerData.items.somaria) {
              minAvailableChests += 4
              maxAvailableChests += 4
              smallKeysNeeded = Math.max(4, smallKeysNeeded)
            }
            // Big Chest
            if (
              this.trackerData.items.hammer &&
              this.trackerData.items.boots &&
              this.trackerData.items.hookshot &&
              this.trackerData.items.somaria &&
              this.trackerData.items.firerod
            ) {
              minAvailableChests++
              maxAvailableChests++
              bigKeyNeeded = 1
              bigKeyGuaranteed = true
            }
            // Mini Helmasaur Room x2 + Pre-Moldorm Chest
            if (this.trackerData.items.bow && Logic.canLightTorches()) {
              if (bigKeyGuaranteed) {
                minAvailableChests += 3
              }
              maxAvailableChests += 3
              smallKeysNeeded = Math.max(3, smallKeysNeeded)
              bigKeyNeeded = 1
            }
            // Moldorm Chest
            if (
              this.trackerData.items.hookshot &&
              this.trackerData.items.bow &&
              Logic.canLightTorches() &&
              (this.trackerData.items.hammer || this.trackerData.items.sword >= 1)
            ) {
              if (bigKeyGuaranteed) {
                minAvailableChests++
              }
              maxAvailableChests++
              smallKeysNeeded = Math.max(4, smallKeysNeeded)
              bigKeyNeeded = 1
            }
            const maxItemsAvailable = Math.min(20, maxAvailableChests - smallKeysNeeded - bigKeyNeeded)
            // 4 keys + big key + map + compass
            const minItemsAvailable = Math.max(0, minAvailableChests - 7)
            if (this.canEnter('glitchless', false)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.glitchless = 'available'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.glitchless = 'possible'
              }
            } else if (this.canEnter('glitchless', true)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.glitchless = 'glitchavailable'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.glitchless = 'glitchpossible'
              }
            }
            if (this.canEnter('owGlitches', false)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.owGlitches = 'available'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.owGlitches = 'possible'
              }
            }
            if (this.canEnter('majorGlitches', false)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.majorGlitches = 'available'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.majorGlitches = 'possible'
              }
            } else if (this.canEnter('majorGlitches', true)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.majorGlitches = 'glitchavailable'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.majorGlitches = 'glitchpossible'
              }
            }
            if (this.canEnter('inverted', false)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.inverted = 'available'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.inverted = 'possible'
              }
            } else if (this.canEnter('inverted', true)) {
              if (this.trackerData.dungeonthis.chests[10] > 20 - minItemsAvailable) {
                availability.inverted = 'glitchavailable'
              } else if (this.trackerData.dungeonthis.chests[10] > 20 - maxItemsAvailable) {
                availability.inverted = 'glitchpossible'
              }
            }
            return availability
          }
        }
      ]
    }
  },
  methods: {
    ...mapState(['isRoomLoaded', 'trackerData', 'settings'])
  }
}
