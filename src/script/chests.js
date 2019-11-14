import { Availability, Logic } from './logic.js'
import { store } from '../store/store.js'

// define dungeon chests
const dungeons = []

dungeons[0] = {
	name: 'Eastern Palace',
	label: 'EP',
	x: '46.8%',
	y: '38.8%',
	image: 'boss02.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		return logic !== 'inverted' || Logic.canEnterLightWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.bow) {
			if (store.state.trackerData.items.lantern) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'glitchavailable'
			}
			if (this.canEnter('inverted', false, true)) {
				if (store.state.trackerData.items.moonpearl && this.canEnter('inverted', false, false) && store.state.trackerData.items.lantern) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'glitchavailable'
				}
			} else if (this.canEnter('inverted', true, true)) {
				if (store.state.trackerData.items.moonpearl && this.canEnter('inverted', true, false) && store.state.trackerData.items.lantern) {
					availability.inverted = 'agahnim'
				} else {
					availability.inverted = 'glitchagahnim'
				}
			}
		}
		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.lantern) {
			if (store.state.trackerData.items.bow) {
				availability.glitchless = 'available'
			} else if (store.state.trackerData.dungeonchests[0] >= 2) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (store.state.trackerData.dungeonchests[0] === 3) {
			availability.glitchless = 'available'
		} else {
			availability.glitchless = 'possible'
		}
		if (this.canEnter('inverted', false, true)) {
			if (store.state.trackerData.items.moonpearl && this.canEnter('inverted', false, false) && store.state.trackerData.items.lantern) {
				if (store.state.trackerData.items.bow || store.state.trackerData.dungeonchests[0] >= 2) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else {
				if (store.state.trackerData.items.bow || store.state.trackerData.dungeonchests[0] >= 2) {
					availability.inverted = 'glitchavailable'
				} else {
					availability.inverted = 'glitchpossible'
				}
			}
		} else if (this.canEnter('inverted', true, true)) {
			if (store.state.trackerData.items.moonpearl && this.canEnter('inverted', true, false) && store.state.trackerData.items.lantern) {
				availability.inverted = 'agahnim'
			} else {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

dungeons[1] = {
	name: 'Desert Palace',
	label: 'DP',
	x: '3.8%',
	y: '78.4%',
	image: 'boss12.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return store.state.trackerData.items.book ||
                    store.state.trackerData.items.boots ||
                    (store.state.trackerData.items.mirror && Logic.canEnterMireArea('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'owGlitches') {
			return store.state.trackerData.items.book ||
                    store.state.trackerData.items.boots ||
                    (store.state.trackerData.items.mirror && Logic.canEnterMireArea('owGlitches', agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'glitchless') {
			return store.state.trackerData.items.book ||
                    (store.state.trackerData.items.mirror && Logic.canLiftDarkRocks() && Logic.canFly())
		} else if (logic === 'inverted') {
			return store.state.trackerData.items.book && Logic.canEnterLightWorld('inverted', agahnimCheck, allowOutOfLogicGlitches)
		}
	},
	canHurtBoss: function () {
		return store.state.trackerData.items.sword ||
                store.state.trackerData.items.hammer ||
                store.state.trackerData.items.bow ||
                store.state.trackerData.items.firerod ||
                store.state.trackerData.items.icerod ||
                store.state.trackerData.items.byrna ||
                store.state.trackerData.items.somaria
	},
	isBeatable: function () {
		const availability = new Availability()
		if (Logic.canLiftRocks() && Logic.canLightTorches()) {
			if (this.canEnter('glitchless', false, false)) {
				if (store.state.trackerData.items.boots) {
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
				if (store.state.trackerData.items.boots) {
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
				if (store.state.trackerData.items.boots) {
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
			if (this.canEnter('inverted', false, true) && store.state.trackerData.items.moonpearl) {
				if (this.canEnter('inverted', false, false) && this.canHurtBoss()) {
					if (store.state.trackerData.items.boots) {
						availability.inverted = 'available'
					} else {
						availability.inverted = 'possible'
					}
				} else {
					if (store.state.trackerData.items.boots) {
						availability.inverted = 'glitchavailable'
					} else {
						availability.inverted = 'glitchpossible'
					}
				}
			} else if (this.canEnter('inverted', true, true) && store.state.trackerData.items.moonpearl) {
				if (this.canEnter('inverted', true, false) && this.canHurtBoss()) {
					availability.inverted = 'agahnim'
				} else {
					availability.inverted = 'glitchagahnim'
				}
			}
		}
		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (store.state.trackerData.items.boots && (store.state.trackerData.dungeonchests[1] === 2 || (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		}
		if (this.canEnter('owGlitches', false, false)) {
			if (store.state.trackerData.items.boots && (store.state.trackerData.dungeonchests[1] === 2 || (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))) {
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
			if (store.state.trackerData.items.boots && (store.state.trackerData.dungeonchests[1] === 2 || (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))) {
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
			if (store.state.trackerData.items.moonpearl && this.canEnter('inverted', false, false)) {
				if (store.state.trackerData.items.boots && (store.state.trackerData.dungeonchests[1] === 2 || (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else {
				if (store.state.trackerData.items.boots && (store.state.trackerData.dungeonchests[1] === 2 || (this.canHurtBoss() && Logic.canLightTorches() && Logic.canLiftRocks()))) {
					availability.inverted = 'glitchavailable'
				} else {
					availability.inverted = 'glitchpossible'
				}
			}
		} else if (this.canEnter('inverted', true, true)) {
			if (store.state.trackerData.items.moonpearl && this.canEnter('inverted', true, false)) {
				availability.inverted = 'agahnim'
			} else {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

dungeons[2] = {
	name: 'Tower of Hera',
	label: 'ToH',
	x: '31.0%',
	y: '5.5%',
	image: 'boss22.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return store.state.trackerData.items.boots ||
                    (Logic.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) &&
                            (store.state.trackerData.items.mirror || (store.state.trackerData.items.hookshot && store.state.trackerData.items.hammer))) ||
                    // Enter from Misery Mire.
                    (dungeons[8].canEnter('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'owGlitches') {
			return store.state.trackerData.items.boots ||
                    (Logic.canEnterWestDeathMountain('owGlitches', allowOutOfLogicGlitches) &&
                            (store.state.trackerData.items.mirror || (store.state.trackerData.items.hookshot && store.state.trackerData.items.hammer)))
		} else if (logic === 'glitchless') {
			return Logic.canEnterWestDeathMountain('glitchless', allowOutOfLogicGlitches) &&
                    (store.state.trackerData.items.mirror || (store.state.trackerData.items.hookshot && store.state.trackerData.items.hammer))
		} else if (logic === 'inverted') {
			return Logic.canEnterEastDeathMountain('inverted', allowOutOfLogicGlitches) && store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl
		}
	},
	mayEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		return (logic === 'majorGlitches' && dungeons[8].mayEnter('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)) || this.canEnter(logic)
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer) {
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
				if (Logic.canLightTorches() || dungeons[8].canEnter('majorGlitches', false, false)) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (this.canEnter('majorGlitches', false, true)) {
				if (Logic.canLightTorches() || dungeons[8].canEnter('majorGlitches', false, true)) {
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
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (Logic.canLightTorches() && (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (this.canEnter('glitchless', false, true)) {
			if (Logic.canLightTorches() && (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.glitchless = 'glitchavailable'
			} else {
				availability.glitchless = 'glitchpossible'
			}
		}
		if (this.canEnter('owGlitches', false, false)) {
			if (Logic.canLightTorches() && (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (this.canEnter('owGlitches', false, true)) {
			if (Logic.canLightTorches() && (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.owGlitches = 'glitchavailable'
			} else {
				availability.owGlitches = 'glitchpossible'
			}
		}
		if (this.canEnter('majorGlitches', false, false)) {
			if ((Logic.canLightTorches() || dungeons[8].canEnter('majorGlitches', false, false)) &&
                    (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (this.canEnter('majorGlitches', false, true)) {
			if ((Logic.canLightTorches() || dungeons[8].canEnter('majorGlitches', false, false)) &&
                    (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
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
			if (Logic.canLightTorches() && (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'possible'
			}
		} else if (this.canEnter('inverted', false, true)) {
			if (Logic.canLightTorches() && (store.state.trackerData.dungeonchests[2] === 2 || store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer)) {
				availability.inverted = 'glitchavailable'
			} else {
				availability.inverted = 'glitchpossible'
			}
		}
		return availability
	}
}

dungeons[3] = {
	name: "Palace of Darkness <img src='/images/lantern.png' class='mini'>",
	label: 'PoD',
	x: '97.0%',
	y: '40.0%',
	image: 'boss32.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (Logic.glitchedLinkInDarkWorld() && Logic.canEnterNorthEastDarkWorld('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)) ||
                    (Logic.canEnterWestDeathMountain('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'glitchless' || logic === 'owGlitches') {
			return Logic.canEnterNorthEastDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches) && store.state.trackerData.items.moonpearl
		} else if (logic === 'inverted') {
			return Logic.canEnterNorthEastDarkWorld('inverted', agahnimCheck, allowOutOfLogicGlitches)
		}
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.hammer && store.state.trackerData.items.bow) {
			if (this.canEnter('glitchless', false, false) && store.state.trackerData.items.lantern) {
				availability.glitchless = 'available'
			} else if (this.canEnter('glitchless', false, true)) {
				availability.glitchless = 'glitchavailable'
			} else if (this.canEnter('glitchless', true, false) && store.state.trackerData.items.lantern) {
				availability.glitchless = 'agahnim'
			} else if (this.canEnter('glitchless', true, true)) {
				availability.glitchless = 'glitchedagahnim'
			}
			if (this.canEnter('owGlitches', false, false) && store.state.trackerData.items.lantern) {
				availability.owGlitches = 'available'
			} else if (this.canEnter('owGlitches', false, true)) {
				availability.owGlitches = 'glitchavailable'
			} else if (this.canEnter('owGlitches', true, false) && store.state.trackerData.items.lantern) {
				availability.owGlitches = 'agahnim'
			} else if (this.canEnter('owGlitches', true, true)) {
				availability.owGlitches = 'glitchedagahnim'
			}
			if (this.canEnter('majorGlitches', false, false) && store.state.trackerData.items.lantern) {
				availability.majorGlitches = 'available'
			} else if (this.canEnter('majorGlitches', false, true)) {
				availability.majorGlitches = 'glitchavailable'
			} else if (this.canEnter('majorGlitches', true, false) && store.state.trackerData.items.lantern) {
				availability.majorGlitches = 'agahnim'
			} else if (this.canEnter('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchedagahnim'
			}
			if (this.canEnter('inverted', false, false) && store.state.trackerData.items.lantern) {
				availability.inverted = 'available'
			} else if (this.canEnter('inverted', false, true)) {
				availability.inverted = 'glitchavailable'
			} else if (this.canEnter('inverted', true, false) && store.state.trackerData.items.lantern) {
				availability.inverted = 'agahnim'
			} else if (this.canEnter('inverted', true, true)) {
				availability.inverted = 'glitchedagahnim'
			}
		}
		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
				if (store.state.trackerData.items.lantern) {
					availability.glitchless = 'available'
				} else {
					availability.glitchless = 'possible'
				}
			} else if (store.state.trackerData.items.lantern) {
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
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
				if (store.state.trackerData.items.lantern) {
					availability.owGlitches = 'available'
				} else {
					availability.owGlitches = 'possible'
				}
			} else if (store.state.trackerData.items.lantern) {
				availability.owGlitches = 'possible'
			} else {
				availability.owGlitches = 'glitchpossible'
			}
		} else if (this.canEnter('owGlitches', false, true)) {
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
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
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
				if (store.state.trackerData.items.lantern) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (store.state.trackerData.items.lantern) {
				availability.majorGlitches = 'possible'
			} else {
				availability.majorGlitches = 'glitchpossible'
			}
		} else if (this.canEnter('majorGlitches', false, true)) {
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
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
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
				if (store.state.trackerData.items.lantern) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else if (store.state.trackerData.items.lantern) {
				availability.inverted = 'possible'
			} else {
				availability.inverted = 'glitchpossible'
			}
		} else if (this.canEnter('inverted', false, true)) {
			if (store.state.trackerData.items.bow && (store.state.trackerData.dungeonchests[3] >= 2 || store.state.trackerData.items.hammer)) {
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
}

dungeons[4] = {
	name: "Swamp Palace <img src='/images/mirror.png' class='mini'>",
	label: 'SP',
	x: '73.5%',
	y: '91.0%',
	image: 'boss42.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return dungeons[8].canEnter('majorGlitches', agahnimCheck, allowOutOfLogicGlitches) ||
                    (store.state.trackerData.items.moonpearl &&
                            store.state.trackerData.items.mirror &&
                            store.state.trackerData.items.flippers &&
                            Logic.canEnterSouthDarkWorld('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'glitchless' || logic === 'owGlitches') {
			return (store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.mirror &&
                    store.state.trackerData.items.flippers &&
                    Logic.canEnterSouthDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'inverted') {
			return store.state.trackerData.items.mirror && store.state.trackerData.items.flippers &&
                    Logic.canEnterLightWorld('inverted', agahnimCheck, allowOutOfLogicGlitches) &&
                    (store.state.trackerData.items.moonpearl || allowOutOfLogicGlitches)
		}
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.hammer && store.state.trackerData.items.hookshot) {
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
		if (store.state.trackerData.items.hookshot &&
                store.state.trackerData.items.flippers &&
                (store.state.trackerData.items.sword >= 1 ||
                        store.state.trackerData.items.hammer ||
                        ((store.state.trackerData.items.bow || Logic.canExtendMagic()) &&
                                (store.state.trackerData.items.firerod || store.state.trackerData.items.icerod)))) {
			if ((this.canEnter('majorGlitches', false, false)) &&
                    (store.state.trackerData.items.hammer || dungeons[8].canEnter('majorGlitches', false, false))) {
				availability.majorGlitches = 'available'
			} else if ((this.canEnter('majorGlitches', false, true)) &&
                    (store.state.trackerData.items.hammer || dungeons[8].canEnter('majorGlitches', false, true))) {
				availability.majorGlitches = 'glitchavailable'
			} else if ((this.canEnter('majorGlitches', true, false)) &&
                    (store.state.trackerData.items.hammer || dungeons[8].canEnter('majorGlitches', true, false))) {
				availability.majorGlitches = 'agahnim'
			} else if ((this.canEnter('majorGlitches', true, true)) &&
                    (store.state.trackerData.items.hammer || dungeons[8].canEnter('majorGlitches', true, true))) {
				availability.majorGlitches = 'glitchedagahnim'
			}
		}
		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot || store.state.trackerData.dungeonchests[4] >= 5) {
					availability.glitchless = 'available'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.glitchless = 'possible'
				}
			} else if (store.state.trackerData.dungeonchests[4] === 6) {
				availability.glitchless = 'possible'
			}
		} else if (this.canEnter('glitchless', true, false)) {
			availability.glitchless = 'agahnim'
		} else if (this.canEnter('glitchless', true, true)) {
			availability.glitchless = 'glitchagahnim'
		}
		if (this.canEnter('owGlitches', false, false)) {
			if (store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot || store.state.trackerData.dungeonchests[4] >= 5) {
					availability.owGlitches = 'available'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.owGlitches = 'possible'
				}
			} else if (store.state.trackerData.dungeonchests[4] === 6) {
				availability.owGlitches = 'possible'
			}
		} else if (this.canEnter('owGlitches', false, true)) {
			if (store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot || store.state.trackerData.dungeonchests[4] >= 5) {
					availability.owGlitches = 'glitchavailable'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.owGlitches = 'glitchpossible'
				}
			} else if (store.state.trackerData.dungeonchests[4] === 6) {
				availability.owGlitches = 'glitchpossible'
			}
		} else if (this.canEnter('owGlitches', true, false)) {
			availability.owGlitches = 'agahnim'
		} else if (this.canEnter('owGlitches', true, true)) {
			availability.owGlitches = 'glitchagahnim'
		}
		if (this.canEnter('majorGlitches', false, false)) {
			if (store.state.trackerData.items.flippers &&
                    (store.state.trackerData.items.hammer || dungeons[8].canEnter('majorGlitches', false, false))) {
				if (store.state.trackerData.items.hookshot) {
					availability.majorGlitches = 'available'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.majorGlitches = 'possible'
				}
			} else if (store.state.trackerData.dungeonchests[4] >= 5) {
				availability.majorGlitches = 'possible'
			}
		} else if (this.canEnter('majorGlitches', false, true)) {
			if (store.state.trackerData.items.flippers &&
                    (store.state.trackerData.items.hammer || dungeons[8].canEnter('majorGlitches', false, false))) {
				if (store.state.trackerData.items.hookshot) {
					availability.majorGlitches = 'glitchavailable'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.majorGlitches = 'glitchpossible'
				}
			} else if (store.state.trackerData.dungeonchests[4] >= 5) {
				availability.majorGlitches = 'glitchpossible'
			}
		} else if (this.canEnter('majorGlitches', true, false)) {
			availability.majorGlitches = 'agahnim'
		} else if (this.canEnter('majorGlitches', true, true)) {
			availability.majorGlitches = 'glitchagahnim'
		}
		if (this.canEnter('inverted', false, false)) {
			if (store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot || store.state.trackerData.dungeonchests[4] >= 5) {
					availability.inverted = 'available'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.inverted = 'possible'
				}
			} else if (store.state.trackerData.dungeonchests[4] === 6) {
				availability.inverted = 'possible'
			}
		} else if (this.canEnter('inverted', false, true)) {
			if (store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot || store.state.trackerData.dungeonchests[4] >= 5) {
					availability.inverted = 'glitchavailable'
				} else if (store.state.trackerData.dungeonchests[4] >= 3) {
					availability.inverted = 'glitchpossible'
				}
			} else if (store.state.trackerData.dungeonchests[4] === 6) {
				availability.inverted = 'glitchpossible'
			}
		} else if (this.canEnter('inverted', true, false)) {
			availability.inverted = 'agahnim'
		} else if (this.canEnter('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

dungeons[5] = {
	name: 'Skull Woods',
	label: 'SW',
	x: '53.3%',
	y: '5.4%',
	image: 'boss52.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches' || logic === 'owGlitches') {
			return Logic.canEnterNorthWestDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'glitchless') {
			return store.state.trackerData.items.moonpearl &&
                    Logic.canEnterNorthWestDarkWorld('glitchless', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return true
		}
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.moonpearl && store.state.trackerData.items.firerod && store.state.trackerData.items.sword >= 1) {
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
		if (store.state.trackerData.items.firerod && store.state.trackerData.items.sword >= 1) {
			availability.inverted = 'available'
		}
		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.firerod &&
                    (store.state.trackerData.items.sword >= 1 || store.state.trackerData.dungeonchests[5] === 2)) {
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
			if (store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.firerod &&
                    (store.state.trackerData.items.sword >= 1 || store.state.trackerData.dungeonchests[5] === 2)) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (this.canEnter('owGlitches', false, true)) {
			if (store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.firerod &&
                    (store.state.trackerData.items.sword >= 1 || store.state.trackerData.dungeonchests[5] === 2)) {
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
			if (store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.firerod &&
                    (store.state.trackerData.items.sword >= 1 || store.state.trackerData.dungeonchests[5] === 2)) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (this.canEnter('majorGlitches', false, true)) {
			if (store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.firerod &&
                    (store.state.trackerData.items.sword >= 1 || store.state.trackerData.dungeonchests[5] === 2)) {
				availability.majorGlitches = 'glitchavailable'
			} else {
				availability.majorGlitches = 'glitchpossible'
			}
		} else if (this.canEnter('majorGlitches', true, false)) {
			availability.majorGlitches = 'agahnim'
		} else if (this.canEnter('majorGlitches', true, true)) {
			availability.majorGlitches = 'glitchagahnim'
		}
		if (store.state.trackerData.items.firerod && (store.state.trackerData.items.sword >= 1 || store.state.trackerData.dungeonchests[5] === 2)) {
			availability.inverted = 'available'
		} else {
			availability.inverted = 'possible'
		}

		return availability
	}
}

dungeons[6] = {
	name: "Thieves' Town",
	label: 'TT',
	x: '56.4%',
	y: '47.9%',
	image: 'boss62.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return Logic.glitchedLinkInDarkWorld() && Logic.canEnterNorthWestDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches' || logic === 'glitchless') {
			return store.state.trackerData.items.moonpearl && Logic.canEnterNorthWestDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return true
		}
	},
	canHurtBoss: function () {
		return store.state.trackerData.items.sword >= 1 ||
                store.state.trackerData.items.hammer ||
                store.state.trackerData.items.somaria ||
                store.state.trackerData.items.byrna
	},
	isBeatable: function () {
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
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (store.state.trackerData.items.hammer ||
                    store.state.trackerData.dungeonchests[6] >= 3 ||
                    (this.canHurtBoss() && store.state.trackerData.dungeonchests[6] >= 2)) {
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
			if (store.state.trackerData.items.hammer ||
                    store.state.trackerData.dungeonchests[6] >= 3 ||
                    (this.canHurtBoss() && store.state.trackerData.dungeonchests[6] >= 2)) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (this.canEnter('owGlitches', false, true)) {
			if (store.state.trackerData.items.hammer ||
                    store.state.trackerData.dungeonchests[6] >= 3 ||
                    (this.canHurtBoss() && store.state.trackerData.dungeonchests[6] >= 2)) {
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
			if (store.state.trackerData.items.hammer ||
                    store.state.trackerData.dungeonchests[6] >= 3 ||
                    (this.canHurtBoss() && store.state.trackerData.dungeonchests[6] >= 2)) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (this.canEnter('majorGlitches', false, true)) {
			if (store.state.trackerData.items.hammer ||
                    store.state.trackerData.dungeonchests[6] >= 3 ||
                    (this.canHurtBoss() && store.state.trackerData.dungeonchests[6] >= 2)) {
				availability.majorGlitches = 'glitchavailable'
			} else {
				availability.majorGlitches = 'glitchpossible'
			}
		} else if (this.canEnter('majorGlitches', true, false)) {
			availability.majorGlitches = 'agahnim'
		} else if (this.canEnter('majorGlitches', true, true)) {
			availability.majorGlitches = 'glitchagahnim'
		}
		if (store.state.trackerData.items.hammer ||
                store.state.trackerData.dungeonchests[6] >= 3 ||
                (this.canHurtBoss() && store.state.trackerData.dungeonchests[6] >= 2)) {
			availability.inverted = 'available'
		} else {
			availability.inverted = 'possible'
		}
		return availability
	}
}

dungeons[7] = {
	name: 'Ice Palace',
	label: 'IP',
	x: '89.8%',
	y: '85.8%',
	image: 'boss72.png',
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return Logic.canLiftDarkRocks() ||
                    (store.state.trackerData.items.mirror && Logic.glitchedLinkInDarkWorld() && Logic.canEnterSouthDarkWorld(logic, agahnimCheck, allowOutOfLogicGlitches))
		} else if (logic === 'owGlitches') {
			return Logic.canLiftDarkRocks() && Logic.canMeltThings()
		} else if (logic === 'glitchless') {
			return Logic.canLiftDarkRocks() &&
                    Logic.canMeltThings() &&
                    (allowOutOfLogicGlitches || (store.state.trackerData.items.moonpearl && store.state.trackerData.items.flippers))
		} else if (logic === 'inverted') {
			return Logic.canMeltThings() &&
                    (store.state.trackerData.items.flippers ||
                        (allowOutOfLogicGlitches && Logic.canEnterNorthEastDarkWorld('inverted', agahnimCheck, allowOutOfLogicGlitches)) ||
                        (allowOutOfLogicGlitches && store.state.trackerData.items.boots) ||
                        (allowOutOfLogicGlitches && Logic.canFly('inverted')))
		}
	},
	isBeatable: function () {
		const availability = new Availability()
		if (Logic.canMeltThings() && Logic.canLiftRocks()) {
			if (this.canEnter('glitchless', false, false) && store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot && store.state.trackerData.items.somaria) {
					availability.glitchless = 'available'
				} else {
					availability.glitchless = 'possible'
				}
			} else if (this.canEnter('glitchless', false, true) && store.state.trackerData.items.hammer) {
				availability.glitchless = 'glitchavailable'
			}
			if (this.canEnter('owGlitches', false, false) && store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot && store.state.trackerData.items.somaria) {
					availability.owGlitches = 'available'
				} else {
					availability.owGlitches = 'possible'
				}
			} else if (this.canEnter('owGlitches', false, true)) {
				availability.owGlitches = 'glitchavailable'
			}
			if (this.canEnter('majorGlitches', false, false) && store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot && store.state.trackerData.items.somaria) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (this.canEnter('majorGlitches', false, true)) {
				availability.majorGlitches = 'glitchavailable'
			} else if (this.canEnter('majorGlitches', true, false) && store.state.trackerData.items.hammer) {
				availability.majorGlitches = 'agahnim'
			} else if (this.canEnter('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchagahnim'
			}
			if (this.canEnter('inverted', false, false) && store.state.trackerData.items.hammer) {
				if (store.state.trackerData.items.hookshot && store.state.trackerData.items.somaria) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else if (this.canEnter('inverted', false, true) && store.state.trackerData.items.hammer) {
				availability.inverted = 'glitchavailable'
			}
		}

		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks()) {
				if (store.state.trackerData.items.hookshot) {
					availability.glitchless = 'available'
				} else if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
					if (store.state.trackerData.dungeonchests[7] >= 2) {
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
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks()) {
				if (store.state.trackerData.items.hookshot) {
					availability.glitchless = 'glitchavailable'
				} else {
					if (store.state.trackerData.dungeonchests[7] >= 2) {
						availability.glitchless = 'glitchavailable'
					} else {
						availability.glitchless = 'glitchpossible'
					}
				}
			} else {
				availability.glitchless = 'glitchpossible'
			}
		}
		if (this.canEnter('owGlitches', false, false)) {
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks()) {
				if (store.state.trackerData.items.hookshot) {
					availability.owGlitches = 'available'
				} else if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
					if (store.state.trackerData.dungeonchests[7] >= 2) {
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
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks()) {
				if (store.state.trackerData.items.hookshot) {
					availability.owGlitches = 'glitchavailable'
				} else {
					if (store.state.trackerData.dungeonchests[7] >= 2) {
						availability.owGlitches = 'glitchavailable'
					} else {
						availability.owGlitches = 'glitchpossible'
					}
				}
			} else {
				availability.owGlitches = 'glitchpossible'
			}
		}
		if (this.canEnter('majorGlitches', false, false)) {
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks()) {
				if (store.state.trackerData.items.hookshot) {
					availability.majorGlitches = 'available'
				} else if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
					if (store.state.trackerData.dungeonchests[7] >= 2) {
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
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks()) {
				if (store.state.trackerData.items.hookshot) {
					availability.majorGlitches = 'glitchavailable'
				} else {
					if (store.state.trackerData.dungeonchests[7] >= 2) {
						availability.majorGlitches = 'glitchavailable'
					} else {
						availability.majorGlitches = 'glitchpossible'
					}
				}
			} else {
				availability.majorGlitches = 'glitchpossible'
			}
		}
		if (this.canEnter('inverted', false, false)) {
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks() &&
                    (store.state.trackerData.items.hookshot ||
                        ((store.state.trackerData.items.byrna || store.state.trackerData.items.cape) && store.state.trackerData.dungeonchests[7] >= 2))) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'possible'
			}
		} else if (this.canEnter('inverted', false, true)) {
			if (store.state.trackerData.items.hammer && Logic.canLiftRocks() && store.state.trackerData.items.hookshot) {
				availability.inverted = 'glitchavailable'
			} else {
				availability.inverted = 'glitchpossible'
			}
		}
		return availability
	}
}

dungeons[8] = {
	name: "Misery Mire <img src='/images/medallion0.png' class='mini'><img src='/images/lantern.png' class='mini'>",
	label: 'MM',
	x: '55.8%',
	y: '82.9%',
	image: 'boss82.png',
	hasMedallion: function () {
		return (store.state.trackerData.medallions[8] === 1 && store.state.trackerData.items.bombos) ||
                (store.state.trackerData.medallions[8] === 2 && store.state.trackerData.items.ether) ||
                (store.state.trackerData.medallions[8] === 3 && store.state.trackerData.items.quake) ||
                (store.state.trackerData.items.bombos && store.state.trackerData.items.ether && store.state.trackerData.items.quake)
	},
	mayHaveMedallion: function () {
		return !((store.state.trackerData.medallions[8] === 1 && !store.state.trackerData.items.bombos) ||
                (store.state.trackerData.medallions[8] === 2 && !store.state.trackerData.items.ether) ||
                (store.state.trackerData.medallions[8] === 3 && !store.state.trackerData.items.quake) ||
                (!store.state.trackerData.items.bombos && !store.state.trackerData.items.ether && !store.state.trackerData.items.quake))
	},
	canEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'glitchless') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('glitchless', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('owGlitches', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'majorGlitches') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    (store.state.trackerData.items.moonpearl || (store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots)) &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('inverted', agahnimCheck, allowOutOfLogicGlitches)
		}
	},
	mayEnter: function (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'glitchless') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('glitchless', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('owGlitches', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'majorGlitches') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    (store.state.trackerData.items.moonpearl || (store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots)) &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('majorGlitches', agahnimCheck, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterMireArea('inverted', agahnimCheck, allowOutOfLogicGlitches)
		}
	},
	canHurtBoss: function () {
		return store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hammer || store.state.trackerData.items.bow
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.somaria && this.canHurtBoss()) {
			if (this.canEnter('glitchless', false, false) && store.state.trackerData.items.lantern) {
				if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
					availability.glitchless = 'available'
				} else {
					availability.glitchless = 'possible'
				}
			} else if (this.mayEnter('glitchless', false, false) && store.state.trackerData.items.lantern) {
				availability.glitchless = 'possible'
			} else if (this.canEnter('glitchless', false, true)) {
				if (Logic.canLightTorches() && (store.state.trackerData.items.byrna || store.state.trackerData.items.cape)) {
					availability.glitchless = 'glitchavailable'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			} else if (this.mayEnter('glitchless', false, true)) {
				availability.glitchless = 'glitchpossible'
			}
			if (this.canEnter('owGlitches', false, false) && store.state.trackerData.items.lantern) {
				if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
					availability.owGlitches = 'available'
				} else {
					availability.owGlitches = 'possible'
				}
			} else if (this.mayEnter('owGlitches', false, false) && store.state.trackerData.items.lantern) {
				availability.owGlitches = 'possible'
			} else if (this.canEnter('owGlitches', false, true)) {
				if (Logic.canLightTorches() && (store.state.trackerData.items.byrna || store.state.trackerData.items.cape)) {
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
			if (this.canEnter('majorGlitches', false, false) && store.state.trackerData.items.lantern) {
				if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (this.mayEnter('majorGlitches', false, false) && store.state.trackerData.items.lantern) {
				availability.majorGlitches = 'possible'
			} else if (this.canEnter('majorGlitches', false, true)) {
				if (Logic.canLightTorches() && (store.state.trackerData.items.byrna || store.state.trackerData.items.cape)) {
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
				if (this.canEnter('inverted', false, false) && store.state.trackerData.items.lantern) {
					if (store.state.trackerData.items.byrna || store.state.trackerData.items.cape) {
						availability.inverted = 'available'
					} else {
						availability.inverted = 'possible'
					}
				} else {
					if (Logic.canLightTorches() && (store.state.trackerData.items.byrna || store.state.trackerData.items.cape)) {
						availability.inverted = 'glitchavailable'
					} else {
						availability.inverted = 'glitchpossible'
					}
				}
			} else if (this.mayEnter('inverted', false, true)) {
				if (this.mayEnter('inverted', false, false) && store.state.trackerData.items.lantern) {
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
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false, false)) {
			if (Logic.canLightTorches()) {
				if (store.state.trackerData.dungeonchests[8] === 2 &&
                        (store.state.trackerData.items.cape ||
                                store.state.trackerData.items.byrna ||
                                (store.state.trackerData.items.somaria && this.canHurtBoss()))) {
					availability.glitchless = 'available'
				} else if (store.state.trackerData.dungeonchests[8] === 1 &&
                        (store.state.trackerData.items.cape || store.state.trackerData.items.byrna) &&
                        store.state.trackerData.items.somaria &&
                        this.canHurtBoss()) {
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
				if (store.state.trackerData.dungeonchests[8] === 2 &&
                        (store.state.trackerData.items.cape ||
                                store.state.trackerData.items.byrna ||
                                (store.state.trackerData.items.somaria && this.canHurtBoss() && store.state.trackerData.items.lantern))) {
					availability.owGlitches = 'available'
				} else if (store.state.trackerData.dungeonchests[8] === 1 &&
                        (store.state.trackerData.items.cape || store.state.trackerData.items.byrna) &&
                        store.state.trackerData.items.somaria &&
                        this.canHurtBoss() &&
                        store.state.trackerData.items.lantern) {
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
				if (store.state.trackerData.dungeonchests[8] === 2 &&
                        (store.state.trackerData.items.cape ||
                                store.state.trackerData.items.byrna ||
                                (store.state.trackerData.items.somaria && this.canHurtBoss() && store.state.trackerData.items.lantern))) {
					availability.owGlitches = 'glitchavailable'
				} else if (store.state.trackerData.dungeonchests[8] === 1 &&
                        (store.state.trackerData.items.cape || store.state.trackerData.items.byrna) &&
                        store.state.trackerData.items.somaria &&
                        this.canHurtBoss() &&
                        store.state.trackerData.items.lantern) {
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
				if (store.state.trackerData.dungeonchests[8] === 2 &&
                        (store.state.trackerData.items.cape ||
                                store.state.trackerData.items.byrna ||
                                (store.state.trackerData.items.somaria && this.canHurtBoss() && store.state.trackerData.items.lantern))) {
					availability.majorGlitches = 'available'
				} else if (store.state.trackerData.dungeonchests[8] === 1 &&
                        (store.state.trackerData.items.cape || store.state.trackerData.items.byrna) &&
                        store.state.trackerData.items.somaria &&
                        this.canHurtBoss() &&
                        store.state.trackerData.items.lantern) {
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
				if (store.state.trackerData.dungeonchests[8] === 2 &&
                        (store.state.trackerData.items.cape ||
                                store.state.trackerData.items.byrna ||
                                (store.state.trackerData.items.somaria && this.canHurtBoss() && store.state.trackerData.items.lantern))) {
					availability.majorGlitches = 'glitchavailable'
				} else if (store.state.trackerData.dungeonchests[8] === 1 &&
                        (store.state.trackerData.items.cape || store.state.trackerData.items.byrna) &&
                        store.state.trackerData.items.somaria &&
                        this.canHurtBoss() &&
                        store.state.trackerData.items.lantern) {
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
				if (store.state.trackerData.dungeonchests[8] === 2 &&
                        (store.state.trackerData.items.cape ||
                                store.state.trackerData.items.byrna ||
                                (store.state.trackerData.items.somaria && this.canHurtBoss()))) {
					availability.inverted = 'available'
				} else if (store.state.trackerData.dungeonchests[8] === 1 &&
                        (store.state.trackerData.items.cape || store.state.trackerData.items.byrna) &&
                        store.state.trackerData.items.somaria &&
                        this.canHurtBoss()) {
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
}

dungeons[9] = {
	name: "Turtle Rock <img src='/images/medallion0.png' class='mini'><img src='/images/lantern.png' class='mini'>",
	label: 'TR',
	x: '96.9%',
	y: '7.0%',
	image: 'boss92.png',
	hasMedallion: function () {
		return (store.state.trackerData.medallions[9] === 1 && store.state.trackerData.items.bombos) ||
                (store.state.trackerData.medallions[9] === 2 && store.state.trackerData.items.ether) ||
                (store.state.trackerData.medallions[9] === 3 && store.state.trackerData.items.quake) ||
                (store.state.trackerData.items.bombos && store.state.trackerData.items.ether && store.state.trackerData.items.quake)
	},
	mayHaveMedallion: function () {
		return !((store.state.trackerData.medallions[9] === 1 && !store.state.trackerData.items.bombos) ||
                (store.state.trackerData.medallions[9] === 2 && !store.state.trackerData.items.ether) ||
                (store.state.trackerData.medallions[9] === 3 && !store.state.trackerData.items.quake) ||
                (!store.state.trackerData.items.bombos && !store.state.trackerData.items.ether && !store.state.trackerData.items.quake))
	},
	lower: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return logic === Logic.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) &&
                    (store.state.trackerData.items.moonpearl || (store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots)) &&
                    store.state.trackerData.items.mirror
		} else if (logic === 'inverted') {
			return Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches) && store.state.trackerData.items.mirror
		}
	},
	middle: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (store.state.trackerData.items.mirror || (Logic.glitchedLinkInDarkWorld() && Logic.canSpinSpeed())) &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.somaria || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterDarkWorldDeathMountain('majorGlitches', allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return (store.state.trackerData.items.mirror || (store.state.trackerData.items.moonpearl && Logic.canSpinSpeed())) &&
                    (store.state.trackerData.items.boots || store.state.trackerData.items.somaria || store.state.trackerData.items.hookshot) &&
                    Logic.canEnterDarkWorldDeathMountain('owGlitches', allowOutOfLogicGlitches)
		} else if (logic === 'glitchless') {
			return false
		} else if (logic === 'inverted') {
			return Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches) && store.state.trackerData.items.mirror
		}
	},
	upperCan: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    (store.state.trackerData.items.moonpearl || (store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots)) &&
                    store.state.trackerData.items.somaria &&
                    store.state.trackerData.items.hammer &&
                    (Logic.canLiftDarkRocks() || store.state.trackerData.items.boots) &&
                    Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.somaria &&
                    store.state.trackerData.items.hammer &&
                    (Logic.canLiftDarkRocks() || store.state.trackerData.items.boots) &&
                    Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'glitchless') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.somaria &&
                    store.state.trackerData.items.hammer &&
                    Logic.canLiftDarkRocks() &&
                    Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return this.hasMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.somaria &&
                    Logic.canEnterDarkWorldDeathMountain(logic, allowOutOfLogicGlitches)
		}
	},
	upperMay: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    (store.state.trackerData.items.moonpearl || (store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots)) &&
                    store.state.trackerData.items.somaria &&
                    store.state.trackerData.items.hammer &&
                    (Logic.canLiftDarkRocks() || store.state.trackerData.items.boots) &&
                    Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.somaria &&
                    store.state.trackerData.items.hammer &&
                    (Logic.canLiftDarkRocks() || store.state.trackerData.items.boots) &&
                    Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'glitchless') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.moonpearl &&
                    store.state.trackerData.items.somaria &&
                    store.state.trackerData.items.hammer &&
                    Logic.canLiftDarkRocks() &&
                    Logic.canEnterEastDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return this.mayHaveMedallion() &&
                    store.state.trackerData.items.sword >= 1 &&
                    store.state.trackerData.items.somaria &&
                    Logic.canEnterDarkWorldDeathMountain(logic, allowOutOfLogicGlitches)
		}
	},
	canEnter: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return this.lower('majorGlitches', allowOutOfLogicGlitches) || this.middle('majorGlitches', allowOutOfLogicGlitches) || this.upperCan('majorGlitches', allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return this.middle('owGlitches', allowOutOfLogicGlitches) || this.upperCan('owGlitches', allowOutOfLogicGlitches)
		} else if (logic === 'glitchless') {
			return this.upperCan('glitchless', allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return this.lower('inverted', allowOutOfLogicGlitches) || this.middle('inverted', allowOutOfLogicGlitches) || this.upperCan('inverted', allowOutOfLogicGlitches)
		}
	},
	mayEnter: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return this.lower('majorGlitches', allowOutOfLogicGlitches) || this.middle('majorGlitches', allowOutOfLogicGlitches) || this.upperMay('majorGlitches', allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return this.middle('owGlitches', allowOutOfLogicGlitches) || this.upperMay('owGlitches', allowOutOfLogicGlitches)
		} else if (logic === 'glitchless') {
			return this.upperMay('glitchless', allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return this.lower('inverted', allowOutOfLogicGlitches) || this.middle('inverted', allowOutOfLogicGlitches) || this.upperMay('inverted', allowOutOfLogicGlitches)
		}
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.firerod && store.state.trackerData.items.icerod && store.state.trackerData.items.somaria) {
			if (this.canEnter('glitchless', false) &&
                    store.state.trackerData.items.lantern &&
                    (store.state.trackerData.items.hammer || store.state.trackerData.items.sword >= 2)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.glitchless = 'available'
				} else {
					availability.glitchless = 'possible'
				}
			} else if (this.mayEnter('glitchless', false)) {
				availability.glitchless = 'possible'
			} else if (this.canEnter('glitchless', true)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.glitchless = 'glitchavailable'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			} else if (this.mayEnter('glitchless', true)) {
				availability.glitchless = 'glitchpossible'
			}
			if (this.canEnter('owGlitches', false) &&
                    store.state.trackerData.items.lantern &&
                    (store.state.trackerData.items.hammer || store.state.trackerData.items.sword >= 2)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.owGlitches = 'available'
				} else {
					availability.owGlitches = 'possible'
				}
			} else if (this.mayEnter('owGlitches', false)) {
				availability.owGlitches = 'possible'
			} else if (this.canEnter('owGlitches', true)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.owGlitches = 'glitchavailable'
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			} else if (this.mayEnter('owGlitches', true)) {
				availability.owGlitches = 'glitchpossible'
			}
			if (this.canEnter('majorGlitches', false) &&
                    store.state.trackerData.items.lantern &&
                    (store.state.trackerData.items.hammer || store.state.trackerData.items.sword >= 2)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (this.mayEnter('majorGlitches', false)) {
				availability.majorGlitches = 'possible'
			} else if (this.canEnter('majorGlitches', true)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.majorGlitches = 'glitchavailable'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			} else if (this.mayEnter('majorGlitches', true)) {
				availability.majorGlitches = 'glitchpossible'
			}
			if (this.canEnter('inverted', false) &&
                    store.state.trackerData.items.lantern &&
                    (store.state.trackerData.items.hammer || store.state.trackerData.items.sword >= 2)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else if (this.mayEnter('inverted', false)) {
				availability.inverted = 'possible'
			} else if (this.canEnter('inverted', true)) {
				if (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers()) {
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
	canGetChest: function () {
		const availability = new Availability()
		if (this.canEnter('glitchless', false)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					if (store.state.trackerData.dungeonchests[9] >= 2 || this.isBeatable().glitchless === 'available') {
						availability.glitchless = 'available'
					} else {
						availability.glitchless = 'possible'
					}
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.glitchless = 'possible'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.glitchless = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.glitchless = 'possible'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			}
		} else if (this.mayEnter('glitchless', false)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.glitchless = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.glitchless = 'possible'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.glitchless = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.glitchless = 'possible'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			}
		} else if (this.canEnter('glitchless', true)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.dungeonchests[9] >= 2 ||
                        this.isBeatable().glitchless === 'available' ||
                        this.isBeatable().glitchless === 'glitchavailable') {
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
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					if (store.state.trackerData.dungeonchests[9] >= 2 || this.isBeatable().glitchless === 'available') {
						availability.owGlitches = 'available'
					} else {
						availability.owGlitches = 'possible'
					}
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.owGlitches = 'possible'
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.owGlitches = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.owGlitches = 'possible'
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			}
		} else if (this.mayEnter('owGlitches', false)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.owGlitches = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.owGlitches = 'possible'
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.owGlitches = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.owGlitches = 'possible'
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			}
		} else if (this.canEnter('owGlitches', true)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.dungeonchests[9] >= 2 ||
                        this.isBeatable().glitchless === 'available' ||
                        this.isBeatable().glitchless === 'glitchavailable') {
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
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					if (store.state.trackerData.dungeonchests[9] >= 2 || this.isBeatable().glitchless === 'available') {
						availability.majorGlitches = 'available'
					} else {
						availability.majorGlitches = 'possible'
					}
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.majorGlitches = 'possible'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.majorGlitches = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.majorGlitches = 'possible'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			}
		} else if (this.mayEnter('majorGlitches', false)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.majorGlitches = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.majorGlitches = 'possible'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.majorGlitches = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.majorGlitches = 'possible'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			}
		} else if (this.canEnter('majorGlitches', true)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.dungeonchests[9] >= 2 ||
                        this.isBeatable().glitchless === 'available' ||
                        this.isBeatable().glitchless === 'glitchavailable') {
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
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					if (store.state.trackerData.dungeonchests[9] >= 2 || this.isBeatable().glitchless === 'available') {
						availability.inverted = 'available'
					} else {
						availability.inverted = 'possible'
					}
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.inverted = 'possible'
				} else {
					availability.inverted = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.inverted = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.inverted = 'possible'
				} else {
					availability.inverted = 'glitchpossible'
				}
			}
		} else if (this.mayEnter('inverted', false)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.inverted = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 2) {
					availability.inverted = 'possible'
				} else {
					availability.inverted = 'glitchpossible'
				}
			} else {
				if (store.state.trackerData.items.lantern && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna || Logic.canBlockLasers())) {
					availability.inverted = 'possible'
				} else if (store.state.trackerData.dungeonchests[9] >= 4) {
					availability.inverted = 'possible'
				} else {
					availability.inverted = 'glitchpossible'
				}
			}
		} else if (this.canEnter('inverted', true)) {
			if (store.state.trackerData.items.firerod) {
				if (store.state.trackerData.dungeonchests[9] >= 2 ||
                        this.isBeatable().glitchless === 'available' ||
                        this.isBeatable().glitchless === 'glitchavailable') {
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
}

dungeons[10] = {
	name: "Ganon's Tower",
	label: 'GT',
	x: '77.0%',
	y: '5.5%',
	image: 'boss102.png',
	canEnter: function (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return Logic.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'owGlitches') {
			return store.state.trackerData.items.boots && store.state.trackerData.items.moonpearl
		} else if (logic === 'glitchless') {
			let crystalCount = 0
			for (let k = 0; k < 10; k++) {
				if ((store.state.trackerData.prizes[k] === 4 || store.state.trackerData.prizes[k] === 3) && store.state.trackerData.items['boss' + k] === 2) {
					crystalCount++
					if (crystalCount === 7) {
						break
					}
				}
			}
			return crystalCount === 7 && store.state.trackerData.items.moonpearl && Logic.canEnterDarkWorldDeathMountain(logic, allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			let crystalCount = 0
			for (let k = 0; k < 10; k++) {
				if ((store.state.trackerData.prizes[k] === 4 || store.state.trackerData.prizes[k] === 3) && store.state.trackerData.items['boss' + k] === 2) {
					crystalCount++
					if (crystalCount === 7) {
						break
					}
				}
			}
			return crystalCount === 7 && Logic.canEnterLightWorld('inverted', false, allowOutOfLogicGlitches)
		}
	},
	isBeatable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.hookshot &&
                store.state.trackerData.items.bow &&
                Logic.canLightTorches() &&
                (store.state.trackerData.items.hammer || store.state.trackerData.items.sword >= 1)) {
			if (this.canEnter('glitchless', false)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.glitchless = 'available'
				} else {
					availability.glitchless = 'possible'
				}
			} else if (this.canEnter('glitchless', true)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.glitchless = 'glitchavailable'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			}
			if (this.canEnter('owGlitches', false)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.owGlitches = 'available'
				} else {
					availability.owGlitches = 'possible'
				}
			}
			if (this.canEnter('majorGlitches', false)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (this.canEnter('majorGlitches', true)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.majorGlitches = 'glitchavailable'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			}
			if (this.canEnter('inverted', false)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else if (this.canEnter('inverted', true)) {
				if (store.state.trackerData.items.boots && store.state.trackerData.items.hammer && store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
					availability.inverted = 'glitchavailable'
				} else {
					availability.inverted = 'glitchpossible'
				}
			}
		}
		return availability
	},
	canGetChest: function () {
		const availability = new Availability()
		let smallKeysNeeded = 0
		let bigKeyNeeded = 0
		let bigKeyGuaranteed = false
		// Hope Room x2
		let minAvailableChests = 2
		let maxAvailableChests = 2
		// Bob's Torch
		if (store.state.trackerData.items.boots) {
			minAvailableChests++
			maxAvailableChests++
		}
		// DMs Room x4 + Randomizer Room x4 + Firesnake Room
		if (store.state.trackerData.items.hammer && store.state.trackerData.items.hookshot) {
			minAvailableChests += 9
			maxAvailableChests += 9
			smallKeysNeeded = 4
		}
		// Map Chest
		if (store.state.trackerData.items.hammer &&
                (store.state.trackerData.items.boots || store.state.trackerData.items.hookshot)) {
			minAvailableChests++
			maxAvailableChests++
		}
		// Bob's Chest + Big Key Room x3
		if ((store.state.trackerData.items.hammer && store.state.trackerData.items.hookshot) ||
                (store.state.trackerData.items.firerod && store.state.trackerData.items.somaria)) {
			minAvailableChests += 4
			maxAvailableChests += 4
			smallKeysNeeded = Math.max(3, smallKeysNeeded)
		}
		// Tile Room
		if (store.state.trackerData.items.somaria) {
			minAvailableChests++
			maxAvailableChests++
		}
		// Compass Room x4
		if (store.state.trackerData.items.firerod && store.state.trackerData.items.somaria) {
			minAvailableChests += 4
			maxAvailableChests += 4
			smallKeysNeeded = Math.max(4, smallKeysNeeded)
		}
		// Big Chest
		if (store.state.trackerData.items.hammer &&
                store.state.trackerData.items.boots &&
                store.state.trackerData.items.hookshot &&
                store.state.trackerData.items.somaria &&
                store.state.trackerData.items.firerod) {
			minAvailableChests++
			maxAvailableChests++
			bigKeyNeeded = 1
			bigKeyGuaranteed = true
		}
		// Mini Helmasaur Room x2 + Pre-Moldorm Chest
		if (store.state.trackerData.items.bow && Logic.canLightTorches()) {
			if (bigKeyGuaranteed) {
				minAvailableChests += 3
			}
			maxAvailableChests += 3
			smallKeysNeeded = Math.max(3, smallKeysNeeded)
			bigKeyNeeded = 1
		}
		// Moldorm Chest
		if (store.state.trackerData.items.hookshot &&
                store.state.trackerData.items.bow &&
                Logic.canLightTorches() &&
                (store.state.trackerData.items.hammer || store.state.trackerData.items.sword >= 1)) {
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
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.glitchless = 'available'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.glitchless = 'possible'
			}
		} else if (this.canEnter('glitchless', true)) {
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.glitchless = 'glitchavailable'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.glitchless = 'glitchpossible'
			}
		}
		if (this.canEnter('owGlitches', false)) {
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.owGlitches = 'available'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.owGlitches = 'possible'
			}
		}
		if (this.canEnter('majorGlitches', false)) {
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.majorGlitches = 'available'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.majorGlitches = 'possible'
			}
		} else if (this.canEnter('majorGlitches', true)) {
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.majorGlitches = 'glitchavailable'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.majorGlitches = 'glitchpossible'
			}
		}
		if (this.canEnter('inverted', false)) {
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.inverted = 'possible'
			}
		} else if (this.canEnter('inverted', true)) {
			if (store.state.trackerData.dungeonchests[10] > (20 - minItemsAvailable)) {
				availability.inverted = 'glitchavailable'
			} else if (store.state.trackerData.dungeonchests[10] > (20 - maxItemsAvailable)) {
				availability.inverted = 'glitchpossible'
			}
		}
		return availability
	}
}

// define overworld chests
const chests = []

chests[0] = {
	name: "King's Tomb <img src='/images/boots.png' class='mini'> + <img src='/images/glove2.png' class='mini'>/<img src='/images/mirror.png' class='mini'>",
	x: '30.8%',
	y: '29.6%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.boots && Logic.canLiftDarkRocks()) {
			availability.glitchless = 'available'
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			}
		} else if (store.state.trackerData.items.boots && store.state.trackerData.items.mirror) {
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[1] = {
	name: 'Light World Swamp (2)',
	x: '23.4%',
	y: '93.4%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.items.mirror) {
				availability.inverted = 'glitchavailable'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true) && (store.state.trackerData.items.moonpearl || store.state.trackerData.items.mirror)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[2] = {
	name: "Link's House",
	x: '27.4%',
	y: '67.9%',
	isOpened: true,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		availability.inverted = 'available'
		return availability
	}
}

chests[3] = {
	name: 'Spiral Cave',
	x: '39.9%',
	y: '9.3%',
	isOpened: false,
	isAvailable: function () {
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
		if (Logic.canEnterEastDeathMountain('inverted', false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'available'
		} else if (Logic.canEnterEastDeathMountain('inverted', true)) {
			availability.inverted = 'glitchavailable'
		}
		return availability
	}
}

chests[4] = {
	name: "Mimic Cave (<img src='/images/mirror.png' class='mini'> outside of Turtle Rock)(Yellow = <img src='/images/medallion0.png' class='mini'> unknown OR possible w/out <img src='/images/firerod.png' class='mini'>)",
	x: '42.6%',
	y: '9.3%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterEastDeathMountain('glitchless', false) && store.state.trackerData.items.mirror && dungeons[9].mayEnter('glitchless', false)) {
			if (store.state.trackerData.items.firerod && dungeons[9].canEnter('glitchless', false)) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (Logic.canEnterEastDeathMountain('glitchless', true) && store.state.trackerData.items.mirror && dungeons[9].mayEnter('glitchless', true)) {
			if (store.state.trackerData.items.firerod && dungeons[9].canEnter('glitchless', true)) {
				availability.glitchless = 'glitchavailable'
			} else {
				availability.glitchless = 'glitchpossible'
			}
		}
		if (store.state.trackerData.items.hammer && store.state.trackerData.items.mirror) {
			if (Logic.canEnterEastDeathMountain('owGlitches', false) && Logic.canEnterDarkWorldDeathMountain('owGlitches', false)) {
				availability.owGlitches = 'available'
			} else if (Logic.canEnterEastDeathMountain('owGlitches', true) && Logic.canEnterDarkWorldDeathMountain('owGlitches', true)) {
				availability.owGlitches = 'glitchavailable'
			}
			if (Logic.canEnterEastDeathMountain('majorGlitches', false) && Logic.canEnterDarkWorldDeathMountain('majorGlitches', false)) {
				availability.majorGlitches = 'available'
			} else if (Logic.canEnterEastDeathMountain('majorGlitches', true) && Logic.canEnterDarkWorldDeathMountain('majorGlitches', true)) {
				availability.majorGlitches = 'glitchavailable'
			}
		}
		if (store.state.trackerData.items.moonpearl && store.state.trackerData.items.hammer) {
			if (Logic.canEnterEastDeathMountain('inverted', false)) {
				availability.inverted = 'available'
			} else if (Logic.canEnterEastDeathMountain('inverted', true)) {
				availability.inverted = 'glitchavailable'
			}
		}
		return availability
	}
}

chests[5] = {
	name: 'Tavern',
	x: '8.1%',
	y: '57.8%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'glitchavailable'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[6] = {
	name: "Chicken House <img src='/images/bomb.png' class='mini'>",
	x: '4.4%',
	y: '54.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[7] = {
	name: "Bombable Hut <img src='/images/bomb.png' class='mini'>",
	x: '55.4%',
	y: '57.8%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
			availability.glitchless = 'available'
		} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
			availability.glitchless = 'agahnim'
		} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
			availability.glitchless = 'glitchagahnim'
		}
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[8] = {
	name: 'C House',
	x: '60.8%',
	y: '47.9%',
	isOpened: false,
	isAvailable: function () {
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
}

chests[9] = {
	name: "Aginah's Cave <img src='/images/bomb.png' class='mini'>",
	x: '10.0%',
	y: '82.6%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[10] = {
	name: 'West of Mire (2)',
	x: '51.7%',
	y: '79.5%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterMireArea('glitchless', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.glitchless = 'available'
			} else if (store.state.trackerData.items.mirror) {
				availability.glitchless = 'glitchavailable'
			}
		}
		if (store.state.trackerData.items.moonpearl || store.state.trackerData.items.mirror) {
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
}

chests[11] = {
	name: "DW Death Mountain (2) : Don't need <img src='/images/moonpearl.png' class='mini'>",
	x: '92.8%',
	y: '14.7%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterDarkWorldDeathMountain('glitchless', true)) {
			if (Logic.canEnterDarkWorldDeathMountain('glitchless', false) && store.state.trackerData.items.moonpearl) {
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
}

chests[12] = {
	name: "Sahasrahla's Hut (3) <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
	x: '40.7%',
	y: '41.4%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.items.boots) {
				availability.inverted = 'glitchavailable'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true) && (store.state.trackerData.items.moonpearl || store.state.trackerData.items.boots)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[13] = {
	name: 'Byrna Spike Cave',
	x: '78.6%',
	y: '14.9%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canLiftRocks() && store.state.trackerData.items.hammer) {
			if (Logic.canEnterWestDeathMountain('glitchless', true) && store.state.trackerData.items.moonpearl) {
				if (Logic.canExtendMagic() && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna)) {
					if (Logic.canEnterWestDeathMountain('glitchless', false)) {
						availability.glitchless = 'available'
					} else {
						availability.glitchless = 'glitchavailable'
					}
				} else {
					availability.glitchless = 'glitchpossible'
				}
			}
			if (Logic.canEnterWestDeathMountain('owGlitches', true) && store.state.trackerData.items.moonpearl) {
				if (Logic.canExtendMagic() && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna)) {
					if (Logic.canEnterWestDeathMountain('owGlitches', false)) {
						availability.owGlitches = 'available'
					} else {
						availability.owGlitches = 'glitchavailable'
					}
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			} else if (Logic.canEnterWestDeathMountain('majorGlitches', true) && (store.state.trackerData.items.moonpearl || (store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots))) {
				if (Logic.canExtendMagic() && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna)) {
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
				if (Logic.canExtendMagic() && (store.state.trackerData.items.cape || store.state.trackerData.items.byrna)) {
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
}

chests[14] = {
	name: "Kakariko Well (4 + <img src='/images/bomb.png' class='mini'>)",
	x: '1.7%',
	y: '41.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'glitchpossible'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[15] = {
	name: "Thieves' Hut (4 + <img src='/images/bomb.png' class='mini'>)",
	x: '6.4%',
	y: '41.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.items.mirror) {
				availability.inverted = 'glitchpossible'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true) && (store.state.trackerData.items.moonpearl || store.state.trackerData.items.mirror)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[16] = {
	name: "Hype Cave! <img src='/images/bomb.png' class='mini'> (NPC + 4 <img src='/images/bomb.png' class='mini'>)",
	x: '80.0%',
	y: '77.1%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
			availability.glitchless = 'available'
		} else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
			availability.glitchless = 'agahnim'
		} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
			availability.glitchless = 'glitchagahnim'
		}
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[17] = {
	name: "Death Mountain East (5 + 2 <img src='/images/bomb.png' class='mini'>)",
	x: '41.4%',
	y: '17.1%',
	isOpened: false,
	isAvailable: function () {
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
		if (Logic.canEnterEastDeathMountain('inverted', false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'available'
		} else if (Logic.canEnterEastDeathMountain('inverted', true) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'glitchavailable'
		} else if (Logic.canEnterEastDeathMountain('inverted', true) && store.state.trackerData.items.sword >= 2) {
			availability.inverted = 'glitchpossible'
		}
		return availability
	}
}

chests[18] = {
	name: "West of Sanctuary <img src='/images/boots.png' class='mini'>",
	x: '19.5%',
	y: '29.3%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.boots) {
			availability.glitchless = 'available'
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[19] = {
	name: "Minimoldorm Cave (NPC + 4) <img src='/images/bomb.png' class='mini'>",
	x: '32.6%',
	y: '93.4%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[20] = {
	name: "Ice Rod Cave <img src='/images/bomb.png' class='mini'>",
	x: '44.7%',
	y: '76.9%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[21] = {
	name: "Cave Under Rock (bottom chest) <img src='/images/hookshot.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
	x: '91.6%',
	y: '8.6%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.moonpearl &&
                (store.state.trackerData.items.hookshot || store.state.trackerData.items.boots)) {
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
		if (Logic.canLiftRocks() && (store.state.trackerData.items.hookshot || store.state.trackerData.items.boots)) {
			if (Logic.canEnterDarkWorldDeathMountain('inverted', false)) {
				availability.inverted = 'available'
			} else if (Logic.canEnterDarkWorldDeathMountain('inverted', true)) {
				availability.inverted = 'glitchavailable'
			}
		}
		return availability
	}
}

chests[22] = {
	name: "Cave Under Rock (3 top chests) <img src='/images/hookshot.png' class='mini'>",
	x: '91.6%',
	y: '3.4%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.moonpearl && store.state.trackerData.items.hookshot) {
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
		if (Logic.canLiftRocks() && store.state.trackerData.items.hookshot) {
			if (Logic.canEnterDarkWorldDeathMountain('inverted', false)) {
				availability.inverted = 'available'
			} else if (Logic.canEnterDarkWorldDeathMountain('inverted', true)) {
				availability.inverted = 'glitchavailable'
			}
		}
		return availability
	}
}

chests[23] = {
	name: 'Treasure Chest Minigame: Pay 30 rupees',
	x: '52.1%',
	y: '46.4%',
	isOpened: false,
	isAvailable: function () {
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
}

chests[24] = {
	name: 'Bottle Vendor: Pay 100 rupees',
	x: '4.5%',
	y: '46.8%',
	isOpened: false,
	isAvailable: function () {
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
}

chests[25] = {
	name: "Sahasrahla <img src='/images/pendant0.png' class='mini'>",
	x: '40.7%',
	y: '46.7%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		for (let k = 0; k < 10; k++) {
			if (store.state.trackerData.prizes[k] === 1 && store.state.trackerData.items['boss' + k] === 2) {
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
}

chests[26] = {
	name: 'Stump Kid',
	x: '65.5%',
	y: '68.6%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
			availability.glitchless = 'available'
		} else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
			availability.glitchless = 'agahnim'
		} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
			availability.glitchless = 'glitchagahnim'
		}
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[27] = {
	name: "Bug Kid <img src='/images/bottle0.png' class='mini'>",
	x: '7.8%',
	y: '52.1%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.bottle >= 1) {
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
}

chests[28] = {
	name: 'Show the Purple Chest to Gary',
	x: '65.2%',
	y: '52.2%',
	isOpened: false,
	isAvailable: function () {
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
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false) &&
                    chests[60].isAvailable().owGlitches === 'available' &&
                    (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)))) {
				availability.owGlitches = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false) &&
                    (chests[60].isAvailable().owGlitches === 'available' || chests[60].isAvailable().owGlitches === 'agahnim') &&
                    (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)))) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true) &&
                    (chests[60].isAvailable().owGlitches === 'available' || chests[60].isAvailable().owGlitches === 'agahnim' || chests[60].isAvailable().owGlitches === 'glitchagahnim') &&
                    (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)))) {
				availability.owGlitches = 'glitchagahnim'
			}
		}
		if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false) &&
                chests[60].isAvailable().majorGlitches === 'available' &&
                (store.state.trackerData.items.mirror ||
                        (Logic.glitchedLinkInDarkWorld() && Logic.canLiftDarkRocks()) ||
                        (store.state.trackerData.items.boots && Logic.glitchedLinkInDarkWorld() && Logic.canEnterNorthEastDarkWorld('majorGlitches', false, false)))) {
			availability.majorGlitches = 'available'
		} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false) &&
                (chests[60].isAvailable().majorGlitches === 'available' || chests[60].isAvailable().majorGlitches === 'agahnim') &&
                (store.state.trackerData.items.mirror ||
                        (Logic.glitchedLinkInDarkWorld() && Logic.canLiftDarkRocks()) ||
                        (store.state.trackerData.items.boots && Logic.glitchedLinkInDarkWorld() && Logic.canEnterNorthEastDarkWorld('majorGlitches', true, false)))) {
			availability.majorGlitches = 'agahnim'
		} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true) &&
                (chests[60].isAvailable().majorGlitches === 'available' || chests[60].isAvailable().majorGlitches === 'agahnim' || chests[60].isAvailable().majorGlitches === 'glitchagahnim') &&
                (store.state.trackerData.items.mirror ||
                        (Logic.glitchedLinkInDarkWorld() && Logic.canLiftDarkRocks()) ||
                        (store.state.trackerData.items.boots && Logic.glitchedLinkInDarkWorld() && Logic.canEnterNorthEastDarkWorld('majorGlitches', true, true)))) {
			availability.majorGlitches = 'glitchagahnim'
		}
		if (Logic.canLiftDarkRocks() || store.state.trackerData.items.mirror) {
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
}

chests[29] = {
	name: "Fugitive under the bridge <img src='/images/flippers.png' class='mini'>",
	x: '35.4%',
	y: '69.7%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.flippers) {
			availability.glitchless = 'available'
		} else {
			availability.glitchless = 'glitchavailable'
			availability.owGlitches = 'available'
		}
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.flippers) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'glitchavailable'
				}
			} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.flippers) {
				availability.inverted = 'agahnim'
			} else if (Logic.canEnterLightWorld('inverted', true, true)) {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

chests[30] = {
	name: "Ether Tablet <img src='/images/sword2.png' class='mini'><img src='/images/book.png' class='mini'>",
	x: '21.0%',
	y: '3.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.book && (store.state.trackerData.items.mirror || (store.state.trackerData.items.hammer && store.state.trackerData.items.hookshot))) {
			if (Logic.canEnterWestDeathMountain('glitchless', false)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.glitchless = 'available'
				} else {
					availability.glitchless = 'possible'
				}
			} else if (Logic.canEnterWestDeathMountain('glitchless', true)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.glitchless = 'glitchavailable'
				} else {
					availability.glitchless = 'glitchpossible'
				}
			}
		}
		if (store.state.trackerData.items.book) {
			if (Logic.canEnterWestDeathMountain('owGlitches', false) && dungeons[2].canEnter('owGlitches', false, false)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.owGlitches = 'available'
				} else {
					availability.owGlitches = 'possible'
				}
			} else if (Logic.canEnterWestDeathMountain('owGlitches', true) && dungeons[2].canEnter('owGlitches', false, true)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.owGlitches = 'glitchavailable'
				} else {
					availability.owGlitches = 'glitchpossible'
				}
			}
		}
		if (store.state.trackerData.items.book) {
			if (Logic.canEnterWestDeathMountain('majorGlitches', false) && dungeons[2].canEnter('majorGlitches', false, false)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.majorGlitches = 'available'
				} else {
					availability.majorGlitches = 'possible'
				}
			} else if (Logic.canEnterWestDeathMountain('majorGlitches', false) && dungeons[2].mayEnter('majorGlitches', false, false)) {
				availability.majorGlitches = 'possible'
			} else if (Logic.canEnterWestDeathMountain('majorGlitches', true) && dungeons[2].canEnter('majorGlitches', false, true)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.majorGlitches = 'glitchavailable'
				} else {
					availability.majorGlitches = 'glitchpossible'
				}
			} else if (Logic.canEnterWestDeathMountain('majorGlitches', true) && dungeons[2].mayEnter('majorGlitches', false, true)) {
				availability.majorGlitches = 'glitchpossible'
			} else if (Logic.canEnterWestDeathMountain('majorGlitches', false) && dungeons[2].mayEnter('majorGlitches', true, false) && store.state.trackerData.items.sword >= 2) {
				availability.majorGlitches = 'agahnim'
			} else if (Logic.canEnterWestDeathMountain('majorGlitches', true) && dungeons[2].mayEnter('majorGlitches', true, true) && store.state.trackerData.items.sword >= 2) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.book && store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterEastDeathMountain('inverted', false)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'possible'
				}
			} else if (Logic.canEnterEastDeathMountain('inverted', true)) {
				if (store.state.trackerData.items.sword >= 2) {
					availability.inverted = 'glitchavailable'
				} else {
					availability.inverted = 'glitchpossible'
				}
			}
		}
		return availability
	}
}

chests[31] = {
	name: "Bombos Tablet <img src='/images/mirror.png' class='mini'><img src='/images/sword2.png' class='mini'><img src='/images/book.png' class='mini'>",
	x: '11.0%',
	y: '92.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.book && store.state.trackerData.items.mirror && Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
			if (store.state.trackerData.items.sword >= 2) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (store.state.trackerData.items.book && store.state.trackerData.items.mirror && store.state.trackerData.items.sword >= 2) {
			if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.book && (store.state.trackerData.items.boots || (store.state.trackerData.items.mirror && Logic.canEnterSouthDarkWorld('owGlitches', false, false)))) {
			if (store.state.trackerData.items.sword >= 2) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (store.state.trackerData.items.book && store.state.trackerData.items.mirror && store.state.trackerData.items.sword >= 2) {
			if (Logic.canEnterSouthDarkWorld('owGlitches', true, false)) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true)) {
				availability.owGlitches = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.book &&
                (store.state.trackerData.items.boots || (store.state.trackerData.items.mirror && Logic.canEnterSouthDarkWorld('majorGlitches', false, false)))) {
			if (store.state.trackerData.items.sword >= 2) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (store.state.trackerData.items.book && store.state.trackerData.items.mirror && store.state.trackerData.items.sword >= 2) {
			if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false)) {
				availability.majorGlitches = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.book) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.sword >= 2) {
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
}

chests[32] = {
	name: 'Catfish',
	x: '96.0%',
	y: '17.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.moonpearl && Logic.canLiftRocks()) {
			if (Logic.canEnterNorthEastDarkWorld('glitchless', false, false)) {
				availability.glitchless = 'available'
			} else if (Logic.canEnterNorthEastDarkWorld('glitchless', true, false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterNorthEastDarkWorld('glitchless', true, true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.moonpearl &&
                (Logic.canLiftRocks() || store.state.trackerData.items.boots)) {
			if (Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)) {
				availability.owGlitches = 'available'
			} else if (Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)) {
				availability.owGlitches = 'glitchagahnim'
			}
		}
		if (Logic.glitchedLinkInDarkWorld() &&
                (Logic.canLiftRocks() || store.state.trackerData.items.boots)) {
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
}

chests[33] = {
	name: 'King Zora: Pay 500 rupees',
	x: '47.5%',
	y: '12.1%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.flippers || Logic.canLiftRocks()) {
			availability.glitchless = 'available'
		} else {
			availability.glitchless = 'glitchavailable'
			availability.owGlitches = 'available'
		}
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.flippers || Logic.canLiftRocks()) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'glitchavailable'
				}
			} else if (Logic.canEnterLightWorld('inverted', true, false) && (store.state.trackerData.items.flippers || Logic.canLiftRocks())) {
				availability.inverted = 'agahnim'
			} else if (Logic.canEnterLightWorld('inverted', true, true)) {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

chests[34] = {
	name: 'Lost Old Man',
	x: '20.8%',
	y: '20.4%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterWestDeathMountain('glitchless', true)) {
			if (store.state.trackerData.items.lantern) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'glitchavailable'
			}
		} else if (Logic.canEnterWestDeathMountain('owGlitches', true)) {
			if (store.state.trackerData.items.lantern) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'glitchavailable'
			}
		} else if (Logic.canEnterWestDeathMountain('majorGlitches', true)) {
			if (store.state.trackerData.items.lantern) {
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
}

chests[35] = {
	name: "Witch: Give her <img src='/images/mushroom.png' class='mini'>",
	x: '40.8%',
	y: '32.5%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.mushroom) {
			availability.glitchless = 'available'
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[36] = {
	name: 'Forest Hideout',
	x: '9.4%',
	y: '13.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[37] = {
	name: "Lumberjack Tree <img src='/images/agahnim1.png' class='mini'><img src='/images/boots.png' class='mini'>",
	x: '15.1%',
	y: '7.6%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'possible'
		if (store.state.trackerData.items.boots) {
			if (store.state.trackerData.items.agahnim) {
				availability.glitchless = 'available'
			} else if (Logic.canGoBeatAgahnim1(false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canGoBeatAgahnim1(true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			availability.inverted = 'possible'
			if (store.state.trackerData.items.boots && store.state.trackerData.items.moonpearl) {
				if (store.state.trackerData.items.agahnim) {
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
}

chests[38] = {
	name: 'Spectacle Rock Cave',
	x: '24.3%',
	y: '14.8%',
	isOpened: false,
	isAvailable: function () {
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
}

chests[39] = {
	name: "South of Grove <img src='/images/mirror.png' class='mini'>",
	x: '14.1%',
	y: '84.1%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.mirror) {
			if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
				availability.glitchless = 'available'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.boots) {
			availability.owGlitches = 'available'
		} else {
			if (store.state.trackerData.items.mirror) {
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
		}
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'glitchavailable'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[40] = {
	name: "Graveyard Cliff Cave <img src='/images/mirror.png' class='mini'>",
	x: '28.1%',
	y: '27.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.mirror && store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
				availability.glitchless = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.boots) {
			availability.owGlitches = 'available'
		} else {
			if (store.state.trackerData.items.mirror && store.state.trackerData.items.moonpearl) {
				if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
					availability.owGlitches = 'available'
				} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
					availability.owGlitches = 'agahnim'
				} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
					availability.owGlitches = 'glitchagahnim'
				}
			}
			if (store.state.trackerData.items.mirror && Logic.glitchedLinkInDarkWorld()) {
				availability.majorGlitches = 'available'
			}
		}
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[41] = {
	name: "Checkerboard Cave <img src='/images/mirror.png' class='mini'>",
	x: '8.8%',
	y: '77.3%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canFly() && Logic.canLiftDarkRocks() && store.state.trackerData.items.mirror) {
			availability.glitchless = 'available'
		}
		if (Logic.canLiftRocks()) {
			if (store.state.trackerData.items.boots) {
				availability.owGlitches = 'available'
			} else if (store.state.trackerData.items.mirror) {
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
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[42] = {
	name: "<img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'>!!!!!!!!",
	x: '65.8%',
	y: '60.1%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canLiftDarkRocks() && store.state.trackerData.items.hammer) {
			if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
				availability.glitchless = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false) &&
                    (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)))) {
				availability.owGlitches = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false) &&
                    (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)))) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true) &&
                    (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)))) {
				availability.owGlitches = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) {
			if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
				availability.majorGlitches = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
				availability.majorGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.hammer) {
			if (Logic.canLiftDarkRocks()) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.items.mirror) {
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
}

chests[43] = {
	name: "Library <img src='/images/boots.png' class='mini'>",
	x: '7.7%',
	y: '65.9%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.boots) {
			availability.glitchless = 'available'
		} else {
			availability.glitchless = 'possible'
		}
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.boots) {
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
}

chests[44] = {
	name: 'Mushroom',
	x: '6.2%',
	y: '8.6%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[45] = {
	name: "Spectacle Rock <img src='/images/mirror.png' class='mini'>",
	x: '25.4%',
	y: '8.5%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterWestDeathMountain('glitchless', false)) {
			if (store.state.trackerData.items.mirror) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (Logic.canEnterWestDeathMountain('glitchless', true)) {
			if (store.state.trackerData.items.mirror) {
				availability.glitchless = 'glitchavailable'
			} else {
				availability.glitchless = 'glitchpossible'
			}
		}
		if (Logic.canEnterWestDeathMountain('owGlitches', false)) {
			if (store.state.trackerData.items.boots || store.state.trackerData.items.mirror) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (Logic.canEnterWestDeathMountain('owGlitches', true)) {
			if (store.state.trackerData.items.boots || store.state.trackerData.items.mirror) {
				availability.owGlitches = 'glitchavailable'
			} else {
				availability.owGlitches = 'glitchpossible'
			}
		}
		if (Logic.canEnterWestDeathMountain('majorGlitches', false)) {
			if (store.state.trackerData.items.boots || store.state.trackerData.items.mirror) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (Logic.canEnterWestDeathMountain('majorGlitches', true)) {
			if (store.state.trackerData.items.boots || store.state.trackerData.items.mirror) {
				availability.majorGlitches = 'glitchavailable'
			} else {
				availability.majorGlitches = 'glitchpossible'
			}
		}
		if (Logic.canEnterEastDeathMountain('inverted', false) && store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'available'
		} else if (Logic.canEnterEastDeathMountain('inverted', true) && store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'glitchavailable'
		} else if (Logic.canEnterWestDeathMountain('inverted', false)) {
			availability.inverted = 'possible'
		} else if (Logic.canEnterWestDeathMountain('inverted', true)) {
			availability.inverted = 'glitchpossible'
		}
		return availability
	}
}

chests[46] = {
	name: "Floating Island <img src='/images/mirror.png' class='mini'>",
	x: '40.2%',
	y: '3.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterEastDeathMountain('glitchless', false)) {
			if (store.state.trackerData.items.mirror &&
                    store.state.trackerData.items.moonpearl &&
                    Logic.canLiftDarkRocks()) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (Logic.canEnterEastDeathMountain('glitchless', true)) {
			if (store.state.trackerData.items.mirror &&
                    store.state.trackerData.items.moonpearl &&
                    Logic.canLiftDarkRocks()) {
				availability.glitchless = 'glitchavailable'
			} else {
				availability.glitchless = 'glitchpossible'
			}
		}
		if (Logic.canEnterEastDeathMountain('owGlitches', false)) {
			if ((store.state.trackerData.items.boots ||
                            (store.state.trackerData.items.mirror &&
                                    store.state.trackerData.items.moonpearl &&
                                    Logic.canLiftRocks() &&
                                    Logic.canEnterDarkWorldDeathMountain('owGlitches', false)))) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (Logic.canEnterEastDeathMountain('owGlitches', true)) {
			if ((store.state.trackerData.items.boots ||
                            (store.state.trackerData.items.mirror &&
                                    store.state.trackerData.items.moonpearl &&
                                    Logic.canLiftRocks() &&
                                    Logic.canEnterDarkWorldDeathMountain('owGlitches', true)))) {
				availability.owGlitches = 'glitchavailable'
			} else {
				availability.owGlitches = 'glitchpossible'
			}
		}
		if (Logic.canEnterEastDeathMountain('majorGlitches', false)) {
			if ((store.state.trackerData.items.boots ||
                            (store.state.trackerData.items.mirror &&
                                    Logic.glitchedLinkInDarkWorld() &&
                                    Logic.canLiftRocks() &&
                                    Logic.canEnterDarkWorldDeathMountain('majorGlitches', false)))) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (Logic.canEnterEastDeathMountain('majorGlitches', true)) {
			if ((store.state.trackerData.items.boots ||
                            (store.state.trackerData.items.mirror &&
                                    Logic.glitchedLinkInDarkWorld() &&
                                    Logic.canLiftRocks() &&
                                    Logic.canEnterDarkWorldDeathMountain('majorGlitches', true)))) {
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
}

chests[47] = {
	name: "Race Minigame <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
	x: '1.8%',
	y: '69.8%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[48] = {
	name: "Desert West Ledge <img src='/images/book.png' class='mini'>/<img src='/images/mirror.png' class='mini'>",
	x: '1.5%',
	y: '91.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'possible'
		if (dungeons[1].canEnter('glitchless', false, false)) {
			availability.glitchless = 'available'
		} else {
			if (dungeons[1].canEnter('owGlitches', false, false)) {
				availability.owGlitches = 'available'
			} else if (dungeons[1].canEnter('owGlitches', true, false)) {
				availability.owGlitches = 'agahnim'
			} else if (dungeons[1].canEnter('owGlitches', true, true)) {
				availability.owGlitches = 'glitchagahnim'
			}
			if (dungeons[1].canEnter('majorGlitches', false, false)) {
				availability.majorGlitches = 'available'
			} else if (dungeons[1].canEnter('majorGlitches', true, false)) {
				availability.majorGlitches = 'agahnim'
			} else if (dungeons[1].canEnter('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			availability.inverted = 'possible'
			if (dungeons[1].canEnter('inverted', false, false)) {
				if (store.state.trackerData.items.moonpearl) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'glitchavailable'
				}
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[49] = {
	name: "Lake Hylia Island <img src='/images/mirror.png' class='mini'>",
	x: '36.1%',
	y: '82.9%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'possible'
		if (store.state.trackerData.items.flippers && store.state.trackerData.items.moonpearl && store.state.trackerData.items.mirror) {
			if (Logic.canEnterSouthDarkWorld('glitchless', false, false) || Logic.canEnterNorthEastDarkWorld('glitchless', false, false)) {
				availability.glitchless = 'available'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, false) || Logic.canEnterNorthEastDarkWorld('glitchless', true, false)) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true) || Logic.canEnterNorthEastDarkWorld('glitchless', true, true)) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.boots) {
			availability.owGlitches = 'available'
		} else {
			if (store.state.trackerData.items.flippers && store.state.trackerData.items.mirror) {
				if ((store.state.trackerData.items.moonpearl && Logic.canEnterSouthDarkWorld('owGlitches', false, false)) ||
                        Logic.canEnterNorthEastDarkWorld('owGlitches', false, false)) {
					availability.owGlitches = 'available'
				} else if ((store.state.trackerData.items.moonpearl && Logic.canEnterSouthDarkWorld('owGlitches', true, false)) ||
                        Logic.canEnterNorthEastDarkWorld('owGlitches', true, false)) {
					availability.owGlitches = 'agahnim'
				} else if ((store.state.trackerData.items.moonpearl && Logic.canEnterSouthDarkWorld('owGlitches', true, true)) ||
                        Logic.canEnterNorthEastDarkWorld('owGlitches', true, true)) {
					availability.owGlitches = 'glitchagahnim'
				}
				if (Logic.glitchedLinkInDarkWorld() || Logic.canEnterNorthEastDarkWorld('majorGlitches', false, false)) {
					availability.majorGlitches = 'available'
				} else if (Logic.glitchedLinkInDarkWorld() || Logic.canEnterNorthEastDarkWorld('majorGlitches', true, false)) {
					availability.majorGlitches = 'agahnim'
				} else if (Logic.glitchedLinkInDarkWorld() || Logic.canEnterNorthEastDarkWorld('majorGlitches', true, true)) {
					availability.majorGlitches = 'glitchagahnim'
				}
			}
		}
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.flippers) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'glitchavailable'
				}
			} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.flippers) {
				availability.inverted = 'agahnim'
			} else if (Logic.canEnterLightWorld('inverted', true, true)) {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

chests[50] = {
	name: "Bumper Cave <img src='/images/cape.png' class='mini'>",
	x: '67.1%',
	y: '15.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterNorthWestDarkWorld('glitchless', false, false)) {
			if (Logic.canLiftRocks() && store.state.trackerData.items.cape) {
				availability.glitchless = 'available'
			} else {
				availability.glitchless = 'possible'
			}
		} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, false) && Logic.canLiftRocks() && store.state.trackerData.items.cape) {
			availability.glitchless = 'agahnim'
		} else if (Logic.canEnterNorthWestDarkWorld('glitchless', true, true) && Logic.canLiftRocks() && store.state.trackerData.items.cape) {
			availability.glitchless = 'glitchagahnim'
		}
		if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
			if (store.state.trackerData.items.moonpearl && (store.state.trackerData.items.boots || (Logic.canLiftRocks() && store.state.trackerData.items.cape))) {
				availability.owGlitches = 'available'
			} else {
				availability.owGlitches = 'possible'
			}
		} else if (store.state.trackerData.items.moonpearl && (store.state.trackerData.items.boots || (Logic.canLiftRocks() && store.state.trackerData.items.cape))) {
			if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
				availability.owGlitches = 'glitchagahnim'
			}
		}
		if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
			if (Logic.glitchedLinkInDarkWorld() && (store.state.trackerData.items.boots || (Logic.canLiftRocks() && store.state.trackerData.items.cape))) {
				availability.majorGlitches = 'available'
			} else {
				availability.majorGlitches = 'possible'
			}
		} else if (Logic.glitchedLinkInDarkWorld() && (store.state.trackerData.items.boots || (Logic.canLiftRocks() && store.state.trackerData.items.cape))) {
			if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
				availability.majorGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		availability.inverted = 'possible'
		if (store.state.trackerData.items.moonpearl && Logic.canLiftRocks() && store.state.trackerData.items.cape && store.state.trackerData.items.mirror) {
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
}

chests[51] = {
	name: 'Pyramid',
	x: '79.0%',
	y: '43.5%',
	isOpened: false,
	isAvailable: function () {
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
}

chests[52] = {
	name: 'Dig Game: Pay 80 rupees',
	x: '52.9%',
	y: '69.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canEnterSouthDarkWorld('glitchless', false, false)) {
			availability.glitchless = 'available'
		} else if (Logic.canEnterSouthDarkWorld('glitchless', true, false)) {
			availability.glitchless = 'agahnim'
		} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true)) {
			availability.glitchless = 'glitchagahnim'
		}
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[53] = {
	name: "Zora River Ledge <img src='/images/flippers.png' class='mini'>",
	x: '47.5%',
	y: '17.3%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.flippers) {
			availability.glitchless = 'available'
		} else if (Logic.canLiftRocks()) {
			availability.glitchless = 'possible'
		} else {
			availability.glitchless = 'glitchpossible'
		}
		if (store.state.trackerData.items.boots && store.state.trackerData.items.moonpearl) {
			availability.owGlitches = 'available'
		} else {
			availability.owGlitches = 'possible'
		}
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.flippers) {
					availability.inverted = 'available'
				} else if (Logic.canLiftRocks()) {
					availability.inverted = 'possible'
				} else {
					availability.inverted = 'glitchpossible'
				}
			} else if (Logic.canEnterLightWorld('inverted', true, false) && (store.state.trackerData.items.flippers || Logic.canLiftRocks())) {
				availability.inverted = 'agahnim'
			} else if (Logic.canEnterLightWorld('inverted', true, true)) {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

chests[54] = {
	name: "Buried Item <img src='/images/shovel.png' class='mini'>",
	x: '14.4%',
	y: '66.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.shovel) {
			availability.glitchless = 'available'
			if (store.state.trackerData.items.moonpearl) {
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
}

chests[55] = {
	name: "Escape Sewer (4) <img src='/images/glove1.png' class='mini'> + <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
	x: '26.8%',
	y: '32.4%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (Logic.canLiftRocks()) {
			availability.glitchless = 'available'
		} else if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'glitchpossible'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[56] = {
	name: 'Castle Secret Entrance (2)',
	x: '29.8%',
	y: '41.8%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (store.state.trackerData.items.moonpearl) {
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
}

chests[57] = {
	name: 'Hyrule Castle (3)',
	x: '24.9%',
	y: '44.1%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else {
				availability.inverted = 'glitchavailable'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[58] = {
	name: 'Sanctuary',
	x: '23.0%',
	y: '28.0%',
	isOpened: true,
	isAvailable: function () {
		const availability = new Availability()
		availability.glitchless = 'available'
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (store.state.trackerData.items.moonpearl) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.items.mirror) {
				availability.inverted = 'glitchavailable'
			} else {
				availability.inverted = 'glitchpossible'
			}
		} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.moonpearl) {
			availability.inverted = 'agahnim'
		} else if (Logic.canEnterLightWorld('inverted', true, true)) {
			availability.inverted = 'glitchagahnim'
		}
		return availability
	}
}

chests[59] = {
	name: "Mad Batter <img src='/images/hammer.png' class='mini'>/<img src='/images/mirror.png' class='mini'> + <img src='/images/powder.png' class='mini'>",
	x: '16.0%',
	y: '58.0%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.hammer ||
                (store.state.trackerData.items.moonpearl && store.state.trackerData.items.mirror && Logic.canLiftDarkRocks())) {
			if (store.state.trackerData.items.powder) {
				availability.glitchless = 'available'
			} else if (store.state.trackerData.items.somaria && store.state.trackerData.items.mushroom) {
				availability.glitchless = 'glitchavailable'
			}
		}
		if (store.state.trackerData.items.powder && store.state.trackerData.items.boots) {
			availability.owGlitches = 'available'
		} else if (store.state.trackerData.items.powder && store.state.trackerData.items.mirror) {
			availability.majorGlitches = 'available'
		}
		if (store.state.trackerData.items.moonpearl && store.state.trackerData.items.hammer) {
			if (store.state.trackerData.items.powder) {
				if (Logic.canEnterLightWorld('inverted', false, false)) {
					availability.inverted = 'available'
				} else if (Logic.canEnterLightWorld('inverted', true, false)) {
					availability.inverted = 'agahnim'
				} else if (Logic.canEnterLightWorld('inverted', true, true)) {
					availability.inverted = 'glitchagahnim'
				}
			} else if (store.state.trackerData.items.somaria && store.state.trackerData.items.mushroom) {
				if (Logic.canEnterLightWorld('inverted', false, false)) {
					availability.inverted = 'glitchavailable'
				} else if (Logic.canEnterLightWorld('inverted', true, true)) {
					availability.inverted = 'glitchagahnim'
				}
			}
		}
		return availability
	}
}

chests[60] = {
	name: "Take the frog home (<img src='/images/mirror.png' class='mini'> or save and quit)",
	x: '15.2%',
	y: '51.8%',
	isOpened: false,
	isAvailable: function () {
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
		if (store.state.trackerData.items.moonpearl && (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && store.state.trackerData.items.mirror))) {
			if (Logic.canEnterNorthWestDarkWorld('owGlitches', false, false)) {
				availability.owGlitches = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, false)) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('owGlitches', true, true)) {
				availability.owGlitches = 'glitchagahnim'
			}
		}
		if (Logic.glitchedLinkInDarkWorld() && (Logic.canLiftDarkRocks() || (store.state.trackerData.items.boots && store.state.trackerData.items.mirror))) {
			if (Logic.canEnterNorthWestDarkWorld('majorGlitches', false, false)) {
				availability.majorGlitches = 'available'
			} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, false)) {
				availability.majorGlitches = 'agahnim'
			} else if (Logic.canEnterNorthWestDarkWorld('majorGlitches', true, true)) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		if (Logic.canLiftDarkRocks() || store.state.trackerData.items.mirror) {
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
}

chests[61] = {
	name: "Fat Fairy: Buy OJ bomb from Dark Link's House after <img src='/images/crystal0.png' class='mini'>5 <img src='/images/crystal0.png' class='mini'>6 (2 items)",
	x: '73.5%',
	y: '48.5%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		// Crystal check
		let crystalCount = 0
		for (let k = 0; k < 10; k++) {
			if (store.state.trackerData.prizes[k] === 4 && store.state.trackerData.items['boss' + k] === 2) {
				crystalCount++
				if (crystalCount === 2) {
					break
				}
			}
		}
		if (crystalCount === 2 && store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterSouthDarkWorld('glitchless', false, false) &&
                    (store.state.trackerData.items.hammer || (store.state.trackerData.items.mirror && store.state.trackerData.items.agahnim))) {
				availability.glitchless = 'available'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, false) &&
                    (store.state.trackerData.items.hammer || (store.state.trackerData.items.mirror && Logic.canGoBeatAgahnim1(false)))) {
				availability.glitchless = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('glitchless', true, true) &&
                    (store.state.trackerData.items.hammer || (store.state.trackerData.items.mirror && Logic.canGoBeatAgahnim1(true)))) {
				availability.glitchless = 'glitchagahnim'
			}
		}
		if (store.state.trackerData.items.mirror && Logic.canSpinSpeed()) {
			availability.owGlitches = 'available'
		} else if (crystalCount === 2) {
			if (Logic.canEnterSouthDarkWorld('owGlitches', false, false) &&
                    ((store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) || (store.state.trackerData.items.mirror && store.state.trackerData.items.agahnim))) {
				availability.owGlitches = 'available'
			} else if (Logic.canEnterSouthDarkWorld('owGlitches', true, false) &&
                    ((store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) || (store.state.trackerData.items.mirror && Logic.canGoBeatAgahnim1(false)))) {
				availability.owGlitches = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('owGlitches', true, true) &&
                    ((store.state.trackerData.items.hammer && store.state.trackerData.items.moonpearl) || (store.state.trackerData.items.mirror && Logic.canGoBeatAgahnim1(true)))) {
				availability.owGlitches = 'glitchagahnim'
			}
			if (Logic.canEnterSouthDarkWorld('majorGlitches', false, false) &&
                    ((store.state.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) || (store.state.trackerData.items.mirror && store.state.trackerData.items.agahnim))) {
				availability.majorGlitches = 'available'
			} else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, false) &&
                    ((store.state.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) || (store.state.trackerData.items.mirror && Logic.canGoBeatAgahnim1(false)))) {
				availability.majorGlitches = 'agahnim'
			} else if (Logic.canEnterSouthDarkWorld('majorGlitches', true, true) &&
                    ((store.state.trackerData.items.hammer && Logic.glitchedLinkInDarkWorld()) || (store.state.trackerData.items.mirror && Logic.canGoBeatAgahnim1(true)))) {
				availability.majorGlitches = 'glitchagahnim'
			}
		}
		if (crystalCount === 2 && store.state.trackerData.items.mirror) {
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
}

chests[62] = {
	name: "Master Sword Pedestal <img src='/images/pendant0.png' class='mini'><img src='/images/pendant1.png' class='mini'><img src='/images/pendant2.png' class='mini'> (can check with <img src='/images/book.png' class='mini'>)",
	x: '2.5%',
	y: '3.2%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		let pendantCount = 0
		for (let k = 0; k < 10; k++) {
			if ((store.state.trackerData.prizes[k] === 1 || store.state.trackerData.prizes[k] === 2) && store.state.trackerData.items['boss' + k] === 2) {
				pendantCount++
				if (pendantCount === 3) {
					break
				}
			}
		}
		if (pendantCount === 3) {
			availability.glitchless = 'available'
		} else if (store.state.trackerData.items.book) {
			availability.glitchless = 'possible'
		}
		if (Logic.canEnterLightWorld('inverted', false, false)) {
			if (pendantCount === 3) {
				availability.inverted = 'available'
			} else if (store.state.trackerData.items.book) {
				availability.inverted = 'possible'
			}
		} else if (pendantCount === 3 || store.state.trackerData.items.book) {
			if (Logic.canEnterLightWorld('inverted', true, false)) {
				availability.inverted = 'agahnim'
			} else if (Logic.canEnterLightWorld('inverted', true, true)) {
				availability.inverted = 'glitchagahnim'
			}
		}

		return availability
	}
}

chests[63] = {
	name: "Waterfall of the Wishing (2)  <img src='/images/flippers.png' class='mini'>",
	x: '44.9%',
	y: '14.7%',
	isOpened: false,
	isAvailable: function () {
		const availability = new Availability()
		if (store.state.trackerData.items.flippers) {
			availability.glitchless = 'available'
		} else if (store.state.trackerData.items.moonpearl) {
			availability.glitchless = 'glitchavailable'
			availability.owGlitches = 'available'
		} else if (store.state.trackerData.items.boots) {
			availability.glitchless = 'glitchavailable'
		}
		if (store.state.trackerData.items.moonpearl) {
			if (Logic.canEnterLightWorld('inverted', false, false)) {
				if (store.state.trackerData.items.flippers) {
					availability.inverted = 'available'
				} else {
					availability.inverted = 'glitchavailable'
				}
			} else if (Logic.canEnterLightWorld('inverted', true, false) && store.state.trackerData.items.flippers) {
				availability.inverted = 'agahnim'
			} else if (Logic.canEnterLightWorld('inverted', true, true)) {
				availability.inverted = 'glitchagahnim'
			}
		}
		return availability
	}
}

export var Locations = {
	data: {
		chests: chests,
		dungeons: dungeons
	}
}
